package com.example.repository;

import com.example.mapper.HceMapper;
import com.example.mapper.OeeMapper;
import com.example.model.Hce;
import com.google.gson.Gson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.util.Calendar;
import java.util.List;

/**
 * Created by mrpan on 2017/4/4.
 */
@Repository
public class HceRepo {
    private JdbcTemplate jdbc;

    @Autowired
    public HceRepo(@Qualifier("oneJdbcTemplate") JdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }

    /**
     * Add hce record into database
     *
     * @param hce
     * @return
     */
    public String addActualHce(Hce hce) {
        jdbc.update("IF NOT EXISTS (SELECT * FROM hce WHERE add_date = ? AND cell_name = ?)" +
                        "INSERT INTO hce (hce, add_date, cell_name) VALUES (?, ?, ?)" +
                        "ELSE UPDATE hce SET hce = ? WHERE add_date = ? AND cell_name = ?"
                , hce.getAddDate(), hce.getCellName(), hce.getHce(), hce.getAddDate(), hce.getCellName()
                , hce.getHce(), hce.getAddDate(), hce.getCellName());
        return new Gson().toJson(hce);
    }

    /**
     * Add target hce into database
     *
     * @param hce
     * @return
     */
    public Hce addTargetHce(Hce hce) {
        jdbc.update("IF NOT EXISTS (SELECT * FROM hce WHERE add_date = ? AND cell_name = ?)" +
                        "INSERT INTO hce (target_hce, add_date, cell_name) VALUES (?, ?, ?)" +
                        "ELSE UPDATE hce SET target_hce = ? WHERE add_date = ? AND cell_name = ?"
                , hce.getAddDate(), hce.getCellName(), hce.getTargetHce(), hce.getAddDate(), hce.getCellName()
                , hce.getTargetHce(), hce.getAddDate(), hce.getCellName());
        return hce;
    }

    /**
     * Get specific cell's target hce
     *
     * @param date
     * @return
     */
    public List<Hce> getTargetHceByCellAndDate(String cellName, Date date) {
        return jdbc.query("SELECT * FROM hce WHERE add_date = ? AND cell_name = ?"
                , new Object[]{date, cellName}, new HceMapper());
    }

    /**
     * Get all hce records of specific cell during a period based on start date and end date
     *
     * @param cellName
     * @param startDate
     * @param endDate
     * @return
     */
    public List<Hce> getPeriodHceByCellName(String cellName, Date startDate, Date endDate) {
        String sql = "SELECT * FROM hce WHERE add_date BETWEEN ? AND ? AND cell_name = ?";
        return jdbc.query(sql, new Object[]{startDate, endDate, cellName}, new HceMapper());
    }


    /**
     * Get a week records of specific cell based on current date
     *
     * @param cellName
     * @param curDate
     * @return
     */
    public List<Hce> getWeeklyHceByCellName(String cellName, Date curDate) {
        Calendar calendar = Calendar.getInstance();
        calendar.setFirstDayOfWeek(Calendar.MONDAY);
        calendar.setTime(curDate);
        calendar.set(Calendar.DAY_OF_WEEK, calendar.getFirstDayOfWeek());
        return getPeriodHceByCellName(cellName, new Date(calendar.getTime().getTime()), curDate);
    }

    /**
     * Get a month records of specific cell based on current date
     *
     * @param cellName
     * @param curDate
     * @return
     */
    public List<Hce> getMonthlyHceByCellName(String cellName, Date curDate) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(curDate);
        calendar.set(Calendar.DAY_OF_MONTH, 1);
        return getPeriodHceByCellName(cellName, new Date(calendar.getTime().getTime()), curDate);
    }

    /**
     * Get a year records of specific cell based on current date
     *
     * @param cellName
     * @param curDate
     * @return
     */
    public List<Hce> getYearlyHceByCellName(String cellName, Date curDate) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(curDate);
        calendar.set(Calendar.MONTH, 0);
        calendar.set(Calendar.DAY_OF_MONTH, 1);
        return getPeriodHceByCellName(cellName, new Date(calendar.getTime().getTime()), curDate);
    }

    /**
     * Get all hce records of all cells during a period based on start date and end date
     *
     * @param startDate
     * @param endDate
     * @return
     */
    public List<Hce> getAllCellsPeriodHce(Date startDate, Date endDate) {
        String sql = "SELECT * FROM hce WHERE add_date BETWEEN ? AND ?";
        return jdbc.query(sql, new Object[]{startDate, endDate}, new HceMapper());
    }


    /**
     * Get a week records of of all cells based on current date
     *
     * @param curDate
     * @return
     */
    public List<Hce> getAllCellsWeeklyHce(Date curDate) {
        Calendar calendar = Calendar.getInstance();
        calendar.setFirstDayOfWeek(Calendar.MONDAY);
        calendar.setTime(curDate);
        calendar.set(Calendar.DAY_OF_WEEK, calendar.getFirstDayOfWeek());
        return getAllCellsPeriodHce(new Date(calendar.getTime().getTime()), curDate);
    }

    /**
     * Get a month records of of all cells based on current date
     *
     * @param curDate
     * @return
     */
    public List<Hce> getAllCellsMonthlyHce(Date curDate) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(curDate);
        calendar.set(Calendar.DAY_OF_MONTH, 1);
        return getAllCellsPeriodHce(new Date(calendar.getTime().getTime()), curDate);
    }

    /**
     * Get a year records of of all cells based on current date
     *
     * @param curDate
     * @return
     */
    public List<Hce> getAllCellsYearlyHce(Date curDate) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(curDate);
        calendar.set(Calendar.MONTH, 0);
        calendar.set(Calendar.DAY_OF_MONTH, 1);
        return getAllCellsPeriodHce(new Date(calendar.getTime().getTime()), curDate);
    }

}
