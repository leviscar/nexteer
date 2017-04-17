package com.example.controller;

import com.example.model.SafetyDate;
import com.example.repository.SafetyDateRepo;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by mrpan on 2017/3/1.
 * safety date api
 */
@RestController
@RequestMapping(value = "/safety-date")
public class SafetyDateController {
    private SafetyDateRepo repo;

    @Autowired
    public SafetyDateController(SafetyDateRepo repo) {
        this.repo = repo;
    }

    /**
     * Get a safety date record on a specific date
     *
     * @param curDate
     * @return SafetyDate
     */
    @RequestMapping(value = "/day", method = RequestMethod.GET)
    public String getDates(@RequestParam(value = "date") String curDate) throws ParseException {
        List<SafetyDate> res = repo.findByDate(curDate);
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
    public List<SafetyDate> getDates() {
        return repo.findAll();
    }

    /**
     * Get all records which is unsafe
     *
     * @return list
     */
    @RequestMapping(value = "/unsafe", method = RequestMethod.GET)
    public List<SafetyDate> getUnsafeDates() {
        return repo.findBySafeState();
    }

    /**
     * Add a safety date record into database
     *
     * @param json
     */
    @RequestMapping(method = RequestMethod.POST)
    public SafetyDate addDate(@RequestBody String json) throws ParseException {
        Gson gson = new Gson();
        SafetyDate safetyDate = gson.fromJson(json, SafetyDate.class);
        return repo.addSafetyDate(safetyDate);
    }

    /**
     * Update the safety date record
     *
     * @param json
     */
    @RequestMapping(method = RequestMethod.PATCH)
    public SafetyDate update(@RequestBody String json) throws ParseException {
        Gson gson = new Gson();
        SafetyDate safetyDate = gson.fromJson(json, SafetyDate.class);
        return repo.updateSafetyDate(safetyDate);
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
