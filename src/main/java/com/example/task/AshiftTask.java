package com.example.task;

import com.example.enumtype.ShiftType;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.quartz.QuartzJobBean;
import org.springframework.stereotype.Service;

/**
 * Created by mrpan on 2017/4/13.
 */
@Service
public class AshiftTask extends QuartzJobBean {
    private Logger logger = LoggerFactory.getLogger(this.getClass());
    @Autowired
    private ShiftTask shiftTask;

    @Override
    protected void executeInternal(JobExecutionContext jobExecutionContext) throws JobExecutionException {
        String group = jobExecutionContext.getJobDetail().getKey().getGroup();
        String name = jobExecutionContext.getJobDetail().getKey().getName();
        String description = jobExecutionContext.getJobDetail().getDescription();
        logger.info("TaskName: {}, TaskGroup:{}, description:{}", name, group, description);
        shiftTask.addUnitStatus(group, ShiftType.Ashift);
//        logger.info("A is running");
    }
}
