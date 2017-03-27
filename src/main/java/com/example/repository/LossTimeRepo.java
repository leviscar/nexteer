package com.example.repository;

import com.example.mapper.LossTimeMapper;
import com.example.model.LossTime;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

/**
 * Created by mrpan on 2017/3/25.
 */
@Repository
public class LossTimeRepo {
    private JdbcTemplate jdbc;

    public LossTimeRepo(@Qualifier("threeJdbcTemplate") JdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }

    /**
     * 根据产线Id获得所有设备的损失时间
     *
     * @param cellId
     * @param startTime
     * @param endTime
     * @return 损失时间列表
     */
    public List<LossTime> getLossTimeByCellId(int cellId, Date startTime, Date endTime) {
        String sql = "SELECT TIME1, TIME3 FROM D03_CALL WHERE TIME1 > ? AND TIME3 < ? AND D03_CALL.DEV_ID IN (SELECT DEV_ID FROM C02_DEV WHERE CELL_ID = ?)";
        return jdbc.query(sql, new Object[]{startTime, endTime, cellId}, new LossTimeMapper());
    }
}
