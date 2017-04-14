package com.example.controller;

import com.example.enumtype.Cell;
import com.example.enumtype.ShiftType;
import com.example.model.*;
import com.example.repository.*;
import com.example.util.Function;
import com.example.util.ModelOutput;
import com.example.util.OutputTool;
import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Map;

import static com.example.enumtype.Cell.ISHAFT1;

/**
 * Created by mrpan on 2017/3/28.
 */
@RestController
@RequestMapping(value = "/dashboard")
public class DashboardController {
    private WorkShiftRepo workShiftRepo;
    private Ishaft1ProductRepo ishaft1ProductRepo;
    private ProductModelRepo productModelRepo;
    private RestEventWithWorkShiftRepo restEventWithWorkShiftRepo;
    private RestEventRepo restEventRepo;

    @Autowired
    public DashboardController(WorkShiftRepo workShiftRepo, Ishaft1ProductRepo ishaft1ProductRepo, ProductModelRepo productModelRepo, RestEventWithWorkShiftRepo restEventWithWorkShiftRepo, RestEventRepo restEventRepo) {
        this.workShiftRepo = workShiftRepo;
        this.ishaft1ProductRepo = ishaft1ProductRepo;
        this.productModelRepo = productModelRepo;
        this.restEventWithWorkShiftRepo = restEventWithWorkShiftRepo;
        this.restEventRepo = restEventRepo;
    }

    /**
     * 主面板产量信息展示
     *
     * @param json
     * @return
     * @throws ParseException
     */
    @RequestMapping(value = "/output", method = RequestMethod.POST)
    public String getAllOutput(@RequestBody String json) throws ParseException {
        JsonParser parser = new JsonParser();
        JsonElement element = parser.parse(json);
        JsonObject object = element.getAsJsonObject();
        String curTime = new Gson().fromJson(object.get("curr_time"), String.class);
        String cellName = new Gson().fromJson(object.get("cell_name"), String.class);
        Cell cell = Cell.valueOf(cellName);
        String res = null;
        switch (cell) {
            case ISHAFT1:
                res = getIshaf1Output(curTime);
                break;
            case ISHAFT2:
                break;
            case ISHAFT3:
                break;
            case ISHAFT4:
                break;
            case BEPS:
                break;
            case CEPS:
                break;
        }
        return res;
    }

    /**
     * 获得主面板的oee
     *
     * @param json
     * @return
     */
    @RequestMapping(value = "/oee", method = RequestMethod.POST)
    public String getOee(@RequestBody String json) throws ParseException {
        JsonParser parser = new JsonParser();
        JsonElement element = parser.parse(json);
        JsonObject jsonObject = element.getAsJsonObject();
        Date curDate = new Gson().fromJson(jsonObject.get("curr_time"), Date.class);
        String cellName = new Gson().fromJson(jsonObject.get("cell_name"), String.class);

        // 获得最新的班次信息
        WorkShift workShift = workShiftRepo.getLatestWorkShift(Cell.ISHAFT1.toString()).get(0);
        SimpleDateFormat sdf = new SimpleDateFormat("HH:mm");
        String curTime = sdf.format(curDate);
        ShiftType shiftType = OutputTool.getShiftType(workShift, sdf.parse(curTime));

        JsonObject object = new JsonObject();
        if (shiftType == null) {
            object.addProperty("system_status", false);
            object.addProperty("log", "当前时刻不在任何班次中");
            return object.toString();
        }
        // 设置日期
        List<Date> dateList = OutputTool.changeShiftDate(curDate, workShift, shiftType);
        Date startDate = dateList.get(0);
        Map<Date, Boolean> addDateRes = Function.addOneDay(startDate, curDate);
        curDate = (Date) addDateRes.keySet().toArray()[0];
        Cell cell = Cell.valueOf(cellName);
        switch (cell) {
            case ISHAFT1:
                int standardBeats = 0;
                switch (shiftType) {
                    case MORNING_SHIFT:
                        standardBeats = workShift.getMorning_shift_standard_beats();
                        break;
                    case MIDDLE_SHIFT:
                        standardBeats = workShift.getMiddle_shift_standard_beats();
                        break;
                    case NIGHT_SHIFT:
                        standardBeats = workShift.getNight_shift_standard_beats();
                        break;
                }
                long totalSeconds = (curDate.getTime() - startDate.getTime()) / 1000;
                long restSeconds = getRestSeconds(workShift.getId(), shiftType, sdf.parse(curTime));
                // 计算OEE = standardBeats * (合格产品数) / （经历时间-休息时间）
                List<Ishaft1Product> products = ishaft1ProductRepo.getByPeriod(startDate, curDate);
                int oee = (int) (standardBeats * products.size() * 100 / (totalSeconds - restSeconds));
                object.addProperty("oee", oee);
                break;
            case ISHAFT2:
                break;
            case ISHAFT3:
                break;
            case ISHAFT4:
                break;
            case BEPS:
                break;
            case CEPS:
                break;
        }
        return object.toString();
    }

