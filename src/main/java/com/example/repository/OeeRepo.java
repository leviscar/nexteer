package com.example.repository;

import com.example.mapper.OeeMapper;
import com.example.model.Oee;
import com.google.gson.Gson;
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
     * 添加oee
     *
     * @param oee
     * @return
     */
    public String add(Oee oee) {
        String sql = "INSERT INTO oee (oee, add_date, cell_name) VALUES(?, ?, ?)";
        jdbc.update(sql, oee.getOee(), oee.getAddDate(), oee.getCellName());
        return new Gson().toJson(oee);
    }

    /**
     * 获得某产线某一个周期的oee
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
     * 按周获取某产线的oee
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
     * 按月获取某产线的oee
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
     * 按年获取某产线的oee
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
}
