package com.example.model;

import java.sql.Date;

/**
 * Created by mrpan on 2017/4/4.
 */
public class Hce {
    private int id;
    private int hce;
    private Date addDate;
    private String cellName;

    public Hce() {
    }

    public int getHce() {
        return hce;
    }

    public void setHce(int hce) {
        this.hce = hce;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Date getAddDate() {
        return addDate;
    }

    public void setAddDate(Date addDate) {
        this.addDate = addDate;
    }

    public String getCellName() {
        return cellName;
    }

    public void setCellName(String cellName) {
        this.cellName = cellName;
    }
}
