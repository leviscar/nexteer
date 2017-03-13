package com.example.repository;

import com.example.config.TargetDataSource;
import com.example.mapper.Ishaft1ProductMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

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

    @TargetDataSource("ds1")
    public List getByPeriod(Date startTime, Date endTime) {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String start = sdf.format(startTime);
        String end = sdf.format(endTime);
        String sql = "select Timestamp, Model from ._status where ID in (select MIN(ID) from ._status where Timestamp between ? and ? and Status = '9999' and StationName = 'LABELBENCH' Group by Serial)";
        return jdbc.query(sql, new Object[]{start, end}, new Ishaft1ProductMapper());
    }
}
