package com.example.repository;

import com.example.mapper.QualityComplainMapper;
import com.example.model.QualityComplain;
import com.example.util.DateFormat;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.List;

/**
 * Created by mrpan on 2017/4/18.
 */
@Repository
public class QualityComplainRepo {
    private JdbcTemplate jdbc;

    @Autowired
    public QualityComplainRepo(@Qualifier(value = "oneJdbcTemplate") JdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }

    /**
     * Get a quality complain record on a specific date
     *
     * @param date
     * @return
     * @throws ParseException
     */
    public List<QualityComplain> findByDate(String date) throws ParseException {
        return jdbc.query("SELECT * FROM quality_complain WHERE add_date = ?", new Object[]{date}, new QualityComplainMapper());
    }

    /**
     * Get all records
     *
     * @return
     */
    public List<QualityComplain> findAll() {
        String sql = "SELECT * FROM quality_complain";
        return jdbc.query(sql, new QualityComplainMapper());
    }

    /**
     * Get all records which no_complain = 0
     *
     * @return
     */
    public List<QualityComplain> findBySafeState() {
        String sql = "SELECT * FROM quality_complain WHERE no_complain = 0";
        return jdbc.query(sql, new QualityComplainMapper());
    }

    /**
     * Add a quality complain record into database
     *
     * @param qualityComplain
     * @return
     * @throws ParseException
     */
    public QualityComplain add(QualityComplain qualityComplain) throws ParseException {
        SimpleDateFormat sdf = DateFormat.dateFormat();
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(sdf.parse(qualityComplain.getAddDate()));
        calendar.add(Calendar.DAY_OF_YEAR, -1);
        List<QualityComplain> res = findByDate(sdf.format(calendar.getTime()));
        String log = qualityComplain.getLog();
        String addDate = qualityComplain.getAddDate();
        if (res.isEmpty()) {
            int count = 1;
            qualityComplain.setCount(count);
            int noComplain = 1;
            qualityComplain.setNoComplain(noComplain);
            jdbc.update("IF NOT EXISTS(SELECT * FROM quality_complain WHERE add_date = ?)" +
                            "INSERT INTO quality_complain (add_date, no_complain, count, log) VALUES (?, ?, ?, ?)" +
                            "ELSE UPDATE quality_complain SET no_complain = ?, count = ?, log = ? WHERE add_date = ?"
                    , addDate, addDate, noComplain, count, log, noComplain, count, log, addDate);
        } else {
            int noComplain = 1;
            qualityComplain.setNoComplain(noComplain);
            int count = res.get(0).getCount() + 1;
            qualityComplain.setCount(count);
            jdbc.update("IF NOT EXISTS(SELECT * FROM quality_complain WHERE add_date = ?)" +
                            "INSERT INTO quality_complain (add_date, no_complain, count, log) VALUES (?, ?, ?, ?)" +
                            "ELSE UPDATE quality_complain SET no_complain = ?, count = ?, log = ? WHERE add_date = ?"
                    , addDate, addDate, noComplain, count, log, noComplain, count, log, addDate);
        }
        return qualityComplain;
    }


    /**
     * Update the quality complain record
     *
     * @param qualityComplain
     */
    public QualityComplain update(QualityComplain qualityComplain) throws ParseException {
        int noComplain;
        if (qualityComplain.getNoComplain() == 0) {
            noComplain = 0;
        } else {
            noComplain = 1;
        }
        qualityComplain.setNoComplain(noComplain);
        if (qualityComplain.getLog() == null || "".equals(qualityComplain.getLog())) {
            qualityComplain.setLog("There is no complain");
        }
        String log = qualityComplain.getLog();
        int count = qualityComplain.getCount();
        String addDate = qualityComplain.getAddDate();
        jdbc.update("UPDATE quality_complain SET no_complain = ?, count = ?, log = ? WHERE add_date = ?"
                , noComplain, count, log, addDate);
        return qualityComplain;
    }

    /**
     * Get the max no complain value
     *
     * @return
     */
    public int getMax() {
        return jdbc.queryForObject("SELECT MAX(count) FROM quality_complain", Integer.class);
    }

}
