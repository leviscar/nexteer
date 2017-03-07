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
        scrapAmount.setYear(resultSet.getString("year"));
        scrapAmount.setMonth(resultSet.getString("month"));
        scrapAmount.setDay(resultSet.getString("day"));
        scrapAmount.setValue(resultSet.getInt("value"));
        return scrapAmount;
    }
}
