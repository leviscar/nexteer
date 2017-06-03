package com.example.repository;

import com.example.mapper.PollingPageMapper;
import com.example.model.PollingPage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * User: cheng
 * Date: 17-6-3
 * Description:
 */
@Repository
public class PollingPageRepo {
    private JdbcTemplate jdbc;

    @Autowired
    public PollingPageRepo(@Qualifier("oneJdbcTemplate") JdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }

    /**
     * Add polling page into database
     *
     * @param pg
     * @return
     */
    public PollingPage add(PollingPage pg) {
        jdbc.update("INSERT INTO polling_page (cell_name, is_polling, interval) VALUES (?,?,?)"
                , pg.getCellName(), pg.getIsPolling(), pg.getInterval());
        return pg;
    }

    /**
     * Delete polling page based on cell name
     *
     * @param cellName
     */
    public void delete(String cellName) {
        jdbc.update("DELETE FROM polling_page WHERE cell_name = ?", cellName);
    }

    /**
     * Get all polling pages from database
     *
     * @return
     */
    public List<PollingPage> getAll() {
        return jdbc.query("SELECT * FROM polling_page", new PollingPageMapper());
    }

    /**
     * Get specific polling page based cell name
     *
     * @param cellName
     * @return
     */
    public List<PollingPage> getByCellName(String cellName) {
        return jdbc.query("SELECT * FROM polling_page WHERE cell_name = ?", new Object[]{cellName}, new PollingPageMapper());
    }

    /**
     * Update polling page
     *
     * @param pg
     * @return
     */
    public PollingPage update(PollingPage pg) {
        jdbc.update("UPDATE polling_page SET is_polling = ?, interval = ? WHERE cell_name = ?"
                , pg.getIsPolling(), pg.getInterval(), pg.getCellName());
        return pg;
    }
}
