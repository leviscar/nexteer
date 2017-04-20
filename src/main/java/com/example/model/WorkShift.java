package com.example.model;

import java.sql.Date;

/**
 * Created by mrpan on 2017/3/9.
 * Shift information
 */
public class WorkShift {
    private int id;
    private Date addDate;
    private String cellName;
    private String shiftType;
    private String startTime;
    private String endTime;
    private int target;
    private int standardBeat;
    private int normalWorkerNum;
    private int overtimeWorkerNum;
    private boolean open;
    public WorkShift() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Date getAddDate() {
        return addDate;
    }

    public void setAddDate(Date addDate) {
        this.addDate = addDate;
    }

    public String getCellName() {
        return cellName;
    }

    public void setCellName(String cellName) {
        this.cellName = cellName;
    }

    public String getShiftType() {
        return shiftType;
    }

    public void setShiftType(String shiftType) {
        this.shiftType = shiftType;
    }

    public String getStartTime() {
        return startTime;
    }

    public void setStartTime(String startTime) {
        this.startTime = startTime;
    }

    public String getEndTime() {
        return endTime;
    }

    public void setEndTime(String endTime) {
        this.endTime = endTime;
    }

    public int getTarget() {
        return target;
    }

    public void setTarget(int target) {
        this.target = target;
    }

    public int getNormalWorkerNum() {
        return normalWorkerNum;
    }

    public void setNormalWorkerNum(int normalWorkerNum) {
        this.normalWorkerNum = normalWorkerNum;
    }

    public int getOvertimeWorkerNum() {
        return overtimeWorkerNum;
    }

    public void setOvertimeWorkerNum(int overtimeWorkerNum) {
        this.overtimeWorkerNum = overtimeWorkerNum;
    }

    public int getStandardBeat() {
        return standardBeat;
    }

    public void setStandardBeat(int standardBeat) {
        this.standardBeat = standardBeat;
    }


    public boolean isOpen() {
        return open;
    }

    public void setOpen(boolean open) {
        this.open = open;
    }
}
