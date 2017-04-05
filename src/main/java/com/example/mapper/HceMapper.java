package com.example.mapper;

import com.example.model.Hce;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

/**
 * Created by mrpan on 2017/4/4.
 */
public class HceMapper implements RowMapper<Hce> {
    @Override
    public Hce mapRow(ResultSet resultSet, int i) throws SQLException {
        Hce hce = new Hce();
        hce.setId(resultSet.getInt("id"));
        hce.setHce(resultSet.getInt("hce"));
        hce.setAddDate(resultSet.getDate("add_date"));
        hce.setCellName(resultSet.getString("cell_name"));
        return hce;
    }
}
