package com.example.model;

/**
 * Created by mrpan on 2017/5/25.
 */
public class StdInfo {
    private String cellName;
    private int standardBeats;
    private int unitId;
    private int unitNum;

    public StdInfo() {
    }

    public String getCellName() {
        return cellName;
    }

    public void setCellName(String cellName) {
        this.cellName = cellName;
    }

    public int getStandardBeats() {
        return standardBeats;
    }

    public void setStandardBeats(int standardBeats) {
        this.standardBeats = standardBeats;
    }

    public int getUnitId() {
        return unitId;
    }

    public void setUnitId(int unitId) {
        this.unitId = unitId;
    }

    public int getUnitNum() {
        return unitNum;
    }

    public void setUnitNum(int unitNum) {
        this.unitNum = unitNum;
    }
}
