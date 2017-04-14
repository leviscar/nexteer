package com.example.task;

import com.example.enumtype.Cell;
import com.example.model.TaskInfo;
import com.example.repository.TaskInfoRepo;
import org.quartz.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * Created by mrpan on 2017/4/13.
 */

@Component
@EnableScheduling
public class ScheduledRefreshCron {
//    private Logger logger = LoggerFactory.getLogger(this.getClass());
//
//    private TaskImpl taskImpl;
//
//    @Autowired
//    public ScheduledRefreshCron(TaskImpl taskImpl) {
//        this.taskImpl = taskImpl;
//    }
//
//    /**
//     * refresh the cron from database every 5 seconds
//     *
//     * @throws SchedulerException
//     */
//    @Scheduled(fixedDelay = 5000)
//    public void ScheduledUpdateCronTrigger() throws SchedulerException {
//        // get the current trigger
////        CronTrigger trigger = (CronTrigger) scheduler.getTrigger(cronTrigger.getKey());
////        String curCron = trigger.getCronExpression();
//        // get the new cron from the database
//        List<TaskInfo> taskInfos = taskInfoRepo.getByCellName(Cell.ISHAFT1.toString());
//        if (taskInfos.isEmpty()) {
//            logger.info("can not find the task of " + Cell.ISHAFT1.toString() + " in the database");
//            return;
//        }
//
//        for (TaskInfo taskInfo : taskInfos) {
//            addTask(taskInfo);
//        }
//
//    }
//
//    private void updateTask(TaskInfo taskInfo, CronTrigger cronTrigger, String taskName) throws SchedulerException {
//        String newCron = taskInfo.getCron();
//        String curCron = cronTrigger.getCronExpression();
//        if (!newCron.equals(curCron)) {
//            // set new cron
//            CronScheduleBuilder scheduleBuilder = CronScheduleBuilder.cronSchedule(newCron);
//            // reset the trigger based on the new cron
//            cronTrigger = cronTrigger.getTriggerBuilder().withIdentity(cronTrigger.getKey()).withSchedule(scheduleBuilder).build();
//            // reset the job based on the new trigger
////            scheduler.rescheduleJob(cronTrigger.getKey(), cronTrigger);
//            logger.info("change the old cron " + curCron + " to a new cron " + newCron);
//            curCron = newCron;
//        }
//    }
//
//    @SuppressWarnings("unchecked")
//    private void addTask(TaskInfo taskInfo) {
//        String taskName = taskInfo.getTaskName();
//        String taskGroup = taskInfo.getCellName();
//        try {
//            if (checkExists(taskName, taskGroup)) {
//                logger.info("===> AddJob fail, job already exist, jobGroup:{}, jobName:{}", taskGroup, taskName);
//                return;
//            }
//            TriggerKey triggerKey = TriggerKey.triggerKey(taskInfo.getTaskName(), taskInfo.getCellName());
//            JobKey jobKey = JobKey.jobKey(taskInfo.getTaskName(), taskInfo.getCellName());
//            CronScheduleBuilder scheduleBuilder = CronScheduleBuilder.cronSchedule(taskInfo.getCron()).withMisfireHandlingInstructionDoNothing();
//            CronTrigger trigger = TriggerBuilder.newTrigger().withIdentity(triggerKey).withSchedule(scheduleBuilder).build();
//            Class<? extends Job> clazz = (Class<? extends Job>) Class.forName(taskInfo.getTaskName());
//            JobDetail jobDetail = JobBuilder.newJob(clazz).withIdentity(jobKey).build();
//            scheduler.scheduleJob(jobDetail, trigger);
//            scheduler.start();
//
//        } catch (SchedulerException | ClassNotFoundException e) {
//            e.printStackTrace();
//        }
//
//    }
//    private boolean checkExists(String jobName, String jobGroup) throws SchedulerException{
//        TriggerKey triggerKey = TriggerKey.triggerKey(jobName, jobGroup);
//        return scheduler.checkExists(triggerKey);
//    }
}
