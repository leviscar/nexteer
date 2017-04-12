package com.example.controller;

import com.example.model.RestEvent;
import com.example.model.RestEventWithWorkShift;
import com.example.model.WorkShift;
import com.example.repository.RestEventRepo;
import com.example.repository.RestEventWithWorkShiftRepo;
import com.example.repository.WorkShiftRepo;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by mrpan on 2017/3/15.
 */
@RestController
@RequestMapping(value = "/rest-event")
public class RestEventController {
    private RestEventRepo restEventRepo;
    private WorkShiftRepo workShiftRepo;
    private RestEventWithWorkShiftRepo restEventWithWorkShiftRepo;

    @Autowired
    public RestEventController(RestEventRepo restEventRepo, WorkShiftRepo workShiftRepo, RestEventWithWorkShiftRepo restEventWithWorkShiftRepo) {
        this.restEventRepo = restEventRepo;
        this.workShiftRepo = workShiftRepo;
        this.restEventWithWorkShiftRepo = restEventWithWorkShiftRepo;
    }

    /**
     * 添加休息事件
     *
     * @param json
     * @return
     */
    @RequestMapping(value = "/addEvent", method = RequestMethod.POST)
    public String addEvent(@RequestBody String json) {
        Gson gson = new Gson();
        RestEvent event = gson.fromJson(json, RestEvent.class);
        return restEventRepo.addEvent(event);
    }

    @RequestMapping(value = "/getAllEvent")
    public String getAllEvent() {
        // 获得最新的班次信息
        List<WorkShift> workShiftList = workShiftRepo.getLatestWorkShift();
        JsonObject object = new JsonObject();
        if (workShiftList.size() == 0) {
            object.addProperty("system_status", false);
            object.addProperty("log", "请先添加班次信息");
            return object.toString();
        }
        // 根据班次信息获得所有的休息时间
        List<RestEventWithWorkShift> restEventWithWorkShiftList = restEventWithWorkShiftRepo.getByWorkShiftId(workShiftList.get(0).getId());
        if (restEventWithWorkShiftList.size() == 0) {
            object.addProperty("system_status", false);
            object.addProperty("log", "当前没有设置休息事件");
            return object.toString();
        }
        List<RestEvent> restEventList = new ArrayList<>();
        for (RestEventWithWorkShift restEventWithWorkShift : restEventWithWorkShiftList) {
            restEventList.add(restEventRepo.getById(restEventWithWorkShift.getRest_event_id()));
        }
        Gson gson = new Gson();
        return gson.toJson(restEventList);
    }
}
