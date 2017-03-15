package com.example.controller;

import com.example.model.ScrapAmount;
import com.example.repository.ScrapAmountRepo;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.text.ParseException;
import java.util.List;

/**
 * Created by mrpan on 2017/3/7.
 * 报废金额API
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
     * 根据特定日期查询报废金额
     *
     * @param json
     * @return
     */
    @RequestMapping(value = "/getByDate", method = RequestMethod.POST)
    public String getByDate(@RequestBody String json) {
        Gson gson = new Gson();
        JsonObject object = new JsonObject();
        ScrapAmount scrapAmount = gson.fromJson(json, ScrapAmount.class);
        List<ScrapAmount> res = repo.getByDate(scrapAmount);
        if (!res.isEmpty()) {
            ScrapAmount tmp = res.get(0);
            object.addProperty("value", tmp.getIshaft1_value() + tmp.getIshaft2_value() +
                    tmp.getIshaft3_value() + tmp.getIshaft4_value() + tmp.getCeps_value() + tmp.getBeps_value());
        } else {
            object.addProperty("status", false);
            object.addProperty("log", "当前日期没有记录");
        }
        return object.toString();
    }

    /**
     * 获得一段时间内的报废金额
     *
     * @param json
     * @return
     */
    @RequestMapping(value = "/getByPeriod", method = RequestMethod.POST)
    public String getByPeriod(@RequestBody String json) {
        Gson gson = new Gson();
        JsonParser parser = new JsonParser();
        JsonObject object = (JsonObject) parser.parse(json);
        String startYear = object.get("startYear").getAsString();
        String startMonth = object.get("startMonth").getAsString();
        String startDay = object.get("startDay").getAsString();
        String endYear = object.get("endYear").getAsString();
        String endMonth = object.get("endMonth").getAsString();
        String endDay = object.get("endDay").getAsString();
        try {
            List<ScrapAmount> res = repo.getByPeriod(startYear, startMonth, startDay, endYear, endMonth, endDay);
            if (!res.isEmpty()) {
                return gson.toJson(res);
            } else {
                JsonObject jsonObject = new JsonObject();
                jsonObject.addProperty("status", false);
                jsonObject.addProperty("log", "没有搜索到这段时期的信息");
                return jsonObject.toString();
            }
        } catch (ParseException e) {
            e.printStackTrace();
            JsonObject jsonObject = new JsonObject();
            jsonObject.addProperty("status", false);
            jsonObject.addProperty("log", "传入的json格式有误");
            return jsonObject.toString();
        }
    }

    /**
     * 根据周获取报废金额
     *
     * @param json
     * @return
     */
    @RequestMapping(value = "/getByWeek", method = RequestMethod.POST)
    public String getByWeek(@RequestBody String json) {
        Gson gson = new Gson();
        ScrapAmount scrapAmount = gson.fromJson(json, ScrapAmount.class);
        List<ScrapAmount> res = repo.getByWeek(scrapAmount);
        if (res.isEmpty()) {
            JsonObject jsonObject = new JsonObject();
            jsonObject.addProperty("status", false);
            jsonObject.addProperty("log", "没有搜索到这段时期的报废金额信息");
            return jsonObject.toString();
        } else {
            return gson.toJson(res);
        }
    }

    /**
     * 根据月份获取报废金额
     *
     * @param json
     * @return
     */
    @RequestMapping(value = "/getByMonth", method = RequestMethod.POST)
    public String getByMonth(@RequestBody String json) {
        Gson gson = new Gson();
        ScrapAmount scrapAmount = gson.fromJson(json, ScrapAmount.class);
        JsonObject jsonObject = new JsonObject();
        try {
            List<ScrapAmount> res = repo.getByMonth(scrapAmount);
            if (res.isEmpty()) {
                jsonObject.addProperty("status", false);
                jsonObject.addProperty("log", "没有该月的报废金额信息");
                return jsonObject.toString();
            } else {
                return gson.toJson(res);
            }
        } catch (ParseException e) {
            e.printStackTrace();
            jsonObject.addProperty("status", false);
            jsonObject.addProperty("log", "传入的json格式有误");
            return jsonObject.toString();
        }
    }

    /**
     * 获取一年的报废金额信息
     *
     * @param json
     * @return
     */
    @RequestMapping(value = "/getByYear", method = RequestMethod.POST)
    public String getByYear(@RequestBody String json) {
        Gson gson = new Gson();
        ScrapAmount scrapAmount = gson.fromJson(json, ScrapAmount.class);
        JsonObject jsonObject = new JsonObject();
        try {
            List<ScrapAmount> res = repo.getByYear(scrapAmount);
            if (res.isEmpty()) {
                jsonObject.addProperty("status", false);
                jsonObject.addProperty("log", "没有该年的报废金额信息");
                return jsonObject.toString();
            } else {
                return gson.toJson(res);
            }
        } catch (ParseException e) {
            e.printStackTrace();
            jsonObject.addProperty("status", false);
            jsonObject.addProperty("log", "传入的json格式有误");
            return jsonObject.toString();
        }
    }

    /**
     * 添加报废金额
     *
     * @param json
     * @return
     */
    @RequestMapping(value = "/add", method = RequestMethod.POST)
    public String add(@RequestBody String json) {
        Gson gson = new Gson();
        ScrapAmount scrapAmount = gson.fromJson(json, ScrapAmount.class);
        JsonObject object = repo.addAmount(scrapAmount);
        return object.toString();
    }

    /**
     * 重置报废金额
     *
     * @param json
     * @return
     */
    @RequestMapping(value = "/update", method = RequestMethod.POST)
    public String update(@RequestBody String json) {
        Gson gson = new Gson();
        ScrapAmount scrapAmount = gson.fromJson(json, ScrapAmount.class);
        JsonObject object = repo.updateAmount(scrapAmount);
        return object.toString();
    }
}
