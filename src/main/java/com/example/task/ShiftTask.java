package com.example.task;

import com.example.enumtype.Cell;
import com.example.enumtype.ShiftType;
import com.example.model.ShiftUnitStatus;
import com.example.repository.Ishaft1UnitStatusRepo;
import com.example.repository.ShiftUnitStatusRepo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * Created by mrpan on 2017/4/16.
 */
@Component
public class ShiftTask {
    private Logger logger = LoggerFactory.getLogger(this.getClass());

    private Ishaft1UnitStatusRepo ishaft1UnitStatusRepo;
    private ShiftUnitStatusRepo shiftUnitStatusRepo;

    @Autowired
    public ShiftTask(Ishaft1UnitStatusRepo ishaft1UnitStatusRepo, ShiftUnitStatusRepo shiftUnitStatusRepo) {
        this.ishaft1UnitStatusRepo = ishaft1UnitStatusRepo;
        this.shiftUnitStatusRepo = shiftUnitStatusRepo;
    }

    public void addIshaft1UnitStatus(ShiftType shiftType) {
        ShiftUnitStatus shiftUnitStatus = new ShiftUnitStatus();
        shiftUnitStatus.setCellName(Cell.ISHAFT1.toString());
        shiftUnitStatus.setShiftType(shiftType.toString());

        Date date = new Date();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        try {
            //test
//            date = sdf.parse("2017-04-07 15:50:00");
            // set add date
            shiftUnitStatus.setAddDate(new java.sql.Date(date.getTime()));
            // get unit status
            String unitStatus = ishaft1UnitStatusRepo.getIshaftUnitStatusByCurTime(sdf.format(date));
            shiftUnitStatus.setUnitStatus(unitStatus);
            shiftUnitStatusRepo.add(shiftUnitStatus);

        } catch (ParseException e) {
            logger.error("it occurs when format the date:{} to sdf:{}, e:{}", date, sdf, e);
            e.printStackTrace();
        }
    }
}
