package com.example.controller;

import com.example.model.Hce;
import com.example.repository.HceRepo;
import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.sql.Date;
import java.util.List;

/**
 * Created by mrpan on 2017/4/4.
 */
@RestController
public class HceController {
    private HceRepo hceRepo;

    @Autowired
    public HceController(HceRepo hceRepo) {
        this.hceRepo = hceRepo;
    }

    /**
     * 按周获取指定产线的hce
     *
     * @param json
     * @return
     */
    @RequestMapping(value = "/hce/week")
    public List<Hce> getWeeklyHceByCellName(@RequestBody String json) {
        JsonParser parser = new JsonParser();
        JsonElement element = parser.parse(json);
        JsonObject object = element.getAsJsonObject();
        java.util.Date curDate = new Gson().fromJson(object.get("curr_time"), java.util.Date.class);
        String cellName = new Gson().fromJson(object.get("cell_name"), String.class);
        return hceRepo.getWeeklyHceByCellName(cellName, new Date(curDate.getTime()));
    }

    /**
     * 按周期获取指定产线的hce
     *
     * @param json
     * @return
     */
    @RequestMapping(value = "/hce/period")
    public List<Hce> getPeriodHceByCellName(@RequestBody String json) {
        JsonParser parser = new JsonParser();
        JsonElement element = parser.parse(json);
        JsonObject object = element.getAsJsonObject();
        java.util.Date endDate = new Gson().fromJson(object.get("end_time"), java.util.Date.class);
        java.util.Date startDate = new Gson().fromJson(object.get("start_time"), java.util.Date.class);
        String cellName = new Gson().fromJson(object.get("cell_name"), String.class);
        return hceRepo.getPeriodHceByCellName(cellName, new Date(startDate.getTime()), new Date(endDate.getTime()));
    }

    /**
     * 按月获取指定产线的hce
     *
     * @param json
     * @return
     */
    @RequestMapping(value = "/hce/month")
    public List<Hce> getMonthlyHceByCellName(@RequestBody String json) {
        JsonParser parser = new JsonParser();
        JsonElement element = parser.parse(json);
        JsonObject object = element.getAsJsonObject();
        java.util.Date curDate = new Gson().fromJson(object.get("curr_time"), java.util.Date.class);
        String cellName = new Gson().fromJson(object.get("cell_name"), String.class);
        return hceRepo.getMonthlyHceByCellName(cellName, new Date(curDate.getTime()));
    }

    /**
     * 按年获取指定产线的hce
     *
     * @param json
     * @return
     */
    @RequestMapping(value = "/hce/year")
    public List<Hce> getYearlyHceByCellName(@RequestBody String json) {
        JsonParser parser = new JsonParser();
        JsonElement element = parser.parse(json);
        JsonObject object = element.getAsJsonObject();
        java.util.Date curDate = new Gson().fromJson(object.get("curr_time"), java.util.Date.class);
        String cellName = new Gson().fromJson(object.get("cell_name"), String.class);
        return hceRepo.getYearlyHceByCellName(cellName, new Date(curDate.getTime()));
    }

}
