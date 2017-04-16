package com.example.task;

import com.example.enumtype.Cell;
import com.example.enumtype.ShiftType;
import com.example.model.*;
import com.example.repository.*;
import com.example.util.Function;
import com.example.util.ModelOutput;
import com.example.util.OutputTool;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * Created by mrpan on 2017/3/18.
 * Define some dynamic tasks whose execution time can be dynamically changed
 */
@Component
public class DynamicScheduledTask {
    private Ishaft1ProductRepo ishaft1ProductRepo;
    private ProductModelRepo productModelRepo;
    private WorkShiftRepo workShiftRepo;
    private RestEventRepo restEventRepo;
    private RestEventWithWorkShiftRepo restEventWithWorkShiftRepo;
    private OeeRepo oeeRepo;
    private HceRepo hceRepo;
    private Ishaft1OutputInfoRepo ishaft1OutputInfoRepo;
    private Logger logger = LoggerFactory.getLogger(getClass());

    @Autowired
    public DynamicScheduledTask(Ishaft1ProductRepo ishaft1ProductRepo, ProductModelRepo productModelRepo
            , WorkShiftRepo workShiftRepo, RestEventRepo restEventRepo, RestEventWithWorkShiftRepo restEventWithWorkShiftRepo
            , OeeRepo oeeRepo, HceRepo hceRepo, Ishaft1OutputInfoRepo ishaft1OutputInfoRepo) {
        this.ishaft1ProductRepo = ishaft1ProductRepo;
        this.productModelRepo = productModelRepo;
        this.workShiftRepo = workShiftRepo;
        this.restEventRepo = restEventRepo;
        this.restEventWithWorkShiftRepo = restEventWithWorkShiftRepo;
        this.oeeRepo = oeeRepo;
        this.hceRepo = hceRepo;
        this.ishaft1OutputInfoRepo = ishaft1OutputInfoRepo;
    }

    /**
     * Insert the ishaft1 output information into database
     */
    public void insertIshaft1OutputIntoDatabase() throws ParseException {
        Ishaft1OutputInfo ishaft1OutputInfo = new Ishaft1OutputInfo();
        // get the last date
        Date curDate = new Date();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
//        // test
//        SimpleDateFormat sdf2 = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
//        curDate = sdf2.parse("2017-04-07 07:50:00");
//        //end
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(curDate);
        calendar.add(Calendar.DAY_OF_MONTH, -1);
        Date addDate = calendar.getTime();
        // set the add date which is format
        String addFormatDate = sdf.format(addDate);
        ishaft1OutputInfo.setAdd_date(addFormatDate);
        // get the products between current time and start time
        List<Ishaft1Product> products = ishaft1ProductRepo.getByPeriod(addDate, curDate);
        // get various model output
        Map<String, Integer> map = ModelOutput.getEachModelOutput(products);
        // insert into database based on different model
        for (Map.Entry<String, Integer> entry : map.entrySet()) {
            ProductModel model = productModelRepo.getStdByModelId(entry.getKey());
            ishaft1OutputInfo.setModel_name(model.getModelName());
            ishaft1OutputInfo.setModel(entry.getKey());
            ishaft1OutputInfo.setOutput_count(entry.getValue());
            ishaft1OutputInfoRepo.add(ishaft1OutputInfo);
            logger.info("Add ishaft1OutputInfo:{} into database", ishaft1OutputInfo);
        }
    }

    /**
     * Insert ishaft1 oee and hce into database
     *
     * @throws ParseException
     */
    public void insertIshaft1OeeAndHceIntoDatabase() throws ParseException {
        Oee oee = new Oee();
        Hce hce = new Hce();
        Date date = new Date();
//        // test
//        SimpleDateFormat sdf2 = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
//        date = sdf2.parse("2017-04-07 15:50:00");
//        //end
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        calendar.add(Calendar.DAY_OF_MONTH, -1);
        java.sql.Date addDate = new java.sql.Date(calendar.getTime().getTime());
        oee.setAddDate(addDate);
        hce.setAddDate(addDate);

        // get the latest shift information
        WorkShift workShift = workShiftRepo.getLatestWorkShiftByCurTime(Cell.ISHAFT1.toString(), addDate).get(0);

        Map<Long, Integer> allShiftRes = getAllShiftsBeatsMultiOutput(workShift, calendar.getTime());
        long sumSeconds = 0;
        long sumMulti = 0;
        for (Map.Entry<Long, Integer> entry : allShiftRes.entrySet()) {
            sumSeconds += entry.getKey();
            sumMulti += entry.getValue();
        }
        oee.setOee((int) (sumMulti * 100 / sumSeconds));
        oee.setCellName(Cell.ISHAFT1.toString());
        oeeRepo.addActualOee(oee);
        logger.info("Add Oee:{} into database", oee);

        hce.setHce(calcHce(workShift, addDate));
        hce.setCellName(Cell.ISHAFT1.toString());
        hceRepo.addActualHce(hce);
        logger.info("Add Hce:{} into database", hce);
    }

