package com.example.repository;

import com.example.model.*;
import com.example.util.Function;
import com.example.util.ModelOutput;
import com.example.enumtype.ShiftType;
import com.example.util.OutputTool;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.sql.*;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.Date;

/**
 * Created by mrpan on 2017/3/10.
 */
@Repository
public class Ishaft1UnitStatusRepo {
    private Ishaft1ProductRepo repo;
    private WorkShiftRepo workShiftRepo;
    private RestEventWithWorkShiftRepo restEventWithWorkShiftRepo;
    private RestEventRepo restEventRepo;
    private LossTimeRepo lossTimeRepo;
    private ProductModelRepo productModelRepo;

    @Autowired
    public Ishaft1UnitStatusRepo(Ishaft1ProductRepo repo, WorkShiftRepo workShiftRepo
            , RestEventWithWorkShiftRepo restEventWithWorkShiftRepo
            , RestEventRepo restEventRepo, LossTimeRepo lossTimeRepo
            , ProductModelRepo productModelRepo) {
        this.lossTimeRepo = lossTimeRepo;
        this.repo = repo;
        this.workShiftRepo = workShiftRepo;
        this.restEventWithWorkShiftRepo = restEventWithWorkShiftRepo;
        this.restEventRepo = restEventRepo;
        this.productModelRepo = productModelRepo;
    }

    public String getByCurTime(Ishaft1UnitStatus unitStatus) throws ParseException {

        // 获得最新的班次信息
        WorkShift workShift = workShiftRepo.getLatestWorkShift().get(0);
        unitStatus.setCurr_shift_info(workShift);

        // 班次小时分钟格式化
        SimpleDateFormat sdf = new SimpleDateFormat("HH:mm");
        Date curTime = sdf.parse(unitStatus.getCurr_time().substring(11, 16));
        ShiftType shiftType = OutputTool.getShiftType(workShift, curTime);

        JsonObject object = new JsonObject();
        if (shiftType == null) {
            object.addProperty("status", false);
            object.addProperty("log", "当前时刻不在任何班次中");
            return object.toString();
        }
        unitStatus.setShift_type(shiftType);
        // 设置当前年月日
        SimpleDateFormat dateSdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Date curDate = dateSdf.parse(unitStatus.getCurr_time());
        List<Date> dateList = OutputTool.changeShiftDate(curDate, workShift, shiftType);
        Date startDate = dateList.get(0);
        Date endDate = dateList.get(1);
        Map<Date, Boolean> addDateRes = Function.addOneDay(startDate, curDate);
        curDate = (Date) addDateRes.keySet().toArray()[0];
        addDateRes = Function.addOneDay(startDate, endDate);
        endDate = (Date) addDateRes.keySet().toArray()[0];
        List<Ishaft1Product> products = repo.getByPeriod(startDate, curDate);
        // 当前生产量
        int curNum = products.size();
        unitStatus.setCurr_num(curNum);

        int standardBeats = 0;
        int workerNum = 0;
        int overtimeWorkerNum = 0;
        switch (shiftType) {
            case MORNING_SHIFT:
                standardBeats = workShift.getMorning_shift_standard_beats();
                workerNum = workShift.getMorning_worker_num();
                overtimeWorkerNum = workShift.getMorning_overtime_worker_num();
                break;
            case MIDDLE_SHIFT:
                standardBeats = workShift.getMiddle_shift_standard_beats();
                workerNum = workShift.getMiddle_worker_num();
                overtimeWorkerNum = workShift.getMiddle_overtime_worker_num();
                break;
            case NIGHT_SHIFT:
                standardBeats = workShift.getNight_shift_standard_beats();
                workerNum = workShift.getNight_worker_num();
                overtimeWorkerNum = workShift.getNight_overtime_worker_num();
                break;
        }

        // 计算目标值
        int target = (int) ((endDate.getTime() - startDate.getTime()) / (1000 * standardBeats));
        unitStatus.setTarget(target);

        // 计算当前节拍
        // 取前30件计算平均值
        int topN = 30;
        List<Date> topNProduct = repo.getCurBeats(startDate, curDate, topN);
        int curBeats = OutputTool.calcCurBeats(topNProduct, topN);
        unitStatus.setCurr_beats(curBeats);
        unitStatus.setStatus(OutputTool.getStatus(curBeats, standardBeats));
        // 首先根据班次信息获得当前时刻经历的休息时间
        long totalSeconds = (curDate.getTime() - startDate.getTime()) / 1000;
        long restSeconds = getRestSeconds(workShift.getId(), shiftType, curTime);
        // 计算OEE = curBeats * (合格产品数) / （经历时间-休息时间）
        int oee = (int) (standardBeats * curNum * 100 / (totalSeconds - restSeconds));
        unitStatus.setMovable_rate(oee);

        // 计算hce
        int standardMinutes = 8 * 60;
        double hce;
        // 计算所有型号乘对应的std的值
        Map<String, Integer> modelOutputMap = ModelOutput.getEachModelOutput(products);
        float stdMultiplyOutput = 0;
        for (Map.Entry<String, Integer> entry : modelOutputMap.entrySet()) {
            String modelId = entry.getKey();
            ProductModel model = productModelRepo.getStdByModelId(modelId);
            stdMultiplyOutput += model.getStd() * entry.getValue();
        }
        if (totalSeconds / 60 > standardMinutes) {
            // 当前为止的加班时间
            int overMinutes = (int) (totalSeconds / 60 - standardMinutes);
            Calendar calendar = Calendar.getInstance();
            calendar.setTime(startDate);
            calendar.add(Calendar.MINUTE, standardMinutes);
            Date endTime = calendar.getTime();
            // 正常工作的总休息时间
            int normalRestMinute = (int) (getHourlyRestSeconds(workShift.getId(), shiftType, startDate, endTime) / 60);
            // 加班时间内的休息时间
            int overRestMinutes = (int) (restSeconds / 60 - normalRestMinute);
            hce = 100 * stdMultiplyOutput * 60 / ((standardMinutes - normalRestMinute) * workerNum + (overMinutes - overRestMinutes) * overtimeWorkerNum);
        } else {
            hce = 100 * stdMultiplyOutput * 60 * 60 / ((totalSeconds - restSeconds) * workerNum);
        }
        unitStatus.setHce(hce);

        // 得到小时产量
        Map<String, Integer> map = getHourlyOutput(products, startDate);
        unitStatus.setHourly_output(map);

        // 得到小时目标产量
        Map<String, Integer> targetMap = getHourlyTargetValue(standardBeats, shiftType, workShift);
        unitStatus.setHourly_target(targetMap);

        // 得到损失时间
        unitStatus.setLoss_time(getLossTime(8, startDate, curDate));
        Gson gson = new Gson();
        return gson.toJson(unitStatus);
    }

