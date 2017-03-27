package com.example.model;

import java.util.Date;

/**
 * Created by mrpan on 2017/3/24.
 */
public class LossTime {
    private Date startTime;
    private Date endTime;

    public LossTime() {
    }

    public Date getStartTime() {
        return startTime;
    }

    public void setStartTime(Date startTime) {
        this.startTime = startTime;
    }

    public Date getEndTime() {
        return endTime;
    }

    public void setEndTime(Date endTime) {
        this.endTime = endTime;
    }
}
