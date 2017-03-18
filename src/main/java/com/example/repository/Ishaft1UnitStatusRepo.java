package com.example.repository;

import com.example.model.*;
import com.example.util.Function;
import com.example.util.ScheduledTask;
import com.example.util.ShiftType;
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Repository;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * Created by mrpan on 2017/3/10.
 */
@Repository
public class Ishaft1UnitStatusRepo {
    private JdbcTemplate jdbc;
    private Ishaft1ProductRepo repo;
    private WorkShiftRepo workShiftRepo;
    private RestEventWithWorkShiftRepo restEventWithWorkShiftRepo;
    private RestEventRepo restEventRepo;

    @Autowired
    public Ishaft1UnitStatusRepo(JdbcTemplate jdbc, Ishaft1ProductRepo repo, WorkShiftRepo workShiftRepo
            , RestEventWithWorkShiftRepo restEventWithWorkShiftRepo, RestEventRepo restEventRepo) {
        this.jdbc = jdbc;
        this.repo = repo;
        this.workShiftRepo = workShiftRepo;
        this.restEventWithWorkShiftRepo = restEventWithWorkShiftRepo;
        this.restEventRepo = restEventRepo;
    }

    public String getByCurTime(Ishaft1UnitStatus unitStatus) throws ParseException {

        // 获得最新的班次信息
        WorkShift workShift = workShiftRepo.getLatestWorkShift().get(0);
        unitStatus.setCurr_shift_info(workShift);

        // 班次小时分钟格式化
        SimpleDateFormat sdf = new SimpleDateFormat("HH:mm");
        Date curTime = sdf.parse(unitStatus.getCurr_time().substring(11, 16));
        ShiftType shiftType = getShiftType(workShift, curTime);

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
        Date startDate = changeShiftDate(curDate, workShift, shiftType);
        Map<Date, Boolean> addDateRes = Function.addOneDay(startDate, curDate);
        curDate = (Date) addDateRes.keySet().toArray()[0];
        List<Ishaft1Product> products = repo.getByPeriod(startDate, curDate);
        // 当前生产量
        int curNum = products.size();
        unitStatus.setCurr_num(curNum);

        // 根据班次信息得到小时目标
        double hours = getHours(workShift, shiftType);
        int targetValue = 0;
        int standardBeats = 0;
        switch (shiftType) {
            case MORNING_SHIFT:
                targetValue = workShift.getMorning_shift_target_value();
                standardBeats = workShift.getMorning_shift_standard_beats();
                break;
            case MIDDLE_SHIFT:
                targetValue = workShift.getMiddle_shift_target_value();
                standardBeats = workShift.getMiddle_shift_standard_beats();
                break;
            case NIGHT_SHIFT:
                targetValue = workShift.getNight_shift_target_value();
                standardBeats = workShift.getNight_shift_standard_beats();
                break;
        }
        unitStatus.setHourly_target(targetValue / hours);

        // 根据当前产量确定当前生产状态
        long minutes = (curDate.getTime() - startDate.getTime()) / (60 * 1000);

        // 当前值大于计划值
        if (curNum >= Function.targetPerMinute(targetValue, hours * 60, minutes)) {
            // 笑脸
            unitStatus.setStatus(1);
        } else {
            // 哭脸
            unitStatus.setStatus(0);
        }
        // 计算当前节拍
        // 取前31件计算平均值
        int topN = 30;
        int curBeats;
        List<Date> topNProduct = repo.getCurBeats(startDate, curDate, topN);
        if (topNProduct.size() < topN) {
            curBeats = 0;
        } else {
            Date finalProductDate = topNProduct.get(0);
            Date firstProductDate = topNProduct.get(topN - 1);
            curBeats = (int) ((finalProductDate.getTime() - firstProductDate.getTime()) / (1000 * (topN - 1)));
        }
        unitStatus.setCurr_beats(curBeats);

        // 计算OEE = curBeats * (合格产品数) / （经历时间-休息时间）
        // 首先根据班次信息获得当前时刻经历的休息时间
        long restSeconds = getRestSeconds(workShift.getId(), shiftType, curTime);
        // 计算oee
        int oee = (int) (standardBeats * curNum * 100 / (minutes * 60 - restSeconds));
        unitStatus.setMovable_rate(oee);

        // 得到小时产量
        Map<String, Integer> map = getHourlyOutput(products, startDate);
        unitStatus.setHourly_output(map);

        Gson gson = new Gson();
        return gson.toJson(unitStatus);
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
            if (product.getTime().before(endDate) && product.getTime().after(startDate)) {
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

    /**
     * 根据班次信息，判断所属班次
     *
     * @return
     */
    private ShiftType getShiftType(WorkShift workShift, Date curTime) throws ParseException {
        SimpleDateFormat sdf = new SimpleDateFormat("HH:mm");
        // 判断当前时刻所属班次
        if (workShift.getMorning_shift_start() != null && workShift.getMorning_shift_end() != null) {
            Date startTime = sdf.parse(workShift.getMorning_shift_start());
            Date endTime = sdf.parse(workShift.getMorning_shift_end());
            endTime = (Date) Function.addOneDay(startTime, endTime).keySet().toArray()[0];
            curTime = (Date) Function.addOneDay(startTime, curTime).keySet().toArray()[0];
            if (curTime.before(endTime) && curTime.after(startTime)) {
                return ShiftType.MORNING_SHIFT;
            }
        }
        if (workShift.getNight_shift_start() != null && workShift.getNight_shift_end() != null) {
            Date startTime = sdf.parse(workShift.getNight_shift_start());
            Date endTime = sdf.parse(workShift.getNight_shift_end());
            endTime = (Date) Function.addOneDay(startTime, endTime).keySet().toArray()[0];
            curTime = (Date) Function.addOneDay(startTime, curTime).keySet().toArray()[0];
            if (curTime.before(endTime) && curTime.after(startTime)) {
                return ShiftType.NIGHT_SHIFT;
            }
        }
        if (workShift.getMiddle_shift_end() != null && workShift.getMiddle_shift_end() != null) {
            Date startTime = sdf.parse(workShift.getMiddle_shift_start());
            Date endTime = sdf.parse(workShift.getMiddle_shift_end());
            endTime = (Date) Function.addOneDay(startTime, endTime).keySet().toArray()[0];
            curTime = (Date) Function.addOneDay(startTime, curTime).keySet().toArray()[0];
            if (curTime.before(endTime) && curTime.after(startTime)) {
                return ShiftType.MIDDLE_SHIFT;
            }
        }
        return null;
    }

    /**
     * 根据当前日期修改班次信息中的日期
     *
     * @param curDate
     * @param workShift
     * @param shiftType
     * @return
     */

    private Date changeShiftDate(Date curDate, WorkShift workShift, ShiftType shiftType) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(curDate);
        switch (shiftType) {
            case MORNING_SHIFT:
                calendar.set(Calendar.HOUR_OF_DAY, Integer.parseInt(workShift.getMorning_shift_start().substring(0, 2)));
                calendar.set(Calendar.MINUTE, Integer.parseInt(workShift.getMorning_shift_start().substring(3, 5)));
                calendar.set(Calendar.SECOND, 0);
                break;
            case MIDDLE_SHIFT:
                calendar.set(Calendar.HOUR_OF_DAY, Integer.parseInt(workShift.getMiddle_shift_start().substring(0, 2)));
                calendar.set(Calendar.MINUTE, Integer.parseInt(workShift.getMiddle_shift_start().substring(3, 5)));
                calendar.set(Calendar.SECOND, 0);
                break;
            case NIGHT_SHIFT:
                calendar.set(Calendar.HOUR_OF_DAY, Integer.parseInt(workShift.getNight_shift_start().substring(0, 2)));
                calendar.set(Calendar.MINUTE, Integer.parseInt(workShift.getNight_shift_start().substring(3, 5)));
                calendar.set(Calendar.SECOND, 0);
                break;

        }
        return calendar.getTime();
    }

    /**
     * 根据班次信息获得班次的间隔时长
     *
     * @param workShift
     * @param shiftType
     * @return
     * @throws ParseException
     */
    private double getHours(WorkShift workShift, ShiftType shiftType) throws ParseException {
        SimpleDateFormat sdf = new SimpleDateFormat("HH:mm");
        long times = 0;
        Date start;
        Date end;
        switch (shiftType) {
            case MORNING_SHIFT:
                start = sdf.parse(workShift.getMorning_shift_start());
                end = sdf.parse(workShift.getMorning_shift_end());
                end = (Date) Function.addOneDay(start, end).keySet().toArray()[0];
                times = end.getTime() - start.getTime();
                break;
            case MIDDLE_SHIFT:
                start = sdf.parse(workShift.getMiddle_shift_start());
                end = sdf.parse(workShift.getMiddle_shift_end());
                end = (Date) Function.addOneDay(start, end).keySet().toArray()[0];
                times = end.getTime() - start.getTime();
                break;
            case NIGHT_SHIFT:
                start = sdf.parse(workShift.getNight_shift_start());
                end = sdf.parse(workShift.getNight_shift_end());
                end = (Date) Function.addOneDay(start, end).keySet().toArray()[0];
                times = end.getTime() - start.getTime();
                break;
        }
        return times / (60 * 60 * 1000);
    }
}
