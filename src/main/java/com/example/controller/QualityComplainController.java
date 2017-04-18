package com.example.controller;

import com.example.model.QualityComplain;
import com.example.repository.QualityComplainRepo;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.util.List;

/**
 * Created by mrpan on 2017/4/18.
 */
@RestController
@RequestMapping(value = "quality-complain")
public class QualityComplainController {
    private QualityComplainRepo repo;

    @Autowired
    public QualityComplainController(QualityComplainRepo repo) {
        this.repo = repo;
    }

    /**
     * Get a quality complain record on a specific date
     *
     * @param curDate
     * @return QualityComplain
     */
    @RequestMapping(value = "/day", method = RequestMethod.GET)
    public String getDates(@RequestParam(value = "date") String curDate) throws ParseException {
        List<QualityComplain> res = repo.findByDate(curDate);
        if (!res.isEmpty()) {
            return new Gson().toJson(res.get(0));
        } else {
            JsonObject object = new JsonObject();
            object.addProperty("system_status", false);
            object.addProperty("log", "当前日期没有记录");
            return object.toString();
        }
    }

    /**
     * Get all records
     *
     * @return list
     */
    @RequestMapping(method = RequestMethod.GET)
    public List<QualityComplain> getDates() {
        return repo.findAll();
    }

    /**
     * Get all records which has no complain
     *
     * @return list
     */
    @RequestMapping(value = "/no-complain", method = RequestMethod.GET)
    public List<QualityComplain> getUnsafeDates() {
        return repo.findBySafeState();
    }

    /**
     * Add a safety date record into database
     *
     * @param json
     */
    @RequestMapping(method = RequestMethod.POST)
    public QualityComplain add(@RequestBody String json) throws ParseException {
        Gson gson = new Gson();
        QualityComplain QualityComplain = gson.fromJson(json, QualityComplain.class);
        return repo.add(QualityComplain);
    }

    /**
     * Update the safety date record
     *
     * @param json
     */
    @RequestMapping(method = RequestMethod.PATCH)
    public QualityComplain update(@RequestBody String json) throws ParseException {
        Gson gson = new Gson();
        QualityComplain QualityComplain = gson.fromJson(json, QualityComplain.class);
        return repo.update(QualityComplain);
    }

    /**
     * Get the max safe date value
     *
     * @return
     */
    @RequestMapping(value = "/max", method = RequestMethod.GET)
    public int getMax() {
        return repo.getMax();
    }
}
