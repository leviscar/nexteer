package com.example.repository;

import com.example.model.WorkShift;
import com.google.gson.JsonObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.Time;
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
     * 添加早班一个班次
     *
     * @param workShift
     * @return
     */
    public JsonObject addOneShift(WorkShift workShift) throws ParseException {
        JsonObject object = new JsonObject();
        if (workShift.getMorning_shift() != null && workShift.getSetting_time() != null) {
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            String sql = "INSERT INTO work_shift (morning_shift, setting_time) VALUES(?, ?)";
            jdbc.update(sql, workShift.getMorning_shift(), sdf.format(new Date()));
            object.addProperty("status", true);
            object.addProperty("log", "add " + workShift.toString() + " ok");
        } else {
            object.addProperty("status", false);
            object.addProperty("log", "所需输入的参数为空，请检查后重新输入");
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
        if (workShift.getMorning_shift() != null && workShift.getMiddle_shift() != null
                && workShift.getNight_shift() != null && workShift.getSetting_time() != null) {
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            String sql = "INSERT INTO work_shift (morning_shift, night_shift, setting_time) VALUES(?, ?, ?)";
            jdbc.update(sql, workShift.getMorning_shift(), workShift.getNight_shift(), sdf.format(new Date()));
            object.addProperty("status", true);
            object.addProperty("log", "add " + workShift.toString() + " ok");
        } else {
            object.addProperty("status", false);
            object.addProperty("log", "所需输入的参数为空，请检查后重新输入");
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
        if (workShift.getMorning_shift() != null && workShift.getNight_shift() != null && workShift.getSetting_time() != null) {
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            String sql = "INSERT INTO work_shift (morning_shift, middle_shift, night_shift, setting_time) VALUES(?, ?, ?, ?)";
            jdbc.update(sql, workShift.getMorning_shift(), workShift.getMiddle_shift(), workShift.getNight_shift(), sdf.format(new Date()));
            object.addProperty("status", true);
            object.addProperty("log", "add " + workShift.toString() + " ok");
        } else {
            object.addProperty("status", false);
            object.addProperty("log", "所需输入的参数为空，请检查后重新输入");
        }
        return object;
    }
}
