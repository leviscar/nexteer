package com.example.util;

import com.example.enumtype.ShiftType;
import com.example.model.*;
import com.example.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * Created by mrpan on 2017/3/18.
 */
@Component
public class ScheduledTask {
    private Ishaft1OutputInfoRepo ishaft1OutputInfoRepo;
    private Ishaft1ProductRepo ishaft1ProductRepo;
    private SafetyDateRepo safetyDateRepo;
    private ProductModelRepo productModelRepo;
    private WorkShiftRepo workShiftRepo;
    private RestEventRepo restEventRepo;
    private RestEventWithWorkShiftRepo restEventWithWorkShiftRepo;
    private OeeRepo oeeRepo;

    @Autowired
    public ScheduledTask(Ishaft1OutputInfoRepo ishaft1OutputInfoRepo, Ishaft1ProductRepo ishaft1ProductRepo, SafetyDateRepo safetyDateRepo, ProductModelRepo productModelRepo, WorkShiftRepo workShiftRepo, RestEventRepo restEventRepo, RestEventWithWorkShiftRepo restEventWithWorkShiftRepo, OeeRepo oeeRepo) {
        this.ishaft1OutputInfoRepo = ishaft1OutputInfoRepo;
        this.ishaft1ProductRepo = ishaft1ProductRepo;
        this.safetyDateRepo = safetyDateRepo;
        this.productModelRepo = productModelRepo;
        this.workShiftRepo = workShiftRepo;
        this.restEventRepo = restEventRepo;
        this.restEventWithWorkShiftRepo = restEventWithWorkShiftRepo;
        this.oeeRepo = oeeRepo;
    }

    /**
     * 定时插入当天产量
     *
     * @throws ParseException
     */
    @Scheduled(cron = "0 0 0 * * ?")
    public void insertIsahft1OutputIntoDatabase() throws ParseException {
        // 设置一天的时间
        Date endDate = new Date();
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(endDate);
        calendar.add(Calendar.DAY_OF_MONTH, -1);
        Date startDate = calendar.getTime();
        // 设置插入的时间
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        Ishaft1OutputInfo ishaft1OutputInfo = new Ishaft1OutputInfo();
        ishaft1OutputInfo.setAdd_date(sdf.format(startDate));
        // 获得一天所有产量信息
        List<Ishaft1Product> products = ishaft1ProductRepo.getByPeriod(startDate, endDate);
        // 获得不同型号的产量
        Map<String, Integer> map = ModelOutput.getEachModelOutput(products);
        // 将不同型号的产量插入表中
        for (Map.Entry<String, Integer> entry : map.entrySet()) {
            ProductModel model = productModelRepo.getStdByModelId(entry.getKey());
            ishaft1OutputInfo.setModel_name(model.getModelName());
            ishaft1OutputInfo.setModel(entry.getKey());
            ishaft1OutputInfo.setOutput_count(entry.getValue());
            ishaft1OutputInfoRepo.add(ishaft1OutputInfo);
        }
    }

    /**
     * 每天零点定时添加安全运行天数
     *
     * @throws ParseException
     */
    @Scheduled(cron = "0 0 0 * * ?")
    public void addSafetyDate() throws ParseException {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(new Date());
        SafetyDate safetyDate = new SafetyDate();
        safetyDate.setYear(String.valueOf(calendar.get(Calendar.YEAR)));
        safetyDate.setMonth(String.valueOf(calendar.get(Calendar.MONTH) + 1));
        safetyDate.setDay(String.valueOf(calendar.get(Calendar.DAY_OF_MONTH)));
        safetyDateRepo.addSafetyDate(safetyDate);
    }

