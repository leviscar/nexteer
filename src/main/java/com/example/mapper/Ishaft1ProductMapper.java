package com.example.mapper;

import com.example.model.Ishaft1Product;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

/**
 * Created by mrpan on 2017/3/12.
 */
public class Ishaft1ProductMapper implements RowMapper<Ishaft1Product> {
    @Override
    public Ishaft1Product mapRow(ResultSet resultSet, int i) throws SQLException {
        Ishaft1Product product = new Ishaft1Product();
        product.setTime(resultSet.getTimestamp("Timestamp"));
        product.setModel(resultSet.getString("Model"));
        return product;
    }
}
