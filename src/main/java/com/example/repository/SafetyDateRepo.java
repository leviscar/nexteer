package com.example.repository;

import com.example.mapper.SafetyDateMapper;
import com.example.model.SafetyDate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

/**
 * Created by mrpan on 2017/3/1.
 * 安全运行天数数据库接口
 */
@Repository
public class SafetyDateRepo {
    private JdbcTemplate jdbc;

    @Autowired
    public SafetyDateRepo(@Qualifier("oneJdbcTemplate") JdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }

    /**
     * 根据日期查询相关日期
     *
     * @param year
     * @param month
     * @param day
     * @return
     */
    public List<SafetyDate> findByDate(String year, String month, String day) {
        String sql = "SELECT * " + "FROM safety_date WHERE year = ? AND month = ? AND day = ?";
        return jdbc.query(sql, new Object[]{year, month, day}, new SafetyDateMapper());
    }

    /**
     * 获得所有日期的相关信息
     *
     * @return
     */
    public List<SafetyDate> findAll() {
        String sql = "SELECT * FROM safety_date";
        return jdbc.query(sql, new SafetyDateMapper());
    }

    /**
     * 获得所有非安全的信息
     *
     * @return
     */
    public List<SafetyDate> findAllUnsafeDate() {
        String sql = "SELECT * FROM safety_date WHERE is_safe = 0";
        return jdbc.query(sql, new SafetyDateMapper());
    }

    /**
     * 添加安全天数
     *
     * @param safetyDate
     * @throws ParseException
     */
    public void addSafetyDate(SafetyDate safetyDate) throws ParseException {
        // 获得前一天的安全天数
        String year = safetyDate.getYear();
        String month = safetyDate.getMonth();
        String day = safetyDate.getDay();
        String s = year + month + day;
        SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd");
        Date date = sdf.parse(s);
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        calendar.add(Calendar.DAY_OF_YEAR, -1);
        String newDate = sdf.format(calendar.getTime());
        List<SafetyDate> res = findByDate(newDate.substring(0, 4), newDate.substring(4, 6), newDate.substring(6, 8));
        if (res.isEmpty()) {
            jdbc.update("if not exists(SELECT * from safety_date WHERE year = ? and month = ? and day = ?)" +
                    "INSERT INTO safety_date (year, month, day, safe_dates, is_safe) VALUES (?,?,?,?,?)" +
                    "ELSE UPDATE safety_date SET safe_dates = ?, is_safe = ? WHERE year = ? and month = ? and day = ?",
                    year, month, day, year, month, day, 1, 1, 1, 1, year, month, day);
        } else {
            jdbc.update("if not exists(SELECT * from safety_date WHERE year = ? and month = ? and day = ?)" +
            "INSERT INTO safety_date (year, month, day, safe_dates, is_safe) VALUES (?,?,?,?,?)" +
                    "ELSE UPDATE safety_date SET safe_dates = ?, is_safe = ? WHERE year = ? and month = ? and day = ?",
                    year, month, day, year, month, day, res.get(0).getSafe_dates() + 1, 1, res.get(0).getSafe_dates() + 1, 1, year, month, day);
        }
    }

    /**
     * 重置安全天数
     *
     * @param safetyDate
     */
    public SafetyDate resetSafetyDate(SafetyDate safetyDate) {
        if (safetyDate.getSafe_dates() == 0) {
            safetyDate.setIs_safe(0);
        } else {
            safetyDate.setIs_safe(1);
        }
        if (safetyDate.getLog() == null || "".equals(safetyDate.getLog())) {
            safetyDate.setLog("Today is running safe!");
        }
        List<SafetyDate> res = findByDate(safetyDate.getYear(), safetyDate.getMonth(), safetyDate.getDay());
        if (res.size() == 0) {
            jdbc.update("INSERT INTO safety_date (year, month, day, safe_dates, is_safe, log) VALUES (?,?,?,?,?,?)", safetyDate.getYear(), safetyDate.getMonth(),
                    safetyDate.getDay(), safetyDate.getSafe_dates(), safetyDate.getIs_safe(), safetyDate.getLog());
        } else {
            jdbc.update("UPDATE safety_date SET is_safe = ?, safe_dates = ?, log = ? WHERE year = ? AND month  = ? AND day = ?",
                    safetyDate.getIs_safe(), safetyDate.getSafe_dates(), safetyDate.getLog(), safetyDate.getYear(), safetyDate.getMonth(),
                    safetyDate.getDay());
        }
        return safetyDate;
    }
}
