package com.example.repository;

import com.example.mapper.Ishaft1OutputInfoMapper;
import com.example.model.Ishaft1OutputInfo;
import com.google.gson.JsonObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.Calendar;
import java.util.Date;
import java.util.List;


/**
 * Created by mrpan on 2017/3/18.
 */
@Repository
public class Ishaft1OutputInfoRepo {
    private JdbcTemplate jdbc;

    @Autowired
    public Ishaft1OutputInfoRepo(@Qualifier("oneJdbcTemplate") JdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }

    /**
     * 添加当天的数据
     *
     * @param outputInfo
     * @return
     */
    public String add(Ishaft1OutputInfo outputInfo) {
        String sql = "INSERT INTO ishaft1_output_info (add_date, model, output_count, model_name) VALUES(?, ?, ?, ?)";
        jdbc.update(sql, outputInfo.getAdd_date(), outputInfo.getModel(), outputInfo.getOutput_count(), outputInfo.getModel_name());
        JsonObject jsonObject = new JsonObject();
        jsonObject.addProperty("status", true);
        jsonObject.addProperty("log", "add ok");
        return jsonObject.toString();
    }

    /**
     * 根据时间段获取产量信息
     *
     * @param start
     * @param end
     * @return
     */
    public List<Ishaft1OutputInfo> getByPeriod(Date start, Date end) {
        String sql = "SELECT * FROM ishaft1_output_info WHERE add_date BETWEEN ? AND ?";
        return jdbc.query(sql, new Object[]{start, end}, new Ishaft1OutputInfoMapper());
    }

    /**
     * 获得一周的数据
     *
     * @param curDate
     * @return
     */
    public List<Ishaft1OutputInfo> getByWeek(Date curDate) {
        // 获得该星期的第一天
        Calendar calendar = Calendar.getInstance();
        calendar.setFirstDayOfWeek(Calendar.MONDAY);
        calendar.setTime(curDate);
        calendar.set(Calendar.DAY_OF_WEEK, calendar.getFirstDayOfWeek());
        Date start = calendar.getTime();
        return getByPeriod(start, curDate);
    }

    /**
     * 获取一月的数据
     *
     * @param curDate
     * @return
     */
    public List<Ishaft1OutputInfo> getByMonth(Date curDate) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(curDate);
        calendar.set(Calendar.DAY_OF_MONTH, 1);
        Date start = calendar.getTime();
        return getByPeriod(start, curDate);
    }

    /**
     * 获取一年的数据
     *
     * @param curDate
     * @return
     */
    public List<Ishaft1OutputInfo> getByYear(Date curDate) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(curDate);
        calendar.set(Calendar.MONTH, 0);
        calendar.set(Calendar.DAY_OF_MONTH, 1);
        Date start = calendar.getTime();
        return getByPeriod(start, curDate);
    }
}
