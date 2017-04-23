package com.example.service;

import com.example.enumtype.Cell;
import com.example.enumtype.ShiftType;
import com.example.model.*;
import com.example.repository.*;
import com.example.util.DateFormat;
import com.example.util.Function;
import com.example.util.ModelOutput;
import com.example.util.OutputTool;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * Created by mrpan on 2017/3/10.
 */
@Service
public class UnitStatusService {
    private Ishaft1ProductInfoRepo ishaft1ProductInfoRepo;
    private CepsProductInfoRepo cepsProductInfoRepo;
    private WorkShiftRepo workShiftRepo;
    private RestEventRepo restEventRepo;
    private LossTimeRepo lossTimeRepo;
    private ProductModelRepo productModelRepo;

    @Autowired
    public UnitStatusService(Ishaft1ProductInfoRepo ishaft1ProductInfoRepo, CepsProductInfoRepo cepsProductInfoRepo
            , WorkShiftRepo workShiftRepo, RestEventRepo restEventRepo, LossTimeRepo lossTimeRepo
            , ProductModelRepo productModelRepo) {
        this.cepsProductInfoRepo = cepsProductInfoRepo;
        this.lossTimeRepo = lossTimeRepo;
        this.ishaft1ProductInfoRepo = ishaft1ProductInfoRepo;
        this.workShiftRepo = workShiftRepo;
        this.restEventRepo = restEventRepo;
        this.productModelRepo = productModelRepo;
    }

    public String getUnitStatusByCurTime(String date, String cellName) throws ParseException {
        UnitStatus unitStatus = new UnitStatus();

        // format the date with "HH:mm"
        SimpleDateFormat hourFormat = DateFormat.hourFormat();
        Date curTime = hourFormat.parse(date.substring(11, 16));

        // get the latest work shift based on cell name and current time
        List<WorkShift> workShifts = workShiftRepo.getLatestByCurTime(cellName, date.substring(11, 16));
        JsonObject object = new JsonObject();
        if (workShifts.isEmpty()) {
            object.addProperty("system_status", false);
            object.addProperty("log", "当前时刻不在任何班次中");
            return object.toString();
        }
        WorkShift workShift = workShifts.get(0);
        unitStatus.setCurr_shift_info(workShift);
        ShiftType shiftType = ShiftType.valueOf(workShift.getShiftType());

        // format the date with "yyyy-MM-dd HH:mm:ss"
        SimpleDateFormat dateSdf = DateFormat.timeFormat();
        Date curDate = dateSdf.parse(date);
        // set the year, month, day to work shift's start time and end time based on current date
        List<Date> dateList = OutputTool.changeShiftDate(curDate, workShift);
        Date startDate = dateList.get(0);
        Date endDate = dateList.get(1);

        // add a day when the start time and current time do not in the same day
        curDate = Function.addOneDay(startDate, curDate);

        // get the current product output based on cell name
        List<ProductInfo> products = new ArrayList<>();
        // take the latest 30 products' beat to calculate the current beat
        int topN = 30;
        List<Date> topNProduct = new ArrayList<>();
        // cell id to get the loss time
        int cellId = 0;
        String stationId;
        switch (Cell.valueOf(cellName)) {
            case ISHAFT1:
                products= ishaft1ProductInfoRepo.getByPeriod(startDate, curDate);
                topNProduct = ishaft1ProductInfoRepo.getCurBeats(startDate, curDate, topN);
                cellId = 8;
                break;
            case ISHAFT2:
                break;
            case ISHAFT3:
                break;
            case ISHAFT4:
                break;
            case BEPS1:
                break;
            case BEPS2:
                break;
            case BEPS3:
                break;
            case BEPS4:
                break;
            case CEPS1:
                stationId = "SD000094X02";
                products = cepsProductInfoRepo.getByPeriodAndStationId(startDate, curDate, stationId);
                topNProduct = cepsProductInfoRepo.getTopN(startDate, curDate, topN, stationId);
                cellId = 11;
                break;
            case CEPS2:
                stationId = "SD000102X01";
                products = cepsProductInfoRepo.getByPeriodAndStationId(startDate, curDate, stationId);
                topNProduct = cepsProductInfoRepo.getTopN(startDate, curDate, topN, stationId);
                cellId = 12;
                break;
            case CEPS3:
                stationId = "SD000107X01";
                products = cepsProductInfoRepo.getByPeriodAndStationId(startDate, curDate, stationId);
                topNProduct = cepsProductInfoRepo.getTopN(startDate, curDate, topN, stationId);
                cellId = 13;
                break;
            case CEPS4:
                stationId = "SD000122X01";
                products = cepsProductInfoRepo.getByPeriodAndStationId(startDate, curDate, stationId);
                topNProduct = cepsProductInfoRepo.getTopN(startDate, curDate, topN, stationId);
                cellId = 14;
                break;
        }

        int curNum = products.size();
        unitStatus.setCurr_num(curNum);

        int standardBeats = workShift.getStandardBeat();
        int normalWorkerNum = workShift.getNormalWorkerNum();
        int overtimeWorkerNum = workShift.getOvertimeWorkerNum();
        int target = workShift.getTarget();
        unitStatus.setTarget(target);

        int curBeats = OutputTool.calcCurBeats(topNProduct, topN);
        unitStatus.setCurr_beats(curBeats);

        // get the rest seconds from shift starting till now
        long totalSeconds = (curDate.getTime() - startDate.getTime()) / 1000;
        long restSeconds = getRestSeconds(workShift.getId(), shiftType, curTime);
        // OEE = current beat * (products output) / （total seconds - rest seconds）%
        int oee = (int) (standardBeats * curNum * 100 / (totalSeconds - restSeconds));
        unitStatus.setMovable_rate(oee);

        // calculate hce
        int standardMinutes = 8 * 60;
        double hce;
        // calculate all models' products * std
        Map<String, Integer> modelOutputMap = ModelOutput.getEachModelOutput(products);
        float stdMultiplyOutput = 0;
        for (Map.Entry<String, Integer> entry : modelOutputMap.entrySet()) {
            String modelId = entry.getKey();
            ProductModel model = productModelRepo.getStdByModelId(modelId);
            stdMultiplyOutput += model.getStd() * entry.getValue();
        }
        if (totalSeconds / 60 > standardMinutes) {
            // get the overtime seconds till now
            int overMinutes = (int) (totalSeconds / 60 - standardMinutes);
            Calendar calendar = Calendar.getInstance();
            calendar.setTime(startDate);
            calendar.add(Calendar.MINUTE, standardMinutes);
            Date endTime = calendar.getTime();
            // rest minutes during the normal work
            int normalRestMinute = (int) (getHourlyRestSeconds(workShift.getId(), shiftType, startDate, endTime) / 60);
            // rest minutes during the overtime
            int overRestMinutes = (int) (restSeconds / 60 - normalRestMinute);
            hce = 100 * stdMultiplyOutput * 60 / ((standardMinutes - normalRestMinute) * normalWorkerNum +
                    (overMinutes - overRestMinutes) * overtimeWorkerNum);
        } else {
            hce = 100 * stdMultiplyOutput * 60 * 60 / ((totalSeconds - restSeconds) * normalWorkerNum);
        }
        unitStatus.setHce(hce);

        // get the hourly output
        Map<String, Integer> map = getHourlyOutput(products, startDate);
        unitStatus.setHourly_output(map);

        // get the current target based on current time
        int curTarget = (int) (target * (totalSeconds - restSeconds) /
                ((endDate.getTime() - startDate.getTime()) / 1000 - restSeconds));
        // get status
        unitStatus.setStatus(OutputTool.getStatus(curTarget, curNum));

        // get the hourly target output
        Map<String, Integer> targetMap = getHourlyTargetValue(standardBeats, shiftType, workShift);
        unitStatus.setHourly_target(targetMap);

        // get the loss time
        unitStatus.setLoss_time(getLossTime(cellId, startDate, curDate));
        Gson gson = new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
        return gson.toJson(unitStatus);
    }

