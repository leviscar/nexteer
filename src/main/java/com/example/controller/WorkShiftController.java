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
     * 增加早班
     *
     * @param json
     * @return
     * @throws ParseException
     */
    @RequestMapping(value = "/morning-shift", method = RequestMethod.POST)
    public String addOneShift(@RequestBody String json) throws ParseException {
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

        TaskInfo taskInfo = new TaskInfo();
        String startTime = workShift.getMorning_shift_start();
        String endTime = workShift.getMorning_shift_end();
        // set the cron based on the shift's end time
        String cron = "0 " + endTime.substring(3, 5) + " " + endTime.substring(0, 2) + " * * ?";
        taskInfo.setCron(cron);
        taskInfo.setCellName(workShift.getCell_name());
        // set saving the output information task when current shift is ended
        taskInfo.setTaskName(taskPrefix + TaskType.AshiftTask.toString());
        // add task
        taskImpl.add(taskInfo);
        // set saving the last day's output information task
        taskInfo.setTaskName(taskPrefix + TaskType.DailyTask.toString());
        cron = "0 " + startTime.substring(3, 5) + " " + startTime.substring(0, 2) + " * * ?";
        taskInfo.setCron(cron);
        taskImpl.add(taskInfo);
        return repo.addMorningShift(workShift).toString();
    }

    /**
     * 增加中班
     *
     * @param json
     * @return
     * @throws ParseException
     */
    @RequestMapping(value = "/middle-shift", method = RequestMethod.POST)
    public String addTwoShift(@RequestBody String json) throws ParseException {
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
        return repo.addMiddleShift(workShift).toString();
    }

    /**
     * 增加晚班
     *
     * @param json
     * @return
     * @throws ParseException
     */
    @RequestMapping(value = "/night-shift", method = RequestMethod.POST)
    public String addThreeShift(@RequestBody String json) throws ParseException {
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
        return repo.addNightShift(workShift).toString();
    }

    /**
     * 获得最新的班次信息
     *
     * @return
     */
    @RequestMapping(value = "/now", method = RequestMethod.GET)
    public String getCurShift(@RequestParam(name = "cell_name") String cellName) {
        JsonObject object = new JsonObject();
        List<WorkShift> res = repo.getLatestWorkShift(cellName);
        if (res.size() == 0) {
            object.addProperty("system_status", false);
            object.addProperty("log", "未查询到任何班次信息，请先初始化");
            return object.toString();
        }
        return new GsonBuilder().setDateFormat("yyyy-MM-dd").create().toJson(res.get(0));
    }
}
