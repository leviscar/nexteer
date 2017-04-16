package com.example.task;

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

/**
 * Created by mrpan on 2017/4/14.
 */
@Component
@EnableScheduling
@Configuration
public class DailyTask implements Job {
    private Logger logger = LoggerFactory.getLogger(this.getClass());
    @Autowired
    private DynamicScheduledTask scheduledTask;
    @Override
    public void execute(JobExecutionContext jobExecutionContext) throws JobExecutionException {
        logger.info("TaskName: {}, TaskGroup:{}", jobExecutionContext.getJobDetail().getKey().getName()
                , jobExecutionContext.getJobDetail().getKey().getGroup());
        try {
            // add daily product output into database
            scheduledTask.insertIshaft1OutputIntoDatabase();
            // add daily hce and oee into database
            scheduledTask.insertIshaft1OeeAndHceIntoDatabase();
        } catch (ParseException e) {
            e.printStackTrace();
        }
    }
}
