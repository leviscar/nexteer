package com.example.controller;

import com.example.model.Oee;
import com.example.repository.OeeRepo;
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
 * Created by mrpan on 2017/3/29.
 */
@RestController
public class OeeController {
    private OeeRepo oeeRepo;

    @Autowired
    public OeeController(OeeRepo oeeRepo) {
        this.oeeRepo = oeeRepo;
    }

    /**
     * 按周获取指定产线的oee
     *
     * @param json
     * @return
     */
    @RequestMapping(value = "/oee/week")
    public List<Oee> getWeeklyOeeByCellName(@RequestBody String json) {
        JsonParser parser = new JsonParser();
        JsonElement element = parser.parse(json);
        JsonObject object = element.getAsJsonObject();
        java.util.Date curDate = new Gson().fromJson(object.get("curr_time"), java.util.Date.class);
        String cellName = new Gson().fromJson(object.get("cell_name"), String.class);
        return oeeRepo.getWeeklyOeeByCellName(cellName, new Date(curDate.getTime()));
    }

    /**
     * 按周期获取指定产线的oee
     *
     * @param json
     * @return
     */
    @RequestMapping(value = "/oee/period")
    public List<Oee> getPeriodOeeByCellName(@RequestBody String json) {
        JsonParser parser = new JsonParser();
        JsonElement element = parser.parse(json);
        JsonObject object = element.getAsJsonObject();
        java.util.Date endDate = new Gson().fromJson(object.get("end_time"), java.util.Date.class);
        java.util.Date startDate = new Gson().fromJson(object.get("start_time"), java.util.Date.class);
        String cellName = new Gson().fromJson(object.get("cell_name"), String.class);
        return oeeRepo.getPeriodOeeByCellName(cellName, new Date(startDate.getTime()), new Date(endDate.getTime()));
    }

    /**
     * 按月获取指定产线的oee
     *
     * @param json
     * @return
     */
    @RequestMapping(value = "/oee/month")
    public List<Oee> getMonthlyOeeByCellName(@RequestBody String json) {
        JsonParser parser = new JsonParser();
        JsonElement element = parser.parse(json);
        JsonObject object = element.getAsJsonObject();
        java.util.Date curDate = new Gson().fromJson(object.get("curr_time"), java.util.Date.class);
        String cellName = new Gson().fromJson(object.get("cell_name"), String.class);
        return oeeRepo.getMonthlyOeeByCellName(cellName, new Date(curDate.getTime()));
    }

    /**
     * 按年获取指定产线的oee
     *
     * @param json
     * @return
     */
    @RequestMapping(value = "/oee/year")
    public List<Oee> getYearlyOeeByCellName(@RequestBody String json) {
        JsonParser parser = new JsonParser();
        JsonElement element = parser.parse(json);
        JsonObject object = element.getAsJsonObject();
        java.util.Date curDate = new Gson().fromJson(object.get("curr_time"), java.util.Date.class);
        String cellName = new Gson().fromJson(object.get("cell_name"), String.class);
        return oeeRepo.getYearlyOeeByCellName(cellName, new Date(curDate.getTime()));
    }

}
