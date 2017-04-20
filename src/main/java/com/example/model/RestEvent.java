package com.example.model;

/**
 * Created by mrpan on 2017/3/14.
 */
public class RestEvent {
    private int id;
    private int workShiftId;
    private String cellName;
    private String shiftType;
    private String event;
    private String startTime;
    private String endTime;

    public RestEvent() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getWorkShiftId() {
        return workShiftId;
    }

    public void setWorkShiftId(int workShiftId) {
        this.workShiftId = workShiftId;
    }

    public String getEvent() {
        return event;
    }

    public void setEvent(String event) {
        this.event = event;
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
}