    /**
     * 获取hce
     *
     * @param json
     * @return
     * @throws ParseException
     */
    @RequestMapping(value = "hce", method = RequestMethod.POST)
    public String getHce(@RequestBody String json) throws ParseException {
        JsonParser parser = new JsonParser();
        JsonElement element = parser.parse(json);
        JsonObject jsonObject = element.getAsJsonObject();
        String cellName = new Gson().fromJson(jsonObject.get("cell_name"), String.class);
        Date curDate = new Gson().fromJson(jsonObject.get("curr_time"), Date.class);
        // 获得最新的班次信息
        WorkShift workShift = workShiftRepo.getLatestWorkShift(Cell.ISHAFT1.toString()).get(0);
        SimpleDateFormat sdf = new SimpleDateFormat("HH:mm");
        String curTime = sdf.format(curDate);
        ShiftType shiftType = OutputTool.getShiftType(workShift, sdf.parse(curTime));

        JsonObject object = new JsonObject();
        if (shiftType == null) {
            object.addProperty("system_status", false);
            object.addProperty("log", "当前时刻不在任何班次中");
            return object.toString();
        }
        // 设置日期
        List<Date> dateList = OutputTool.changeShiftDate(curDate, workShift, shiftType);
        Date startDate = dateList.get(0);
        Map<Date, Boolean> addDateRes = Function.addOneDay(startDate, curDate);
        curDate = (Date) addDateRes.keySet().toArray()[0];
        Cell cell = Cell.valueOf(cellName);
        double hce = 0;
        switch (cell) {
            case ISHAFT1:
                int workerNum = 0;
                int overtimeWorkerNum = 0;
                switch (shiftType) {
                    case MORNING_SHIFT:
                        workerNum = workShift.getMorning_worker_num();
                        overtimeWorkerNum = workShift.getMorning_overtime_worker_num();
                        break;
                    case MIDDLE_SHIFT:
                        workerNum = workShift.getMiddle_worker_num();
                        overtimeWorkerNum = workShift.getMiddle_overtime_worker_num();
                        break;
                    case NIGHT_SHIFT:
                        workerNum = workShift.getNight_worker_num();
                        overtimeWorkerNum = workShift.getNight_overtime_worker_num();
                        break;
                }
                int standardMinutes = 8 * 60;
                List<Ishaft1Product> products = ishaft1ProductRepo.getByPeriod(startDate, curDate);
                // 计算所有型号乘对应的std的值
                Map<String, Integer> modelOutputMap = ModelOutput.getEachModelOutput(products);
                float stdMultiplyOutput = 0;
                for (Map.Entry<String, Integer> entry : modelOutputMap.entrySet()) {
                    String modelId = entry.getKey();
                    ProductModel model = productModelRepo.getStdByModelId(modelId);
                    stdMultiplyOutput += model.getStd() * entry.getValue();
                }
                long restSeconds = getRestSeconds(workShift.getId(), shiftType, sdf.parse(curTime));
                long totalSeconds = (curDate.getTime() - startDate.getTime()) / 1000;
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
                break;
            case ISHAFT2:
                break;
            case ISHAFT3:
                break;
            case ISHAFT4:
                break;
            case BEPS:
                break;
            case CEPS:
                break;
        }
        object.addProperty("hce", hce);
        return new Gson().toJson(object);
    }

