package com.example.controller;

import com.example.model.PollingPage;
import com.example.repository.PollingPageRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * User: cheng
 * Date: 17-6-3
 * Description:
 */
@RestController
@RequestMapping(value = "/polling-page")
public class PollingPageController {
    @Autowired
    public PollingPageController(PollingPageRepo pgRepo) {
        this.pgRepo = pgRepo;
    }

    private PollingPageRepo pgRepo;

    @RequestMapping(method = RequestMethod.GET)
    public List<PollingPage> getAll(){
        return pgRepo.getAll();
    }

    @RequestMapping(value = "/{cell}", method = RequestMethod.DELETE)
    public void delete(@PathVariable(value = "cell") String cellName){
        pgRepo.delete(cellName);
    }

    @RequestMapping(method = RequestMethod.PATCH)
    public PollingPage update(@RequestBody PollingPage pg){
        return pgRepo.update(pg);
    }

    @RequestMapping(method = RequestMethod.POST)
    public PollingPage add(@RequestBody PollingPage pg){
        return pgRepo.add(pg);
    }

    @RequestMapping(value = "/{cell}", method = RequestMethod.GET)
    public PollingPage getByCell(@PathVariable(value = "cell") String cellName){
        return pgRepo.getByCellName(cellName).get(0);
    }
}
