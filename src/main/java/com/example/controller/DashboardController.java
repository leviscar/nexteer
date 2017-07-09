package com.example.controller;

import com.example.enumtype.Cell;
import com.example.enumtype.ShiftType;
import com.example.model.ProductInfo;
import com.example.model.WorkShift;
import com.example.repository.ProductModelRepo;
import com.example.repository.StdInfoRepo;
import com.example.repository.WorkShiftRepo;
import com.example.service.CellService;
import com.example.service.UnitStatusService;
import com.example.util.DateFormat;
import com.example.util.Function;
import com.example.util.OutputTool;
import com.google.gson.JsonObject;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

/**
 * Created by mrpan on 2017/3/28.
 */
@RestController
@RequestMapping(value = "/dashboard")
public class DashboardController {
    private WorkShiftRepo workShiftRepo;
    private UnitStatusService unitStatusService;
    private CellService cellService;
    private StdInfoRepo stdInfoRepo;
    @Autowired
    public DashboardController(WorkShiftRepo workShiftRepo, UnitStatusService unitStatusService
            , CellService cellService, StdInfoRepo stdInfoRepo) {
        this.workShiftRepo = workShiftRepo;
        this.unitStatusService = unitStatusService;
        this.cellService = cellService;
        this.stdInfoRepo = stdInfoRepo;
    }

    /**
     * Show product output on dashboard
     *
     * @param cellName
     * @param time
     * @return
     * @throws ParseException
     */
    @ApiOperation(value = "主面板获得所有产线的产量信息", notes = "")
    @ApiImplicitParam(name = "cell", value = "指定的产线，如BEPS1", required = true, dataType = "String")
    @RequestMapping(value = "/output/{cell}", method = RequestMethod.GET)
    public String getAllOutput(@PathVariable(value = "cell") String cellName
            , @RequestParam(value = "time") String time) throws ParseException {
        Cell cell = Cell.valueOf(cellName);
        return getOutput(time, cell);
    }

