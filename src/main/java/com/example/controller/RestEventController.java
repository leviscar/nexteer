package com.example.controller;

import com.example.model.RestEvent;
import com.example.repository.RestEventRepo;
import com.example.repository.WorkShiftRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Created by mrpan on 2017/3/15.
 */
@RestController
@RequestMapping(value = "/rest-event")
public class RestEventController {
    private RestEventRepo reRepo;

    @Autowired
    public RestEventController(RestEventRepo reRepo) {
        this.reRepo = reRepo;
    }

    /**
     * Add rest event
     *
     * @param re
     * @return
     */
    @RequestMapping(method = RequestMethod.POST)
    public RestEvent add(@RequestBody RestEvent re) {
        return reRepo.add(re);
    }

    /**
     * Get all the rest events based work shift id
     *
     * @param wsId
     * @return
     */
    @RequestMapping(method = RequestMethod.GET)
    public List<RestEvent> getByWorkShiftId(@RequestParam(value = "work_shift_id") int wsId) {
        return reRepo.getByWorkShiftId(wsId);
    }

    /**
     * Delete specific rest event
     *
     * @param id
     */
    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public void delete(@PathVariable(value = "id") int id) {
        reRepo.delete(id);
    }
}
