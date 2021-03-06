package com.example.mapper;

import com.example.model.ScrapAmount;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

/**
 * Created by mrpan on 2017/3/7.
 */
public class ScrapAmountMapper implements RowMapper<ScrapAmount> {

    @Override
    public ScrapAmount mapRow(ResultSet resultSet, int i) throws SQLException {
        ScrapAmount scrapAmount = new ScrapAmount();
        scrapAmount.setAddDate(resultSet.getString("add_date"));
        scrapAmount.setCellName(resultSet.getString("cell_name"));
        scrapAmount.setValue(resultSet.getInt("value"));
        scrapAmount.setTargetValue(resultSet.getInt("target_value"));
        return scrapAmount;
    }
}
