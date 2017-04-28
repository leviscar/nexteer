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
    public List<ScrapAmount> getByDateAndCell(String curDate, String cellName) throws ParseException {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        Date start = sdf.parse(curDate);
        String sql = "SELECT * FROM scrap_amount WHERE add_date = ? and cell_name = ?";
        return jdbc.query(sql, new Object[]{start, cellName}, new ScrapAmountMapper());
    }

    /**
     * Query all the scrap amount records during the start date and end date
     *
     * @param startDate
     * @param endDate
     * @return
     */
    public List<ScrapAmount> getByPeriodAndCell(String startDate, String endDate, String cellName) throws ParseException {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        Date start = sdf.parse(startDate);
        Date end = sdf.parse(endDate);
        if (start.getTime() - end.getTime() <= 0) {
            String sql = "SELECT * FROM scrap_amount WHERE add_date BETWEEN ? AND ? and cell_name = ? ORDER BY add_date";
            return jdbc.query(sql, new Object[]{start, end, cellName}, new ScrapAmountMapper());
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
    public List<ScrapAmount> getByWeekAndCell(String curDate, String cellName) throws ParseException {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        Calendar date = Calendar.getInstance();
        date.setFirstDayOfWeek(Calendar.MONDAY);
        date.setTime(sdf.parse(curDate));
        date.set(Calendar.DAY_OF_WEEK, date.getFirstDayOfWeek());
        String startDate = sdf.format(date.getTime());
        return getByPeriodAndCell(startDate, curDate, cellName);
    }

    /**
     * Get all the scrap amount records during the whole month based on current date
     *
     * @param curDate
     * @return
     * @throws ParseException
     */
    public List<ScrapAmount> getByMonthAndCell(String curDate, String cellName) throws ParseException {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(sdf.parse(curDate));
        calendar.set(Calendar.DAY_OF_MONTH, 1);
        String startDate = sdf.format(calendar.getTime());
        return getByPeriodAndCell(startDate, curDate, cellName);
    }

    /**
     * Get all the scrap amount records during the whole year based on current date
     *
     * @param curDate
     * @return
     * @throws ParseException
     */
    public List<ScrapAmount> getByYearAndCell(String curDate, String cellName) throws ParseException {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(sdf.parse(curDate));
        calendar.set(Calendar.MONTH, 0);
        calendar.set(Calendar.DAY_OF_MONTH, 1);
        String startDate = sdf.format(calendar.getTime());
        return getByPeriodAndCell(startDate, curDate, cellName);
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
        String sql = "SELECT * FROM scrap_amount WHERE add_date = ?";
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
            String sql = "SELECT * FROM scrap_amount WHERE add_date BETWEEN ? AND ? ORDER BY add_date";
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
    public ScrapAmount addAmount(ScrapAmount scrapAmount) throws ParseException {
        String curDate = scrapAmount.getAddDate();
        String cellName = scrapAmount.getCellName();
        if (!getByDateAndCell(curDate, cellName).isEmpty()) {
            updateAmount(scrapAmount);
        } else {
            String sql = "INSERT INTO scrap_amount (add_date, cell_name, value, target_value) VALUES (?, ?, ?, ?)";
            jdbc.update(sql, scrapAmount.getAddDate(), scrapAmount.getCellName(), scrapAmount.getValue()
                    , scrapAmount.getTargetValue());
        }
        return scrapAmount;
    }

    /**
     * Update the scrap amount record in database
     *
     * @param scrapAmount
     * @return
     */
    public ScrapAmount updateAmount(ScrapAmount scrapAmount) throws ParseException {
        String sql = "UPDATE scrap_amount SET value = ?, target_value = ? WHERE add_date = ? AND cell_name = ?";
        jdbc.update(sql, scrapAmount.getValue(), scrapAmount.getTargetValue(), scrapAmount.getAddDate()
                , scrapAmount.getCellName());
        return scrapAmount;
    }
}
