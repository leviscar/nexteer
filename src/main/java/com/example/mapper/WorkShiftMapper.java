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
        workShift.setAddDate(resultSet.getDate("add_date"));
        workShift.setShiftType(resultSet.getString("shift_type"));
        workShift.setCellName(resultSet.getString("cell_name"));
        workShift.setStartTime(resultSet.getString("start_time"));
        workShift.setEndTime(resultSet.getString("end_time"));
        workShift.setTarget(resultSet.getInt("target"));
        workShift.setStandardBeat(resultSet.getInt("standard_beat"));
        workShift.setNormalWorkerNum(resultSet.getInt("normal_worker_num"));
        workShift.setOvertimeWorkerNum(resultSet.getInt("overtime_worker_num"));
        workShift.setOpen(resultSet.getBoolean("is_open"));
        return workShift;
    }
}
