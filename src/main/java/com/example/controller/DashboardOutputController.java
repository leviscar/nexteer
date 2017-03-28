package com.example.controller;

import com.example.enumtype.Cell;
import com.example.enumtype.ShiftType;
import com.example.model.DashboardOutput;
import com.example.model.Ishaft1Product;
import com.example.model.WorkShift;
import com.example.repository.Ishaft1ProductRepo;
import com.example.repository.WorkShiftRepo;
import com.example.util.Function;
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
import java.util.Date;
import java.util.List;
import java.util.Map;

import static com.example.enumtype.Cell.ISHAFT1;

/**
 * Created by mrpan on 2017/3/28.
 */
@RestController
@RequestMapping(value = "dashboard")
public class DashboardOutputController {
    private WorkShiftRepo workShiftRepo;
    private Ishaft1ProductRepo ishaft1ProductRepo;

    @Autowired
    public DashboardOutputController(WorkShiftRepo workShiftRepo, Ishaft1ProductRepo ishaft1ProductRepo) {
        this.workShiftRepo = workShiftRepo;
        this.ishaft1ProductRepo = ishaft1ProductRepo;
    }

    @RequestMapping(value = "output", method = RequestMethod.POST)
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
     * 获得ishaft1的产量信息
     *
     * @param curTime
     * @return
     * @throws ParseException
     */
    private String getIshaf1Output(String curTime) throws ParseException {
        WorkShift workShift = workShiftRepo.getLatestWorkShift().get(0);
        // 班次小时分钟格式化
        SimpleDateFormat sdf = new SimpleDateFormat("HH:mm");
        ShiftType shiftType = OutputTool.getShiftType(workShift, sdf.parse(curTime.substring(11, 16)));

        JsonObject object = new JsonObject();
        if (shiftType == null) {
            object.addProperty("status", false);
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

        // 计算产量目标
        int target = (int) ((endDate.getTime() - startDate.getTime()) / (1000 * standardBeats));
        dashboardOutput.setTargetOutput(target);

        // 计算达成率
        int reachRate = curNum / target * 100;
        dashboardOutput.setReachRate(reachRate);
        return new Gson().toJson(dashboardOutput);
    }

}
