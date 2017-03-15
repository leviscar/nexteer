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
        event.setShift_type(resultSet.getString("shift_type"));
        event.setEvent(resultSet.getString("event"));
        event.setEvent_start_time(resultSet.getString("event_start_time"));
        event.setEvent_end_time(resultSet.getString("event_end_time"));
        return event;
    }
}
