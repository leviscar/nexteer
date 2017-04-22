package com.example.model;

import java.util.Map;

/**
 * Created by mrpan on 2017/3/10.
 */
public class Ishaft1UnitStatus {
    private int id;
    private String curr_time;
    private WorkShift curr_shift_info;
    private Map<String, Integer> hourly_target;
    private int curr_num;
    private int status;
    private int curr_beats;
    private int loss_time;
    private int movable_rate;
    private double hce;
    private int target;
    private Map<String, Integer> hourly_output;

    public Ishaft1UnitStatus() {
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

    public Map<String, Integer> getHourly_output() {
        return hourly_output;
    }

    public void setHourly_output(Map<String, Integer> hourly_output) {
        this.hourly_output = hourly_output;
    }

    public Map<String, Integer> getHourly_target() {
        return hourly_target;
    }

    public void setHourly_target(Map<String, Integer> hourly_target) {
        this.hourly_target = hourly_target;
    }

    public double getHce() {
        return hce;
    }

    public void setHce(double hce) {
        this.hce = hce;
    }

    public int getTarget() {
        return target;
    }

    public void setTarget(int target) {
        this.target = target;
    }
}
