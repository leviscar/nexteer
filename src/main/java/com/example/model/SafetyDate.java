package com.example.model;

/**
 * Created by mrpan on 2017/3/1.
 * 安全运行天数
 */
public class SafetyDate {
    private Integer safe_dates;
    private String year;
    private String month;
    private String day;
    private Integer is_safe; // 0表示不安全，1表示安全
    private String log; // 记录出错原因

    public SafetyDate() {
    }

    public Integer getSafe_dates() {
        return safe_dates;
    }

    public void setSafe_dates(Integer safe_dates) {
        this.safe_dates = safe_dates;
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

    public Integer getIs_safe() {
        return is_safe;
    }

    public void setIs_safe(Integer is_safe) {
        this.is_safe = is_safe;
    }

    public String getDay() {
        return day;
    }

    public void setDay(String day) {
        this.day = day;
    }

    public String getLog() {
        return log;
    }

    public void setLog(String log) {
        this.log = log;
    }
}
