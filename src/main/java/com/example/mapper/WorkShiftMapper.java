package com.example.mapper;

import com.example.model.WorkShift;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

/**
 * Created by mrpan on 2017/3/9.
 */
public class WorkShiftMapper implements RowMapper {
    @Override
    public Object mapRow(ResultSet resultSet, int i) throws SQLException {
        WorkShift workShift = new WorkShift();
        workShift.setId(resultSet.getInt("id"));
        workShift.setMorning_shift_start(resultSet.getString("morning_shift_start"));
        workShift.setMorning_shift_end(resultSet.getString("morning_shift_end"));
        workShift.setMiddle_shift_start(resultSet.getString("middle_shift_start"));
        workShift.setMiddle_shift_end(resultSet.getString("middle_shift_end"));
        workShift.setNight_shift_start(resultSet.getString("night_shift_start"));
        workShift.setNight_shift_end(resultSet.getString("night_shift_end"));
        workShift.setSetting_time(resultSet.getTimestamp("setting_time"));
        workShift.setTarget_value(resultSet.getInt("target_value"));
        workShift.setStandard_beats(resultSet.getInt("standard_beats"));
        return workShift;
    }
}
