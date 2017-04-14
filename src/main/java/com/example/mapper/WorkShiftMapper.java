package com.example.mapper;

import com.example.model.WorkShift;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

/**
 * Created by mrpan on 2017/3/9.
 */
public class WorkShiftMapper implements RowMapper<WorkShift> {
    @Override
    public WorkShift mapRow(ResultSet resultSet, int i) throws SQLException {
        WorkShift workShift = new WorkShift();
        workShift.setId(resultSet.getInt("id"));
        workShift.setMorning_shift_start(resultSet.getString("morning_shift_start"));
        workShift.setMorning_shift_end(resultSet.getString("morning_shift_end"));
        workShift.setMiddle_shift_start(resultSet.getString("middle_shift_start"));
        workShift.setMiddle_shift_end(resultSet.getString("middle_shift_end"));
        workShift.setNight_shift_start(resultSet.getString("night_shift_start"));
        workShift.setNight_shift_end(resultSet.getString("night_shift_end"));
        workShift.setSetting_time(resultSet.getDate("setting_time"));
        workShift.setMorning_shift_standard_beats(resultSet.getInt("morning_shift_standard_beats"));
        workShift.setMiddle_shift_standard_beats(resultSet.getInt("middle_shift_standard_beats"));
        workShift.setNight_shift_standard_beats(resultSet.getInt("night_shift_standard_beats"));
        workShift.setMorning_worker_num(resultSet.getInt("morning_worker_num"));
        workShift.setMiddle_worker_num(resultSet.getInt("middle_worker_num"));
        workShift.setNight_worker_num(resultSet.getInt("night_worker_num"));
        workShift.setMorning_overtime_worker_num(resultSet.getInt("morning_overtime_worker_num"));
        workShift.setMiddle_overtime_worker_num(resultSet.getInt("middle_overtime_worker_num"));
        workShift.setNight_overtime_worker_num(resultSet.getInt("night_overtime_worker_num"));
        workShift.setCell_name(resultSet.getString("cell_name"));
        return workShift;
    }
}
