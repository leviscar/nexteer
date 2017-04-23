package com.example.mapper;

import com.example.model.ProductInfo;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

/**
 * Created by mrpan on 2017/3/12.
 */
public class ProductInfoMapper implements RowMapper<ProductInfo> {
    @Override
    public ProductInfo mapRow(ResultSet resultSet, int i) throws SQLException {
        ProductInfo product = new ProductInfo();
        product.setTime(resultSet.getTimestamp("Timestamp"));
        product.setModel(resultSet.getString("Model"));
        return product;
    }
}
