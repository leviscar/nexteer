package com.example.controller;

import com.example.model.Hce;
import com.example.repository.HceRepo;
import com.example.util.Function;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.sql.Date;
import java.util.List;

/**
 * Created by mrpan on 2017/4/4.
 */
@RestController
@RequestMapping(value = "/hce")
public class HceController {
    private HceRepo hceRepo;

    @Autowired
    public HceController(HceRepo hceRepo) {
        this.hceRepo = hceRepo;
    }

    /**
     * Set target hce
     *
     * @param hce
     * @return
     */
    @RequestMapping(value = "/target", method = RequestMethod.POST)
    public Hce addTargetHce(@RequestBody Hce hce) {
        return hceRepo.addTargetHce(hce);
    }

    /**
     * Get all hce records of specific cell during a period based on start date and end date
     *
     * @param cell
     * @param start
     * @param end
     * @return
     */
    @RequestMapping(value = "/period/{cell}")
    public List<Hce> getPeriodHceByCellName(@PathVariable(value = "cell") String cell
            , @RequestParam(value = "start") Date start, @RequestParam(value = "end") Date end) {
        return hceRepo.getPeriodHceByCellName(cell, start, end);
    }

    /**
     * Get a week records of specific cell based on current date
     *
     * @param cell
     * @param date
     * @return
     */
    @RequestMapping(value = "/week/{cell}")
    public List<Hce> getWeeklyHceByCellName(@PathVariable(value = "cell") String cell
            , @RequestParam(value = "date") Date date) {
        return hceRepo.getWeeklyHceByCellName(cell, date);
    }

    /**
     * Get a month records of specific cell based on current date
     *
     * @param cell
     * @param date
     * @return
     */
    @RequestMapping(value = "/month/{cell}")
    public List<Hce> getMonthlyHceByCellName(@PathVariable(value = "cell") String cell
            , @RequestParam(value = "date") Date date) {
        return hceRepo.getMonthlyHceByCellName(cell, date);
    }

    /**
     * Get a year records of specific cell based on current date
     *
     * @param cell
     * @param date
     * @return
     */
    @RequestMapping(value = "/year/{cell}")
    public List<Hce> getYearlyHceByCellName(@PathVariable(value = "cell") String cell
            , @RequestParam(value = "date") Date date) {
        return hceRepo.getYearlyHceByCellName(cell, date);
    }

    /**
     * Get all hce records of all cells during a period based on start date and end date
     *
     * @param start
     * @param end
     * @return
     */
    @RequestMapping(value = "/period")
    public List<Hce> getAllByPeriod(@RequestParam(value = "start") Date start
            , @RequestParam(value = "end") Date end) {
        return hceRepo.getAllCellsPeriodHce(start, end);
    }

    /**
     * Get a week records of of all cells based on current date
     *
     * @param date
     * @return
     */
    @RequestMapping(value = "/week")
    public List<Hce> getAllByWeek(@RequestParam(value = "date") Date date) {
        return hceRepo.getAllCellsWeeklyHce(date);
    }

    /**
     * Get a month records of of all cells based on current date
     *
     * @param date
     * @return
     */
    @RequestMapping(value = "/month")
    public List<Hce> getAllByMonth(@RequestParam(value = "date") Date date) {
        return hceRepo.getAllCellsMonthlyHce(date);
    }

    /**
     * Get a year records of of all cells based on current date
     *
     * @param date
     * @return
     */
    @RequestMapping(value = "/year")
    public List<Hce> getAllByYear(@RequestParam(value = "date") Date date) {
        return hceRepo.getAllCellsYearlyHce(date);
    }

}
