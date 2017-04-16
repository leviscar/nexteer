package com.example.controller;

import com.example.enumtype.Cell;
import com.example.enumtype.TaskType;
import com.example.model.TaskInfo;
import com.example.model.WorkShift;
import com.example.repository.TaskInfoRepo;
import com.example.repository.WorkShiftRepo;
import com.example.task.TaskImpl;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.text.ParseException;
import java.util.List;

/**
 * Created by mrpan on 2017/3/9.
 */
@RestController
@RequestMapping(value = "/work-shift")
public class WorkShiftController {
    private WorkShiftRepo repo;
    private TaskImpl taskImpl;
    private final String taskPrefix = "com.example.task.";

    @Autowired
    public WorkShiftController(WorkShiftRepo repo, TaskImpl taskImpl) {
        this.repo = repo;
        this.taskImpl = taskImpl;
    }

    /**
     * add scheduled task
     *
     * @param cron
     * @param cellName
     * @param taskType
     */
    private void addTask(String cron, String cellName, TaskType taskType) {
        TaskInfo taskInfo = new TaskInfo();
        // set the cron based on time
        taskInfo.setCron(cron);
        // set task group
        taskInfo.setCellName(cellName);
        // set saving the output information task when current shift is ended
        taskInfo.setTaskName(taskPrefix + taskType.toString());
        // add task
        taskImpl.add(taskInfo);
    }

    /**
     * add A shift
     *
     * @param json
     * @return
     * @throws ParseException
     */
    @RequestMapping(value = "/ashift", method = RequestMethod.POST)
    public String addAShift(@RequestBody String json) throws ParseException {
        ObjectMapper mapper = new ObjectMapper();
        mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        mapper.setSerializationInclusion(JsonInclude.Include.NON_NULL);
        mapper.setSerializationInclusion(JsonInclude.Include.NON_EMPTY);
        mapper.configure(JsonParser.Feature.ALLOW_UNQUOTED_CONTROL_CHARS, true);
        WorkShift workShift;
        try {
            workShift = mapper.readValue(json, new TypeReference<WorkShift>() {
            });
        } catch (IOException e) {
            e.printStackTrace();
            return e.toString();
        }

        String startTime = workShift.getMorning_shift_start();
        String endTime = workShift.getMorning_shift_end();
        String cellName = workShift.getCell_name();

        // set the cron based on the shift's end time
        String cron = "0 " + endTime.substring(3, 5) + " " + endTime.substring(0, 2) + " * * ?";
        // add saving the shift hourly output task
        addTask(cron, cellName, TaskType.AshiftTask);
        // add saving the last day's output information task
        cron = "0 " + startTime.substring(3, 5) + " " + startTime.substring(0, 2) + " * * ?";
        addTask(cron, cellName, TaskType.DailyTask);
        return repo.addMorningShift(workShift).toString();
    }

    /**
     * add B shift
     *
     * @param json
     * @return
     * @throws ParseException
     */
    @RequestMapping(value = "/bshift", method = RequestMethod.POST)
    public String addBShift(@RequestBody String json) throws ParseException {
        ObjectMapper mapper = new ObjectMapper();
        mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        mapper.setSerializationInclusion(JsonInclude.Include.NON_NULL);
        mapper.setSerializationInclusion(JsonInclude.Include.NON_EMPTY);
        mapper.configure(JsonParser.Feature.ALLOW_UNQUOTED_CONTROL_CHARS, true);
        WorkShift workShift;
        try {
            workShift = mapper.readValue(json, new TypeReference<WorkShift>() {
            });
        } catch (IOException e) {
            e.printStackTrace();
            return e.toString();
        }
        String endTime = workShift.getMiddle_shift_end();
        String cellName = workShift.getCell_name();

        // set the cron based on the shift's end time
        String cron = "0 " + endTime.substring(3, 5) + " " + endTime.substring(0, 2) + " * * ?";
        // add saving the shift hourly output task
        addTask(cron, cellName, TaskType.BshiftTask);
        return repo.addMiddleShift(workShift).toString();
    }

    /**
     * add C shift
     *
     * @param json
     * @return
     * @throws ParseException
     */
    @RequestMapping(value = "/cshift", method = RequestMethod.POST)
    public String addCShift(@RequestBody String json) throws ParseException {
        ObjectMapper mapper = new ObjectMapper();
        mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        mapper.setSerializationInclusion(JsonInclude.Include.NON_NULL);
        mapper.setSerializationInclusion(JsonInclude.Include.NON_EMPTY);
        mapper.configure(JsonParser.Feature.ALLOW_UNQUOTED_CONTROL_CHARS, true);
        WorkShift workShift;
        try {
            workShift = mapper.readValue(json, new TypeReference<WorkShift>() {
            });
        } catch (IOException e) {
            e.printStackTrace();
            return e.toString();
        }
        String endTime = workShift.getNight_shift_end();
        String cellName = workShift.getCell_name();

        // set the cron based on the shift's end time
        String cron = "0 " + endTime.substring(3, 5) + " " + endTime.substring(0, 2) + " * * ?";
        // add saving the shift hourly output task
        addTask(cron, cellName, TaskType.CshiftTask);
        return repo.addNightShift(workShift).toString();
    }

    /**
     * get the latest shift information
     *
     * @return
     */
    @RequestMapping(value = "/{cell_name}", method = RequestMethod.GET)
    public String getCurShift(@PathVariable(value = "cell_name") String cellName) {
        JsonObject object = new JsonObject();
        List<WorkShift> res = repo.getLatestWorkShift(cellName);
        if (res.size() == 0) {
            object.addProperty("system_status", false);
            object.addProperty("log", "未查询到任何班次信息，请先初始化");
            return object.toString();
        }
        return new GsonBuilder().setDateFormat("yyyy-MM-dd").create().toJson(res.get(0));
    }

    /**
     * get all scheduled tasks
     *
     * @return
     */
    @RequestMapping(value = "/scheduled-tasks", method = RequestMethod.GET)
    public List<TaskInfo> getAllScheduledTasks() {
        return taskImpl.getAllTasks();
    }

    /**
     * get all scheduled tasks by group name
     *
     * @param cellName
     * @return
     */
    @RequestMapping(value = "/scheduled-tasks/{cell_name}", method = RequestMethod.GET)
    public List<TaskInfo> getScheduledTasksByGroup(@PathVariable(value = "cell_name") String cellName) {
        return taskImpl.getTasksByGroup(cellName);
    }
}
