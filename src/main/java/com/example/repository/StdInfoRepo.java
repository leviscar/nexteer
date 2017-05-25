package com.example.repository;

import com.example.mapper.StdInfoMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

/**
 * Created by mrpan on 2017/5/25.
 */
@Repository
public class StdInfoRepo {
    private JdbcTemplate jdbc;

    @Autowired
    public StdInfoRepo(@Qualifier("oneJdbcTemplate") JdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }

    /**
     * Get all standard beat for specific cell
     *
     * @param cellName
     * @return
     */
    public List<Integer> getStandardBeats(String cellName) {
        return jdbc.query("SELECT standard_beat FROM std_info WHERE cell_name = ? GROUP BY standard_beat ORDER BY standard_beat", new Object[]{cellName}, new RowMapper<Integer>() {
            @Override
            public Integer mapRow(ResultSet resultSet, int i) throws SQLException {
                return resultSet.getInt("standard_beat");
            }
        });
    }

    /**
     * Get total worker num for specific cell and standard beat
     *
     * @param cellName
     * @param standardBeat
     * @return
     */
    public int getTotalWorkNum(String cellName, int standardBeat) {
        return jdbc.queryForObject("SELECT sum(unit_num) FROM std_info WHERE cell_name = ? AND standard_beat = ?"
                , new Object[]{cellName, standardBeat}, Integer.class);
    }

    /**
     * Get worker numbers for specific unit
     *
     * @param cellName
     * @param standardBeat
     * @param unitId
     * @return
     */
    public int getWorkNumByUnit(String cellName, int standardBeat, int unitId) {
        return jdbc.queryForObject("SELECT unit_num FROM std_info WHERE cell_name = ? AND standard_beat = ?" +
                " AND unit_id = ?", new Object[]{cellName, standardBeat, unitId}, Integer.class);
    }
}
