package com.example.controller;

import com.example.model.WorkShift;
import com.example.repository.WorkShiftRepo;
import com.google.gson.Gson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.text.ParseException;

/**
 * Created by mrpan on 2017/3/9.
 */
@RestController
@RequestMapping(value = "/work-shift")
public class WorkShiftController {
    private WorkShiftRepo repo;

    @Autowired
    public WorkShiftController(WorkShiftRepo repo) {
        this.repo = repo;
    }

    /**
     * 增加早班一个班次
     *
     * @param json
     * @return
     * @throws ParseException
     */
    @RequestMapping(value = "/addOneShift", method = RequestMethod.POST)
    public String addOneShift(@RequestBody String json) throws ParseException {
        Gson gson = new Gson();
        WorkShift workShift = gson.fromJson(json, WorkShift.class);
        return repo.addOneShift(workShift).toString();
    }

    /**
     * 增加早晚班次
     *
     * @param json
     * @return
     * @throws ParseException
     */
    @RequestMapping(value = "/addTwoShift", method = RequestMethod.POST)
    public String addTwoShift(@RequestBody String json) throws ParseException {
        Gson gson = new Gson();
        WorkShift workShift = gson.fromJson(json, WorkShift.class);
        return repo.addTwoShift(workShift).toString();
    }

    /**
     * 增加早中晚班次
     *
     * @param json
     * @return
     * @throws ParseException
     */
    @RequestMapping(value = "/addThreeShift", method = RequestMethod.POST)
    public String addThreeShift(@RequestBody String json) throws ParseException {
        Gson gson = new Gson();
        WorkShift workShift = gson.fromJson(json, WorkShift.class);
        return repo.addThreeShift(workShift).toString();
    }
}
