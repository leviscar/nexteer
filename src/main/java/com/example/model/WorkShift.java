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
    private int morning_shift_standard_beats;
    private int middle_shift_standard_beats;
    private int night_shift_standard_beats;

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

    public int getMorning_shift_standard_beats() {
        return morning_shift_standard_beats;
    }

    public void setMorning_shift_standard_beats(int morning_shift_standard_beats) {
        this.morning_shift_standard_beats = morning_shift_standard_beats;
    }

    public int getMiddle_shift_standard_beats() {
        return middle_shift_standard_beats;
    }

    public void setMiddle_shift_standard_beats(int middle_shift_standard_beats) {
        this.middle_shift_standard_beats = middle_shift_standard_beats;
    }

    public int getNight_shift_standard_beats() {
        return night_shift_standard_beats;
    }

    public void setNight_shift_standard_beats(int night_shift_standard_beats) {
        this.night_shift_standard_beats = night_shift_standard_beats;
    }
}
