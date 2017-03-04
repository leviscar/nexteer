package com.example.controller;

import com.example.model.SafetyDate;
import com.example.repository.SafetyDateRepo;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by mrpan on 2017/3/1.
 * 安全运行天数api
 */
@RestController
@RequestMapping(value = "/safetyDate")
public class SafetyDateController {
    private SafetyDateRepo repo;

    @Autowired
    public SafetyDateController(SafetyDateRepo repo) {
        this.repo = repo;
    }

    /**
     * 根据日期获得信息
     *
     * @param json
     * @return SafetyDate
     */
    @RequestMapping(value = "/getDates", method = RequestMethod.POST)
    public SafetyDate getDates(@RequestBody String json) {
        ObjectMapper mapper = new ObjectMapper();
        List<SafetyDate> res = new ArrayList<>();
        try {
            SafetyDate safetyDate = mapper.readValue(json, new TypeReference<SafetyDate>() {
            });
            res = repo.findByDate(safetyDate.getYear(), safetyDate.getMonth(), safetyDate.getDay());
        } catch (IOException e) {
            e.printStackTrace();
        }
        if (!res.isEmpty()) {
            return res.get(0);
        } else {
            return new SafetyDate();
        }
    }

    /**
     * 获取所有日期的信息
     *
     * @return list
     */
    @RequestMapping(value = "/getAllDates", method = RequestMethod.GET)
    public List<SafetyDate> getDates() {
        return repo.findAll();
    }

    /**
     * 获得所有不安全的日期
     *
     * @return list
     */
    @RequestMapping(value = "/getUnsafeDates", method = RequestMethod.GET)
    public List<SafetyDate> getUnsafeDates() {
        return repo.findAllUnsafeDate();
    }

    /**
     * 添加安全运行天数
     *
     * @param json
     */
    @RequestMapping(value = "/addDate", method = RequestMethod.POST)
    public void addDate(@RequestBody String json) {
        ObjectMapper mapper = new ObjectMapper();
        try {
            SafetyDate safetyDate = mapper.readValue(json, new TypeReference<SafetyDate>() {
            });
            repo.addSafetyDate(safetyDate);
        } catch (IOException | ParseException e) {
            e.printStackTrace();
        }
    }

    /**
     * 重置安全运行天数
     *
     * @param json
     */
    @RequestMapping(value = "/reset", method = RequestMethod.POST)
    public SafetyDate reset(@RequestBody String json) {
        ObjectMapper mapper = new ObjectMapper();
        SafetyDate res = new SafetyDate();
        try {
            SafetyDate safetyDate = mapper.readValue(json, new TypeReference<SafetyDate>() {
            });
            res = repo.resetSafetyDate(safetyDate);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return res;
    }
}
