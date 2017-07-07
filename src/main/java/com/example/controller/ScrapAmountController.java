package com.example.controller;

import com.example.model.ScrapAmount;
import com.example.repository.ScrapAmountRepo;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
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
    @RequestMapping(value = "/{cell}/day", method = RequestMethod.GET)
    public String getByDateAndCell(@PathVariable(value = "cell") String cell, @RequestParam(value = "date") String curDate) throws ParseException {
        List<ScrapAmount> res = repo.getByDateAndCell(curDate, cell);
        if (!res.isEmpty()) {
            return new Gson().toJson(res);
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
    @RequestMapping(value = "/{cell}/period", method = RequestMethod.GET)
    public String getByPeriodAndCell(@PathVariable(value = "cell") String cell, @RequestParam(value = "start") String startDate
            , @RequestParam(value = "end") String endDate) throws ParseException {
        Gson gson = new Gson();
        List<ScrapAmount> res = repo.getByPeriodAndCell(startDate, endDate, cell);
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
    @RequestMapping(value = "/{cell}/week", method = RequestMethod.GET)
    public String getByWeekAndCell(@PathVariable(value = "cell") String cell, @RequestParam(value = "date") String curDate) throws ParseException {
        Gson gson = new Gson();
        List<ScrapAmount> res = repo.getByWeekAndCell(curDate, cell);
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
    @RequestMapping(value = "/{cell}/month", method = RequestMethod.GET)
    public String getByMonthAndCell(@PathVariable(value = "cell") String cell, @RequestParam(value = "date") String curDate) throws ParseException {
        Gson gson = new Gson();
        List<ScrapAmount> res = repo.getByMonthAndCell(curDate, cell);
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
    @RequestMapping(value = "/{cell}/year", method = RequestMethod.GET)
    public String getByYearAndCell(@PathVariable(value = "cell") String cell, @RequestParam(value = "date") String curDate) throws ParseException {
        Gson gson = new Gson();
        List<ScrapAmount> res = repo.getByYearAndCell(curDate, cell);
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
     * Get a scrap amount record on a specific date
     *
     * @param curDate
     * @return
     */
    @RequestMapping(value = "/day", method = RequestMethod.GET)
    public String getByDate(@RequestParam(value = "date") String curDate) throws ParseException {
        List<ScrapAmount> res = repo.getByDate(curDate);
        if (!res.isEmpty()) {
            return new Gson().toJson(res);
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
     * @param scrapAmount
     * @return
     */
    @RequestMapping(method = RequestMethod.POST)
    public ScrapAmount add(@RequestBody ScrapAmount scrapAmount) throws ParseException {
        return repo.addAmount(scrapAmount);
    }

    /**
     * Update the scrap amount record in database
     *
     * @param scrapAmount
     * @return
     */
    @RequestMapping(method = RequestMethod.PATCH)
    public ScrapAmount update(@RequestBody ScrapAmount scrapAmount) throws ParseException {
        return repo.updateAmount(scrapAmount);
    }

    /**
     * Get latest scrap amount record
     *
     * @param cellName
     * @return
     */
    @RequestMapping(value = "/{cell}/latest")
    public ScrapAmount getLastst(@PathVariable(value = "cell") String cellName) {
        List<ScrapAmount> res = repo.getLatest(cellName);
        if (res.size() == 0) {
            return new ScrapAmount();
        } else {
            return repo.getLatest(cellName).get(0);
        }
    }
}
