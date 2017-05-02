package com.example.task;

import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.quartz.QuartzJobBean;
import org.springframework.stereotype.Service;

import java.text.ParseException;

/**
 * Created by mrpan on 2017/4/14.
 */
@Service
public class DailyTask extends QuartzJobBean {
    private Logger logger = LoggerFactory.getLogger(this.getClass());
    @Autowired
    private DynamicScheduledTask scheduledTask;

    @Override
    protected void executeInternal(JobExecutionContext jobExecutionContext) throws JobExecutionException {
        String group = jobExecutionContext.getJobDetail().getKey().getGroup();
        String name = jobExecutionContext.getJobDetail().getKey().getName();
        String description = jobExecutionContext.getJobDetail().getDescription();
        logger.info("TaskName: {}, TaskGroup:{}, description:{}", name, group, description);
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
