package com.example.repository;

import com.example.enumtype.Cell;
import com.example.mapper.RestEventMapper;
import com.example.model.RestEvent;
import com.example.model.WorkShift;
import com.google.gson.JsonObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.PreparedStatementCreator;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.Statement;

/**
 * Created by mrpan on 2017/3/14.
 */
@Repository
public class RestEventRepo {
    private JdbcTemplate jdbc;
    private WorkShiftRepo repo;
    private RestEventWithWorkShiftRepo restEventWithWorkShiftRepo;

    @Autowired
    public RestEventRepo(@Qualifier("oneJdbcTemplate") JdbcTemplate jdbc, WorkShiftRepo repo, RestEventWithWorkShiftRepo restEventWithWorkShiftRepo) {
        this.jdbc = jdbc;
        this.repo = repo;
        this.restEventWithWorkShiftRepo = restEventWithWorkShiftRepo;
    }

    /**
     * 添加休息事件
     *
     * @param event
     * @return
     */
    public String addEvent(RestEvent event) {
        // 插入rest_event表并获得自增的id值
        JsonObject object = new JsonObject();
        if (event.getShift_type() == null || event.getEvent_start_time() == null || event.getEvent_end_time() == null) {
            object.addProperty("system_status", false);
            object.addProperty("log", "所需输入的参数为空，请检查后重新输入");
            return object.toString();
        }
        if (jdbc.query("SELECT * FROM rest_event WHERE shift_type =? AND event_start_time = ? AND rest_event.event_end_time = ?",
                new Object[]{event.getShift_type(), event.getEvent_start_time(), event.getEvent_end_time()}, new RestEventMapper()).size() != 0) {
            object.addProperty("system_status", false);
            object.addProperty("log", "该记录已存在，请勿重复添加");
            return object.toString();
        }
        String sql = "INSERT INTO rest_event (shift_type, event, event_start_time, event_end_time) VALUES (?,?,?,?)";
        KeyHolder keyHolder = new GeneratedKeyHolder();
        Object[] param = new Object[]{event.getShift_type(), event.getEvent(), event.getEvent_start_time(), event.getEvent_end_time()};
        int rc = jdbc.update(new PreparedStatementCreator() {
            @Override
            public PreparedStatement createPreparedStatement(Connection connection) throws SQLException {
                PreparedStatement ps = jdbc.getDataSource().getConnection().prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
                for (int i = 0; i < param.length; i++) {
                    ps.setObject(i + 1, param[i]);
                }
                return ps;
            }
        }, keyHolder);
        int rest_event_id;
        if (rc > 0) {
            rest_event_id = keyHolder.getKey().intValue();
        } else {
            rest_event_id = 0;
        }

        // 将新增的rest_event与workshift关联
        WorkShift workShift = repo.getLatestWorkShift(Cell.ISHAFT1.toString()).get(0);
        restEventWithWorkShiftRepo.add(rest_event_id, workShift.getId());

        object.addProperty("system_status", true);
        object.addProperty("log", "add ok");
        return object.toString();
    }

    /**
     * 根据id获得rest_event的所有信息
     *
     * @param id
     * @return
     */
    public RestEvent getById(int id) {
        String sql = "SELECT * FROM rest_event WHERE id = ?";
        return jdbc.queryForObject(sql, new Object[]{id}, new RestEventMapper());
    }
}
