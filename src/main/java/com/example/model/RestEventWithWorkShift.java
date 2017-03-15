package com.example.model;

/**
 * Created by mrpan on 2017/3/14.
 */
public class RestEventWithWorkShift {
    private int id;
    private int rest_event_id;
    private int work_shift_id;

    public RestEventWithWorkShift() {
    }

    public int getRest_event_id() {
        return rest_event_id;
    }

    public void setRest_event_id(int rest_event_id) {
        this.rest_event_id = rest_event_id;
    }

    public int getWork_shift_id() {
        return work_shift_id;
    }

    public void setWork_shift_id(int work_shift_id) {
        this.work_shift_id = work_shift_id;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }
}
