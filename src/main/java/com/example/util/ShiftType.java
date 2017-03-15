package com.example.util;

/**
 * Created by mrpan on 2017/3/10.
 * 班次类型
 */
public enum ShiftType {
    MORNING_SHIFT("早班"), MIDDLE_SHIFT("中班"), NIGHT_SHIFT("晚班");

    private String shift;

    ShiftType(String shift) {
        this.shift = shift;
    }

    @Override
    public String toString() {
        return this.shift;
    }

    public void setShift(String shift) {
        this.shift = shift;
    }
}