    /**
     * Calculate the loss time based on start time and end time
     *
     * @param cellId
     * @param startTime
     * @param endTime
     * @return
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
     * Calculate the hourly target based on shift and standard beat
     *
     * @param standardBeats
     * @param shiftType
     * @param workShift
     * @return
     * @throws ParseException
     */
    public Map<String, Integer> getHourlyTargetValue(int standardBeats, ShiftType shiftType, WorkShift workShift)
            throws ParseException {
        SimpleDateFormat sdf = new SimpleDateFormat("HH:mm");
        Date startTime = sdf.parse(workShift.getStartTime());
        Date endTime = sdf.parse(workShift.getEndTime());

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

    /**
     * Get the rest seconds based on period
     *
     * @param workShiftId
     * @param shiftType
     * @param startTime
     * @param endTime
     * @return
     * @throws ParseException
     */
    public long getHourlyRestSeconds(int workShiftId, ShiftType shiftType, Date startTime, Date endTime)
            throws ParseException {
        List<RestEvent> restEvents = restEventRepo.getByWorkShiftId(workShiftId);
        if (restEvents.isEmpty()) {
            return 0;
        } else {
            long restSeconds = 0;
            for (RestEvent re : restEvents) {
                // if the rest time is in the shift
                if (shiftType.toString().equals(re.getShiftType())) {
                    SimpleDateFormat sdf = new SimpleDateFormat("HH:mm");
                    Date eventStartTime = sdf.parse(re.getStartTime());
                    Date eventEndTime = sdf.parse(re.getEndTime());
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

    /**
     * Get the hourly output
     *
     * @param products
     * @param startDate
     * @return
     */
    public Map<String, Integer> getHourlyOutput(List<ProductInfo> products, Date startDate) {
        SimpleDateFormat sdf = new SimpleDateFormat("HH:mm");
        Map<String, Integer> map = new TreeMap<>();

        Calendar calendar = Calendar.getInstance();
        calendar.setTime(startDate);
        calendar.add(Calendar.HOUR_OF_DAY, 1);
        Date endDate = calendar.getTime();
        int count = 0;
        for (ProductInfo product : products) {
            if (product.getTime().getTime() >= startDate.getTime() && product.getTime().getTime() <= endDate.getTime()) {
                count++;
            } else {
                map.put(sdf.format(startDate), count);
                calendar.add(Calendar.HOUR_OF_DAY, 1);
                startDate = endDate;
                endDate = calendar.getTime();
                count = 1;
            }
        }
        map.put(sdf.format(startDate), count);
        return map;
    }

    /**
     * Get total rest seconds till current time
     *
     * @param workShiftId
     * @param curShiftType
     * @return
     * @throws ParseException
     */
    public long getRestSeconds(int workShiftId, ShiftType curShiftType, Date curTime) throws ParseException {
        List<RestEvent> restEvents = restEventRepo.getByWorkShiftId(workShiftId);
        if (restEvents.isEmpty()) {
            return 0;
        } else {
            long restSeconds = 0;
            for (RestEvent re : restEvents) {
                // if the rest time is in the shift
                if (curShiftType.toString().equals(re.getShiftType())) {
                    SimpleDateFormat sdf = DateFormat.hourFormat();
                    Date startTime = sdf.parse(re.getStartTime());
                    Date endTime = sdf.parse(re.getEndTime());
                    // if current time is in the rest time
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
