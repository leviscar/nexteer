package com.example.controller;

import com.example.model.WorkShift;
import com.example.repository.WorkShiftRepo;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

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

    @Autowired
    public WorkShiftController(WorkShiftRepo repo) {
        this.repo = repo;
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
    public String getCurShift() {
        JsonObject object = new JsonObject();
        List<WorkShift> res = repo.getLatestWorkShift();
        if (res.size() == 0) {
            object.addProperty("status", false);
            object.addProperty("log", "未查询到任何班次信息，请先初始化");
            return object.toString();
        }
        return new GsonBuilder().setDateFormat("yyyy-MM-dd").create().toJson(res.get(0));
    }
}
