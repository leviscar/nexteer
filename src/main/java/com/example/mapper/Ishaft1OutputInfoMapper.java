package com.example.mapper;

import com.example.model.Ishaft1OutputInfo;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

/**
 * Created by mrpan on 2017/3/18.
 */
public class Ishaft1OutputInfoMapper implements RowMapper {

    @Override
    public Object mapRow(ResultSet resultSet, int i) throws SQLException {
        Ishaft1OutputInfo outputInfo = new Ishaft1OutputInfo();
        outputInfo.setId(resultSet.getInt("id"));
        outputInfo.setAdd_date(resultSet.getString("add_date"));
        outputInfo.setOutput_count(resultSet.getInt("output_count"));
        outputInfo.setModel(resultSet.getString("model"));
        return null;
    }
}
