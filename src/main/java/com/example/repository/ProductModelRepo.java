package com.example.repository;

import com.example.mapper.ProductModelMapper;
import com.example.model.ProductModel;
import com.google.gson.JsonObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.util.List;

/**
 * Created by mrpan on 2017/3/26.
 */
@Repository
public class ProductModelRepo {
    private JdbcTemplate jdbc;

    @Autowired
    public ProductModelRepo(@Qualifier("oneJdbcTemplate") JdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }

    /**
     * Add product model into database
     *
     * @param model
     * @return json
     */
    public ProductModel add(ProductModel model) {
        String sql = "IF NOT exists(SELECT * FROM product_model WHERE model_id = ?)" +
                "INSERT INTO product_model (model_id, model_name, std, cell_name) VALUES(?,?,?,?) ELSE " +
                "UPDATE product_model SET model_name = ?, std = ?, cell_name = ? WHERE model_id = ?";
        jdbc.update(sql, model.getModelId(), model.getModelId(), model.getModelName(), model.getStd(), model.getCellName()
                , model.getModelName(), model.getStd(), model.getCellName(), model.getModelId());
        return model;
    }

    /**
     * Get std based on model id
     *
     * @param modelId
     * @return
     */
    public ProductModel getByModelId(String modelId) {
        String sql = "SELECT * FROM product_model WHERE model_id = ?";
        return jdbc.queryForObject(sql, new Object[]{modelId}, new ProductModelMapper());
    }

    /**
     * Get product model information based on cell name
     *
     * @param cellName
     * @return
     */
    public List<ProductModel> getModelByCellName(String cellName) {
        String sql = "SELECT * FROM product_model WHERE cell_name = ?";
        return jdbc.query(sql, new Object[]{cellName}, new ProductModelMapper());
    }

    /**
     * Get all the product model records
     *
     * @return list
     */
    public List<ProductModel> getAllModel() {
        String sql = "SELECT * FROM product_model";
        return jdbc.query(sql, new ProductModelMapper());
    }

    /**
     * Delete record from database
     *
     * @param modelId
     */
    public void deleteByModelId(String modelId) {
        jdbc.update("DELETE FROM product_model WHERE model_id = ?", modelId);
    }

    /**
     * update record form database
     *
     * @param model
     * @return
     */
    public ProductModel update(ProductModel model) {
        jdbc.update("UPDATE product_model SET model_id = ?, model_name = ?, cell_name = ?, std = ?"
                , model.getModelId(), model.getModelName(), model.getCellName(), model.getStd());
        return model;
    }
}
