package com.example.repository;

import com.example.mapper.AssemblyInfoMapper;
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
 * Created by mrpan on 2017/5/3.
 */
@Repository
public class BepsProductInfoRepo {
    private JdbcTemplate bepsJdbc;
    private JdbcTemplate cell5Jdbc;
    @Autowired
    public BepsProductInfoRepo(@Qualifier("bepsJdbc") JdbcTemplate bepsJdbc
            , @Qualifier("cell5Jdbc") JdbcTemplate cell5Jdbc) {
        this.bepsJdbc = bepsJdbc;
        this.cell5Jdbc = cell5Jdbc;
    }

    /**
     * Get the different cells' product information based on start time, end time and station id
     *
     * @param start
     * @param end
     * @param stationId
     * @return
     */
    public List<ProductInfo> getByPeriodAndStationId(Date start, Date end, String stationId) {
        SimpleDateFormat timeFormat = DateFormat.timeFormat();
        String startTime = timeFormat.format(start);
        String endTime = timeFormat.format(end);
        return bepsJdbc.query("SELECT Timestamp, Model FROM ._status WHERE ID IN (SELECT MIN(ID) FROM ._status " +
                        "WHERE Timestamp BETWEEN ? AND ? AND Status = '9999' AND StationID = ? GROUP BY serial) ORDER BY Timestamp"
                , new Object[]{startTime, endTime, stationId}, new ProductInfoMapper());
    }

    /**
     * Get the topN records from start time to end time based on station id
     *
     * @param start
     * @param curr
     * @param topN
     * @return
     */
    public List<Date> getTopN(Date start, Date curr, int topN, String stationId) {
        SimpleDateFormat timeFormat = DateFormat.timeFormat();
        String startTime = timeFormat.format(start);
        String endTime = timeFormat.format(curr);
        String sql = "SELECT TOP (?) Timestamp FROM ._status WHERE ID IN (SELECT MIN(ID) FROM ._status " +
                "WHERE Timestamp BETWEEN ? AND ? AND Status = '9999' AND StationID = ? GROUP BY Serial) ORDER BY Timestamp DESC";
        return bepsJdbc.query(sql, new Object[]{topN, startTime, endTime, stationId}, new RowMapper<Date>() {
            @Override
            public Date mapRow(ResultSet resultSet, int i) throws SQLException {
                return resultSet.getTimestamp("Timestamp");
            }
        });
    }

    /**
     * Get records of ceps cell 5  based on start time and end time
     * @param start
     * @param end
     * @return
     */
    public List<ProductInfo> getCell5ByPeriod(Date start, Date end){
        SimpleDateFormat timeFormat = DateFormat.timeFormat();
        String startTime = timeFormat.format(start);
        String endTime = timeFormat.format(end);
        return cell5Jdbc.query("SELECT TimeStamp, NexteerModel FROM PackingList_BEPS WHERE ID IN (SELECT MIN(ID) " +
                "FROM PackingList_BEPS WHERE TimeStamp BETWEEN ? AND ? GROUP BY PartSerial) ORDER BY TimeStamp", new Object[]{startTime, endTime}, new AssemblyInfoMapper());
    }

    /**
     * Get the topN records of ceps cell 5 from start time to end time based on station id
     *
     * @param start
     * @param curr
     * @param topN
     * @return
     */
    public List<Date> getCell5TopN(Date start, Date curr, int topN) {
        SimpleDateFormat timeFormat = DateFormat.timeFormat();
        String startTime = timeFormat.format(start);
        String endTime = timeFormat.format(curr);
        String sql = "SELECT TOP (?) Timestamp FROM PackingList_BEPS WHERE ID IN (SELECT MIN(ID) " +
                "FROM PackingList_BEPS WHERE TimeStamp BETWEEN ? AND ? GROUP BY PartSerial) ORDER BY TimeStamp DESC";
        return cell5Jdbc.query(sql, new Object[]{topN, startTime, endTime}, new RowMapper<Date>() {
            @Override
            public Date mapRow(ResultSet resultSet, int i) throws SQLException {
                return resultSet.getTimestamp("TimeStamp");
            }
        });
    }
}
