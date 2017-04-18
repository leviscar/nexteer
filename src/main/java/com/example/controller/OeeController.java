package com.example.controller;

import com.example.model.Oee;
import com.example.repository.OeeRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.util.List;

/**
 * Created by mrpan on 2017/3/29.
 */
@RestController
@RequestMapping(value = "/oee")
public class OeeController {
    private OeeRepo oeeRepo;

    @Autowired
    public OeeController(OeeRepo oeeRepo) {
        this.oeeRepo = oeeRepo;
    }

    /**
     * Set target oee
     *
     * @param oee
     * @return
     */
    @RequestMapping(value = "/target", method = RequestMethod.POST)
    public Oee addTargetOee(@RequestBody Oee oee) {
        return oeeRepo.addTargetOee(oee);
    }

    /**
     * Get all oee records of specific cell during a period based on start date and end date
     *
     * @param cell
     * @param start
     * @param end
     * @return
     */
    @RequestMapping(value = "/period/{cell}")
    public List<Oee> getPeriodOeeByCellName(@PathVariable(value = "cell") String cell
            , @RequestParam(value = "start") Date start, @RequestParam(value = "end") Date end) {
        return oeeRepo.getPeriodOeeByCellName(cell, start, end);
    }

    /**
     * Get a week records of specific cell based on current date
     *
     * @param cell
     * @param date
     * @return
     */
    @RequestMapping(value = "/week/{cell}")
    public List<Oee> getWeeklyOeeByCellName(@PathVariable(value = "cell") String cell
            , @RequestParam(value = "date") Date date) {
        return oeeRepo.getWeeklyOeeByCellName(cell, date);
    }

    /**
     * Get a month records of specific cell based on current date
     *
     * @param cell
     * @param date
     * @return
     */
    @RequestMapping(value = "/month/{cell}")
    public List<Oee> getMonthlyOeeByCellName(@PathVariable(value = "cell") String cell
            , @RequestParam(value = "date") Date date) {
        return oeeRepo.getMonthlyOeeByCellName(cell, date);
    }

    /**
     * Get a year records of specific cell based on current date
     *
     * @param cell
     * @param date
     * @return
     */
    @RequestMapping(value = "/year/{cell}")
    public List<Oee> getYearlyOeeByCellName(@PathVariable(value = "cell") String cell
            , @RequestParam(value = "date") Date date) {
        return oeeRepo.getYearlyOeeByCellName(cell, date);
    }

    /**
     * Get all oee records of all cells during a period based on start date and end date
     *
     * @param start
     * @param end
     * @return
     */
    @RequestMapping(value = "/period")
    public List<Oee> getAllByPeriod(@RequestParam(value = "start") Date start
            , @RequestParam(value = "end") Date end) {
        return oeeRepo.getAllCellsPeriodOee(start, end);
    }

    /**
     * Get a week records of of all cells based on current date
     *
     * @param date
     * @return
     */
    @RequestMapping(value = "/week")
    public List<Oee> getAllByWeek(@RequestParam(value = "date") Date date) {
        return oeeRepo.getAllCellsWeeklyOee(date);
    }

    /**
     * Get a month records of of all cells based on current date
     *
     * @param date
     * @return
     */
    @RequestMapping(value = "/month")
    public List<Oee> getAllByMonth(@RequestParam(value = "date") Date date) {
        return oeeRepo.getAllCellsMonthlyOee(date);
    }

    /**
     * Get a year records of of all cells based on current date
     *
     * @param date
     * @return
     */
    @RequestMapping(value = "/year")
    public List<Oee> getAllByYear(@RequestParam(value = "date") Date date) {
        return oeeRepo.getAllCellsYearlyOee(date);
    }
}
