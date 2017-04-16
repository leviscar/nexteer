package com.example.controller;

import com.example.model.Ishaft1UnitStatus;
import com.example.model.ShiftUnitStatus;
import com.example.repository.ShiftUnitStatusRepo;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

/**
 * Created by mrpan on 2017/4/16.
 */
@RestController
@RequestMapping(value = "/unit-status/record")
public class ShiftUnitStatusController {
    private ShiftUnitStatusRepo shiftUnitStatusRepo;

    @Autowired
    public ShiftUnitStatusController(ShiftUnitStatusRepo shiftUnitStatusRepo) {
        this.shiftUnitStatusRepo = shiftUnitStatusRepo;
    }

    /**
     * Get unit status based on cell name, date and shift type
     *
     * @param cellName
     * @param date
     * @param shiftType
     * @return
     */
    @RequestMapping(value = "/{cell_name}")
    public Ishaft1UnitStatus getByCellDateAndShift(@PathVariable(value = "cell_name") String cellName
            , @RequestParam(value = "date") String date, @RequestParam(value = "shift_type") String shiftType) {
        List<ShiftUnitStatus> shiftUnitStatuses = shiftUnitStatusRepo.getByCellDateAndShift(cellName, date, shiftType);
        ShiftUnitStatus shiftUnitStatus = shiftUnitStatuses.get(0);
        Gson gson = new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
        return gson.fromJson(shiftUnitStatus.getUnitStatus(), Ishaft1UnitStatus.class);
    }
}
