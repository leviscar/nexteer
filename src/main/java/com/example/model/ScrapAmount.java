package com.example.model;

/**
 * Created by mrpan on 2017/3/7.
 */
public class ScrapAmount {
    private String year;
    private String month;
    private String day;
    private int ishaft1_value;
    private int ishaft2_value;
    private int ishaft3_value;
    private int ishaft4_value;
    private int beps_value;
    private int ceps_value;

    public ScrapAmount() {
    }


    public ScrapAmount(String year, String month, String day) {
        this.year = year;
        this.month = month;
        this.day = day;
    }

    public String getYear() {
        return year;
    }

    public void setYear(String year) {
        this.year = year;
    }

    public String getMonth() {
        return month;
    }

    public void setMonth(String month) {
        this.month = month;
    }

    public String getDay() {
        return day;
    }

    public void setDay(String day) {
        this.day = day;
    }

    public int getIshaft1_value() {
        return ishaft1_value;
    }

    public void setIshaft1_value(int ishaft1_value) {
        this.ishaft1_value = ishaft1_value;
    }

    public int getIshaft2_value() {
        return ishaft2_value;
    }

    public void setIshaft2_value(int ishaft2_value) {
        this.ishaft2_value = ishaft2_value;
    }

    public int getIshaft3_value() {
        return ishaft3_value;
    }

    public void setIshaft3_value(int ishaft3_value) {
        this.ishaft3_value = ishaft3_value;
    }

    public int getIshaft4_value() {
        return ishaft4_value;
    }

    public void setIshaft4_value(int ishaft4_value) {
        this.ishaft4_value = ishaft4_value;
    }

    public int getBeps_value() {
        return beps_value;
    }

    public void setBeps_value(int beps_value) {
        this.beps_value = beps_value;
    }

    public int getCeps_value() {
        return ceps_value;
    }

    public void setCeps_value(int ceps_value) {
        this.ceps_value = ceps_value;
    }
}
