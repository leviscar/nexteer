package com.example.task;

import com.example.enumtype.ShiftType;
import com.example.model.ShiftUnitStatus;
import com.example.repository.ShiftUnitStatusRepo;
import com.example.service.UnitStatusService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * Created by mrpan on 2017/4/16.
 */
@Service
public class ShiftTask {
    private Logger logger = LoggerFactory.getLogger(this.getClass());

    private UnitStatusService unitStatusService;
    private ShiftUnitStatusRepo shiftUnitStatusRepo;

    @Autowired
    public ShiftTask(UnitStatusService unitStatusService, ShiftUnitStatusRepo shiftUnitStatusRepo) {
        this.unitStatusService = unitStatusService;
        this.shiftUnitStatusRepo = shiftUnitStatusRepo;
    }

    public void addUnitStatus(String cellName, ShiftType shiftType) {
        ShiftUnitStatus shiftUnitStatus = new ShiftUnitStatus();
        shiftUnitStatus.setCellName(cellName);
        shiftUnitStatus.setShiftType(shiftType.toString());

        Date date = new Date();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        try {
            //test
//            date = sdf.parse("2017-04-25 15:50:00");
            // set add date
            shiftUnitStatus.setAddDate(new java.sql.Date(date.getTime()));
            // get unit status
            String unitStatus = unitStatusService.getUnitStatusByCurTime(sdf.format(date), cellName);
            shiftUnitStatus.setUnitStatus(unitStatus);
            shiftUnitStatusRepo.add(shiftUnitStatus);

        } catch (ParseException e) {
            logger.error("it occurs when format the date:{} to sdf:{}, e:{}", date, sdf, e);
            e.printStackTrace();
        }
    }
}
