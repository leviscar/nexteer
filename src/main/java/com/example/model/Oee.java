package com.example.model;

import java.sql.Date;

/**
 * Created by mrpan on 2017/3/29.
 */
public class Oee {
    private int id;
    private int oee;
    private Date addDate;
    private String cellName;

    public Oee() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getOee() {
        return oee;
    }

    public void setOee(int oee) {
        this.oee = oee;
    }

    public String getCellName() {
        return cellName;
    }

    public void setCellName(String cellName) {
        this.cellName = cellName;
    }

    public Date getAddDate() {
        return addDate;
    }

    public void setAddDate(Date addDate) {
        this.addDate = addDate;
    }
}
