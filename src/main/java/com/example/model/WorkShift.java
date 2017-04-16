package com.example.model;

import java.sql.Date;

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
    private int morning_shift_target;
    private int middle_shift_target;
    private int night_shift_target;
    private int morning_shift_standard_beats;
    private int middle_shift_standard_beats;
    private int night_shift_standard_beats;
    private int morning_worker_num;
    private int middle_worker_num;
    private int night_worker_num;
    private int morning_overtime_worker_num;
    private int middle_overtime_worker_num;
    private int night_overtime_worker_num;
    private String cell_name;

    public WorkShift() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
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

    public int getMorning_worker_num() {
        return morning_worker_num;
    }

    public void setMorning_worker_num(int morning_worker_num) {
        this.morning_worker_num = morning_worker_num;
    }

    public int getMiddle_worker_num() {
        return middle_worker_num;
    }

    public void setMiddle_worker_num(int middle_worker_num) {
        this.middle_worker_num = middle_worker_num;
    }

    public int getNight_worker_num() {
        return night_worker_num;
    }

    public void setNight_worker_num(int night_worker_num) {
        this.night_worker_num = night_worker_num;
    }

    public int getMorning_overtime_worker_num() {
        return morning_overtime_worker_num;
    }

    public void setMorning_overtime_worker_num(int morning_overtime_worker_num) {
        this.morning_overtime_worker_num = morning_overtime_worker_num;
    }

    public int getMiddle_overtime_worker_num() {
        return middle_overtime_worker_num;
    }

    public void setMiddle_overtime_worker_num(int middle_overtime_worker_num) {
        this.middle_overtime_worker_num = middle_overtime_worker_num;
    }

    public int getNight_overtime_worker_num() {
        return night_overtime_worker_num;
    }

    public void setNight_overtime_worker_num(int night_overtime_worker_num) {
        this.night_overtime_worker_num = night_overtime_worker_num;
    }

    public Date getSetting_time() {
        return setting_time;
    }

    public void setSetting_time(Date setting_time) {
        this.setting_time = setting_time;
    }

    public String getCell_name() {
        return cell_name;
    }

    public void setCell_name(String cell_name) {
        this.cell_name = cell_name;
    }

    public int getMorning_shift_target() {
        return morning_shift_target;
    }

    public void setMorning_shift_target(int morning_shift_target) {
        this.morning_shift_target = morning_shift_target;
    }

    public int getMiddle_shift_target() {
        return middle_shift_target;
    }

    public void setMiddle_shift_target(int middle_shift_target) {
        this.middle_shift_target = middle_shift_target;
    }

    public int getNight_shift_target() {
        return night_shift_target;
    }

    public void setNight_shift_target(int night_shift_target) {
        this.night_shift_target = night_shift_target;
    }
}
