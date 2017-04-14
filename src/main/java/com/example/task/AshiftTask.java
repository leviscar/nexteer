package com.example.task;

import com.example.enumtype.Cell;
import com.example.repository.WorkShiftRepo;
import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.stereotype.Component;

/**
 * Created by mrpan on 2017/4/13.
 */
@Configuration
@EnableScheduling
@Component
public class AshiftTask implements Job {
    private Logger logger = LoggerFactory.getLogger(this.getClass());
    @Autowired
    private WorkShiftRepo workShiftRepo;
    @Override
    public void execute(JobExecutionContext jobExecutionContext) throws JobExecutionException {
        logger.info("TaskName: {}", jobExecutionContext.getJobDetail().getKey().getName());
        logger.info("workShift: {}", workShiftRepo.getLatestWorkShift(Cell.ISHAFT1.toString()));
    }
}
