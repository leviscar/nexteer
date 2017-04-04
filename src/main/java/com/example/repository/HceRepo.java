package com.example.repository;

import com.example.mapper.HceMapper;
import com.example.model.Hce;
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
     * 添加记录
     *
     * @param hce
     * @return
     */
    public int add(Hce hce) {
        return jdbc.update("insert into hce (hce, add_date, cell_name) values (?, ?, ?)", hce.getHce(), hce.getAddDate(), hce.getCellName());
    }

    /**
     * 获得某产线某一个周期的hce
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
     * 按周获取某产线的hce
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
     * 按月获取某产线的hce
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
     * 按年获取某产线的hce
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

}
