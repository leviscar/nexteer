package com.example.repository;

import com.example.mapper.ScrapAmountMapper;
import com.example.model.ScrapAmount;
import com.google.gson.JsonObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

/**
 * Created by mrpan on 2017/3/7.
 */
@Repository
public class ScrapAmountRepo {
    private JdbcTemplate jdbc;

    @Autowired
    public ScrapAmountRepo(JdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }

    /**
     * 根据日期获得报废金额
     *
     * @param scrapAmount
     * @return
     */
    public List<ScrapAmount> getByDate(ScrapAmount scrapAmount) {
        String sql = "SELECT * FROM scrap_amount WHERE year = ? AND month = ? AND day = ?";
        return jdbc.query(sql, new Object[]{scrapAmount.getYear(), scrapAmount.getMonth(), scrapAmount.getDay()}, new ScrapAmountMapper());
    }

    /**
     * 根据起始日期和终止日期查询报废金额
     *
     * @param startYear
     * @param startMonth
     * @param startDay
     * @param endYear
     * @param endMonth
     * @param endDay
     * @return
     */
    public List<ScrapAmount> getByPeriod(String startYear, String startMonth, String startDay, String endYear, String endMonth, String endDay) throws ParseException {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd");
        Date start = sdf.parse(startYear + startMonth + startDay);
        Date end = sdf.parse(endYear + endMonth + endDay);
        if (start.getTime() - end.getTime() <= 0) {
            String sql = "SELECT * FROM scrap_amount WHERE year BETWEEN ? AND ? AND month BETWEEN ? AND ? AND day BETWEEN ? AND ?";
            return jdbc.query(sql, new Object[]{startYear, endYear, startMonth, endMonth, startDay, endDay}, new ScrapAmountMapper());
        } else {
            return new ArrayList<>();
        }
    }

    /**
     * 获取当前周的所有报废金额
     *
     * @param scrapAmount
     * @return
     */
    public List<ScrapAmount> getByWeek(ScrapAmount scrapAmount) {
        String year = scrapAmount.getYear();
        String month = scrapAmount.getMonth();
        String day = scrapAmount.getDay();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd");
        Calendar date = Calendar.getInstance();
        try {
            date.setFirstDayOfWeek(Calendar.MONDAY);
            date.setTime(sdf.parse(year + month + day));
            date.set(Calendar.DAY_OF_WEEK, date.getFirstDayOfWeek());
            String start = sdf.format(date.getTime());
            return getByPeriod(start.substring(0, 4), start.substring(4, 6), start.substring(6, 8), year, month, day);
        } catch (ParseException e) {
            e.printStackTrace();
        }

        return new ArrayList<>();
    }

    /**
     * 获取当前月的所有报废金额
     *
     * @param scrapAmount
     * @return
     * @throws ParseException
     */
    public List<ScrapAmount> getByMonth(ScrapAmount scrapAmount) throws ParseException {
        String year = scrapAmount.getYear();
        String month = scrapAmount.getMonth();
        String day = scrapAmount.getDay();
        return getByPeriod(year, month, "01", year, month, day);
    }

    /**
     * 获取当前年的所有报废金额
     *
     * @param scrapAmount
     * @return
     * @throws ParseException
     */
    public List<ScrapAmount> getByYear(ScrapAmount scrapAmount) throws ParseException {
        return getByPeriod(scrapAmount.getYear(), "01", "01", scrapAmount.getYear(), scrapAmount.getMonth(), scrapAmount.getDay());
    }

    /**
     * 添加报废金额
     *
     * @param scrapAmount
     * @return
     */
    public JsonObject addAmount(ScrapAmount scrapAmount) {
        if (!getByDate(scrapAmount).isEmpty()) {
            String sql = "UPDATE scrap_amount SET ishaft1_value = ?, ishaft2_value = ?, ishaft3_value = ?, ishaft4_value = ?, ceps_value = ?, beps_value = ?" +
                    " WHERE year = ? AND month = ? AND day = ?";
            jdbc.update(sql, scrapAmount.getIshaft1_value(), scrapAmount.getIshaft2_value(), scrapAmount.getIshaft3_value(), scrapAmount.getIshaft4_value(),
                    scrapAmount.getCeps_value(), scrapAmount.getBeps_value(), scrapAmount.getYear(), scrapAmount.getMonth(), scrapAmount.getDay());
        } else {
            String sql = "INSERT INTO scrap_amount (year, month, day, ishaft1_value, ishaft2_value, ishaft3_value, ishaft4_value, ceps_value, beps_value)" +
                    " VALUES(?,?,?,?,?,?,?,?,?)";
            jdbc.update(sql, scrapAmount.getYear(), scrapAmount.getMonth(), scrapAmount.getDay(), scrapAmount.getIshaft1_value(), scrapAmount.getIshaft2_value(),
                    scrapAmount.getIshaft3_value(), scrapAmount.getIshaft4_value(), scrapAmount.getCeps_value(), scrapAmount.getBeps_value());
        }
        JsonObject object = new JsonObject();
        object.addProperty("status", true);
        object.addProperty("log", "add success");
        return object;
    }

    /**
     * 重新设置报废金额
     *
     * @param scrapAmount
     * @return
     */
    public JsonObject updateAmount(ScrapAmount scrapAmount) {
        JsonObject jsonObject = new JsonObject();
        if (!getByDate(scrapAmount).isEmpty()) {
            String sql = "UPDATE scrap_amount SET ishaft1_value = ?, ishaft2_value = ?, ishaft3_value = ?, ishaft4_value = ?, ceps_value = ?, beps_value = ?" +
                    " WHERE year = ? AND month = ? AND day = ?";
            jdbc.update(sql, scrapAmount.getIshaft1_value(), scrapAmount.getIshaft2_value(), scrapAmount.getIshaft3_value(), scrapAmount.getIshaft4_value(),
                    scrapAmount.getCeps_value(), scrapAmount.getBeps_value(), scrapAmount.getYear(), scrapAmount.getMonth(), scrapAmount.getDay());
            jsonObject.addProperty("status", true);
            jsonObject.addProperty("log", "reset ok");
        } else {
            jsonObject.addProperty("status", false);
            jsonObject.addProperty("log", "数据库没有该日期的记录，请先添加记录");
        }
        return jsonObject;
    }

}
