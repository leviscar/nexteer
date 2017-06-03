package com.example.task;

import com.example.enumtype.Cell;
import com.example.model.*;
import com.example.repository.*;
import com.example.util.DateFormat;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

/**
 * Created by mrpan on 2017/4/16.
 * Define some constant scheduled tasks whose cron is stable
 */
@Component
public class ConstantScheduledTask {
    private SafetyDateRepo safetyDateRepo;
    private QualityComplainRepo qualityComplainRepo;
    private HceRepo hceRepo;
    private OeeRepo oeeRepo;
    private ScrapAmountRepo scrapAmountRepo;

    @Autowired
    public ConstantScheduledTask(SafetyDateRepo safetyDateRepo, QualityComplainRepo qualityComplainRepo, HceRepo hceRepo, OeeRepo oeeRepo, ScrapAmountRepo scrapAmountRepo) {
        this.safetyDateRepo = safetyDateRepo;
        this.qualityComplainRepo = qualityComplainRepo;
        this.hceRepo = hceRepo;
        this.oeeRepo = oeeRepo;
        this.scrapAmountRepo = scrapAmountRepo;
    }

    /**
     * automatically add safety date into database when it comes to 0 o'clock
     *
     * @throws ParseException
     */
    @Scheduled(cron = "1 0 0 * * ?")
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

    @Scheduled(cron = "0 54 10 * * ?")
    public void addTarget() throws ParseException {
        addTargetHce();
        addTargetOee();
        addTargetScrapAmount();
    }

    private void addTargetHce() {
        Hce hce = new Hce();
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(new Date());
        java.sql.Date addDate = new java.sql.Date(calendar.getTime().getTime());
        hce.setAddDate(addDate);
        // Get target hce of the previous day
        calendar.add(Calendar.DAY_OF_MONTH, -1);
        java.sql.Date previousDay = new java.sql.Date(calendar.getTime().getTime());
        for (Cell cell : Cell.values()) {
            List<Hce> hces = hceRepo.getTargetHceByCellAndDate(cell.name(), previousDay);
            if (!hces.isEmpty()) {
                hce.setTargetHce(hces.get(0).getTargetHce());
                hce.setCellName(cell.name());
                hceRepo.addTargetHce(hce);
            }
        }
    }

    private void addTargetOee() {
        Oee oee = new Oee();
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(new Date());
        java.sql.Date addDate = new java.sql.Date(calendar.getTime().getTime());
        oee.setAddDate(addDate);
        // Get target oee of the previous day
        calendar.add(Calendar.DAY_OF_MONTH, -1);
        java.sql.Date previousDay = new java.sql.Date(calendar.getTime().getTime());
        for (Cell cell : Cell.values()) {
            List<Oee> oees = oeeRepo.getTargetOeeByCellAndDate(cell.name(), previousDay);
            if (!oees.isEmpty()) {
                oee.setTargetOee(oees.get(0).getTargetOee());
                oee.setCellName(cell.name());
                oeeRepo.addTargetOee(oee);
            }
        }
    }

    private void addTargetScrapAmount() throws ParseException {
        ScrapAmount scrapAmount = new ScrapAmount();
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(new Date());
        SimpleDateFormat dateFormat = DateFormat.dateFormat();
        scrapAmount.setAddDate(dateFormat.format(calendar.getTime()));
        // Get target scrap amount of the previous day
        calendar.add(Calendar.DAY_OF_MONTH, -1);
        String previousDay = dateFormat.format(calendar.getTime());
        for (Cell cell : Cell.values()) {
            List<ScrapAmount> scrapAmounts = scrapAmountRepo.getTargetScrapAmountByCellAndDate(cell.name(), previousDay);
            if (!scrapAmounts.isEmpty()) {
                scrapAmount.setTargetValue(scrapAmounts.get(0).getTargetValue());
                scrapAmount.setCellName(cell.name());
                scrapAmountRepo.addAmount(scrapAmount);
            }
        }
    }
}
