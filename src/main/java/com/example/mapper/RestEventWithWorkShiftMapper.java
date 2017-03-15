package com.example.mapper;

import com.example.model.RestEventWithWorkShift;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

/**
 * Created by mrpan on 2017/3/14.
 */
public class RestEventWithWorkShiftMapper implements RowMapper<RestEventWithWorkShift> {

    @Override
    public RestEventWithWorkShift mapRow(ResultSet resultSet, int i) throws SQLException {
        RestEventWithWorkShift restEventWithWorkShift = new RestEventWithWorkShift();
        restEventWithWorkShift.setId(resultSet.getInt("id"));
        restEventWithWorkShift.setRest_event_id(resultSet.getInt("rest_event_id"));
        restEventWithWorkShift.setWork_shift_id(resultSet.getInt("work_shift_id"));
        return restEventWithWorkShift;
    }
}
