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
 * safety date database repository
 */
@Repository
public class SafetyDateRepo {
    private JdbcTemplate jdbc;

    @Autowired
    public SafetyDateRepo(@Qualifier("oneJdbcTemplate") JdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }

    /**
     * Get a safety date record on a specific date
     *
     * @param date
     * @return
     */
    public List<SafetyDate> findByDate(String date) throws ParseException {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        Date curDate = sdf.parse(date);
        String sql = "SELECT * FROM safety_date WHERE year +'-' + month + '-' + day = ?";
        return jdbc.query(sql, new Object[]{curDate}, new SafetyDateMapper());
    }

    /**
     * Get all records
     *
     * @return
     */
    public List<SafetyDate> findAll() {
        String sql = "SELECT * FROM safety_date";
        return jdbc.query(sql, new SafetyDateMapper());
    }

    /**
     * Get all records which is unsafe
     *
     * @return
     */
    public List<SafetyDate> findBySafeState() {
        String sql = "SELECT * FROM safety_date WHERE is_safe = 0";
        return jdbc.query(sql, new SafetyDateMapper());
    }

    /**
     * Add a safety date record into database
     *
     * @param safetyDate
     * @throws ParseException
     */
    public SafetyDate addSafetyDate(SafetyDate safetyDate) throws ParseException {
        // get safety date record of the day before
        String year = safetyDate.getYear();
        String month = safetyDate.getMonth();
        String day = safetyDate.getDay();
        String curDate = year + "-" + month + "-" + day;
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        Date date = sdf.parse(curDate);
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        calendar.add(Calendar.DAY_OF_YEAR, -1);
        String newDate = sdf.format(calendar.getTime());
        List<SafetyDate> res = findByDate(newDate);
        if (res.isEmpty()) {
            safetyDate.setIs_safe(1);
            safetyDate.setSafe_dates(1);
            jdbc.update("IF NOT exists(SELECT * FROM safety_date WHERE year = ? AND month = ? AND day = ?)" +
                            "INSERT INTO safety_date (year, month, day, safe_dates, is_safe, log) VALUES (?,?,?,?,?,?)" +
                            "ELSE UPDATE safety_date SET safe_dates = ?, is_safe = ?, log = ?" +
                            "WHERE year = ? AND month = ? AND day = ?"
                    , year, month, day, year, month, day, 1, 1, safetyDate.getLog(), 1, 1, safetyDate.getLog(), year, month, day);
        } else {
            safetyDate.setIs_safe(1);
            safetyDate.setSafe_dates(res.get(0).getSafe_dates() + 1);
            safetyDate.setLog("Today is running safe!");
            jdbc.update("IF NOT exists(SELECT * FROM safety_date WHERE year = ? AND month = ? AND day = ?)" +
                            "INSERT INTO safety_date (year, month, day, safe_dates, is_safe, log) VALUES (?,?,?,?,?,?)" +
                            "ELSE UPDATE safety_date SET safe_dates = ?, is_safe = ?, log = ? WHERE year = ? AND month = ? AND day = ?"
                    , year, month, day, year, month, day, res.get(0).getSafe_dates() + 1, 1, safetyDate.getLog()
                    , res.get(0).getSafe_dates() + 1, 1, safetyDate.getLog(), year, month, day);
        }
        return safetyDate;
    }

    /**
     * Update the safety date record
     *
     * @param safetyDate
     */
    public SafetyDate updateSafetyDate(SafetyDate safetyDate) throws ParseException {
        if (safetyDate.getSafe_dates() == 0) {
            safetyDate.setIs_safe(0);
        } else {
            safetyDate.setIs_safe(1);
        }
        if (safetyDate.getLog() == null || "".equals(safetyDate.getLog())) {
            safetyDate.setLog("Today is running safe!");
        }
        String curDate = safetyDate.getYear() + "-" + safetyDate.getMonth() + "-" + safetyDate.getDay();
        List<SafetyDate> res = findByDate(curDate);
        if (res.size() == 0) {
            jdbc.update("INSERT INTO safety_date (year, month, day, safe_dates, is_safe, log) VALUES (?,?,?,?,?,?)"
                    , safetyDate.getYear(), safetyDate.getMonth(), safetyDate.getDay()
                    , safetyDate.getSafe_dates(), safetyDate.getIs_safe(), safetyDate.getLog());
        } else {
            jdbc.update("UPDATE safety_date SET is_safe = ?, safe_dates = ?, log = ? " +
                            "WHERE year = ? AND month  = ? AND day = ?"
                    , safetyDate.getIs_safe(), safetyDate.getSafe_dates(), safetyDate.getLog()
                    , safetyDate.getYear(), safetyDate.getMonth(), safetyDate.getDay());
        }
        return safetyDate;
    }

    /**
     * Get the max safe date value
     *
     * @return
     */
    public int getMax() {
        return jdbc.queryForObject("SELECT MAX(safe_dates) FROM safety_date", Integer.class);
    }
}
