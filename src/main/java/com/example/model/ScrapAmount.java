package com.example.model;

/**
 * Created by mrpan on 2017/3/7.
 */
public class ScrapAmount {
    private String year;
    private String month;
    private String day;
    private int value;

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

    public int getValue() {
        return value;
    }

    public void setValue(int value) {
        this.value = value;
    }
}
