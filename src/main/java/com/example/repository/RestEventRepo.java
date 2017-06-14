package com.example.repository;

import com.example.mapper.RestEventMapper;
import com.example.model.RestEvent;
import com.example.model.WorkShift;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by mrpan on 2017/3/14.
 */
@Repository
public class RestEventRepo {
    private JdbcTemplate jdbc;
    private WorkShiftRepo wsRepo;

    @Autowired
    public RestEventRepo(@Qualifier("oneJdbcTemplate") JdbcTemplate jdbc, WorkShiftRepo wsRepo) {
        this.jdbc = jdbc;
        this.wsRepo = wsRepo;
    }

    /**
     * Add rest event
     *
     * @param rEvent
     * @return
     */
    public RestEvent add(RestEvent rEvent) {
        String cellName = rEvent.getCellName();
        String shiftType = rEvent.getShiftType();
        String startTime = rEvent.getStartTime();
        String endTime = rEvent.getEndTime();
        String event = rEvent.getEvent();
        WorkShift ws = wsRepo.getLatestByShiftType(cellName, shiftType).get(0);
        int wsId = ws.getId();
        rEvent.setWorkShiftId(wsId);
        String sql = "IF NOT exists(SELECT * FROM rest_event WHERE work_shift_id = ? AND start_time = ? AND end_time = ?)" +
                "INSERT INTO rest_event (work_shift_id, cell_name, shift_type, event, start_time, end_time)" +
                "VALUES (?,?,?,?,?,?) ELSE UPDATE rest_event SET cell_name = ?, shift_type = ?, event = ?" +
                " WHERE work_shift_id = ? AND start_time = ? AND end_time = ?";
        jdbc.update(sql, wsId, startTime, endTime, wsId, cellName, shiftType, event, startTime, endTime
                , cellName, shiftType, event, wsId, startTime, endTime);
        return rEvent;
    }

    /**
     * Get all the rest events based work shift id
     *
     * @param wsId
     * @return
     */
    public List<RestEvent> getByWorkShiftId(int wsId) {
        String sql = "SELECT * FROM rest_event WHERE work_shift_id = ?";
        return jdbc.query(sql, new Object[]{wsId}, new RestEventMapper());
    }

    /**
     * Delete specific rest event
     *
     * @param id
     */
    public void delete(int id) {
        jdbc.update("DELETE FROM rest_event WHERE id = ?", id);
    }
}
