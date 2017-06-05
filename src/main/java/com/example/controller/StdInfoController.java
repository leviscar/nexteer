package com.example.controller;

import com.example.model.StdInfo;
import com.example.repository.StdInfoRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by mrpan on 2017/5/25.
 */
@RestController
@RequestMapping(value = "/std-info")
public class StdInfoController {
    private StdInfoRepo stdInfoRepo;

    @Autowired
    public StdInfoController(StdInfoRepo stdInfoRepo) {
        this.stdInfoRepo = stdInfoRepo;
    }

    /**
     * Get all standard beat for specific cell
     *
     * @param cellName
     * @return
     */
    @RequestMapping(value = "/standard-beat/{cell}", method = RequestMethod.GET)
    public List<Integer> getStandardBeats(@PathVariable(value = "cell") String cellName) {
        return stdInfoRepo.getStandardBeats(cellName);
    }

    /**
     * Get total worker num for specific cell and standard beat
     *
     * @param cellName
     * @param standardBeat
     * @return
     */
    @RequestMapping(value = "/worker-num/{cell}", method = RequestMethod.GET)
    public int getTotalWorkerNum(@PathVariable(value = "cell") String cellName,
                                 @RequestParam(value = "standard-beat") int standardBeat) {
        return stdInfoRepo.getTotalWorkNum(cellName, standardBeat);
    }

    /**
     * Delete record based on standard beat
     *
     * @param standardBeat
     * @param cellName
     */
    @RequestMapping(value = "/{cell}", method = RequestMethod.DELETE)
    public void deleteByStandardBeat(@PathVariable(value = "cell") String cellName, @RequestParam(value = "standard-beat") int standardBeat) {
        stdInfoRepo.delete(cellName, standardBeat);
    }

    /**
     * Add record
     *
     * @param stdInfos
     * @return
     */
    @RequestMapping(method = RequestMethod.POST)
    public List<StdInfo> add(@RequestBody List<StdInfo> stdInfos) {
        List<StdInfo> res = new ArrayList<>();
        for (StdInfo stdInfo : stdInfos) {
            res.add(stdInfoRepo.add(stdInfo));
        }
        return res;
    }

    /**
     * Get all records based on cell name
     *
     * @param cellName
     * @return
     */
    @RequestMapping(value = "/{cell}", method = RequestMethod.GET)
    public List<StdInfo> getByCell(@PathVariable(value = "cell") String cellName) {
        return stdInfoRepo.getByCell(cellName);
    }
}
