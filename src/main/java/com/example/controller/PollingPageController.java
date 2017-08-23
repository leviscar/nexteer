package com.example.controller;

import com.example.model.PollingPage;
import com.example.model.WorkShift;
import com.example.repository.PollingPageRepo;
import com.example.repository.WorkShiftRepo;
import com.google.gson.*;
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
    public PollingPageController(PollingPageRepo pgRepo, WorkShiftRepo wsRepo) {
        this.pgRepo = pgRepo;
        this.wsRepo = wsRepo;
    }

    private PollingPageRepo pgRepo;
    private WorkShiftRepo wsRepo;

    @RequestMapping(method = RequestMethod.GET)
    public List<PollingPage> getAll() {
        return pgRepo.getAll();
    }

    @RequestMapping(value = "/{cell}", method = RequestMethod.DELETE)
    public void delete(@PathVariable(value = "cell") String cellName) {
        pgRepo.delete(cellName);
    }

    @RequestMapping(method = RequestMethod.PATCH)
    public PollingPage update(@RequestBody PollingPage pg) {
        return pgRepo.update(pg);
    }

    @RequestMapping(method = RequestMethod.POST)
    public PollingPage add(@RequestBody PollingPage pg) {
        return pgRepo.add(pg);
    }

    @RequestMapping(value = "/{cell}", method = RequestMethod.GET)
    public PollingPage getByCell(@PathVariable(value = "cell") String cellName) {
        return pgRepo.getByCellName(cellName).get(0);
    }

    @RequestMapping(value = "/status/{cell}", method = RequestMethod.GET)
    public String getStatusByCell(@PathVariable(value = "cell") String cellName,
                                  @RequestParam(value = "time") String curTime) {
        JsonArray jsonArray = new JsonArray();
        Gson gson = new GsonBuilder().setDateFormat("yyyy-MM-dd").create();

        List<PollingPage> pgs = pgRepo.getByCellName(cellName);
        PollingPage pg = new PollingPage();
        if (!pgs.isEmpty()) {
            pg = pgs.get(0);
        }
        JsonParser parser = new JsonParser();
        JsonElement el = parser.parse(gson.toJson(pg));
        JsonObject object = el.getAsJsonObject();
        jsonArray.add(object);

        List<WorkShift> workShifts = wsRepo.getLatestByCurTime(cellName, curTime.substring(11, 16));
        WorkShift ws = new WorkShift();
        if (!workShifts.isEmpty()) {
            ws = workShifts.get(0);
        }
        JsonElement el2 = parser.parse(gson.toJson(ws));
        JsonObject object2 = el2.getAsJsonObject();
        jsonArray.add(object2);

        return gson.toJson(jsonArray);
    }
}