    /**
     * 获得ishaft1的产量信息
     *
     * @param curTime
     * @return
     * @throws ParseException
     */
    private String getIshaf1Output(String curTime) throws ParseException {
        WorkShift workShift = workShiftRepo.getLatestWorkShift(Cell.ISHAFT1.toString()).get(0);
        // 班次小时分钟格式化
        SimpleDateFormat sdf = new SimpleDateFormat("HH:mm");
        ShiftType shiftType = OutputTool.getShiftType(workShift, sdf.parse(curTime.substring(11, 16)));

        JsonObject object = new JsonObject();
        if (shiftType == null) {
            object.addProperty("system_status", false);
            object.addProperty("log", "当前时刻不在任何班次中");
            return object.toString();
        }
        SimpleDateFormat dateSdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Date curDate = dateSdf.parse(curTime);
        List<Date> dateList = OutputTool.changeShiftDate(curDate, workShift, shiftType);
        Date startDate = dateList.get(0);
        Date endDate = dateList.get(1);
        Map<Date, Boolean> addDateRes = Function.addOneDay(startDate, curDate);
        curDate = (Date) addDateRes.keySet().toArray()[0];
        addDateRes = Function.addOneDay(startDate, endDate);
        endDate = (Date) addDateRes.keySet().toArray()[0];
        List<Ishaft1Product> products = ishaft1ProductRepo.getByPeriod(startDate, curDate);
        DashboardOutput dashboardOutput = new DashboardOutput();
        dashboardOutput.setCellName(ISHAFT1.toString());
        // 当前生产量
        int curNum = products.size();
        dashboardOutput.setCurOutput(curNum);

        // 计算当前节拍
        // 取前31件计算平均值
        int topN = 30;
        List<Date> topNProduct = ishaft1ProductRepo.getCurBeats(startDate, curDate, topN);
        int curBeats = OutputTool.calcCurBeats(topNProduct, topN);
        int standardBeats = 0;
        switch (shiftType) {
            case MORNING_SHIFT:
                standardBeats = workShift.getMorning_shift_standard_beats();
                break;
            case MIDDLE_SHIFT:
                standardBeats = workShift.getMiddle_shift_standard_beats();
                break;
            case NIGHT_SHIFT:
                standardBeats = workShift.getNight_shift_standard_beats();
                break;
        }

        //获得状态
        int status = OutputTool.getStatus(curBeats, standardBeats);
        dashboardOutput.setStatus(status);

        // 设置结束时间的日期

        // get the total rest seconds in this shift
        int totalRestSeconds = (int) getRestSeconds(workShift.getId(), shiftType, sdf.parse(sdf.format(endDate)));
        // calculate the target value
        int target = (int) (((endDate.getTime() - startDate.getTime()) / 1000 - totalRestSeconds)  / standardBeats);
        dashboardOutput.setTargetOutput(target);

        // 计算达成率
        int reachRate = curNum * 100 / target;
        dashboardOutput.setReachRate(reachRate);
        return new Gson().toJson(dashboardOutput);
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
                    if (endTime.compareTo(eventStartTime) <= 0 || startTime.compareTo(eventEndTime) >= 0) {
                        restSeconds += 0;
                    } else if (startTime.compareTo(eventStartTime) >= 0 && endTime.compareTo(eventEndTime) <= 0) {
                        restSeconds += (endTime.getTime() - startTime.getTime()) / 1000;
                    } else if (startTime.compareTo(eventStartTime) <= 0 && endTime.compareTo(eventEndTime) <= 0) {
                        restSeconds += (endTime.getTime() - eventStartTime.getTime()) / 1000;
                    } else if (startTime.compareTo(eventStartTime) >= 0 && endTime.compareTo(eventEndTime) >= 0) {
                        restSeconds += (eventEndTime.getTime() - startTime.getTime()) / 1000;
                    } else if (startTime.compareTo(eventStartTime) <= 0 && endTime.compareTo(eventEndTime) >= 0) {
                        restSeconds += (eventEndTime.getTime() - eventStartTime.getTime()) / 1000;
                    }
                }
            }
            return restSeconds;
        }
    }

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
                    if (curTime.compareTo(endTime) <= 0 && curTime.compareTo(startTime) >= 0) {
                        restSeconds += curTime.getTime() - startTime.getTime();
                    } else if (curTime.compareTo(endTime) >= 0) {
                        restSeconds += endTime.getTime() - startTime.getTime();
                    }
                }
            }
            return restSeconds / 1000;
        }
    }
}
