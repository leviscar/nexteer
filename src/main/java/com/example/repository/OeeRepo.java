package com.example.repository;

import com.example.mapper.OeeMapper;
import com.example.model.Oee;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.util.Calendar;
import java.util.List;

/**
 * Created by mrpan on 2017/3/29.
 */
@Repository
public class OeeRepo {
    private JdbcTemplate jdbc;

    @Autowired
    public OeeRepo(@Qualifier("oneJdbcTemplate") JdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }

    /**
     * Add oee record into database
     *
     * @param oee
     * @return
     */
    public Oee addActualOee(Oee oee) {
        jdbc.update("IF NOT EXISTS (SELECT * FROM oee WHERE add_date = ? AND cell_name = ?)" +
                        "INSERT INTO oee (oee, add_date, cell_name) VALUES (?, ?, ?)" +
                        "ELSE UPDATE oee SET oee = ? WHERE add_date = ? AND cell_name = ?"
                , oee.getAddDate(), oee.getCellName(), oee.getOee(), oee.getAddDate(), oee.getCellName()
                , oee.getOee(), oee.getAddDate(), oee.getCellName());
        return oee;
    }

    /**
     * Add target oee into database
     *
     * @param oee
     * @return
     */
    public Oee addTargetOee(Oee oee) {
        jdbc.update("IF NOT EXISTS (SELECT * FROM oee WHERE add_date = ? AND cell_name = ?)" +
                        "INSERT INTO oee (target_oee, add_date, cell_name) VALUES (?, ?, ?)" +
                        "ELSE UPDATE oee SET target_oee = ? WHERE add_date = ? AND cell_name = ?"
                , oee.getAddDate(), oee.getCellName(), oee.getTargetOee(), oee.getAddDate(), oee.getCellName()
                , oee.getTargetOee(), oee.getAddDate(), oee.getCellName());
        return oee;
    }

    /**
     * Get specific cell's target oee
     *
     * @param date
     * @return
     */
    public List<Oee> getTargetOeeByCellAndDate(String cellName, Date date) {
        return jdbc.query("SELECT * FROM oee WHERE add_date = ? and cell_name = ?"
                , new Object[]{date, cellName}, new OeeMapper());
    }

    /**
     * Get all oee records of specific cell during a period based on start date and end date
     *
     * @param cellName
     * @param startDate
     * @param endDate
     * @return
     */
    public List<Oee> getPeriodOeeByCellName(String cellName, Date startDate, Date endDate) {
        String sql = "SELECT * FROM oee WHERE add_date BETWEEN ? AND ? AND cell_name = ?";
        return jdbc.query(sql, new Object[]{startDate, endDate, cellName}, new OeeMapper());
    }


    /**
     * Get a week records of specific cell based on current date
     *
     * @param cellName
     * @param curDate
     * @return
     */
    public List<Oee> getWeeklyOeeByCellName(String cellName, Date curDate) {
        Calendar calendar = Calendar.getInstance();
        calendar.setFirstDayOfWeek(Calendar.MONDAY);
        calendar.setTime(curDate);
        calendar.set(Calendar.DAY_OF_WEEK, calendar.getFirstDayOfWeek());
        return getPeriodOeeByCellName(cellName, new Date(calendar.getTime().getTime()), curDate);
    }

    /**
     * Get a month records of specific cell based on current date
     *
     * @param cellName
     * @param curDate
     * @return
     */
    public List<Oee> getMonthlyOeeByCellName(String cellName, Date curDate) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(curDate);
        calendar.set(Calendar.DAY_OF_MONTH, 1);
        return getPeriodOeeByCellName(cellName, new Date(calendar.getTime().getTime()), curDate);
    }

    /**
     * Get a year records of specific cell based on current date
     *
     * @param cellName
     * @param curDate
     * @return
     */
    public List<Oee> getYearlyOeeByCellName(String cellName, Date curDate) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(curDate);
        calendar.set(Calendar.MONTH, 0);
        calendar.set(Calendar.DAY_OF_MONTH, 1);
        return getPeriodOeeByCellName(cellName, new Date(calendar.getTime().getTime()), curDate);
    }

    /**
     * Get all oee records of all cells during a period based on start date and end date
     *
     * @param startDate
     * @param endDate
     * @return
     */
    public List<Oee> getAllCellsPeriodOee(Date startDate, Date endDate) {
        String sql = "SELECT * FROM oee WHERE add_date BETWEEN ? AND ?";
        return jdbc.query(sql, new Object[]{startDate, endDate}, new OeeMapper());
    }


    /**
     * Get a week records of of all cells based on current date
     *
     * @param curDate
     * @return
     */
    public List<Oee> getAllCellsWeeklyOee(Date curDate) {
        Calendar calendar = Calendar.getInstance();
        calendar.setFirstDayOfWeek(Calendar.MONDAY);
        calendar.setTime(curDate);
        calendar.set(Calendar.DAY_OF_WEEK, calendar.getFirstDayOfWeek());
        return getAllCellsPeriodOee(new Date(calendar.getTime().getTime()), curDate);
    }

    /**
     * Get a month records of of all cells based on current date
     *
     * @param curDate
     * @return
     */
    public List<Oee> getAllCellsMonthlyOee(Date curDate) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(curDate);
        calendar.set(Calendar.DAY_OF_MONTH, 1);
        return getAllCellsPeriodOee(new Date(calendar.getTime().getTime()), curDate);
    }

    /**
     * Get a year records of of all cells based on current date
     *
     * @param curDate
     * @return
     */
    public List<Oee> getAllCellsYearlyOee(Date curDate) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(curDate);
        calendar.set(Calendar.MONTH, 0);
        calendar.set(Calendar.DAY_OF_MONTH, 1);
        return getAllCellsPeriodOee(new Date(calendar.getTime().getTime()), curDate);
    }
}
