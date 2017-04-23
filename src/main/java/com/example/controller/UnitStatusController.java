package com.example.controller;

import com.example.enumtype.Cell;
import com.example.service.UnitStatusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;

/**
 * Created by mrpan on 2017/3/13.
 */
@RestController
@RequestMapping(value = "/unit-status")
public class UnitStatusController {
    private UnitStatusService unitStatusService;

    @Autowired
    public UnitStatusController(UnitStatusService unitStatusService) {
        this.unitStatusService = unitStatusService;
    }

    /**
     * Get current unit status based on cell name
     *
     * @param cellName
     * @param currTime
     * @return
     * @throws ParseException
     */
    @RequestMapping(value = "/{cell_name}", method = RequestMethod.GET)
    public String getByCell(@PathVariable(value = "cell_name") String cellName
            , @RequestParam(name = "curr_time") String currTime) throws ParseException {
        return unitStatusService.getUnitStatusByCurTime(currTime, cellName);
    }
}
