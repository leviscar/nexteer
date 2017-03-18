package com.example.util;

import com.example.model.Ishaft1OutputInfo;
import com.example.model.Ishaft1Product;
import com.example.repository.Ishaft1OutputInfoRepo;
import com.example.repository.Ishaft1ProductRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * Created by mrpan on 2017/3/18.
 */
@Component
public class ScheduledTask {
    private Ishaft1OutputInfoRepo ishaft1OutputInfoRepo;
    private Ishaft1ProductRepo ishaft1ProductRepo;

    @Autowired
    public ScheduledTask(Ishaft1OutputInfoRepo ishaft1OutputInfoRepo, Ishaft1ProductRepo ishaft1ProductRepo) {
        this.ishaft1OutputInfoRepo = ishaft1OutputInfoRepo;
        this.ishaft1ProductRepo = ishaft1ProductRepo;
    }

    @Scheduled(cron = "0 0 0 * * ?")
    public void insertIntoDatabase() throws ParseException {
        // 设置一天的时间
        Date endDate = new Date();
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(endDate);
        calendar.add(Calendar.DAY_OF_MONTH, -1);
        Date startDate = calendar.getTime();
        // 设置插入的时间
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        Ishaft1OutputInfo ishaft1OutputInfo = new Ishaft1OutputInfo();
        ishaft1OutputInfo.setAdd_date(sdf.format(startDate));
        // 获得一天所有产量信息
        List<Ishaft1Product> products = ishaft1ProductRepo.getByPeriod(startDate, endDate);
        // 将产量根据型号排序
        Collections.sort(products, new Comparator<Ishaft1Product>() {

            @Override
            public int compare(Ishaft1Product o1, Ishaft1Product o2) {
                if (Integer.valueOf(o1.getModel()) > Integer.valueOf(o2.getModel())) {
                    return -1;
                }
                if (Integer.valueOf(o1.getModel()) < Integer.valueOf(o2.getModel())) {
                    return 1;
                }
                return 0;
            }
        });
        // 统计所有型号的产量
        Map<String, Integer> map = new HashMap<>();
        int count = 0;
        for (Ishaft1Product product : products) {
            if (map.containsKey(product.getModel())) {
                map.put(product.getModel(), ++count);
            } else {
                count = 0;
                map.put(product.getModel(), ++count);
            }
        }
        // 将不同型号的产量插入表中
        for (Map.Entry<String, Integer> entry : map.entrySet()) {
            ishaft1OutputInfo.setModel(entry.getKey());
            ishaft1OutputInfo.setOutput_count(entry.getValue());
            ishaft1OutputInfoRepo.add(ishaft1OutputInfo);
        }
    }
}
