package com.example.controller;

import com.example.enumtype.Cell;
import com.example.repository.Ishaft1UnitStatusRepo;
import com.google.gson.JsonObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;

/**
 * Created by mrpan on 2017/3/13.
 */
@RestController
@RequestMapping(value = "/unit-status")
public class Ishaft1UnitStatusController {
    private Ishaft1UnitStatusRepo ishaft1UnitStatusRepo;

    @Autowired
    public Ishaft1UnitStatusController(Ishaft1UnitStatusRepo ishaft1UnitStatusRepo) {
        this.ishaft1UnitStatusRepo = ishaft1UnitStatusRepo;
    }

    @RequestMapping(value = "/{cell_name}", method = RequestMethod.GET)
    public String getByCurTime(@PathVariable(value = "cell_name") String cellName
            , @RequestParam(name = "curr_time") String curr_time) throws ParseException {
        if (cellName.equals(Cell.ISHAFT1.toString())) {
            return ishaft1UnitStatusRepo.getIshaftUnitStatusByCurTime(curr_time);
        } else {
            JsonObject object = new JsonObject();
            object.addProperty("system_status", false);
            object.addProperty("log", "不存在该产线信息");
            return object.toString();
        }
    }
}