    /**
     * 根据开始时间和结束时间查询总损失时间
     *
     * @param cellId
     * @param startTime
     * @param endTime
     * @return 损失时间 int
     */
    public int getLossTime(int cellId, Date startTime, Date endTime) {
        List<LossTime> lossTimeList = lossTimeRepo.getLossTimeByCellId(cellId, startTime, endTime);
        int totalTime = 0;
        for (LossTime lossTime : lossTimeList) {
            totalTime += lossTime.getEndTime().getTime() - lossTime.getStartTime().getTime();
        }
        return totalTime / 1000;
    }

    /**
     * 根据当前班次以及标准节拍，获得该班次每个小时的target
     *
     * @param standardBeats
     * @param shiftType
     * @param workShift
     * @return
     * @throws ParseException
     */
    private Map<String, Integer> getHourlyTargetValue(int standardBeats, ShiftType shiftType, WorkShift workShift) throws ParseException {
        SimpleDateFormat sdf = new SimpleDateFormat("HH:mm");
        Date startTime = new Date(), endTime = new Date();
        switch (shiftType) {
            case MORNING_SHIFT:
                startTime = sdf.parse(workShift.getMorning_shift_start());
                endTime = sdf.parse(workShift.getMorning_shift_end());
                break;
            case MIDDLE_SHIFT:
                startTime = sdf.parse(workShift.getMiddle_shift_start());
                endTime = sdf.parse(workShift.getMiddle_shift_end());
                break;
            case NIGHT_SHIFT:
                startTime = sdf.parse(workShift.getNight_shift_start());
                endTime = sdf.parse(workShift.getNight_shift_end());
                break;
        }
        Map<String, Integer> map = new TreeMap<>();
        while (endTime.getTime() > startTime.getTime()) {
            Calendar calendar = Calendar.getInstance();
            calendar.setTime(startTime);
            calendar.add(Calendar.HOUR_OF_DAY, 1);
            long restSeconds = getHourlyRestSeconds(workShift.getId(), shiftType, startTime, calendar.getTime());
            if (restSeconds < 3600) {
                int hourlyTarget;
                if (calendar.getTime().getTime() > endTime.getTime()) {
                    hourlyTarget = (int) (((endTime.getTime() - startTime.getTime()) / 1000 - restSeconds) / standardBeats);
                } else {
                    hourlyTarget = (int) ((3600 - restSeconds) / standardBeats);
                }
                map.put(sdf.format(startTime), hourlyTarget);
            } else {
                map.put(sdf.format(startTime), 0);
            }
            startTime = calendar.getTime();
        }
        return map;
    }

