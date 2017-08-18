package com.example.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

/**
 * Created by pan on 2017/8/18.
 * Description:
 */
@Repository
public class StationRepo {
    private JdbcTemplate jdbc;

    @Autowired
    public StationRepo(@Qualifier("oneJdbcTemplate") JdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }

    public List<String> getByCellName(String cellName) {
        return jdbc.query("select station_id from station where cell_name = ?", new Object[]{cellName}, new RowMapper<String>() {
            @Override
            public String mapRow(ResultSet resultSet, int i) throws SQLException {
                return resultSet.getString("station_id");
            }
        });
    }
}
