package com.example.repository;

import com.example.mapper.WorkShiftMapper;
import com.example.model.Ishaft1Product;
import com.example.model.Ishaft1UnitStatus;
import com.example.model.WorkShift;
import com.example.util.Function;
import com.example.util.ShiftType;
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

    public Ishaft1UnitStatus getByCurTime(Ishaft1UnitStatus unitStatus) throws ParseException {
        // 设置当前年月日
        SimpleDateFormat dateSdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Date curDate = dateSdf.parse(unitStatus.getCurr_time());
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(curDate);
        // 获得最新的班次信息
        String sql = "select top 1 * from work_shift order by id DESC";
        List<WorkShift> res = jdbc.query(sql, new WorkShiftMapper());
        WorkShift workShift = res.get(0);
        unitStatus.setCurr_shift_info(workShift);
        List products = new ArrayList<>();
        double hourly_target = 0;
        double hours = 0;
        long minutes = 0;
        // 班次小时分钟格式化
        SimpleDateFormat sdf = new SimpleDateFormat("HH:mm");
        Date curTime = sdf.parse(unitStatus.getCurr_time().substring(11, 16));
        // 判断当前时刻所属班次
        if (workShift.getMorning_shift_start() != null && workShift.getMorning_shift_end() != null
                && curTime.before(sdf.parse(workShift.getMorning_shift_end())) && curTime.after(sdf.parse(workShift.getMorning_shift_start()))) {
            unitStatus.setShift_type(ShiftType.MORNING_SHIFT);
            // 根据班次信息得到小时目标
            hours = (sdf.parse(workShift.getMorning_shift_end()).getTime() - sdf.parse(workShift.getMorning_shift_start()).getTime()) / (60 * 60 * 1000);
            // 设置起始时刻
            calendar.set(Calendar.HOUR_OF_DAY, Integer.parseInt(workShift.getMorning_shift_start().substring(0, 2)));
            calendar.set(Calendar.MINUTE, Integer.parseInt(workShift.getMorning_shift_start().substring(3, 5)));
            calendar.set(Calendar.SECOND, 0);
            Date startTime = calendar.getTime();
            // 获得到此时刻的分钟数
            minutes = (curDate.getTime() - startTime.getTime()) / (60 * 1000);
            // 获得到当前时刻的产品信息
            products = repo.getByPeriod(startTime, curDate);
        } else if (workShift.getNight_shift_start() != null && workShift.getNight_shift_end() != null
                && curTime.before(sdf.parse(workShift.getNight_shift_end())) && curTime.after(sdf.parse(workShift.getNight_shift_start()))) {
            unitStatus.setShift_type(ShiftType.NIGHT_SHIFT);
            // 根据班次信息得到小时目标
            hours = (sdf.parse(workShift.getNight_shift_end()).getTime() - sdf.parse(workShift.getNight_shift_start()).getTime()) / (60 * 60 * 1000);
            // 设置起始时刻
            calendar.set(Calendar.HOUR_OF_DAY, Integer.parseInt(workShift.getNight_shift_start().substring(0, 2)));
            calendar.set(Calendar.MINUTE, Integer.parseInt(workShift.getNight_shift_start().substring(3, 5)));
            calendar.set(Calendar.SECOND, 0);
            Date startTime = calendar.getTime();
            // 获得到此时刻的分钟数
            minutes = (curDate.getTime() - startTime.getTime()) / (60 * 1000);
            // 获得到当前时刻的产品信息
            products = repo.getByPeriod(startTime, curDate);
        } else if (workShift.getMiddle_shift_end() != null &&  workShift.getMiddle_shift_end() != null
                && curTime.before(sdf.parse(workShift.getMiddle_shift_end())) && curTime.after(sdf.parse(workShift.getMiddle_shift_start()))) {
            unitStatus.setShift_type(ShiftType.MIDDLE_SHIFT);
            hours = (sdf.parse(workShift.getMiddle_shift_end()).getTime() - sdf.parse(workShift.getMiddle_shift_start()).getTime()) / (60 * 60 * 1000);
            // 设置起始时刻
            calendar.set(Calendar.HOUR_OF_DAY, Integer.parseInt(workShift.getMiddle_shift_start().substring(0, 2)));
            calendar.set(Calendar.MINUTE, Integer.parseInt(workShift.getMiddle_shift_start().substring(3, 5)));
            calendar.set(Calendar.SECOND, 0);
            Date startTime = calendar.getTime();
            // 获得到此时刻的分钟数
            minutes = (curDate.getTime() - startTime.getTime()) / (60 * 1000);
            // 获得到当前时刻的产品信息
            products = repo.getByPeriod(startTime, curDate);
        }
        // 当前生产量
        int curNum = products.size();
        unitStatus.setCurr_num(curNum);

        // 根据班次信息得到小时目标
        if (hours > 0) {
            hourly_target = workShift.getTarget_value() / hours;
        }
        // 当前值大于计划值
        if (curNum >= Function.targetPerMinute(workShift.getTarget_value(), hours * 60, minutes)) {
            // 笑脸
            unitStatus.setStatus(1);
        } else {
            // 哭脸
            unitStatus.setStatus(0);
        }
        unitStatus.setHourly_target(hourly_target);
        return unitStatus;
    }
}
