package com.example.mapper;

import com.example.model.SafetyDate;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

/**
 * Created by mrpan on 2017/3/3.
 */
public class SafetyDateMapper implements RowMapper<SafetyDate> {
    @Override
    public SafetyDate mapRow(ResultSet resultSet, int i) throws SQLException {
        SafetyDate safetyDate = new SafetyDate();
        safetyDate.setIs_safe(resultSet.getInt("is_safe"));
        safetyDate.setYear(resultSet.getString("year"));
        safetyDate.setMonth(resultSet.getString("month"));
        safetyDate.setDay(resultSet.getString("day"));
        safetyDate.setSafe_dates(resultSet.getInt("safe_dates"));
        safetyDate.setLog(resultSet.getString("log"));
        return safetyDate;
    }
}
