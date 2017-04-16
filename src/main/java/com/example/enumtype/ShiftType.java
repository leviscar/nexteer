package com.example.enumtype;

/**
 * Created by mrpan on 2017/3/10.
 * 班次类型
 */
public enum ShiftType {
    Ashift("Ashift"), Bshift("Bshift"), Cshift("Cshift");

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
