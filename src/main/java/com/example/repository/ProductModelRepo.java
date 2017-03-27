package com.example.repository;

import com.example.mapper.ProductModelMapper;
import com.example.model.ProductModel;
import com.google.gson.JsonObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

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
     * 添加型号
     *
     * @param model
     * @return json
     */
    public String addModel(ProductModel model) {
        String sql = "IF NOT exists(SELECT * FROM product_model WHERE model_id = ?)" +
                "INSERT INTO product_model (model_id, model_name, std, cell_name) VALUES(?,?,?,?) ELSE " +
                "UPDATE product_model SET model_name = ?, std = ?, cell_name = ? WHERE model_id = ?";
        jdbc.update(sql, model.getModelId(), model.getModelId(), model.getModelName(), model.getStd(), model.getCellName()
                , model.getModelName(), model.getStd(), model.getCellName(), model.getModelId());
        JsonObject jsonObject = new JsonObject();
        jsonObject.addProperty("status", true);
        jsonObject.addProperty("log", "add OK");
        return jsonObject.toString();
    }

    /**
     * 根据型号id获取std
     *
     * @param modelId
     * @return
     */
    public ProductModel getStdByModelId(String modelId) {
        String sql = "SELECT * FROM product_model WHERE model_id = ?";
        return jdbc.queryForObject(sql, new Object[]{modelId}, new ProductModelMapper());
    }

    /**
     * 根据单元名称获取model信息
     *
     * @param cellName
     * @return
     */
    public List<ProductModel> getModelByCellName(String cellName) {
        String sql = "SELECT * FROM product_model WHERE cell_name = ?";
        return jdbc.query(sql, new Object[]{cellName}, new ProductModelMapper());
    }

    /**
     * 获得所有型号的信息
     *
     * @return list
     */
    public List<ProductModel> getAllModel() {
        String sql = "SELECT * FROM product_model";
        return jdbc.query(sql, new ProductModelMapper());
    }
}
