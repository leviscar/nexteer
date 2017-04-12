package com.example.repository;

import com.example.mapper.RestEventWithWorkShiftMapper;
import com.example.model.RestEventWithWorkShift;
import com.google.gson.JsonObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by mrpan on 2017/3/15.
 */
@Repository
public class RestEventWithWorkShiftRepo {
    private JdbcTemplate jdbc;

    @Autowired
    public RestEventWithWorkShiftRepo(@Qualifier("oneJdbcTemplate") JdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }

    /**
     * 添加休息时间与班次信息的关联表
     *
     * @param rest_event_id
     * @param work_shift_id
     * @return
     */
    public JsonObject add(int rest_event_id, int work_shift_id) {
        String sql = "INSERT INTO rest_event_with_work_shift (rest_event_id, work_shift_id) VALUES (?,?)";
        jdbc.update(sql, rest_event_id, work_shift_id);
        JsonObject jsonObject = new JsonObject();
        jsonObject.addProperty("system_status", true);
        jsonObject.addProperty("log", "add ok");
        return jsonObject;
    }

    /**
     * 根据班次id获得所有的休息id
     *
     * @param work_shift_id
     * @return
     */
    public List<RestEventWithWorkShift> getByWorkShiftId(int work_shift_id) {
        String sql = "SELECT * FROM rest_event_with_work_shift WHERE work_shift_id = ?";
        return jdbc.query(sql, new Object[]{work_shift_id}, new RestEventWithWorkShiftMapper());
    }
}
