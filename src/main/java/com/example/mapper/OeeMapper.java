package com.example.mapper;

import com.example.model.Oee;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

/**
 * Created by mrpan on 2017/3/29.
 */
public class OeeMapper implements RowMapper<Oee> {
    @Override
    public Oee mapRow(ResultSet resultSet, int i) throws SQLException {
        Oee oee = new Oee();
        oee.setId(resultSet.getInt("id"));
        oee.setOee(resultSet.getInt("oee"));
        oee.setCellName(resultSet.getString("cell_name"));
        oee.setAddDate(resultSet.getDate("add_date"));
        return oee;
    }
}
