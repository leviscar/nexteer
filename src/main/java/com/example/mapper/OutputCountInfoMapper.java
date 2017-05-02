package com.example.mapper;

import com.example.model.OutputCountInfo;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

/**
 * Created by mrpan on 2017/3/18.
 */
public class OutputCountInfoMapper implements RowMapper<OutputCountInfo> {

    @Override
    public OutputCountInfo mapRow(ResultSet resultSet, int i) throws SQLException {
        OutputCountInfo outputInfo = new OutputCountInfo();
        outputInfo.setId(resultSet.getInt("id"));
        outputInfo.setCellName(resultSet.getString("cell_name"));
        outputInfo.setCount(resultSet.getInt("count"));
        outputInfo.setModelId(resultSet.getString("model_id"));
        outputInfo.setAddDate(resultSet.getString("add_date"));
        outputInfo.setModelName(resultSet.getString("model_name"));
        return outputInfo;
    }
}
