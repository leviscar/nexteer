package com.example.task;

import com.example.enumtype.ShiftType;
import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

/**
 * Created by mrpan on 2017/4/15.
 */
public class CshiftTask implements Job {
    private Logger logger = LoggerFactory.getLogger(this.getClass());
    @Autowired
    private ShiftTask shiftTask;

    @Override
    public void execute(JobExecutionContext jobExecutionContext) throws JobExecutionException {
        logger.info("TaskName: {}, TaskGroup:{}", jobExecutionContext.getJobDetail().getKey().getName()
                , jobExecutionContext.getJobDetail().getKey().getGroup());
        shiftTask.addIshaft1UnitStatus(ShiftType.Cshift);
    }
}
