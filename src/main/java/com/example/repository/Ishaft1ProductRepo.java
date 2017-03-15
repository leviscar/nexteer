package com.example.repository;

import com.example.config.TargetDataSource;
import com.example.mapper.Ishaft1ProductMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

/**
 * Created by mrpan on 2017/3/12.
 */
@Repository
public class Ishaft1ProductRepo {
    private JdbcTemplate jdbc;

    @Autowired
    public Ishaft1ProductRepo(JdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }

    /**
     * 获得某时间段内生产产品的信息
     *
     * @param startTime
     * @param endTime
     * @return
     */
    @TargetDataSource("ds1")
    public List getByPeriod(Date startTime, Date endTime) {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String start = sdf.format(startTime);
        String end = sdf.format(endTime);
        String sql = "SELECT Timestamp, Model FROM ._status WHERE ID IN (SELECT MIN(ID) FROM ._status WHERE Timestamp BETWEEN ? AND ? AND Status = '9999' AND StationName = 'LABELBENCH' GROUP BY Data000)";
        return jdbc.query(sql, new Object[]{start, end}, new Ishaft1ProductMapper());
    }

    /**
     * 获取从当前时刻开始的前topN条记录
     *
     * @param startDate
     * @param curDate
     * @param topN
     * @return
     */
    @TargetDataSource("ds1")
    public List<Date> getCurBeats(Date startDate, Date curDate, int topN) {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String sql = "SELECT TOP (?) Timestamp FROM ._status WHERE ID IN (SELECT MIN(ID) FROM ._status WHERE Timestamp BETWEEN ? AND ? AND Status = '9999' AND StationName = 'LABELBENCH' GROUP BY Serial) ORDER BY Timestamp DESC";
        return jdbc.query(sql, new Object[]{topN, sdf.format(startDate), sdf.format(curDate)}, new RowMapper<Date>() {
            @Override
            public Date mapRow(ResultSet resultSet, int i) throws SQLException {
                return resultSet.getTimestamp("Timestamp");
            }
        });
    }
}
