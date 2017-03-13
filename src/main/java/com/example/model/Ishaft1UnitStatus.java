package com.example.model;

import com.example.util.ShiftType;

/**
 * Created by mrpan on 2017/3/10.
 */
public class Ishaft1UnitStatus {
    private int id;
    private String curr_time; // 当前时间
    private WorkShift curr_shift_info; // 班次信息
    private ShiftType shift_type; // 班次
    private double hourly_target; // 小时目标
    private int curr_num; // 已完成数量
    private int defective_num; // 残次品数量
    private int status; // 0表示哭脸，1表示笑脸
    private int curr_beats; // 当前节拍
    private int loss_time; // 损失时间
    private int movable_rate; // 可动率

    public Ishaft1UnitStatus() {
    }

    public ShiftType getShift_type() {
        return shift_type;
    }

    public void setShift_type(ShiftType shift_type) {
        this.shift_type = shift_type;
    }

    public String getCurr_time() {
        return curr_time;
    }

    public void setCurr_time(String curr_time) {
        this.curr_time = curr_time;
    }

    public WorkShift getCurr_shift_info() {
        return curr_shift_info;
    }

    public void setCurr_shift_info(WorkShift curr_shift_info) {
        this.curr_shift_info = curr_shift_info;
    }

    public int getCurr_num() {
        return curr_num;
    }

    public void setCurr_num(int curr_num) {
        this.curr_num = curr_num;
    }

    public int getDefective_num() {
        return defective_num;
    }

    public void setDefective_num(int defective_num) {
        this.defective_num = defective_num;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public int getCurr_beats() {
        return curr_beats;
    }

    public void setCurr_beats(int curr_beats) {
        this.curr_beats = curr_beats;
    }

    public int getLoss_time() {
        return loss_time;
    }

    public void setLoss_time(int loss_time) {
        this.loss_time = loss_time;
    }

    public int getMovable_rate() {
        return movable_rate;
    }

    public void setMovable_rate(int movable_rate) {
        this.movable_rate = movable_rate;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public double getHourly_target() {
        return hourly_target;
    }

    public void setHourly_target(double hourly_target) {
        this.hourly_target = hourly_target;
    }
}
