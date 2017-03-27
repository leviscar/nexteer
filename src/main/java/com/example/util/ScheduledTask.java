package com.example.util;

import com.example.model.Ishaft1OutputInfo;
import com.example.model.Ishaft1Product;
import com.example.model.ProductModel;
import com.example.model.SafetyDate;
import com.example.repository.Ishaft1OutputInfoRepo;
import com.example.repository.Ishaft1ProductRepo;
import com.example.repository.ProductModelRepo;
import com.example.repository.SafetyDateRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.sql.*;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.Date;

/**
 * Created by mrpan on 2017/3/18.
 */
@Component
public class ScheduledTask {
    private Ishaft1OutputInfoRepo ishaft1OutputInfoRepo;
    private Ishaft1ProductRepo ishaft1ProductRepo;
    private SafetyDateRepo safetyDateRepo;
    private ProductModelRepo productModelRepo;
    @Autowired
    public ScheduledTask(Ishaft1OutputInfoRepo ishaft1OutputInfoRepo, Ishaft1ProductRepo ishaft1ProductRepo, SafetyDateRepo safetyDateRepo, ProductModelRepo productModelRepo) {
        this.ishaft1OutputInfoRepo = ishaft1OutputInfoRepo;
        this.ishaft1ProductRepo = ishaft1ProductRepo;
        this.safetyDateRepo = safetyDateRepo;
        this.productModelRepo = productModelRepo;
    }

    /**
     * 定时插入当天产量
     *
     * @throws ParseException
     */
    @Scheduled(cron = "0 51 13 * * ?")
    public void insertIntoDatabase() throws ParseException {
        // 设置一天的时间
        Date endDate = new Date();
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(endDate);
        calendar.add(Calendar.DAY_OF_MONTH, -1);
        Date startDate = calendar.getTime();
        // 设置插入的时间
        SimpleDateFormat sdf2 = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");


        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        Ishaft1OutputInfo ishaft1OutputInfo = new Ishaft1OutputInfo();
        ishaft1OutputInfo.setAdd_date(sdf.format(startDate));
        // 获得一天所有产量信息
        List<Ishaft1Product> products = ishaft1ProductRepo.getByPeriod(sdf2.parse("2016-10-14 12:00:00"), sdf2.parse("2016-10-14 15:00:00"));
        // 获得不同型号的产量
        Map<String, Integer> map = ModelOutput.getEachModelOutput(products);
        // 将不同型号的产量插入表中
        for (Map.Entry<String, Integer> entry : map.entrySet()) {
            ProductModel model = productModelRepo.getStdByModelId(entry.getKey());
            ishaft1OutputInfo.setModel_name(model.getModelName());
            ishaft1OutputInfo.setModel(entry.getKey());
            ishaft1OutputInfo.setOutput_count(entry.getValue());
            ishaft1OutputInfoRepo.add(ishaft1OutputInfo);
        }
    }

    /**
     * 每天零点定时添加安全运行天数
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
}
