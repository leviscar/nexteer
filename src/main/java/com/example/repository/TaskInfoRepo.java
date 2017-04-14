package com.example.repository;

import com.example.mapper.CronConfigMapper;
import com.example.model.TaskInfo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by mrpan on 2017/4/13.
 */
@Repository
public class TaskInfoRepo {
    private JdbcTemplate jdbc;
    private Logger logger = LoggerFactory.getLogger(getClass());

    @Autowired
    public TaskInfoRepo(@Qualifier("oneJdbcTemplate") JdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }

    /**
     * insert new task into database
     *
     * @param taskInfo
     * @return
     */
    public int add(TaskInfo taskInfo) {
        logger.info("insert task:{} into database", taskInfo);
        return jdbc.update("INSERT INTO task_info (cron, cell_name, task_name) VALUES (?, ?, ?)"
                , taskInfo.getCron(), taskInfo.getCellName(), taskInfo.getTaskName());
    }

    /**
     * update cron of task in database
     *
     * @param taskInfo
     * @return
     */
    public int updateCron(TaskInfo taskInfo) {
        logger.info("update task: {} in database", taskInfo);
        return jdbc.update("UPDATE task_info SET cron = ? WHERE task_name = ? AND cell_name = ?"
                , taskInfo.getCron(), taskInfo.getTaskName(), taskInfo.getCellName());

    }

    /**
     * update status of task in database
     *
     * @param taskGroup
     * @param taskName
     * @param taskStatus
     * @return
     */
    public int updateStatus(String taskGroup, String taskName, String taskStatus) {
        logger.info("update status:{} where taskGroup:{}, taskName:{} in database", taskStatus, taskGroup, taskName);
        return jdbc.update("UPDATE task_info SET task_status = ? WHERE cell_name = ? AND task_name = ?"
                , taskStatus, taskGroup, taskName);
    }

    /**
     * delete task in database
     *
     * @param cellName
     * @param taskName
     * @return
     */
    public int delete(String cellName, String taskName) {
        logger.info("delete task whose taskName:{}, taskGroup:{} in database", taskName, cellName);
        return jdbc.update("DELETE FROM task_info WHERE cell_name = ? AND task_name = ?", cellName, taskName);
    }

    /**
     * get task based on cell name and task name
     *
     * @param cellName
     * @param taskName
     * @return
     */
    public List<TaskInfo> getByCellNameAndTaskName(String cellName, String taskName) {
        return jdbc.query("SELECT * FROM task_info WHERE cell_name = ? AND task_name = ?"
                , new Object[]{cellName, taskName}, new CronConfigMapper());
    }

    /**
     * get all tasks based on cell name
     *
     * @param cellName
     * @return
     */
    public List<TaskInfo> getByCellName(String cellName) {
        return jdbc.query("SELECT * FROM task_info WHERE cell_name = ?"
                , new Object[]{cellName}, new CronConfigMapper());
    }
}