    private long getHourlyRestSeconds(int workShiftId, ShiftType shiftType, Date startTime, Date endTime) throws ParseException {
        List<RestEventWithWorkShift> restEventWithWorkShiftList = restEventWithWorkShiftRepo.getByWorkShiftId(workShiftId);
        if (restEventWithWorkShiftList.isEmpty()) {
            return 0;
        } else {
            long restSeconds = 0;
            for (RestEventWithWorkShift restEventWithWorkShift : restEventWithWorkShiftList) {
                RestEvent event = restEventRepo.getById(restEventWithWorkShift.getId());
                // 若休息时间在班次内
                if (shiftType.toString().equals(event.getShift_type())) {
                    SimpleDateFormat sdf = new SimpleDateFormat("HH:mm");
                    Date eventStartTime = sdf.parse(event.getEvent_start_time());
                    Date eventEndTime = sdf.parse(event.getEvent_end_time());
                    if (endTime.before(eventStartTime) || startTime.after(eventEndTime)) {
                        restSeconds += 0;
                    } else if (startTime.after(eventStartTime) && endTime.before(eventEndTime)) {
                        restSeconds += (endTime.getTime() - startTime.getTime()) / 1000;
                    } else if (startTime.before(eventStartTime) && endTime.before(eventEndTime)) {
                        restSeconds += (endTime.getTime() - eventStartTime.getTime()) / 1000;
                    } else if (startTime.after(eventStartTime) && endTime.after(eventEndTime)) {
                        restSeconds += (eventEndTime.getTime() - startTime.getTime()) / 1000;
                    } else if (startTime.before(eventStartTime) && endTime.after(eventEndTime)) {
                        restSeconds += (eventEndTime.getTime() - eventStartTime.getTime()) / 1000;
                    }
                }
            }
            return restSeconds;
        }
    }

    /**
     * 获得小时产量
     *
     * @param products
     * @param startDate
     * @return
     */
    private Map<String, Integer> getHourlyOutput(List<Ishaft1Product> products, Date startDate) {
        SimpleDateFormat sdf = new SimpleDateFormat("HH:mm");
        Map<String, Integer> map = new TreeMap<>();

        Calendar calendar = Calendar.getInstance();
        calendar.setTime(startDate);
        calendar.add(Calendar.HOUR_OF_DAY, 1);
        Date endDate = calendar.getTime();
        int count = 0;
        for (Ishaft1Product product : products) {
            if (product.getTime().getTime() > startDate.getTime() && product.getTime().getTime() < endDate.getTime()) {
                count++;
            } else {
                map.put(sdf.format(startDate), count);
                calendar.add(Calendar.HOUR_OF_DAY, 1);
                startDate = endDate;
                endDate = calendar.getTime();
                count = 0;
            }
        }
        map.put(sdf.format(startDate), count);
        return map;
    }

    /**
     * 获得当前时刻之前的所有休息时间
     *
     * @param workShiftId
     * @param curShiftType
     * @return
     * @throws ParseException
     */
    private long getRestSeconds(int workShiftId, ShiftType curShiftType, Date curTime) throws ParseException {
        List<RestEventWithWorkShift> restEventWithWorkShiftList = restEventWithWorkShiftRepo.getByWorkShiftId(workShiftId);
        if (restEventWithWorkShiftList.isEmpty()) {
            return 0;
        } else {
            long restSeconds = 0;
            for (RestEventWithWorkShift restEventWithWorkShift : restEventWithWorkShiftList) {
                RestEvent event = restEventRepo.getById(restEventWithWorkShift.getId());
                // 若休息时间在班次内
                if (curShiftType.toString().equals(event.getShift_type())) {
                    SimpleDateFormat sdf = new SimpleDateFormat("HH:mm");
                    Date startTime = sdf.parse(event.getEvent_start_time());
                    Date endTime = sdf.parse(event.getEvent_end_time());
                    // 若当前时刻在休息时间之中
                    if (curTime.before(endTime) && curTime.after(startTime)) {
                        restSeconds += curTime.getTime() - startTime.getTime();
                    } else if (curTime.after(endTime)) {
                        restSeconds += endTime.getTime() - startTime.getTime();
                    }
                }
            }
            return restSeconds / 1000;
        }
    }

}
