package com.example.model;

/**
 * Created by mrpan on 2017/3/26.
 * product model
 */
public class ProductModel {
    private int id;
    private String modelId; // model id
    private String modelName; // model name
    private String cellName; // cell name

    public ProductModel() {
    }

    public String getCellName() {
        return cellName;
    }

    public void setCellName(String cellName) {
        this.cellName = cellName;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getModelName() {
        return modelName;
    }

    public void setModelName(String modelName) {
        this.modelName = modelName;
    }

    public String getModelId() {
        return modelId;
    }

    public void setModelId(String modelId) {
        this.modelId = modelId;
    }
}
