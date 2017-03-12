package com.example.repository;

import com.example.model.WorkShift;
import com.google.gson.JsonObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * Created by mrpan on 2017/3/9.
 */
@Repository
public class WorkShiftRepo {
    private JdbcTemplate jdbc;

    @Autowired
    public WorkShiftRepo(JdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }

    /**
     * 添加班次
     *
     * @param workShift
     * @return
     */
    public JsonObject addOneShift(WorkShift workShift) throws ParseException {
        JsonObject object = new JsonObject();
        // 早中晚班的
        if (workShift.getMorning_shift_start() != null && workShift.getMorning_shift_start().length() > 0
                && workShift.getMorning_shift_end() != null && workShift.getMorning_shift_end().length() > 0
                && workShift.getTarget_value() > 0 && workShift.getStandard_beats() > 0) {
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            String sql = "INSERT INTO work_shift (morning_shift_start, morning_shift_end, target_value, standard_beats,setting_time) VALUES(?, ?, ?, ?, ?)";
            jdbc.update(sql, workShift.getMorning_shift_start(), workShift.getMorning_shift_end(),
                    workShift.getTarget_value(), workShift.getStandard_beats(), sdf.format(new Date()));
            object.addProperty("status", true);
            object.addProperty("log", "add " + workShift.toString() + " ok");
        } else {
            object.addProperty("status", false);
            object.addProperty("log", "所需输入的参数有误，请检查后重新输入");
        }
        return object;
    }

    /**
     * 添加早晚班次
     *
     * @param workShift
     * @return
     */
    public JsonObject addTwoShift(WorkShift workShift) throws ParseException {
        JsonObject object = new JsonObject();
        if (workShift.getMorning_shift_start() != null && workShift.getMorning_shift_start().length() > 0
                && workShift.getMorning_shift_end() != null && workShift.getMorning_shift_end().length() > 0
                && workShift.getNight_shift_start() != null && workShift.getNight_shift_start().length() > 0
                && workShift.getNight_shift_end() != null && workShift.getNight_shift_end().length() > 0) {
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            String sql = "INSERT INTO work_shift (morning_shift_start, morning_shift_end, " +
                    "night_shift_start, night_shift_end, target_value, standard_beats, setting_time) VALUES(?, ?, ?, ?, ?, ?, ?)";
            jdbc.update(sql, workShift.getMorning_shift_start(), workShift.getMorning_shift_end(),
                    workShift.getNight_shift_start(), workShift.getNight_shift_end(),
                    workShift.getTarget_value(), workShift.getStandard_beats(), sdf.format(new Date()));
            object.addProperty("status", true);
            object.addProperty("log", "add " + workShift.toString() + " ok");
        } else {
            object.addProperty("status", false);
            object.addProperty("log", "所需输入的参数有误，请检查后重新输入");
        }
        return object;
    }

    /**
     * 增加早中晚三个班次
     *
     * @param workShift
     * @return
     */
    public JsonObject addThreeShift(WorkShift workShift) {
        JsonObject object = new JsonObject();
        if (workShift.getMorning_shift_start() != null && workShift.getMorning_shift_start().length() > 0
                && workShift.getMorning_shift_end() != null && workShift.getMorning_shift_end().length() > 0
                && workShift.getMiddle_shift_start() != null && workShift.getMiddle_shift_end().length() > 0
                && workShift.getMiddle_shift_end() != null && workShift.getMiddle_shift_end().length() > 0
                && workShift.getNight_shift_start() != null && workShift.getNight_shift_start().length() > 0
                && workShift.getNight_shift_end() != null && workShift.getNight_shift_end().length() > 0) {
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            String sql = "INSERT INTO work_shift (morning_shift_start, morning_shift_end, middle_shift_start, middle_shift_end, " +
                    "night_shift_start, night_shift_end, target_value, standard_beats, setting_time) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)";
            jdbc.update(sql, workShift.getMorning_shift_start(), workShift.getMorning_shift_end(),
                    workShift.getMiddle_shift_start(), workShift.getMiddle_shift_end(),
                    workShift.getNight_shift_start(), workShift.getNight_shift_end(),
                    workShift.getTarget_value(), workShift.getStandard_beats(), sdf.format(new Date()));
            object.addProperty("status", true);
            object.addProperty("log", "add " + workShift.toString() + " ok");
        } else {
            object.addProperty("status", false);
            object.addProperty("log", "所需输入的参数为空，请检查后重新输入");
        }
        return object;
    }
}
