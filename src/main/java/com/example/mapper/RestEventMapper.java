package com.example.mapper;

import com.example.model.RestEvent;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

/**
 * Created by mrpan on 2017/3/14.
 */
public class RestEventMapper implements RowMapper<RestEvent> {

    @Override
    public RestEvent mapRow(ResultSet resultSet, int i) throws SQLException {
        RestEvent event = new RestEvent();
        event.setId(resultSet.getInt("id"));
        event.setShiftType(resultSet.getString("shift_type"));
        event.setCellName(resultSet.getString("cell_name"));
        event.setWorkShiftId(resultSet.getInt("work_shift_id"));
        event.setEvent(resultSet.getString("event"));
        event.setStartTime(resultSet.getString("start_time"));
        event.setEndTime(resultSet.getString("end_time"));
        return event;
    }
}
