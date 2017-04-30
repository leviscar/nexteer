package com.example.controller;

import com.example.model.OutputCountInfo;
import com.example.repository.OutputCountInfoRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.util.List;

/**
 * Created by mrpan on 2017/3/18.
 */
@RestController
@RequestMapping(value = "/output-info")
public class OutputCountInfoController {
    private OutputCountInfoRepo outputCountInfoRepo;

    @Autowired
    public OutputCountInfoController(OutputCountInfoRepo outputCountInfoRepo) {
        this.outputCountInfoRepo = outputCountInfoRepo;
    }

    /**
     * Get output information of specific cell based on a week
     *
     * @param cellName
     * @param date
     * @return
     */
    @RequestMapping(value = "/{cell}/week", method = RequestMethod.GET)
    public List<OutputCountInfo> getByWeek(@PathVariable(value = "cell") String cellName
            , @RequestParam(value = "date") Date date) {
        return outputCountInfoRepo.getByWeek(date, cellName);
    }

    /**
     * Get output information of specific cell based on a month
     *
     * @param cellName
     * @param date
     * @return
     */
    @RequestMapping(value = "/{cell}/month", method = RequestMethod.GET)
    public List<OutputCountInfo> getByMonth(@PathVariable(value = "cell") String cellName
            , @RequestParam(value = "date") Date date) {
        return outputCountInfoRepo.getByMonth(date, cellName);
    }

    /**
     * Get output information of specific cell based on a year
     *
     * @param cellName
     * @param date
     * @return
     */
    @RequestMapping(value = "/{cell}/year", method = RequestMethod.GET)
    public List<OutputCountInfo> getByYear(@PathVariable(value = "cell") String cellName
            , @RequestParam(value = "date") Date date) {
        return outputCountInfoRepo.getByYear(date, cellName);
    }

    /**
     * Get output information of specific cell based on a period
     *
     * @param cellName
     * @param start
     * @param end
     * @return
     */
    @RequestMapping(value = "/{cell}/period", method = RequestMethod.GET)
    public List<OutputCountInfo> getByWeek(@PathVariable(value = "cell") String cellName
            , @RequestParam(value = "start") Date start, @RequestParam(value = "end") Date end) {
        return outputCountInfoRepo.getByPeriod(start, end, cellName);
    }
}
