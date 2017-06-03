package com.example.mapper;

import com.example.model.StdInfo;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;


/**
 * Created by mrpan on 2017/5/25.
 */
public class StdInfoMapper implements RowMapper<StdInfo> {
    @Override
    public StdInfo mapRow(ResultSet resultSet, int i) throws SQLException {
        StdInfo stdInfo = new StdInfo();
        stdInfo.setCellName(resultSet.getString("cell_name"));
        stdInfo.setStandardBeats(resultSet.getInt("standard_beat"));
        stdInfo.setUnitId(resultSet.getInt("unit_id"));
        stdInfo.setUnitNum(resultSet.getInt("unit_num"));
        return stdInfo;
    }
}
