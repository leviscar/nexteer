package com.example.model;

/**
 * Created by mrpan on 2017/3/7.
 */
public class ScrapAmount {
    private String addDate;
    private String cellName;
    private int value;
    private int targetValue;

    public ScrapAmount() {
    }

    public String getAddDate() {
        return addDate;
    }

    public void setAddDate(String addDate) {
        this.addDate = addDate;
    }

    public String getCellName() {
        return cellName;
    }

    public void setCellName(String cellName) {
        this.cellName = cellName;
    }

    public int getValue() {
        return value;
    }

    public void setValue(int value) {
        this.value = value;
    }

    public int getTargetValue() {
        return targetValue;
    }

    public void setTargetValue(int targetValue) {
        this.targetValue = targetValue;
    }
}
