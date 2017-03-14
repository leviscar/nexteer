package com.example.repository;

import com.example.mapper.WorkShiftMapper;
import com.example.model.Ishaft1UnitStatus;
import com.example.model.WorkShift;
import com.example.util.Function;
import com.example.util.ShiftType;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

/**
 * Created by mrpan on 2017/3/10.
 */
@Repository
public class Ishaft1UnitStatusRepo {
    private JdbcTemplate jdbc;
    private Ishaft1ProductRepo repo;

    @Autowired
    public Ishaft1UnitStatusRepo(JdbcTemplate jdbc, Ishaft1ProductRepo repo) {
        this.jdbc = jdbc;
        this.repo = repo;
    }

    public String getByCurTime(Ishaft1UnitStatus unitStatus) throws ParseException {
        // 获得最新的班次信息
        String sql = "select top 1 * from work_shift order by id DESC";
        List<WorkShift> res = jdbc.query(sql, new WorkShiftMapper());
        WorkShift workShift = res.get(0);
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

        List products = repo.getByPeriod(startDate, curDate);
        // 当前生产量
        int curNum = products.size();
        unitStatus.setCurr_num(curNum);

        // 根据班次信息得到小时目标
        double hours = getHours(workShift, shiftType);
        double hourly_target = workShift.getTarget_value() / hours;
        unitStatus.setHourly_target(hourly_target);

        // 根据当前产量确定当前生产状态
        long minutes = (curDate.getTime() - startDate.getTime()) / (60 * 1000);

        // 当前值大于计划值
        if (curNum >= Function.targetPerMinute(workShift.getTarget_value(), hours * 60, minutes)) {
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

        // TODO: 2017/3/14  计算OEE

        Gson gson = new Gson();
        return gson.toJson(unitStatus);
    }

    /**
     * 根据班次信息，判断所属班次
     *
     * @return
     */
    private ShiftType getShiftType(WorkShift workShift, Date curTime) throws ParseException {
        SimpleDateFormat sdf = new SimpleDateFormat("HH:mm");
        // 判断当前时刻所属班次
        if (workShift.getMorning_shift_start() != null && workShift.getMorning_shift_end() != null
                && curTime.before(sdf.parse(workShift.getMorning_shift_end())) && curTime.after(sdf.parse(workShift.getMorning_shift_start()))) {
            return ShiftType.MORNING_SHIFT;
        } else if (workShift.getNight_shift_start() != null && workShift.getNight_shift_end() != null
                && curTime.before(sdf.parse(workShift.getNight_shift_end())) && curTime.after(sdf.parse(workShift.getNight_shift_start()))) {
            return ShiftType.NIGHT_SHIFT;
        } else if (workShift.getMiddle_shift_end() != null && workShift.getMiddle_shift_end() != null
                && curTime.before(sdf.parse(workShift.getMiddle_shift_end())) && curTime.after(sdf.parse(workShift.getMiddle_shift_start()))) {
            return ShiftType.MIDDLE_SHIFT;
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
        switch (shiftType) {
            case MORNING_SHIFT:
                times = sdf.parse(workShift.getMorning_shift_end()).getTime() - sdf.parse(workShift.getMorning_shift_start()).getTime();
                break;
            case MIDDLE_SHIFT:
                times = sdf.parse(workShift.getMiddle_shift_end()).getTime() - sdf.parse(workShift.getMiddle_shift_start()).getTime();
                break;
            case NIGHT_SHIFT:
                times = sdf.parse(workShift.getNight_shift_end()).getTime() - sdf.parse(workShift.getNight_shift_start()).getTime();
                break;
        }
        return times / (60 * 60 * 1000);
    }
}
