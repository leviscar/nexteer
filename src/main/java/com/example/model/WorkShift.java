package com.example.model;

import java.sql.Time;
import java.util.Date;

/**
 * Created by mrpan on 2017/3/9.
 * 早中晚三班
 */
public class WorkShift {
    private int id;
    private String morning_shift;
    private String middle_shift;
    private String night_shift;
    private Date setting_time;

    public WorkShift() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }


    public Date getSetting_time() {
        return setting_time;
    }

    public void setSetting_time(Date setting_time) {
        this.setting_time = setting_time;
    }

    public String getMorning_shift() {
        return morning_shift;
    }

    public void setMorning_shift(String morning_shift) {
        this.morning_shift = morning_shift;
    }

    public String getMiddle_shift() {
        return middle_shift;
    }

    public void setMiddle_shift(String middle_shift) {
        this.middle_shift = middle_shift;
    }

    public String getNight_shift() {
        return night_shift;
    }

    public void setNight_shift(String night_shift) {
        this.night_shift = night_shift;
    }

    @Override
    public String toString() {
        return "id = " + id
                + ", setting_time = " + setting_time.toString()
                + ", + morning_shift = " + morning_shift
                + ", middle_shift = " + middle_shift
                + ", + night_shift = " + night_shift;
    }
}
