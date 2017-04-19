package com.example.model;

import com.example.enumtype.ShiftType;

/**
 * Created by mrpan on 2017/3/28.
 */
public class DashboardOutput {
    private String cellName; // cell name
    private int targetOutput; // target product output
    private int curOutput; // current product output
    private int reachRate; // reach rate
    private int status; // current status
    private ShiftType shiftType; // shift type

    public DashboardOutput() {
    }

    public String getCellName() {
        return cellName;
    }

    public void setCellName(String cellName) {
        this.cellName = cellName;
    }

    public int getTargetOutput() {
        return targetOutput;
    }

    public void setTargetOutput(int targetOutput) {
        this.targetOutput = targetOutput;
    }

    public int getCurOutput() {
        return curOutput;
    }

    public void setCurOutput(int curOutput) {
        this.curOutput = curOutput;
    }

    public int getReachRate() {
        return reachRate;
    }

    public void setReachRate(int reachRate) {
        this.reachRate = reachRate;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public ShiftType getShiftType() {
        return shiftType;
    }

    public void setShiftType(ShiftType shiftType) {
        this.shiftType = shiftType;
    }
}
