package com.example.repository;

import com.example.model.SafetyDate;
import org.springframework.beans.factory.annotation.Autowired;
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
 * 安全运行天数数据库接口
 */
@Repository
public class SafetyDateRepo {
    private JdbcTemplate jdbc;

    @Autowired
    public SafetyDateRepo(JdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }

    public List<SafetyDate> findByDate(String year, String month, String day) {
        return jdbc.query("select * " + "from SafetyDate WHERE YEAR = ? and MONTH = ? and DAY = ?", new Object[]{year, month, day}, new RowMapper<SafetyDate>() {
            @Override
            public SafetyDate mapRow(ResultSet resultSet, int i) throws SQLException {
                SafetyDate safetyDate = new SafetyDate();
                safetyDate.setIsSafe(resultSet.getInt("isSafe"));
                safetyDate.setYear(resultSet.getString("year"));
                safetyDate.setMonth(resultSet.getString("month"));
                safetyDate.setDay(resultSet.getString("day"));
                safetyDate.setSafeDates(resultSet.getInt("safeDates"));
                return safetyDate;
            }
        });
    }

    /**
     * 添加安全天数
     *
     * @param safetyDate
     * @throws ParseException
     */
    public void addSafetyDate(SafetyDate safetyDate) throws ParseException {
        // 获得前一天的安全天数
        String year = safetyDate.getYear();
        String month = safetyDate.getMonth();
        String day = safetyDate.getDay();
        String s = year + month + day;
        SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd");
        Date date = sdf.parse(s);
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        calendar.add(Calendar.DAY_OF_YEAR, -1);
        String newDate = sdf.format(calendar.getTime());
        List<SafetyDate> res = findByDate(newDate.substring(0, 4), newDate.substring(4, 6), newDate.substring(6, 8));
        if (res.isEmpty()) {
            jdbc.update("INSERT INTO SafetyDate (year, month, day, safeDates, isSafe) VALUES (?,?,?,?,?)", year, month, day, 0, 1);
        } else {
            jdbc.update("INSERT INTO SafetyDate (year, month, day, safeDates, isSafe) VALUES (?,?,?,?,?)", year, month, day, res.get(0).getSafeDates() + 1, 1);
        }
    }

    /**
     * 重置安全天数
     * @param safetyDate
     */
    public SafetyDate resetSafetyDate(SafetyDate safetyDate) {
        if (safetyDate.getSafeDates() == 0){
            safetyDate.setIsSafe(0);
        } else {
            safetyDate.setIsSafe(1);
        }
        jdbc.update("UPDATE SafetyDate SET isSafe = ?, safeDates = ? WHERE YEAR = ? and MONTH  = ? and DAY = ?",
                safetyDate.getIsSafe(), safetyDate.getSafeDates(), safetyDate.getYear(), safetyDate.getMonth(), safetyDate.getDay());
        return safetyDate;
    }
}