    /**
     * Calculate hce during the whole shift
     *
     * @param workShift
     * @return
     * @throws ParseException
     */
    public int calcHce(WorkShift workShift, Date addDate) throws ParseException {
        // get result of std multiply product output
        float totalStdMultiplyOutput = 0;
        // get result of total times multiply worker numbers
        float totalTimeMultiWorkerNum = 0;
        if (workShift.getMorning_shift_start() != null
                && workShift.getMorning_shift_end() != null) {
            List<Date> dateList = OutputTool.changeShiftDate(addDate, workShift, ShiftType.Ashift);
            Date startDate = dateList.get(0);
            Date endDate = dateList.get(1);
            Map<Date, Boolean> addDateRes = Function.addOneDay(startDate, endDate);
            endDate = (Date) addDateRes.keySet().toArray()[0];
            // get A shift product output
            List<Ishaft1Product> products = ishaft1ProductRepo.getByPeriod(startDate, endDate);
            // get various model product output multiply its std
            float stdMultiplyOutput = 0;
            Map<String, Integer> modelOutputMap = ModelOutput.getEachModelOutput(products);
            for (Map.Entry<String, Integer> entry : modelOutputMap.entrySet()) {
                String modelId = entry.getKey();
                ProductModel model = productModelRepo.getStdByModelId(modelId);
                stdMultiplyOutput += model.getStd() * entry.getValue();
            }
            totalStdMultiplyOutput += stdMultiplyOutput;

            // get overtime
            int standardMinutes = 8 * 60;
            SimpleDateFormat sdf = new SimpleDateFormat("HH:mm");
            long restSeconds = getRestSeconds(workShift.getId(), ShiftType.Ashift, sdf.parse(sdf.format(endDate)));
            long totalSeconds = (endDate.getTime() - startDate.getTime()) / 1000;
            if (totalSeconds / 60 > standardMinutes) {
                // overtime minutes
                int overMinutes = (int) (totalSeconds / 60 - standardMinutes);
                // overtime begin time
                Calendar calendar = Calendar.getInstance();
                calendar.setTime(startDate);
                calendar.add(Calendar.MINUTE, standardMinutes);
                Date overTimeStart = calendar.getTime();
                // rest time during normal work
                int normalRestMinute = (int) (getHourlyRestSeconds(workShift.getId(), ShiftType.Ashift, startDate, overTimeStart) / 60);
                // rest time during overtime
                int overRestMinutes = (int) (restSeconds / 60 - normalRestMinute);
                totalTimeMultiWorkerNum += (standardMinutes - normalRestMinute) * workShift.getMorning_worker_num()
                        + (overMinutes - overRestMinutes) * workShift.getMorning_overtime_worker_num();
            } else {
                totalTimeMultiWorkerNum += (totalSeconds - restSeconds) * workShift.getMorning_worker_num() / 60;
            }
        }
        if (workShift.getMiddle_shift_start() != null
                && workShift.getMiddle_shift_end() != null) {
            List<Date> dateList = OutputTool.changeShiftDate(addDate, workShift, ShiftType.Bshift);
            Date startDate = dateList.get(0);
            Date endDate = dateList.get(1);
            Map<Date, Boolean> addDateRes = Function.addOneDay(startDate, endDate);
            endDate = (Date) addDateRes.keySet().toArray()[0];
            // get B shift product output
            List<Ishaft1Product> products = ishaft1ProductRepo.getByPeriod(startDate, endDate);
            // get various model product output multiply its std
            float stdMultiplyOutput = 0;
            Map<String, Integer> modelOutputMap = ModelOutput.getEachModelOutput(products);
            for (Map.Entry<String, Integer> entry : modelOutputMap.entrySet()) {
                String modelId = entry.getKey();
                ProductModel model = productModelRepo.getStdByModelId(modelId);
                stdMultiplyOutput += model.getStd() * entry.getValue();
            }
            totalStdMultiplyOutput += stdMultiplyOutput;

            // get overtime
            int standardMinutes = 8 * 60;
            SimpleDateFormat sdf = new SimpleDateFormat("HH:mm");
            long restSeconds = getRestSeconds(workShift.getId(), ShiftType.Bshift, sdf.parse(sdf.format(endDate)));
            long totalSeconds = (endDate.getTime() - startDate.getTime()) / 1000;
            if (totalSeconds / 60 > standardMinutes) {
                // overtime minutes
                int overMinutes = (int) (totalSeconds / 60 - standardMinutes);
                // overtime begin time
                Calendar calendar = Calendar.getInstance();
                calendar.setTime(startDate);
                calendar.add(Calendar.MINUTE, standardMinutes);
                Date overTimeStart = calendar.getTime();
                // rest time during normal work
                int normalRestMinute = (int) (getHourlyRestSeconds(workShift.getId(), ShiftType.Bshift, startDate, overTimeStart) / 60);
                // rest time during overtime
                int overRestMinutes = (int) (restSeconds / 60 - normalRestMinute);
                totalTimeMultiWorkerNum += (standardMinutes - normalRestMinute) * workShift.getMorning_worker_num()
                        + (overMinutes - overRestMinutes) * workShift.getMorning_overtime_worker_num();
            } else {
                totalTimeMultiWorkerNum += (totalSeconds - restSeconds) * workShift.getMorning_worker_num() / 60;
            }
        }
        if (workShift.getNight_shift_end() != null
                && workShift.getNight_shift_end() != null) {
            List<Date> dateList = OutputTool.changeShiftDate(addDate, workShift, ShiftType.Cshift);
            Date startDate = dateList.get(0);
            Date endDate = dateList.get(1);
            Map<Date, Boolean> addDateRes = Function.addOneDay(startDate, endDate);
            endDate = (Date) addDateRes.keySet().toArray()[0];
            // get C shift product output
            List<Ishaft1Product> products = ishaft1ProductRepo.getByPeriod(startDate, endDate);
            // get various model product output multiply its std
            float stdMultiplyOutput = 0;
            Map<String, Integer> modelOutputMap = ModelOutput.getEachModelOutput(products);
            for (Map.Entry<String, Integer> entry : modelOutputMap.entrySet()) {
                String modelId = entry.getKey();
                ProductModel model = productModelRepo.getStdByModelId(modelId);
                stdMultiplyOutput += model.getStd() * entry.getValue();
            }
            totalStdMultiplyOutput += stdMultiplyOutput;

            // get overtime
            int standardMinutes = 8 * 60;
            SimpleDateFormat sdf = new SimpleDateFormat("HH:mm");
            long restSeconds = getRestSeconds(workShift.getId(), ShiftType.Cshift, sdf.parse(sdf.format(endDate)));
            long totalSeconds = (endDate.getTime() - startDate.getTime()) / 1000;
            if (totalSeconds / 60 > standardMinutes) {
                // overtime minutes
                int overMinutes = (int) (totalSeconds / 60 - standardMinutes);
                // overtime begin time
                Calendar calendar = Calendar.getInstance();
                calendar.setTime(startDate);
                calendar.add(Calendar.MINUTE, standardMinutes);
                Date overTimeStart = calendar.getTime();
                // rest time during normal work
                int normalRestMinute = (int) (getHourlyRestSeconds(workShift.getId(), ShiftType.Cshift, startDate, overTimeStart) / 60);
                // rest time during overtime
                int overRestMinutes = (int) (restSeconds / 60 - normalRestMinute);
                totalTimeMultiWorkerNum += (standardMinutes - normalRestMinute) * workShift.getMorning_worker_num()
                        + (overMinutes - overRestMinutes) * workShift.getMorning_overtime_worker_num();
            } else {
                totalTimeMultiWorkerNum += (totalSeconds - restSeconds) * workShift.getMorning_worker_num() / 60;
            }
        }
        return (int) (totalStdMultiplyOutput * 60 * 100 / totalTimeMultiWorkerNum);
    }

