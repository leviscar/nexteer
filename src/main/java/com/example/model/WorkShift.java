package com.example.model;

import java.sql.Time;
import java.util.Date;

/**
 * Created by mrpan on 2017/3/9.
 * 早中晚三班
 */
public class WorkShift {
    private int id;
    private String morning_shift_start;
    private String morning_shift_end;
    private String middle_shift_start;
    private String middle_shift_end;
    private String night_shift_start;
    private String night_shift_end;
    private Date setting_time;
    private int target_value;
    private int standard_beats;

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


    @Override
    public String toString() {
        return "id = " + id
                + ", setting_time = " + setting_time
                + ", + morning_shift_start = " + morning_shift_start
                + ", middle_shift_end = " + morning_shift_end
                + ", + middle_shift_start = " + middle_shift_start
                + ", middle_shift_end = " + middle_shift_end
                + ", + morning_shift_start = " + night_shift_start
                + ", middle_shift_end = " + night_shift_end
                + ", target_value = " + target_value
                + ", standard_beats = " + standard_beats;
    }

    public String getMorning_shift_start() {
        return morning_shift_start;
    }

    public void setMorning_shift_start(String morning_shift_start) {
        this.morning_shift_start = morning_shift_start;
    }

    public String getMorning_shift_end() {
        return morning_shift_end;
    }

    public void setMorning_shift_end(String morning_shift_end) {
        this.morning_shift_end = morning_shift_end;
    }

    public String getMiddle_shift_start() {
        return middle_shift_start;
    }

    public void setMiddle_shift_start(String middle_shift_start) {
        this.middle_shift_start = middle_shift_start;
    }

    public String getMiddle_shift_end() {
        return middle_shift_end;
    }

    public void setMiddle_shift_end(String middle_shift_end) {
        this.middle_shift_end = middle_shift_end;
    }

    public String getNight_shift_start() {
        return night_shift_start;
    }

    public void setNight_shift_start(String night_shift_start) {
        this.night_shift_start = night_shift_start;
    }

    public String getNight_shift_end() {
        return night_shift_end;
    }

    public void setNight_shift_end(String night_shift_end) {
        this.night_shift_end = night_shift_end;
    }

    public int getTarget_value() {
        return target_value;
    }

    public void setTarget_value(int target_value) {
        this.target_value = target_value;
    }

    public int getStandard_beats() {
        return standard_beats;
    }

    public void setStandard_beats(int standard_beats) {
        this.standard_beats = standard_beats;
    }
}
