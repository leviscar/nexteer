package com.example.mapper;

import com.example.model.QualityComplain;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

/**
 * Created by mrpan on 2017/4/18.
 */
public class QualityComplainMapper implements RowMapper<QualityComplain> {

    @Override
    public QualityComplain mapRow(ResultSet resultSet, int i) throws SQLException {
        QualityComplain qualityComplain = new QualityComplain();
        qualityComplain.setAddDate(resultSet.getString("add_date"));
        qualityComplain.setNoComplain(resultSet.getInt("no_complain"));
        qualityComplain.setCount(resultSet.getInt("count"));
        qualityComplain.setLog(resultSet.getString("log"));
        return qualityComplain;
    }
}
