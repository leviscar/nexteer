package com.example.task;

import com.example.enumtype.Cell;
import com.example.enumtype.ShiftType;
import com.example.model.*;
import com.example.repository.*;
import com.example.service.CellService;
import com.example.service.UnitStatusService;
import com.example.util.DateFormat;
import com.example.util.Function;
import com.example.util.ModelOutput;
import com.example.util.OutputTool;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.sql.*;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.Date;

/**
 * Created by mrpan on 2017/3/18.
 * Define some dynamic tasks whose execution time can be dynamically changed
 */
@Component
public class DynamicScheduledTask {
    private ProductModelRepo productModelRepo;
    private WorkShiftRepo workShiftRepo;
    private OeeRepo oeeRepo;
    private HceRepo hceRepo;
    private UnitStatusService unitStatusService;
    private OutputCountInfoRepo outputCountInfoRepo;
    private CellService cellService;
    private Logger logger = LoggerFactory.getLogger(getClass());

    @Autowired
    public DynamicScheduledTask(ProductModelRepo productModelRepo, WorkShiftRepo workShiftRepo, OeeRepo oeeRepo
            , HceRepo hceRepo, UnitStatusService unitStatusService, OutputCountInfoRepo outputCountInfoRepo
            , CellService cellService) {
        this.productModelRepo = productModelRepo;
        this.workShiftRepo = workShiftRepo;
        this.oeeRepo = oeeRepo;
        this.hceRepo = hceRepo;
        this.unitStatusService = unitStatusService;
        this.outputCountInfoRepo = outputCountInfoRepo;
        this.cellService = cellService;
    }

    /**
     * Insert output information into database
     */
    public void insertOutputIntoDatabase(String cellName) throws ParseException {
        OutputCountInfo outputCountInfo = new OutputCountInfo();
        outputCountInfo.setCellName(cellName);
        Cell cell = Cell.valueOf(cellName);
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
        outputCountInfo.setAddDate(addFormatDate);

        // get the products between current time and start time
        List<ProductInfo> products = cellService.getProducts(addDate, curDate, cell);

        // get various model output
        Map<String, Integer> map = ModelOutput.getEachModelOutput(products);
        // insert into database based on different model
        for (Map.Entry<String, Integer> entry : map.entrySet()) {
            ProductModel model = productModelRepo.getStdByModelId(entry.getKey());
            outputCountInfo.setModelName(model.getModelName());
            outputCountInfo.setModelId(entry.getKey());
            outputCountInfo.setCount(entry.getValue());
            outputCountInfoRepo.add(outputCountInfo);
            logger.info("Add ishaft1OutputInfo:{} into database", outputCountInfo);
        }
    }

    /**
     * Insert ishaft1 oee and hce into database
     *
     * @throws ParseException
     */
    public void insertOeeAndHceIntoDatabase(String cellName) throws ParseException {
        Oee oee = new Oee();
        Hce hce = new Hce();
        Date date = new Date();

        Cell cell = Cell.valueOf(cellName);
//        // test
        SimpleDateFormat sdf2 = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        date = sdf2.parse("2017-04-26 07:50:00");
//        //end
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        calendar.add(Calendar.DAY_OF_MONTH, -1);
        java.sql.Date addDate = new java.sql.Date(calendar.getTime().getTime());
        oee.setAddDate(addDate);
        hce.setAddDate(addDate);

        // get the latest A, B, C shifts information
        List<WorkShift> workShifts = new ArrayList<>();
        List<WorkShift> shiftRes = workShiftRepo.getLatestByCurDate(cellName, ShiftType.Ashift.toString(), addDate);
        if (!shiftRes.isEmpty()) {
            workShifts.add(shiftRes.get(0));
        }
        shiftRes = workShiftRepo.getLatestByCurDate(cellName, ShiftType.Bshift.toString(), addDate);
        if (!shiftRes.isEmpty()) {
            workShifts.add(shiftRes.get(0));
        }
        shiftRes = workShiftRepo.getLatestByCurDate(cellName, ShiftType.Cshift.toString(), addDate);
        if (!shiftRes.isEmpty()) {
            workShifts.add(shiftRes.get(0));
        }

        Map<Long, Integer> allShiftRes = getAllShiftsBeatsMultiOutput(workShifts, calendar.getTime(), cell);
        long sumSeconds = 0;
        long sumMulti = 0;
        for (Map.Entry<Long, Integer> entry : allShiftRes.entrySet()) {
            sumSeconds += entry.getKey();
            sumMulti += entry.getValue();
        }
        oee.setOee((int) (sumMulti * 100 / sumSeconds));
        oee.setCellName(cellName);
        oeeRepo.addActualOee(oee);
        logger.info("Add Oee:{} into database", oee);

        hce.setHce(calcHce(workShifts, addDate, cell));
        hce.setCellName(cellName);
        hceRepo.addActualHce(hce);
        logger.info("Add Hce:{} into database", hce);
    }

