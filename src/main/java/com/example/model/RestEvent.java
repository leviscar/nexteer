package com.example.model;

/**
 * Created by mrpan on 2017/3/14.
 */
public class RestEvent {
    private int id;
    private String shift_type; // 所属班次
    private String event; // 事件类型
    private String event_start_time; // 事件开始时间
    private String event_end_time; // 事件结束时间

    public RestEvent() {
    }


    public String getEvent() {
        return event;
    }

    public void setEvent(String event) {
        this.event = event;
    }

    public String getEvent_start_time() {
        return event_start_time;
    }

    public void setEvent_start_time(String event_start_time) {
        this.event_start_time = event_start_time;
    }

    public String getEvent_end_time() {
        return event_end_time;
    }

    public void setEvent_end_time(String event_end_time) {
        this.event_end_time = event_end_time;
    }

    public String getShift_type() {
        return shift_type;
    }

    public void setShift_type(String shift_type) {
        this.shift_type = shift_type;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }
}
