package com.example.task;

import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.quartz.StatefulJob;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.stereotype.Component;

import java.text.ParseException;

/**
 * Created by mrpan on 2017/4/14.
 */
@Configuration
@EnableScheduling
@Component
public class DailyTask implements StatefulJob {
    private Logger logger = LoggerFactory.getLogger(this.getClass());
    @Autowired
    private DynamicScheduledTask scheduledTask;

    @Override
    public void execute(JobExecutionContext jobExecutionContext) throws JobExecutionException {
        String group = jobExecutionContext.getJobDetail().getKey().getGroup();
        logger.info("TaskName: {}, TaskGroup:{}", jobExecutionContext.getJobDetail().getKey().getName(), group);
        try {
            // add daily product output into database
            scheduledTask.insertOutputIntoDatabase(group);
            // add daily hce and oee into database
            scheduledTask.insertOeeAndHceIntoDatabase(group);
        } catch (ParseException e) {
            e.printStackTrace();
        }
    }
}
