package com.example.repository;

import com.example.mapper.WorkShiftMapper;
import com.example.model.WorkShift;
import com.google.gson.JsonObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

/**
 * Created by mrpan on 2017/3/9.
 */
@Repository
public class WorkShiftRepo {
    private JdbcTemplate jdbc;

    @Autowired
    public WorkShiftRepo(@Qualifier("oneJdbcTemplate") JdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }

    /**
     * add morning shift
     *
     * @param workShift
     * @return
     */
    public JsonObject addMorningShift(WorkShift workShift) throws ParseException {
        JsonObject object = new JsonObject();
        // 早中晚班的
        if (workShift.getMorning_shift_start() != null && workShift.getMorning_shift_end() != null
                && workShift.getMorning_shift_standard_beats() > 0 && workShift.getSetting_time() != null
                && workShift.getMorning_worker_num() > 0 && workShift.getMorning_overtime_worker_num() >= 0) {
            String sql = "IF NOT exists(SELECT * FROM work_shift WHERE setting_time = ? AND cell_name = ?)" +
                    "INSERT INTO work_shift (morning_shift_start, morning_shift_end, morning_shift_standard_beats, setting_time, " +
                    "morning_worker_num, morning_overtime_worker_num, morning_shift_target, cell_name) VALUES(?, ?, ?, ?, ?, ?, ?, ?)" +
                    "ELSE UPDATE work_shift SET morning_shift_start = ?, morning_shift_end = ?, morning_shift_standard_beats = ?, " +
                    "morning_worker_num=? , morning_overtime_worker_num = ?, morning_shift_target = ? WHERE setting_time = ? AND cell_name = ?";
            jdbc.update(sql, workShift.getSetting_time(), workShift.getCell_name(), workShift.getMorning_shift_start(), workShift.getMorning_shift_end(),
                    workShift.getMorning_shift_standard_beats(), workShift.getSetting_time(), workShift.getMorning_worker_num(),
                    workShift.getMorning_overtime_worker_num(), workShift.getMorning_shift_target(), workShift.getCell_name(), workShift.getMorning_shift_start(), workShift.getMorning_shift_end(),
                    workShift.getMorning_shift_standard_beats(), workShift.getMorning_worker_num(), workShift.getMorning_overtime_worker_num(), workShift.getMorning_shift_target(),
                    workShift.getSetting_time(), workShift.getCell_name());
            object.addProperty("system_status", true);
            object.addProperty("log", "add ok");
        } else {
            object.addProperty("system_status", false);
            object.addProperty("log", "所需输入的参数有误，请检查后重新输入");
        }
        return object;
    }

    /**
     * add middle shift
     *
     * @param workShift
     * @return
     */
    public JsonObject addMiddleShift(WorkShift workShift) throws ParseException {
        JsonObject object = new JsonObject();
        if (workShift.getMiddle_shift_start() != null && workShift.getMiddle_shift_end() != null
                && workShift.getMiddle_shift_standard_beats() > 0 && workShift.getSetting_time() != null
                && workShift.getMiddle_worker_num() > 0 && workShift.getMiddle_overtime_worker_num() >= 0) {
            String sql = "IF NOT exists(SELECT * FROM work_shift WHERE setting_time = ? AND cell_name = ?)" +
                    "INSERT INTO work_shift (middle_shift_start, middle_shift_end, middle_shift_standard_beats, setting_time, " +
                    "middle_worker_num, middle_overtime_worker_num, middle_shift_target, cell_name) VALUES(?, ?, ?, ?, ?, ?, ?, ?)" +
                    "ELSE UPDATE work_shift SET middle_shift_start = ?, middle_shift_end = ?, middle_shift_standard_beats = ?, " +
                    "middle_worker_num=? , middle_overtime_worker_num = ?, middle_shift_target = ? WHERE setting_time = ? AND cell_name = ?";
            jdbc.update(sql, workShift.getSetting_time(), workShift.getCell_name(), workShift.getMiddle_shift_start(), workShift.getMiddle_shift_end(),
                    workShift.getMiddle_shift_standard_beats(), workShift.getSetting_time(), workShift.getMiddle_worker_num(),
                    workShift.getMiddle_overtime_worker_num(), workShift.getMiddle_shift_target(), workShift.getCell_name(), workShift.getMiddle_shift_start(), workShift.getMiddle_shift_end(),
                    workShift.getMiddle_shift_standard_beats(), workShift.getMiddle_worker_num(), workShift.getMiddle_overtime_worker_num(), workShift.getMiddle_shift_target(),
                    workShift.getSetting_time(), workShift.getCell_name());
            object.addProperty("system_status", true);
            object.addProperty("log", "add ok");
        } else {
            object.addProperty("system_status", false);
            object.addProperty("log", "所需输入的参数有误，请检查后重新输入");
        }
        return object;
    }


