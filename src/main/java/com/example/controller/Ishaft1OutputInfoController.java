package com.example.controller;

import com.example.model.Ishaft1OutputInfo;
import com.example.repository.Ishaft1OutputInfoRepo;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.sql.Date;
import java.util.List;

/**
 * Created by mrpan on 2017/3/18.
 */
@RestController
@RequestMapping(value = "/output-info")
public class Ishaft1OutputInfoController {
    private Ishaft1OutputInfoRepo ishaft1OutputInfoRepo;

    @Autowired
    public Ishaft1OutputInfoController(Ishaft1OutputInfoRepo ishaft1OutputInfoRepo) {
        this.ishaft1OutputInfoRepo = ishaft1OutputInfoRepo;
    }

    /**
     * 获取一周的产量数据
     *
     * @param json
     * @return
     */
    @RequestMapping(value = "/getByWeek", method = RequestMethod.POST)
    public List<Ishaft1OutputInfo> getByWeek(@RequestBody String json) {
        JsonParser parser = new JsonParser();
        JsonElement jsonElement = parser.parse(json);
        JsonObject jsonObject = jsonElement.getAsJsonObject();
        Date date = Date.valueOf(jsonObject.get("end_time").getAsString());
        return ishaft1OutputInfoRepo.getByWeek(date);
    }

    /**
     * 获取一月的产量数据
     *
     * @param json
     * @return
     */
    @RequestMapping(value = "/getByMonth", method = RequestMethod.POST)
    public List<Ishaft1OutputInfo> getByMonth(@RequestBody String json) {
        JsonParser parser = new JsonParser();
        JsonElement jsonElement = parser.parse(json);
        JsonObject jsonObject = jsonElement.getAsJsonObject();
        Date date = Date.valueOf(jsonObject.get("end_time").getAsString());
        return ishaft1OutputInfoRepo.getByMonth(date);
    }

    /**
     * 获取一年的产量数据
     *
     * @param json
     * @return
     */
    @RequestMapping(value = "/getByYear", method = RequestMethod.POST)
    public List<Ishaft1OutputInfo> getByYear(@RequestBody String json) {
        JsonParser parser = new JsonParser();
        JsonElement jsonElement = parser.parse(json);
        JsonObject jsonObject = jsonElement.getAsJsonObject();
        Date date = Date.valueOf(jsonObject.get("end_time").getAsString());
        return ishaft1OutputInfoRepo.getByYear(date);
    }

    /**
     * 获取某时间段的产量数据
     *
     * @param json
     * @return
     */
    @RequestMapping(value = "/getByPeriod", method = RequestMethod.POST)
    public List<Ishaft1OutputInfo> getByPeriod(@RequestBody String json) {
        JsonParser parser = new JsonParser();
        JsonElement jsonElement = parser.parse(json);
        JsonObject jsonObject = jsonElement.getAsJsonObject();
        Date start = Date.valueOf(jsonObject.get("start_time").getAsString());
        Date end = Date.valueOf(jsonObject.get("end_time").getAsString());
        return ishaft1OutputInfoRepo.getByPeriod(start, end);
    }
}
