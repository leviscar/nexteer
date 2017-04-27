package com.example.repository;

import com.example.mapper.OutputCountInfoMapper;
import com.example.model.OutputCountInfo;
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
public class OutputCountInfoRepo {
    private JdbcTemplate jdbc;

    @Autowired
    public OutputCountInfoRepo(@Qualifier("oneJdbcTemplate") JdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }

    /**
     * Add daily output
     *
     * @param outputInfo
     * @return
     */
    public OutputCountInfo add(OutputCountInfo outputInfo) {
        String sql = "INSERT INTO output_count_info (cell_name, add_date, count, model_id, model_name) " +
                "VALUES(?, ?, ?, ?, ?)";
        jdbc.update(sql, outputInfo.getCellName(), outputInfo.getAddDate(), outputInfo.getCount()
                , outputInfo.getModelId(), outputInfo.getModelName());
        return outputInfo;
    }

    /**
     * Get output information of specific cell based on a period
     *
     * @param start
     * @param end
     * @return
     */
    public List<OutputCountInfo> getByPeriod(Date start, Date end, String cellName) {
        String sql = "SELECT * FROM output_count_info WHERE add_date BETWEEN ? AND ? AND cell_name = ?";
        return jdbc.query(sql, new Object[]{start, end, cellName}, new OutputCountInfoMapper());
    }

    /**
     * Get output information of specific cell based on a week
     *
     * @param curDate
     * @return
     */
    public List<OutputCountInfo> getByWeek(Date curDate, String cellName) {
        Calendar calendar = Calendar.getInstance();
        calendar.setFirstDayOfWeek(Calendar.MONDAY);
        calendar.setTime(curDate);
        calendar.set(Calendar.DAY_OF_WEEK, calendar.getFirstDayOfWeek());
        Date start = calendar.getTime();
        return getByPeriod(start, curDate, cellName);
    }

    /**
     * Get output information of specific cell based on a month
     *
     * @param curDate
     * @return
     */
    public List<OutputCountInfo> getByMonth(Date curDate, String cellName) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(curDate);
        calendar.set(Calendar.DAY_OF_MONTH, 1);
        Date start = calendar.getTime();
        return getByPeriod(start, curDate, cellName);
    }

    /**
     * Get output information of specific cell based on a year
     *
     * @param curDate
     * @return
     */
    public List<OutputCountInfo> getByYear(Date curDate, String cellName) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(curDate);
        calendar.set(Calendar.MONTH, 0);
        calendar.set(Calendar.DAY_OF_MONTH, 1);
        Date start = calendar.getTime();
        return getByPeriod(start, curDate, cellName);
    }
}