    /**
     * Calculate hce during the whole shift
     *
     * @param workShifts
     * @param addDate
     * @return
     * @throws ParseException
     */
    public int calcHce(List<WorkShift> workShifts, Date addDate, Cell cell) throws ParseException {
        // get result of std multiply product output
        float totalStdMultiplyOutput = 0;
        // get result of total times multiply worker numbers
        float totalTimeMultiWorkerNum = 0;
        for (WorkShift ws : workShifts) {
            List<Date> dateList = OutputTool.changeShiftDate(addDate, ws);
            Date startDate = dateList.get(0);
            Date endDate = dateList.get(1);
            endDate = Function.addOneDay(startDate, endDate);
            // get shift product output
            List<ProductInfo> products = cellService.getProducts(startDate, endDate, cell);
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
            SimpleDateFormat sdf = DateFormat.hourFormat();
            long restSeconds = unitStatusService.getRestSeconds(ws.getId(), ShiftType.valueOf(ws.getShiftType())
                    , sdf.parse(sdf.format(endDate)));
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
                int normalRestMinute = (int) (unitStatusService.getHourlyRestSeconds(ws.getId()
                        , ShiftType.valueOf(ws.getShiftType()), startDate, overTimeStart) / 60);
                // rest time during overtime
                int overRestMinutes = (int) (restSeconds / 60 - normalRestMinute);
                totalTimeMultiWorkerNum += (standardMinutes - normalRestMinute) * ws.getNormalWorkerNum()
                        + (overMinutes - overRestMinutes) * ws.getOvertimeWorkerNum();
            } else {
                totalTimeMultiWorkerNum += (totalSeconds - restSeconds) * ws.getNormalWorkerNum() / 60;
            }
        }
        return (int) (totalStdMultiplyOutput * 60 * 100 / totalTimeMultiWorkerNum);
    }

    /**
     * Get the result of all shifts standard beats multiply product output
     *
     * @param workShifts
     * @param addDate
     * @return
     */
    private Map<Long, Integer> getAllShiftsBeatsMultiOutput(List<WorkShift> workShifts, Date addDate, Cell cell) throws ParseException {
        Map<Long, Integer> map = new HashMap<>();
        SimpleDateFormat sdf = DateFormat.hourFormat();
        for (WorkShift ws : workShifts) {
            List<Date> dateList = OutputTool.changeShiftDate(addDate, ws);
            Date startDate = dateList.get(0);
            Date endDate = dateList.get(1);
            endDate = Function.addOneDay(startDate, endDate);
            long totalSeconds = (endDate.getTime() - startDate.getTime()) / 1000;
            long restSeconds = unitStatusService.getRestSeconds(ws.getId(), ShiftType.valueOf(ws.getShiftType())
                    , sdf.parse(sdf.format(endDate)));
            // get the products between current time and start time
            List<ProductInfo> products = cellService.getProducts(startDate, endDate, cell);
            map.put(totalSeconds - restSeconds, ws.getStandardBeat() * products.size());
        }
        return map;
    }

}
