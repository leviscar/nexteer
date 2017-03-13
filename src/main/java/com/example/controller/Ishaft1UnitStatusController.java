package com.example.controller;

import com.example.model.Ishaft1UnitStatus;
import com.example.repository.Ishaft1UnitStatusRepo;
import com.google.gson.Gson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.text.ParseException;
import java.util.List;

/**
 * Created by mrpan on 2017/3/13.
 */
@RestController
@RequestMapping(value = "/ishaft1-unit-status")
public class Ishaft1UnitStatusController {
    private Ishaft1UnitStatusRepo repo;

    @Autowired
    public Ishaft1UnitStatusController(Ishaft1UnitStatusRepo repo) {
        this.repo = repo;
    }
    @RequestMapping(value = "/getByCurTime", method = RequestMethod.POST)
    public Ishaft1UnitStatus getByCurTime(@RequestBody String json) throws ParseException {
        Gson gson = new Gson();
        Ishaft1UnitStatus status = gson.fromJson(json, Ishaft1UnitStatus.class);
        return repo.getByCurTime(status);
    }
}
