package com.example.task;

import com.example.model.QualityComplain;
import com.example.model.SafetyDate;
import com.example.repository.QualityComplainRepo;
import com.example.repository.SafetyDateRepo;
import com.example.util.DateFormat;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

/**
 * Created by mrpan on 2017/4/16.
 * Define some constant scheduled tasks whose cron is stable
 */
@Component
public class ConstantScheduledTask {
    private SafetyDateRepo safetyDateRepo;
    private QualityComplainRepo qualityComplainRepo;

    @Autowired
    public ConstantScheduledTask(SafetyDateRepo safetyDateRepo, QualityComplainRepo qualityComplainRepo) {
        this.safetyDateRepo = safetyDateRepo;
        this.qualityComplainRepo = qualityComplainRepo;
    }

    /**
     * automatically add safety date into database when it comes to 0 o'clock
     *
     * @throws ParseException
     */
    @Scheduled(cron = "0 0 0 * * ?")
    public void addSafetyDate() throws ParseException {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(new Date());
        SafetyDate safetyDate = new SafetyDate();
        safetyDate.setYear(String.valueOf(calendar.get(Calendar.YEAR)));
        safetyDate.setMonth(String.valueOf(calendar.get(Calendar.MONTH) + 1));
        safetyDate.setDay(String.valueOf(calendar.get(Calendar.DAY_OF_MONTH)));
        safetyDateRepo.addSafetyDate(safetyDate);
    }

    /**
     * automatically add quality complain date into database when it comes to 0 o'clock
     *
     * @throws ParseException
     */
    @Scheduled(cron = "10 0 0 * * ?")
    public void addQualityComplain() throws ParseException {
        SimpleDateFormat sdf = DateFormat.dateFormat();
        QualityComplain qualityComplain = new QualityComplain();
        qualityComplain.setAddDate(sdf.format(new Date()));
        qualityComplainRepo.add(qualityComplain);
    }
}
