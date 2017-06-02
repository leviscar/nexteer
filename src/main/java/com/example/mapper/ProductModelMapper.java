package com.example.mapper;

import com.example.model.ProductModel;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

/**
 * Created by mrpan on 2017/3/26.
 */
public class ProductModelMapper implements RowMapper<ProductModel> {
    @Override
    public ProductModel mapRow(ResultSet resultSet, int i) throws SQLException {
        ProductModel model = new ProductModel();
        model.setId(resultSet.getInt("id"));
        model.setModelId(resultSet.getString("model_id"));
        model.setModelName(resultSet.getString("model_name"));
        model.setCellName(resultSet.getString("cell_name"));
        return model;
    }
}
