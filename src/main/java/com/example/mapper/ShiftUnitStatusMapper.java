package com.example.mapper;

import com.example.model.ShiftUnitStatus;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

/**
 * Created by mrpan on 2017/4/16.
 */
public class ShiftUnitStatusMapper implements RowMapper<ShiftUnitStatus> {

    @Override
    public ShiftUnitStatus mapRow(ResultSet resultSet, int i) throws SQLException {
        ShiftUnitStatus shiftUnitStatus = new ShiftUnitStatus();
        shiftUnitStatus.setId(resultSet.getInt("id"));
        shiftUnitStatus.setCellName(resultSet.getString("cell_name"));
        shiftUnitStatus.setUnitStatus(resultSet.getString("unit_status"));
        shiftUnitStatus.setShiftType(resultSet.getString("shift_type"));
        shiftUnitStatus.setAddDate(resultSet.getDate("add_date"));
        return shiftUnitStatus;
    }
}
