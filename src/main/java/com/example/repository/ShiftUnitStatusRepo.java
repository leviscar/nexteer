package com.example.repository;

import com.example.mapper.ShiftUnitStatusMapper;
import com.example.model.ShiftUnitStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by mrpan on 2017/4/16.
 */
@Repository
public class ShiftUnitStatusRepo {
    private JdbcTemplate jdbc;

    @Autowired
    public ShiftUnitStatusRepo(@Qualifier("oneJdbcTemplate") JdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }

    /**
     * Add shift unit status into database
     *
     * @param shiftUnitStatus
     * @return
     */
    public int add(ShiftUnitStatus shiftUnitStatus) {
        return jdbc.update("INSERT INTO shift_unit_status (cell_name, shift_type, add_date, unit_status) VALUES (?, ?, ?, ?);"
                , shiftUnitStatus.getCellName(), shiftUnitStatus.getShiftType()
                , shiftUnitStatus.getAddDate(), shiftUnitStatus.getUnitStatus());
    }

    /**
     * Get unit status based on cell name, date and shift type
     *
     * @param cellName
     * @param date
     * @param shiftType
     * @return
     */
    public List<ShiftUnitStatus> getByCellDateAndShift(String cellName, String date, String shiftType) {
        return jdbc.query("SELECT * FROM shift_unit_status WHERE cell_name = ? AND add_date = ? AND shift_type = ?"
                , new Object[]{cellName, date, shiftType}, new ShiftUnitStatusMapper());
    }
}
