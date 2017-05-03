package com.example.controller;

import com.example.enumtype.Cell;
import com.example.enumtype.ShiftType;
import com.example.model.ProductInfo;
import com.example.model.ProductModel;
import com.example.model.WorkShift;
import com.example.repository.ProductModelRepo;
import com.example.repository.WorkShiftRepo;
import com.example.service.CellService;
import com.example.service.UnitStatusService;
import com.example.util.DateFormat;
import com.example.util.Function;
import com.example.util.ModelOutput;
import com.example.util.OutputTool;
import com.google.gson.JsonObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * Created by mrpan on 2017/3/28.
 */
@RestController
@RequestMapping(value = "/dashboard")
public class DashboardController {
    private WorkShiftRepo workShiftRepo;
    private ProductModelRepo productModelRepo;
    private UnitStatusService unitStatusService;
    private CellService cellService;

    @Autowired
    public DashboardController(WorkShiftRepo workShiftRepo, ProductModelRepo productModelRepo
            , UnitStatusService unitStatusService, CellService cellService) {
        this.workShiftRepo = workShiftRepo;
        this.productModelRepo = productModelRepo;
        this.unitStatusService = unitStatusService;
        this.cellService = cellService;
    }

    /**
     * Show product output on dashboard
     *
     * @param cellName
     * @param time
     * @return
     * @throws ParseException
     */
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

        List<ProductInfo> products = cellService.getProducts(startDate, curDate, cell);

        int normalWorkerNum = workShift.getNormalWorkerNum();
        int overtimeWorkerNum = workShift.getOvertimeWorkerNum();
        int standardMinutes = 8 * 60;

        // calculate all models' products * std
        Map<String, Integer> modelOutputMap = ModelOutput.getEachModelOutput(products);
        float stdMultiplyOutput = 0;
        for (Map.Entry<String, Integer> entry : modelOutputMap.entrySet()) {
            String modelId = entry.getKey();
            ProductModel model = productModelRepo.getStdByModelId(modelId);
            stdMultiplyOutput += model.getStd() * entry.getValue();
        }
        // get the rest seconds from shift starting till now
        long totalSeconds = (curDate.getTime() - startDate.getTime()) / 1000;
        long restSeconds = unitStatusService.getRestSeconds(workShift.getId(), shiftType
                , hourFormat.parse(time.substring(11, 16)));
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
            hce = 100 * stdMultiplyOutput * 60 / ((standardMinutes - normalRestMinute) * normalWorkerNum
                    + (overMinutes - overRestMinutes) * overtimeWorkerNum);
        } else {
            hce = 100 * stdMultiplyOutput * 60 * 60 / ((totalSeconds - restSeconds) * normalWorkerNum);
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