    /**
     * add night shift
     *
     * @param workShift
     * @return
     */
    public JsonObject addNightShift(WorkShift workShift) {
        JsonObject object = new JsonObject();
        // 早中晚班的
        if (workShift.getNight_shift_start() != null && workShift.getNight_shift_end() != null
                && workShift.getNight_shift_standard_beats() > 0 && workShift.getSetting_time() != null
                && workShift.getNight_worker_num() > 0 && workShift.getNight_overtime_worker_num() >= 0) {
            String sql = "IF NOT exists(SELECT * FROM work_shift WHERE setting_time = ? AND cell_name = ?)" +
                    "INSERT INTO work_shift (night_shift_start, night_shift_end, night_shift_standard_beats, setting_time, " +
                    "night_worker_num, night_overtime_worker_num, night_shift_target, cell_name) VALUES(?, ?, ?, ?, ?, ?, ?, ?)" +
                    "ELSE UPDATE work_shift SET night_shift_start = ?, night_shift_end = ?, night_shift_standard_beats = ?, " +
                    "night_worker_num = ? , night_overtime_worker_num = ?, night_shift_target = ? WHERE setting_time = ? AND cell_name = ?";
            jdbc.update(sql, workShift.getSetting_time(), workShift.getCell_name(), workShift.getNight_shift_start(), workShift.getNight_shift_end(),
                    workShift.getNight_shift_standard_beats(), workShift.getSetting_time(), workShift.getNight_worker_num(),
                    workShift.getNight_overtime_worker_num(), workShift.getNight_shift_target(), workShift.getCell_name(), workShift.getNight_shift_start(), workShift.getNight_shift_end(),
                    workShift.getNight_shift_standard_beats(), workShift.getNight_worker_num(), workShift.getNight_overtime_worker_num(), workShift.getNight_shift_target(),
                    workShift.getSetting_time(), workShift.getCell_name());
            object.addProperty("system_status", true);
            object.addProperty("log", "add ok");
        } else {
            object.addProperty("system_status", false);
            object.addProperty("log", "所需输入的参数有误，请检查后重新输入");
        }
        return object;
    }

    /**
     * get latest work shift based on cell name
     *
     * @param cellName
     * @return
     */
    public List<WorkShift> getLatestWorkShift(String cellName) {
        String sql = "SELECT TOP 1 * FROM work_shift WHERE cell_name = ? ORDER BY setting_time DESC";
        return jdbc.query(sql, new Object[]{cellName}, new WorkShiftMapper());
    }

    /**
     * get work shift base on cell name which is nearest close to current time
     *
     * @param cellName
     * @param curTime
     * @return
     */
    public List<WorkShift> getLatestWorkShiftByCurTime(String cellName, java.sql.Date curTime) {
        return jdbc.query("SELECT TOP 1 * FROM work_shift WHERE cell_name = ? AND setting_time <= ? ORDER BY setting_time DESC"
                , new Object[]{cellName, curTime}, new WorkShiftMapper());
    }
}
