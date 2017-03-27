package com.example.mapper;

import com.example.model.LossTime;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

/**
 * Created by mrpan on 2017/3/25.
 */
public class LossTimeMapper implements RowMapper<LossTime> {
    @Override
    public LossTime mapRow(ResultSet resultSet, int i) throws SQLException {
        LossTime lossTime = new LossTime();
        lossTime.setStartTime(resultSet.getTimestamp("TIME1"));
        lossTime.setEndTime(resultSet.getTimestamp("TIME3"));
        return lossTime;
    }
}
