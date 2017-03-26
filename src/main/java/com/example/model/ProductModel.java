package com.example.model;

/**
 * Created by mrpan on 2017/3/26.
 * 产品型号
 */
public class ProductModel {
    private int id;
    private String modelId; // 型号id
    private String modelName; // 型号名称
    private float std; // std
    private String cellName; // 所属单元

    public ProductModel() {
    }

    public String getCellName() {
        return cellName;
    }

    public void setCellName(String cellName) {
        this.cellName = cellName;
    }

    public float getStd() {
        return std;
    }

    public void setStd(float std) {
        this.std = std;
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