    /**
     * Show oee on dashboard
     *
     * @param cellName
     * @param time
     * @return
     */
    @ApiOperation(value = "主面板获取oee")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "cell", value = "指定产线，如BEPS1",required = true, dataType = "String"),
            @ApiImplicitParam(name = "time", value = "制定事件")})
    @RequestMapping(value = "/oee/{cell}", method = RequestMethod.GET)
    public String getOee(@PathVariable(value = "cell") String cellName, @RequestParam(value = "time") String time)
            throws ParseException {
        Cell cell = Cell.valueOf(cellName);
        return getOee(time, cell);
    }

    /**
     * Show hce on dashboard
     *
     * @param cellName
     * @param time
     * @return
     * @throws ParseException
     */
    @RequestMapping(value = "/hce/{cell}", method = RequestMethod.GET)
    public String getHce(@PathVariable(value = "cell") String cellName, @RequestParam(value = "time") String time)
            throws ParseException {
        Cell cell = Cell.valueOf(cellName);
        return getHce(time, cell);
    }

    /**
     * Get Hce based on cell and time
     *
     * @param time
     * @param cell
     * @return
     * @throws ParseException
     */
    private String getHce(String time, Cell cell) throws ParseException {
        // format the date with "yyyy-MM-dd HH:mm:ss"
        SimpleDateFormat timeFormat = DateFormat.timeFormat();
        Date curDate = timeFormat.parse(time);

        SimpleDateFormat hourFormat = DateFormat.hourFormat();
        String curTime = hourFormat.format(curDate);

        // get the latest work shift based on cell name and current time
        List<WorkShift> workShifts = workShiftRepo.getLatestByCurTime(cell.toString(), curTime);
        JsonObject object = new JsonObject();
        if (workShifts.isEmpty()) {
            object.addProperty("system_status", false);
            object.addProperty("log", "当前时刻不在任何班次中");
            return object.toString();
        }

        WorkShift workShift = workShifts.get(0);
        object.addProperty("open", workShift.isOpen());
        ShiftType shiftType = ShiftType.valueOf(workShift.getShiftType());
        object.addProperty("shift_type", shiftType.toString());
        // set the year, month, day to work shift's start time and end time based on current date
        List<Date> dateList = OutputTool.changeShiftDate(curDate, workShift);
        Date startDate = dateList.get(0);
        Date endDate = dateList.get(1);

        List<ProductInfo> products = cellService.getProducts(startDate, curDate, cell);

        int normalWorkerNum = workShift.getNormalWorkerNum();
        int overtimeWorkerNum = workShift.getOvertimeWorkerNum();
        int standardMinutes = 8 * 60;
        int standardBeats = workShift.getStandardBeat();
        // calculate all models' products * std
        // get the rest seconds from shift starting till now
        long totalSeconds = (curDate.getTime() - startDate.getTime()) / 1000;
        long restSeconds = unitStatusService.getRestSeconds(workShift.getId(), shiftType
                , hourFormat.parse(time.substring(11, 16)));
        long totalRestSeconds = unitStatusService.getRestSeconds(workShift.getId(), shiftType
                ,  hourFormat.parse(workShift.getEndTime()));
        int unitId = cellService.getUnitId(cell);
        String cellBelong = cellService.getCellName(cell);
        int unitWorkerNum = stdInfoRepo.getWorkNumByUnit(cellBelong, standardBeats, unitId);
        int workHours = (int) ((endDate.getTime() - startDate.getTime()) / (1000 * 3600));
        int calculatedTarget = (int) ((workHours * 3600 - totalRestSeconds) / standardBeats);
        float std = (float) unitWorkerNum * (float) workHours / (float) calculatedTarget;
        float stdMultiplyOutput = std * products.size();

        // calculate hce
        double hce;
        if (totalSeconds / 60 > standardMinutes) {
            // get the overtime seconds till now
            int overMinutes = (int) (totalSeconds / 60 - standardMinutes);
            Calendar calendar = Calendar.getInstance();
            calendar.setTime(startDate);
            calendar.add(Calendar.MINUTE, standardMinutes);
            Date endTime = calendar.getTime();
            // rest minutes during the normal work
            int normalRestMinute = (int) (unitStatusService.getHourlyRestSeconds(workShift.getId(),
                    shiftType, startDate, endTime) / 60);
            // rest minutes during the overtime
            int overRestMinutes = (int) (restSeconds / 60 - normalRestMinute);
            hce = 100 * stdMultiplyOutput * 60 / ((standardMinutes - normalRestMinute) * unitWorkerNum
                    + (overMinutes - overRestMinutes) * unitWorkerNum);
        } else {
            hce = 100 * stdMultiplyOutput * 60 * 60 / ((totalSeconds - restSeconds) * unitWorkerNum);
        }
        object.addProperty("hce", hce);
        int status;
        if (hce >= 100) {
            // sunny
            status = 1;
        } else if (hce >= 90) {
            // cloudy
            status = 0;
        } else {
            // rainy
            status = -1;
        }
        object.addProperty("status", status);
        return object.toString();
    }

    /**
     * Get oee based on cell and time on dashboard
     *
     * @param time
     * @param cell
     * @return
     * @throws ParseException
     */
    private String getOee(String time, Cell cell) throws ParseException {
        // format the date with "yyyy-MM-dd HH:mm:ss"
        SimpleDateFormat timeFormat = DateFormat.timeFormat();
        Date curDate = timeFormat.parse(time);

        SimpleDateFormat hourFormat = DateFormat.hourFormat();
        String curTime = hourFormat.format(curDate);

        // get the latest work shift based on cell name and current time
        List<WorkShift> workShifts = workShiftRepo.getLatestByCurTime(cell.toString(), curTime);
        JsonObject object = new JsonObject();
        if (workShifts.isEmpty()) {
            object.addProperty("system_status", false);
            object.addProperty("log", "当前时刻不在任何班次中");
            return object.toString();
        }

        WorkShift workShift = workShifts.get(0);
        object.addProperty("open", workShift.isOpen());
        ShiftType shiftType = ShiftType.valueOf(workShift.getShiftType());
        object.addProperty("shift_type", shiftType.toString());
        // set the year, month, day to work shift's start time and end time based on current date
        List<Date> dateList = OutputTool.changeShiftDate(curDate, workShift);
        Date startDate = dateList.get(0);

        List<ProductInfo> products = cellService.getProducts(startDate, curDate, cell);

        int standardBeats = workShift.getStandardBeat();
        long totalSeconds = (curDate.getTime() - startDate.getTime()) / 1000;
        long restSeconds = unitStatusService.getRestSeconds(workShift.getId(), shiftType
                , hourFormat.parse(curTime));
        int oee = (int) (standardBeats * products.size() * 100 / (totalSeconds - restSeconds));
        object.addProperty("oee", oee);
        int status;
        if (oee >= 100) {
            // sunny
            status = 1;
        } else if (oee >= 90) {
            // cloudy
            status = 0;
        } else {
            // runny
            status = -1;
        }
        object.addProperty("status", status);
        return object.toString();
    }

    /**
     * Get product output based on various cell
     *
     * @param date
     * @return
     * @throws ParseException
     */
    private String getOutput(String date, Cell cell) throws ParseException {
        // get the latest work shift based on cell name and current time
        List<WorkShift> workShifts = workShiftRepo.getLatestByCurTime(cell.toString(), date.substring(11, 16));
        JsonObject object = new JsonObject();
        if (workShifts.isEmpty()) {
            object.addProperty("system_status", false);
            object.addProperty("log", "当前时刻不在任何班次中");
            return object.toString();
        }
        object.addProperty("cell_name", cell.toString());
        WorkShift workShift = workShifts.get(0);
        object.addProperty("open", workShift.isOpen());
        ShiftType shiftType = ShiftType.valueOf(workShift.getShiftType());
        object.addProperty("shift_type", shiftType.toString());
        object.addProperty("target", workShift.getTarget());
        // format the date with "yyyy-MM-dd HH:mm:ss"
        SimpleDateFormat dateSdf = DateFormat.timeFormat();
        Date curDate = dateSdf.parse(date);
        // set the year, month, day to work shift's start time and end time based on current date
        List<Date> dateList = OutputTool.changeShiftDate(curDate, workShift);
        Date startDate = dateList.get(0);
        Date endDate = dateList.get(1);
        // add a day when the start time and current time do not in the same day
        curDate = Function.addOneDay(startDate, curDate);

        // get the current product output
        List<ProductInfo> products = cellService.getProducts(startDate, curDate, cell);
        int curNum = products.size();
        object.addProperty("curr_output", curNum);

        // format the date with "HH:mm"
        SimpleDateFormat hourFormat = DateFormat.hourFormat();
        Date curTime = hourFormat.parse(date.substring(11, 16));

        // get the rest seconds from shift starting till now
        long totalSeconds = (curDate.getTime() - startDate.getTime()) / 1000;
        long restSeconds = unitStatusService.getRestSeconds(workShift.getId(), shiftType, curTime);
        // get the current target based on current time
        int curTarget = (int) (workShift.getTarget() * (totalSeconds - restSeconds) /
                ((endDate.getTime() - startDate.getTime()) / 1000 - restSeconds));
        // get status
        int status = OutputTool.getStatus(curTarget, curNum);
        object.addProperty("status", status);

        // calculate the reach rate
        int reachRate = curNum * 100 / workShift.getTarget();
        object.addProperty("reach_rate", reachRate);
        return object.toString();
    }
}
