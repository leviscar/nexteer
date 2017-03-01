package com.example.model;

/**
 * Created by mrpan on 2017/3/1.
 * 安全运行天数
 */
public class SafetyDate {
    private Integer iD;
    private Integer safeDates;
    private String year;
    private String month;
    private String day;
    private Integer isSafe; // 0表示不安全，1表示安全

    public SafetyDate() {
    }

    public SafetyDate(String year, String month, String day, Integer isSafe) {
        this.year = year;
        this.month = month;
        this.day = day;
        this.isSafe = isSafe;
    }

    public Integer getiD() {
        return iD;
    }

    public void setiD(Integer iD) {
        this.iD = iD;
    }

    public Integer getSafeDates() {
        return safeDates;
    }

    public void setSafeDates(Integer safeDates) {
        this.safeDates = safeDates;
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

    public Integer getIsSafe() {
        return isSafe;
    }

    public void setIsSafe(Integer issafe) {
        isSafe = issafe;
    }
}