    @Scheduled(cron = "0 0 0 * * ?")
    public void addIshaft1OeeAndHce() throws ParseException {
        Oee oee = new Oee();
        oee.setAddDate(new java.sql.Date(new Date().getTime()));
        // 获得最新的班次信息
        WorkShift workShift = workShiftRepo.getLatestWorkShift().get(0);
        // 获得所有班次的工作时间及分子乘积
        Map<Long, Integer> allShiftRes = getAllShiftsBeatsMultiOutput(workShift);
        long sumSeconds = 0;
        long sumMulti = 0;
        for (Map.Entry<Long, Integer> entry : allShiftRes.entrySet()) {
            sumSeconds += entry.getKey();
            sumMulti += entry.getValue();
        }
        oee.setOee((int) (sumMulti * 100 / sumSeconds));
        oee.setCellName("ISHAFT1");
        oeeRepo.add(oee);
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
     * 获得所有班次标准节拍乘产量的值
     *
     * @param workShift
     * @return
     */
    private Map<Long, Integer> getAllShiftsBeatsMultiOutput(WorkShift workShift) throws ParseException {

        Date curDate = new Date();
//        // test
//        SimpleDateFormat sdf2 = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
//        curDate = sdf2.parse("2016-10-14 23:59:00");
//        // end
        Map<Long, Integer> map = new HashMap<>();
        SimpleDateFormat sdf = new SimpleDateFormat("HH:mm");
        if (workShift.getMorning_shift_start() != null
                && workShift.getMorning_shift_end() != null) {
            List<Date> dateList = OutputTool.changeShiftDate(curDate, workShift, ShiftType.MORNING_SHIFT);
            Date startDate = dateList.get(0);
            Date endDate = dateList.get(1);
            Map<Date, Boolean> addDateRes = Function.addOneDay(startDate, endDate);
            endDate = (Date) addDateRes.keySet().toArray()[0];
            long totalSeconds = (endDate.getTime() - startDate.getTime()) / 1000;
            long restSeconds = getRestSeconds(workShift.getId(), ShiftType.MORNING_SHIFT, sdf.parse(sdf.format(endDate)));
            List<Ishaft1Product> products = ishaft1ProductRepo.getByPeriod(startDate, endDate);
            map.put(totalSeconds - restSeconds, workShift.getMorning_shift_standard_beats() * products.size());
        }
        if (workShift.getMiddle_shift_start() != null
                && workShift.getMiddle_shift_end() != null) {
            List<Date> dateList = OutputTool.changeShiftDate(curDate, workShift, ShiftType.MIDDLE_SHIFT);
            Date startDate = dateList.get(0);
            Date endDate = dateList.get(1);
            Map<Date, Boolean> addDateRes = Function.addOneDay(startDate, endDate);
            endDate = (Date) addDateRes.keySet().toArray()[0];
            long totalSeconds = (endDate.getTime() - startDate.getTime()) / 1000;
            long restSeconds = getRestSeconds(workShift.getId(), ShiftType.MIDDLE_SHIFT, sdf.parse(sdf.format(endDate)));
            List<Ishaft1Product> products = ishaft1ProductRepo.getByPeriod(startDate, endDate);
            map.put(totalSeconds - restSeconds, workShift.getMiddle_shift_standard_beats() * products.size());
        }
        if (workShift.getNight_shift_start() != null
                && workShift.getNight_shift_end() != null) {
            List<Date> dateList = OutputTool.changeShiftDate(curDate, workShift, ShiftType.NIGHT_SHIFT);
            Date startDate = dateList.get(0);
            Date endDate = dateList.get(1);
            Map<Date, Boolean> addDateRes = Function.addOneDay(startDate, endDate);
            endDate = (Date) addDateRes.keySet().toArray()[0];
            long totalSeconds = (endDate.getTime() - startDate.getTime()) / 1000;
            long restSeconds = getRestSeconds(workShift.getId(), ShiftType.NIGHT_SHIFT, sdf.parse(sdf.format(endDate)));
            List<Ishaft1Product> products = ishaft1ProductRepo.getByPeriod(startDate, endDate);
            map.put(totalSeconds - restSeconds, workShift.getNight_shift_standard_beats() * products.size());
        }
        return map;
    }
}
