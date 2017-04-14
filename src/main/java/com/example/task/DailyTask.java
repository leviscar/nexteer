package com.example.task;

import com.example.model.Ishaft1OutputInfo;
import com.example.model.Ishaft1Product;
import com.example.model.ProductModel;
import com.example.repository.Ishaft1OutputInfoRepo;
import com.example.repository.Ishaft1ProductRepo;
import com.example.repository.ProductModelRepo;
import com.example.util.ModelOutput;
import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.stereotype.Component;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * Created by mrpan on 2017/4/14.
 */
@Component
@EnableScheduling
@Configuration
public class DailyTask implements Job {
    private Logger logger = LoggerFactory.getLogger(this.getClass());
    @Autowired
    private Ishaft1ProductRepo ishaft1ProductRepo;
    @Autowired
    private ProductModelRepo productModelRepo;
    @Autowired
    private Ishaft1OutputInfoRepo ishaft1OutputInfoRepo;

    @Override
    public void execute(JobExecutionContext jobExecutionContext) throws JobExecutionException {
        logger.info("TaskName: {}", jobExecutionContext.getJobDetail().getKey().getName());
        try {
            insertIshaft1OutputIntoDatabase();
        } catch (ParseException e) {
            e.printStackTrace();
        }
    }

    /**
     * insert the ishaft1 output information into database
     */
    private void insertIshaft1OutputIntoDatabase() throws ParseException {
        Ishaft1OutputInfo ishaft1OutputInfo = new Ishaft1OutputInfo();
        // get the last date
        Date curDate = new Date();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        // test
//        SimpleDateFormat sdf2 = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
//        curDate = sdf2.parse("2017-02-14 15:50:00");
        //end
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(curDate);
        calendar.add(Calendar.DAY_OF_MONTH, -1);
        Date addDate = calendar.getTime();
        // set the add date which is format
        String addFormatDate = sdf.format(addDate);
        ishaft1OutputInfo.setAdd_date(addFormatDate);
        // get the products between current time and start time
        List<Ishaft1Product> products = ishaft1ProductRepo.getByPeriod(addDate, curDate);
        // get various model output
        Map<String, Integer> map = ModelOutput.getEachModelOutput(products);
        // insert into database based on different model
        for (Map.Entry<String, Integer> entry : map.entrySet()) {
            ProductModel model = productModelRepo.getStdByModelId(entry.getKey());
            ishaft1OutputInfo.setModel_name(model.getModelName());
            ishaft1OutputInfo.setModel(entry.getKey());
            ishaft1OutputInfo.setOutput_count(entry.getValue());
            ishaft1OutputInfoRepo.add(ishaft1OutputInfo);
        }
    }
}
