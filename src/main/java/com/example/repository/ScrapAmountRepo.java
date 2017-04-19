package com.example.repository;

import com.example.mapper.ScrapAmountMapper;
import com.example.model.ScrapAmount;
import com.google.gson.JsonObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
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
    public ScrapAmountRepo(@Qualifier("oneJdbcTemplate") JdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }

    /**
     * Get a scrap amount record on a specific date
     *
     * @param curDate
     * @return
     */
    public List<ScrapAmount> getByDate(String curDate) throws ParseException {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        Date start = sdf.parse(curDate);
        String sql = "SELECT * FROM scrap_amount WHERE year + month + day = ?";
        return jdbc.query(sql, new Object[]{start}, new ScrapAmountMapper());
    }

    /**
     * Query all the scrap amount records during the start date and end date
     *
     * @param startDate
     * @param endDate
     * @return
     */
    public List<ScrapAmount> getByPeriod(String startDate, String endDate) throws ParseException {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        Date start = sdf.parse(startDate);
        Date end = sdf.parse(endDate);
        if (start.getTime() - end.getTime() <= 0) {
            String sql = "SELECT * FROM scrap_amount WHERE year + month + day BETWEEN ? AND ?";
            return jdbc.query(sql, new Object[]{start, end}, new ScrapAmountMapper());
        } else {
            return new ArrayList<>();
        }
    }

    /**
     * Get all the scrap amount records during the whole week based on current date
     *
     * @param curDate
     * @return
     */
    public List<ScrapAmount> getByWeek(String curDate) throws ParseException {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        Calendar date = Calendar.getInstance();
        date.setFirstDayOfWeek(Calendar.MONDAY);
        date.setTime(sdf.parse(curDate));
        date.set(Calendar.DAY_OF_WEEK, date.getFirstDayOfWeek());
        String startDate = sdf.format(date.getTime());
        return getByPeriod(startDate, curDate);
    }

    /**
     * Get all the scrap amount records during the whole month based on current date
     *
     * @param curDate
     * @return
     * @throws ParseException
     */
    public List<ScrapAmount> getByMonth(String curDate) throws ParseException {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(sdf.parse(curDate));
        calendar.set(Calendar.DAY_OF_MONTH, 1);
        String startDate = sdf.format(calendar.getTime());
        return getByPeriod(startDate, curDate);
    }

    /**
     * Get all the scrap amount records during the whole year based on current date
     *
     * @param curDate
     * @return
     * @throws ParseException
     */
    public List<ScrapAmount> getByYear(String curDate) throws ParseException {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(sdf.parse(curDate));
        calendar.set(Calendar.MONTH, 0);
        calendar.set(Calendar.DAY_OF_MONTH, 1);
        String startDate = sdf.format(calendar.getTime());
        return getByPeriod(startDate, curDate);
    }

    /**
     * Add a scrap amount record into database
     *
     * @param scrapAmount
     * @return
     */
    public JsonObject addAmount(ScrapAmount scrapAmount) throws ParseException {
        String curDate = scrapAmount.getYear() + "-" + scrapAmount.getMonth() + "-" + scrapAmount.getDay();
        if (!getByDate(curDate).isEmpty()) {
            updateAmount(scrapAmount);
        } else {
            String sql = "INSERT INTO scrap_amount (year, month, day, ishaft1_value, ishaft2_value, ishaft3_value" +
                    ", ishaft4_value, ceps_value, beps_value, ishaft1_target_value, ishaft2_target_value" +
                    ", ishaft3_target_value, ishaft4_target_value, ceps_target_value, beps_target_value)" +
                    "VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
            jdbc.update(sql, scrapAmount.getYear(), scrapAmount.getMonth(), scrapAmount.getDay()
                    , scrapAmount.getIshaft1_value(), scrapAmount.getIshaft2_value(), scrapAmount.getIshaft3_value()
                    , scrapAmount.getIshaft4_value(), scrapAmount.getCeps_value(), scrapAmount.getBeps_value()
                    , scrapAmount.getIshaft1_target_value(), scrapAmount.getIshaft2_target_value()
                    , scrapAmount.getIshaft3_target_value(), scrapAmount.getIshaft4_target_value()
                    , scrapAmount.getCeps_target_value(), scrapAmount.getBeps_target_value());
        }
        JsonObject object = new JsonObject();
        object.addProperty("system_status", true);
        object.addProperty("log", "add success");
        return object;
    }

    /**
     * Update the scrap amount record in database
     *
     * @param scrapAmount
     * @return
     */
    public JsonObject updateAmount(ScrapAmount scrapAmount) throws ParseException {
        String curDate = scrapAmount.getYear() + "-" + scrapAmount.getMonth() + "-" + scrapAmount.getDay();
        JsonObject jsonObject = new JsonObject();
        if (!getByDate(curDate).isEmpty()) {
            String sql = "UPDATE scrap_amount SET ishaft1_value = ?, ishaft2_value = ?, ishaft3_value = ?" +
                    ", ishaft4_value = ?, ceps_value = ?, beps_value = ?, ishaft1_target_value = ?" +
                    ", ishaft2_target_value = ?, ishaft3_target_value = ?, ishaft4_target_value = ?" +
                    ", ceps_target_value = ?, beps_target_value = ? WHERE year = ? AND month = ? AND day = ?";
            jdbc.update(sql, scrapAmount.getIshaft1_value(), scrapAmount.getIshaft2_value()
                    , scrapAmount.getIshaft3_value(), scrapAmount.getIshaft4_value(), scrapAmount.getCeps_value()
                    , scrapAmount.getBeps_value(), scrapAmount.getIshaft1_target_value(), scrapAmount.getIshaft2_target_value()
                    , scrapAmount.getIshaft3_target_value(), scrapAmount.getIshaft4_target_value()
                    , scrapAmount.getCeps_target_value(), scrapAmount.getBeps_target_value()
                    , scrapAmount.getYear(), scrapAmount.getMonth(), scrapAmount.getDay());
            jsonObject.addProperty("system_status", true);
            jsonObject.addProperty("log", "update success");
        } else {
            jsonObject.addProperty("system_status", false);
            jsonObject.addProperty("log", "数据库没有该日期的记录，请先添加记录");
        }
        return jsonObject;
    }

}
