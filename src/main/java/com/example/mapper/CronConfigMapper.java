package com.example.mapper;

import com.example.model.TaskInfo;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

/**
 * Created by mrpan on 2017/4/13.
 */
public class CronConfigMapper implements RowMapper<TaskInfo> {
    @Override
    public TaskInfo mapRow(ResultSet resultSet, int i) throws SQLException {
        TaskInfo taskInfo = new TaskInfo();
        taskInfo.setId(resultSet.getInt("id"));
        taskInfo.setCron(resultSet.getString("cron"));
        taskInfo.setCellName(resultSet.getString("cell_name"));
        taskInfo.setTaskName(resultSet.getString("task_name"));
        return taskInfo;
    }
}
