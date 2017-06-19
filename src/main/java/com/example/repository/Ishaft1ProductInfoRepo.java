package com.example.repository;

import com.example.mapper.ProductInfoMapper;
import com.example.model.ProductInfo;
import com.example.util.DateFormat;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
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
public class Ishaft1ProductInfoRepo {
    private JdbcTemplate jdbc;

    @Autowired
    public Ishaft1ProductInfoRepo(@Qualifier("twoJdbcTemplate") JdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }

    /**
     * Get the ishaft1 product information based on start time, end time and station id
     *
     * @param startTime
     * @param endTime
     * @return
     */
    public List<ProductInfo> getByPeriod(Date startTime, Date endTime, String stationId) {
        SimpleDateFormat sdf = DateFormat.timeFormat();
        String start = sdf.format(startTime);
        String end = sdf.format(endTime);
        return jdbc.query("SELECT Timestamp, Model FROM ._status WHERE ID IN (SELECT MIN(ID) FROM ._status " +
                        "WHERE Timestamp BETWEEN ? AND ? AND Status = '9999' AND StationID = ? GROUP BY Serial) ORDER BY Timestamp"
                , new Object[]{start, end, stationId}, new ProductInfoMapper());
    }

    /**
     * Get the topN records from start time to end time
     *
     * @param startDate
     * @param curDate
     * @param topN
     * @return
     */
    public List<Date> getCurBeats(Date startDate, Date curDate, String stationId, int topN) {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String sql = "SELECT TOP (?) Timestamp FROM ._status WHERE ID IN (SELECT MIN(ID) FROM ._status WHERE Timestamp" +
                " BETWEEN ? AND ? AND Status = '9999' AND StationID = ? GROUP BY Serial)" +
                " ORDER BY Timestamp DESC";
        return jdbc.query(sql, new Object[]{topN, sdf.format(startDate), sdf.format(curDate), stationId}, new RowMapper<Date>() {
            @Override
            public Date mapRow(ResultSet resultSet, int i) throws SQLException {
                return resultSet.getTimestamp("Timestamp");
            }
        });
    }
}
