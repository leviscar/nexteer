package com.example.controller;

import com.example.enumtype.Cell;
import com.example.enumtype.ShiftType;
import com.example.model.Ishaft1Product;
import com.example.model.ProductModel;
import com.example.model.WorkShift;
import com.example.repository.Ishaft1ProductRepo;
import com.example.repository.Ishaft1UnitStatusRepo;
import com.example.repository.ProductModelRepo;
import com.example.repository.WorkShiftRepo;
import com.example.util.DateFormat;
import com.example.util.Function;
import com.example.util.ModelOutput;
import com.example.util.OutputTool;
import com.google.gson.Gson;
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
    private Ishaft1ProductRepo ishaft1ProductRepo;
    private ProductModelRepo productModelRepo;
    private Ishaft1UnitStatusRepo ishaft1UnitStatusRepo;

    @Autowired
    public DashboardController(WorkShiftRepo workShiftRepo, Ishaft1ProductRepo ishaft1ProductRepo
            , ProductModelRepo productModelRepo, Ishaft1UnitStatusRepo ishaft1UnitStatusRepo) {
        this.workShiftRepo = workShiftRepo;
        this.ishaft1ProductRepo = ishaft1ProductRepo;
        this.productModelRepo = productModelRepo;
        this.ishaft1UnitStatusRepo = ishaft1UnitStatusRepo;
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
        String res = null;
        switch (cell) {
            case ISHAFT1:
                res = getIshaf1Output(time);
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
     * Show oee on dashboard
     *
     * @param cellName
     * @param time
     * @return
     */
    @RequestMapping(value = "/oee/{cell}", method = RequestMethod.GET)
    public String getOee(@PathVariable(value = "cell") String cellName, @RequestParam(value = "time") String time)
            throws ParseException {
        // format the date with "yyyy-MM-dd HH:mm:ss"
        SimpleDateFormat timeFormat = DateFormat.timeFormat();
        Date curDate = timeFormat.parse(time);

        SimpleDateFormat hourFormat = DateFormat.hourFormat();
        String curTime = hourFormat.format(curDate);

        // get the latest work shift based on cell name and current time
        List<WorkShift> workShifts = workShiftRepo.getLatestByCurTime(cellName, curTime);
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
        Cell cell = Cell.valueOf(cellName);
        switch (cell) {
            case ISHAFT1:
                int standardBeats = workShift.getStandardBeat();
                long totalSeconds = (curDate.getTime() - startDate.getTime()) / 1000;
                long restSeconds = ishaft1UnitStatusRepo.getRestSeconds(workShift.getId(), shiftType
                        , hourFormat.parse(curTime));
                List<Ishaft1Product> products = ishaft1ProductRepo.getByPeriod(startDate, curDate);
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
        // format the date with "yyyy-MM-dd HH:mm:ss"
        SimpleDateFormat timeFormat = DateFormat.timeFormat();
        Date curDate = timeFormat.parse(time);

        SimpleDateFormat hourFormat = DateFormat.hourFormat();
        String curTime = hourFormat.format(curDate);

        // get the latest work shift based on cell name and current time
        List<WorkShift> workShifts = workShiftRepo.getLatestByCurTime(cellName, curTime);
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
        Cell cell = Cell.valueOf(cellName);
        double hce = 0;
        switch (cell) {
            case ISHAFT1:
                int normalWorkerNum = workShift.getNormalWorkerNum();
                int overtimeWorkerNum = workShift.getOvertimeWorkerNum();
                int standardMinutes = 8 * 60;
                // get the current product output
                List<Ishaft1Product> products = ishaft1ProductRepo.getByPeriod(startDate, curDate);
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
                long restSeconds = ishaft1UnitStatusRepo.getRestSeconds(workShift.getId(), shiftType
                        , hourFormat.parse(time.substring(11, 16)));
                if (totalSeconds / 60 > standardMinutes) {
                    // get the overtime seconds till now
                    int overMinutes = (int) (totalSeconds / 60 - standardMinutes);
                    Calendar calendar = Calendar.getInstance();
                    calendar.setTime(startDate);
                    calendar.add(Calendar.MINUTE, standardMinutes);
                    Date endTime = calendar.getTime();
                    // rest minutes during the normal work
                    int normalRestMinute = (int) (ishaft1UnitStatusRepo.getHourlyRestSeconds(workShift.getId(),
                            shiftType, startDate, endTime) / 60);
                    // rest minutes during the overtime
                    int overRestMinutes = (int) (restSeconds / 60 - normalRestMinute);
                    hce = 100 * stdMultiplyOutput * 60 / ((standardMinutes - normalRestMinute) * normalWorkerNum
                            + (overMinutes - overRestMinutes) * overtimeWorkerNum);
                } else {
                    hce = 100 * stdMultiplyOutput * 60 * 60 / ((totalSeconds - restSeconds) * normalWorkerNum);
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
        return new Gson().toJson(object);
    }

    /**
     * Get product output of ishaft1
     *
     * @param date
     * @return
     * @throws ParseException
     */
    private String getIshaf1Output(String date) throws ParseException {
        // get the latest work shift based on cell name and current time
        List<WorkShift> workShifts = workShiftRepo.getLatestByCurTime(Cell.ISHAFT1.toString(), date.substring(11, 16));
        JsonObject object = new JsonObject();
        if (workShifts.isEmpty()) {
            object.addProperty("system_status", false);
            object.addProperty("log", "当前时刻不在任何班次中");
            return object.toString();
        }
        object.addProperty("cell_name", Cell.ISHAFT1.toString());
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
        List<Ishaft1Product> products = ishaft1ProductRepo.getByPeriod(startDate, curDate);
        int curNum = products.size();
        object.addProperty("curr_output", curNum);

        // get the hourly output
        Map<String, Integer> map = ishaft1UnitStatusRepo.getHourlyOutput(products, startDate);

        // format the date with "HH:mm"
        SimpleDateFormat hourFormat = DateFormat.hourFormat();
        Date curTime = hourFormat.parse(date.substring(11, 16));

        // get the rest seconds from shift starting till now
        long totalSeconds = (curDate.getTime() - startDate.getTime()) / 1000;
        long restSeconds = ishaft1UnitStatusRepo.getRestSeconds(workShift.getId(), shiftType, curTime);
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
