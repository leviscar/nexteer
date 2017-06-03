package com.example.mapper;

import com.example.model.PollingPage;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;


/**
 * User: cheng
 * Date: 17-6-3
 * Description:
 */
public class PollingPageMapper implements RowMapper<PollingPage> {
    @Override
    public PollingPage mapRow(ResultSet resultSet, int i) throws SQLException {
        PollingPage pg = new PollingPage();
        pg.setCellName(resultSet.getString("cell_name"));
        pg.setIsPolling(resultSet.getBoolean("is_polling"));
        pg.setInterval(resultSet.getInt("interval"));
        return pg;
    }
}
