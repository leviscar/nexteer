package com.example.repository;

import com.example.mapper.StdInfoMapper;
import com.example.model.StdInfo;
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

    /**
     * Add std information into database
     *
     * @param stdInfo
     * @return
     */
    public StdInfo add(StdInfo stdInfo) {
        String cellName = stdInfo.getCellName();
        int standardBeat = stdInfo.getStandardBeats();
        int unitId = stdInfo.getUnitId();
        int unitNum = stdInfo.getUnitNum();
        jdbc.update("IF exists(SELECT * FROM std_info WHERE cell_name = ? AND standard_beat = ? AND unit_id = ?) " +
                        "UPDATE std_info SET unit_num = ? WHERE cell_name = ? AND standard_beat = ? AND unit_id = ? ELSE " +
                        "INSERT INTO std_info (cell_name, standard_beat, unit_id, unit_num) VALUES (?,?,?,?)"
                , cellName, standardBeat, unitId, unitNum, cellName, standardBeat, unitId, cellName, standardBeat, unitId, unitNum);
        return stdInfo;
    }

    /**
     * Delete record based on cell name and standard beat
     *
     * @param cellName
     * @param standardBeat
     */
    public void delete(String cellName, int standardBeat) {
        jdbc.update("DELETE FROM std_info WHERE cell_name = ? AND standard_beat = ?", cellName, standardBeat);
    }

    /**
     * Get all records based on cell name
     *
     * @param cellName
     * @return
     */
    public List<StdInfo> getByCell(String cellName) {
        return jdbc.query("SELECT * FROM std_info WHERE cell_name = ? ORDER BY standard_beat, unit_id"
                , new Object[]{cellName}, new StdInfoMapper());
    }
}
