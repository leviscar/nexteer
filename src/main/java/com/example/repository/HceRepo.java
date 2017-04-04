package com.example.repository;

import com.example.mapper.HceMapper;
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
     * 添加实际hce记录
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
     * 添加目标hce记录
     *
     * @param hce
     * @return
     */
    public String addTargetHce(Hce hce) {
        jdbc.update("IF NOT EXISTS (SELECT * FROM hce WHERE add_date = ? AND cell_name = ?)" +
                        "INSERT INTO hce (target_hce, add_date, cell_name) VALUES (?, ?, ?)" +
                        "ELSE UPDATE hce SET target_hce = ? WHERE add_date = ? AND cell_name = ?"
                , hce.getAddDate(), hce.getCellName(), hce.getTargetHce(), hce.getAddDate(), hce.getCellName()
                , hce.getTargetHce(), hce.getAddDate(), hce.getCellName());
        return new Gson().toJson(hce);
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
