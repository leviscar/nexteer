package com.example.controller;

import com.example.model.ScrapAmount;
import com.example.repository.ScrapAmountRepo;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.util.List;

/**
 * Created by mrpan on 2017/3/7.
 * scrap amount API
 */
@RestController
@RequestMapping(value = "/scrap-amount")
public class ScrapAmountController {
    private ScrapAmountRepo repo;

    @Autowired
    public ScrapAmountController(ScrapAmountRepo repo) {
        this.repo = repo;
    }

    /**
     * Get a scrap amount record on a specific date
     *
     * @param curDate
     * @return
     */
    @RequestMapping(value = "/day", method = RequestMethod.GET)
    public String getByDate(@RequestParam(value = "date") String curDate) throws ParseException {
        List<ScrapAmount> res = repo.getByDate(curDate);
        if (!res.isEmpty()) {
            return new Gson().toJson(res.get(0), ScrapAmount.class);
        } else {
            JsonObject object = new JsonObject();
            object.addProperty("system_status", false);
            object.addProperty("log", "当前日期没有记录");
            return object.toString();
        }
    }

    /**
     * Query all the scrap amount records during the start date and end date
     *
     * @param startDate
     * @param endDate
     * @return
     */
    @RequestMapping(value = "/period", method = RequestMethod.GET)
    public String getByPeriod(@RequestParam(value = "start") String startDate
            , @RequestParam(value = "end") String endDate) throws ParseException {
        Gson gson = new Gson();
        List<ScrapAmount> res = repo.getByPeriod(startDate, endDate);
        if (!res.isEmpty()) {
            return gson.toJson(res);
        } else {
            JsonObject jsonObject = new JsonObject();
            jsonObject.addProperty("system_status", false);
            jsonObject.addProperty("log", "没有搜索到这段时期的信息");
            return jsonObject.toString();
        }
    }

    /**
     * Get all the scrap amount records during the whole week based on current date
     *
     * @param curDate
     * @return
     */
    @RequestMapping(value = "/week", method = RequestMethod.GET)
    public String getByWeek(@RequestParam(value = "date") String curDate) throws ParseException {
        Gson gson = new Gson();
        List<ScrapAmount> res = repo.getByWeek(curDate);
        if (!res.isEmpty()) {
            return gson.toJson(res);
        } else {
            JsonObject jsonObject = new JsonObject();
            jsonObject.addProperty("system_status", false);
            jsonObject.addProperty("log", "没有搜索到这段时期的报废金额信息");
            return jsonObject.toString();
        }
    }

    /**
     * Get all the scrap amount records during the whole month based on current date
     *
     * @param curDate
     * @return
     */
    @RequestMapping(value = "/month", method = RequestMethod.GET)
    public String getByMonth(@RequestParam(value = "date") String curDate) throws ParseException {
        Gson gson = new Gson();
        List<ScrapAmount> res = repo.getByMonth(curDate);
        if (!res.isEmpty()) {
            return gson.toJson(res);
        } else {
            JsonObject jsonObject = new JsonObject();
            jsonObject.addProperty("system_status", false);
            jsonObject.addProperty("log", "没有该月的报废金额信息");
            return jsonObject.toString();
        }
    }

    /**
     * Get all the scrap amount records during the whole year based on current date
     *
     * @param curDate
     * @return
     */
    @RequestMapping(value = "/year", method = RequestMethod.GET)
    public String getByYear(@RequestParam(value = "date") String curDate) throws ParseException {
        Gson gson = new Gson();
        List<ScrapAmount> res = repo.getByYear(curDate);
        if (!res.isEmpty()) {
            return gson.toJson(res);
        } else {
            JsonObject jsonObject = new JsonObject();
            jsonObject.addProperty("system_status", false);
            jsonObject.addProperty("log", "没有该年的报废金额信息");
            return jsonObject.toString();
        }
    }

    /**
     * Add a scrap amount record into database
     *
     * @param json
     * @return
     */
    @RequestMapping(method = RequestMethod.POST)
    public String add(@RequestBody String json) throws ParseException {
        Gson gson = new Gson();
        ScrapAmount scrapAmount = gson.fromJson(json, ScrapAmount.class);
        JsonObject object = repo.addAmount(scrapAmount);
        return object.toString();
    }

    /**
     * Update the scrap amount record in database
     *
     * @param json
     * @return
     */
    @RequestMapping(method = RequestMethod.PATCH)
    public String update(@RequestBody String json) throws ParseException {
        Gson gson = new Gson();
        ScrapAmount scrapAmount = gson.fromJson(json, ScrapAmount.class);
        JsonObject object = repo.updateAmount(scrapAmount);
        return object.toString();
    }
}
