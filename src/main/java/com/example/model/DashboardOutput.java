package com.example.model;

/**
 * Created by mrpan on 2017/3/28.
 */
public class DashboardOutput {
    private String cellName; // 产线
    private int targetOutput; // 目标产量
    private int curOutput; // 当前产量
    private int reachRate; // 达成率
    private int status; // 当前状态

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
}
