package com.example.repository;

import com.example.mapper.WorkShiftMapper;
import com.example.model.WorkShift;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.text.ParseException;
import java.util.List;

/**
 * Created by mrpan on 2017/3/9.
 */
@Repository
public class WorkShiftRepo {
    private JdbcTemplate jdbc;

    @Autowired
    public WorkShiftRepo(@Qualifier("oneJdbcTemplate") JdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }

    /**
     * Add shift
     *
     * @param ws
     * @return
     */
    public WorkShift add(WorkShift ws) throws ParseException {
        String sql = "IF NOT exists(SELECT * FROM work_shift WHERE add_date = ? AND cell_name = ? AND shift_type = ?)" +
                "INSERT INTO work_shift (add_date, cell_name, shift_type, target, start_time, end_time, standard_beat" +
                ", normal_worker_num, overtime_worker_num, is_open) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)" +
                "ELSE UPDATE work_shift SET target = ?, start_time= ?, end_time= ?, standard_beat= ?" +
                ", normal_worker_num= ?, overtime_worker_num = ?, is_open = ? WHERE add_date = ? AND cell_name = ? " +
                "AND shift_type = ?";
        jdbc.update(sql, ws.getAddDate(), ws.getCellName(), ws.getShiftType(), ws.getAddDate(), ws.getCellName()
                , ws.getShiftType(), ws.getTarget(), ws.getStartTime(), ws.getEndTime(), ws.getStandardBeat()
                , ws.getNormalWorkerNum(), ws.getOvertimeWorkerNum(), ws.isOpen(), ws.getTarget(), ws.getStartTime()
                , ws.getEndTime(), ws.getStandardBeat(), ws.getNormalWorkerNum(), ws.getOvertimeWorkerNum(), ws.isOpen()
                , ws.getAddDate(), ws.getCellName(), ws.getShiftType());
        return ws;
    }

    /**
     * Update work shift
     *
     * @param ws
     * @return
     */
    public WorkShift update(WorkShift ws) {
        jdbc.update("UPDATE work_shift SET target = ?, start_time= ?, end_time= ?, standard_beat= ?, normal_worker_num= ?" +
                        ", overtime_worker_num = ?, is_open = ? WHERE add_date = ? AND cell_name = ? AND shift_type = ?"
                , ws.getTarget(), ws.getStartTime(), ws.getEndTime(), ws.getStandardBeat(), ws.getNormalWorkerNum()
                , ws.getOvertimeWorkerNum(), ws.isOpen(), ws.getAddDate(), ws.getCellName(), ws.getShiftType());
        return ws;
    }

    /**
     * Get latest work shift based on cell name and shift type
     *
     * @param cellName
     * @return
     */
    public List<WorkShift> getLatestByShiftType(String cellName, String shiftType) {
        String sql = "SELECT TOP 1 * FROM work_shift WHERE cell_name = ? AND shift_type = ? ORDER BY add_date DESC";
        return jdbc.query(sql, new Object[]{cellName, shiftType}, new WorkShiftMapper());
    }

    /**
     * Get work shift base on cell name and shift type which is nearest close to current date
     *
     * @param cellName
     * @param shiftType
     * @param curDate
     * @return
     */
    public List<WorkShift> getLatestByCurDate(String cellName, String shiftType, Date curDate) {
        return jdbc.query("SELECT TOP 1 * FROM work_shift WHERE cell_name = ? AND shift_type = ? AND add_date <= ? " +
                "ORDER BY add_date DESC", new Object[]{cellName, shiftType, curDate}, new WorkShiftMapper());
    }

    /**
     * Get lasted work shift based on cell name and current time(like 06:50)
     *
     * @param cellName
     * @param curTime
     * @return
     */
    public List<WorkShift> getLatestByCurTime(String cellName, String curTime) {
        return jdbc.query("SELECT TOP 1 * FROM work_shift WHERE cell_name  = ? AND start_time <= ? AND end_time >= ? " +
                "ORDER BY add_date DESC", new Object[]{cellName, curTime, curTime}, new WorkShiftMapper());
    }
}