    /**
     * Get rest time seconds during specific period
     *
     * @param workShiftId
     * @param shiftType
     * @param startTime
     * @param endTime
     * @return
     * @throws ParseException
     */
    private long getHourlyRestSeconds(int workShiftId, ShiftType shiftType, Date startTime, Date endTime) throws ParseException {
        List<RestEventWithWorkShift> restEventWithWorkShiftList = restEventWithWorkShiftRepo.getByWorkShiftId(workShiftId);
        if (restEventWithWorkShiftList.isEmpty()) {
            return 0;
        } else {
            long restSeconds = 0;
            for (RestEventWithWorkShift restEventWithWorkShift : restEventWithWorkShiftList) {
                RestEvent event = restEventRepo.getById(restEventWithWorkShift.getId());
                // if the rest time is in the shift period
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

    /**
     * get the result of all shifts standard beats multiply product output
     *
     * @param workShift
     * @return
     */
    private Map<Long, Integer> getAllShiftsBeatsMultiOutput(WorkShift workShift, Date addDate) throws ParseException {
        Map<Long, Integer> map = new HashMap<>();
        SimpleDateFormat sdf = new SimpleDateFormat("HH:mm");
        if (workShift.getMorning_shift_start() != null
                && workShift.getMorning_shift_end() != null) {
            List<Date> dateList = OutputTool.changeShiftDate(addDate, workShift, ShiftType.Ashift);
            Date startDate = dateList.get(0);
            Date endDate = dateList.get(1);
            Map<Date, Boolean> addDateRes = Function.addOneDay(startDate, endDate);
            endDate = (Date) addDateRes.keySet().toArray()[0];
            long totalSeconds = (endDate.getTime() - startDate.getTime()) / 1000;
            long restSeconds = getRestSeconds(workShift.getId(), ShiftType.Ashift, sdf.parse(sdf.format(endDate)));
            List<Ishaft1Product> products = ishaft1ProductRepo.getByPeriod(startDate, endDate);
            map.put(totalSeconds - restSeconds, workShift.getMorning_shift_standard_beats() * products.size());
        }
        if (workShift.getMiddle_shift_start() != null
                && workShift.getMiddle_shift_end() != null) {
            List<Date> dateList = OutputTool.changeShiftDate(addDate, workShift, ShiftType.Bshift);
            Date startDate = dateList.get(0);
            Date endDate = dateList.get(1);
            Map<Date, Boolean> addDateRes = Function.addOneDay(startDate, endDate);
            endDate = (Date) addDateRes.keySet().toArray()[0];
            long totalSeconds = (endDate.getTime() - startDate.getTime()) / 1000;
            long restSeconds = getRestSeconds(workShift.getId(), ShiftType.Bshift, sdf.parse(sdf.format(endDate)));
            List<Ishaft1Product> products = ishaft1ProductRepo.getByPeriod(startDate, endDate);
            map.put(totalSeconds - restSeconds, workShift.getMiddle_shift_standard_beats() * products.size());
        }
        if (workShift.getNight_shift_start() != null
                && workShift.getNight_shift_end() != null) {
            List<Date> dateList = OutputTool.changeShiftDate(addDate, workShift, ShiftType.Cshift);
            Date startDate = dateList.get(0);
            Date endDate = dateList.get(1);
            Map<Date, Boolean> addDateRes = Function.addOneDay(startDate, endDate);
            endDate = (Date) addDateRes.keySet().toArray()[0];
            long totalSeconds = (endDate.getTime() - startDate.getTime()) / 1000;
            long restSeconds = getRestSeconds(workShift.getId(), ShiftType.Cshift, sdf.parse(sdf.format(endDate)));
            List<Ishaft1Product> products = ishaft1ProductRepo.getByPeriod(startDate, endDate);
            map.put(totalSeconds - restSeconds, workShift.getNight_shift_standard_beats() * products.size());
        }
        return map;
    }

    /**
     * get the rest seconds
     *
     * @param workShiftId
     * @param curShiftType
     * @param curTime
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
                // if rest time is in the shift period
                if (curShiftType.toString().equals(event.getShift_type())) {
                    SimpleDateFormat sdf = new SimpleDateFormat("HH:mm");
                    Date startTime = sdf.parse(event.getEvent_start_time());
                    Date endTime = sdf.parse(event.getEvent_end_time());
                    // if current time is in the rest period
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
