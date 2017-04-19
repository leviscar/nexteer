package com.example.model;

/**
 * Created by mrpan on 2017/4/18.
 * Users' quality complain issue
 */
public class QualityComplain {
    private String addDate;
    private int noComplain; // 1 means no complain, 0 means having complain
    private int count;
    private String log = "There is no complain";

    public QualityComplain() {
    }

    public String getAddDate() {
        return addDate;
    }

    public void setAddDate(String addDate) {
        this.addDate = addDate;
    }

    public int getNoComplain() {
        return noComplain;
    }

    public void setNoComplain(int noComplain) {
        this.noComplain = noComplain;
    }

    public int getCount() {
        return count;
    }

    public void setCount(int count) {
        this.count = count;
    }

    public String getLog() {
        return log;
    }

    public void setLog(String log) {
        this.log = log;
    }
}
