package com.example.task;

import com.example.model.TaskInfo;
import com.example.repository.TaskInfoRepo;
import org.quartz.*;
import org.quartz.impl.matchers.GroupMatcher;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;

/**
 * Created by mrpan on 2017/4/14.
 */
@Component
public class TaskImpl {
    private Logger logger = LoggerFactory.getLogger(getClass());
    private Scheduler scheduler;
    private TaskInfoRepo taskInfoRepo;

    @Autowired
    public TaskImpl(Scheduler scheduler, TaskInfoRepo taskInfoRepo) {
        this.scheduler = scheduler;
        this.taskInfoRepo = taskInfoRepo;
    }

    /**
     * get all tasks information
     *
     * @return
     */
    public List<TaskInfo> getAllTasks() {
        List<TaskInfo> taskInfos = new ArrayList<>();
        try {
            // get all tasks groups
            for (String group : scheduler.getJobGroupNames()) {
                // get all jobs in the group
                for (JobKey jobKey : scheduler.getJobKeys(GroupMatcher.groupEquals(group))) {
                    // get all triggers in the job
                    List<? extends Trigger> triggers = scheduler.getTriggersOfJob(jobKey);
                    for (Trigger trigger : triggers) {
                        // get trigger state
                        Trigger.TriggerState state = scheduler.getTriggerState(trigger.getKey());
                        String cron = "";
                        // get cron expression
                        if (trigger instanceof CronTrigger) {
                            CronTrigger cronTrigger = (CronTrigger) trigger;
                            cron = cronTrigger.getCronExpression();
                        }
                        TaskInfo taskInfo = new TaskInfo();
                        taskInfo.setCron(cron);
                        taskInfo.setCellName(jobKey.getGroup());
                        taskInfo.setTaskName(jobKey.getName());
                        taskInfo.setTaskStatus(state.name());
                        taskInfos.add(taskInfo);
                    }
                }
            }
        } catch (SchedulerException e) {
            logger.info("it happens when get all tasks list:" + e.toString());
            e.printStackTrace();
        }
        return taskInfos;
    }

    /**
     * get all tasks in specific group
     *
     * @param taskGroup
     * @return
     */
    public List<TaskInfo> getTasksByGroup(String taskGroup) {
        List<TaskInfo> taskInfos = new ArrayList<>();
        try {
            // get all jobs in the group
            for (JobKey jobKey : scheduler.getJobKeys(GroupMatcher.groupEquals(taskGroup))) {
                // get all triggers in the job
                List<? extends Trigger> triggers = scheduler.getTriggersOfJob(jobKey);
                for (Trigger trigger : triggers) {
                    // get trigger state
                    Trigger.TriggerState state = scheduler.getTriggerState(trigger.getKey());
                    String cron = "";
                    // get cron expression
                    if (trigger instanceof CronTrigger) {
                        CronTrigger cronTrigger = (CronTrigger) trigger;
                        cron = cronTrigger.getCronExpression();
                    }
                    TaskInfo taskInfo = new TaskInfo();
                    taskInfo.setCron(cron);
                    taskInfo.setCellName(jobKey.getGroup());
                    taskInfo.setTaskName(jobKey.getName());
                    taskInfo.setTaskStatus(state.name());
                    taskInfos.add(taskInfo);
                }
            }
        } catch (SchedulerException e) {
            logger.info("it happens when get all tasks list:" + e.toString());
            e.printStackTrace();
        }
        return taskInfos;
    }

    /**
     * add task and insert into database
     *
     * @param taskInfo
     */
    @SuppressWarnings("unchecked")
    public void add(TaskInfo taskInfo) {
        String taskName = taskInfo.getTaskName(), taskGroup = taskInfo.getCellName(), cron = taskInfo.getCron();
        try {
            // check the task existence
            if (checkExists(taskName, taskGroup)) {
                logger.info("Add task fail, task already exist, taskGroup:{}, taskName:{}", taskGroup, taskName);
                update(taskInfo);
                return;
            }
            // set trigger key
            TriggerKey triggerKey = new TriggerKey(taskName, taskGroup);
            // set job key
            JobKey jobKey = new JobKey(taskName, taskGroup);

            // set cron
            CronScheduleBuilder cronScheduleBuilder = CronScheduleBuilder.cronSchedule(cron).withMisfireHandlingInstructionDoNothing();
            // set trigger
            CronTrigger cronTrigger = TriggerBuilder.newTrigger().withIdentity(triggerKey).withSchedule(cronScheduleBuilder).build();
            // get the task class based on the task name
            Class<? extends Job> clazz = (Class<? extends Job>) Class.forName(taskName);
            // create new job based on the job detail and trigger
            JobDetail jobDetail = JobBuilder.newJob(clazz).withIdentity(jobKey).build();
            scheduler.scheduleJob(jobDetail, cronTrigger);

            // get the status of trigger
            Trigger.TriggerState state = scheduler.getTriggerState(cronTrigger.getKey());
            taskInfo.setTaskStatus(state.name());

            // add task into database
            taskInfoRepo.add(taskInfo);
        } catch (SchedulerException | ClassNotFoundException e) {
            logger.error("it happens when checking the task existence or finding the class based on the task name, e:{}" + e.toString());
            e.printStackTrace();
        }
    }

    /**
     * update task and update it in database
     *
     * @param taskInfo
     */
    public void update(TaskInfo taskInfo) {
        String taskName = taskInfo.getTaskName(), taskGroup = taskInfo.getCellName(), cron = taskInfo.getCron();
        try {
            if (!checkExists(taskName, taskGroup)) {
                logger.info("taskGroup:{}, taskName:{} is not existed", taskGroup, taskName);
                return;
            }
            TriggerKey triggerKey = TriggerKey.triggerKey(taskName, taskGroup);
            JobKey jobKey = new JobKey(taskName, taskGroup);
            CronScheduleBuilder cronScheduleBuilder = CronScheduleBuilder.cronSchedule(cron).withMisfireHandlingInstructionDoNothing();
            CronTrigger cronTrigger = TriggerBuilder.newTrigger().withIdentity(triggerKey).withSchedule(cronScheduleBuilder).build();

            JobDetail jobDetail = scheduler.getJobDetail(jobKey);
            HashSet<Trigger> triggerSet = new HashSet<>();
            triggerSet.add(cronTrigger);

            scheduler.scheduleJob(jobDetail, triggerSet, true);
            taskInfoRepo.updateCron(taskInfo);
            logger.info("update success, taskGroup:{}, taskName:{}, cron:{}", taskGroup, taskName, cron);
        } catch (SchedulerException e) {
            logger.error("it happens when checking the task existence, e:{}", e.toString());
            e.printStackTrace();
        }
    }

    /**
     * delete task
     *
     * @param taskName
     * @param taskGroup
     */
    public void delete(String taskName, String taskGroup) {
        TriggerKey triggerKey = TriggerKey.triggerKey(taskName, taskGroup);
        try {
            if (checkExists(taskName, taskGroup)) {
                scheduler.pauseTrigger(triggerKey);
                scheduler.unscheduleJob(triggerKey);
                taskInfoRepo.delete(taskGroup, taskName);
                logger.info("delete triggerKey:{} success", triggerKey);
            }
        } catch (SchedulerException e) {
            logger.error("it happens when checking the task existence, e:{}", e.toString());
            e.printStackTrace();
        }
    }

    /**
     * pause the task and update task status in database
     *
     * @param taskName
     * @param taskGroup
     */
    public void pause(String taskName, String taskGroup) {
        TriggerKey triggerKey = TriggerKey.triggerKey(taskName, taskGroup);
        try {
            if (checkExists(taskName, taskGroup)) {
                scheduler.pauseTrigger(triggerKey);
                Trigger.TriggerState state = scheduler.getTriggerState(triggerKey);
                String taskStatus = state.name();
                taskInfoRepo.updateStatus(taskGroup, taskName, taskStatus);
                logger.info("update task status:{} where taskGroup:{}, taskName:{}"
                        , taskStatus, taskGroup, taskName);
            }
        } catch (SchedulerException e) {
            logger.error("it happens when checking the task existence, e:{}", e.toString());
            e.printStackTrace();
        }
    }

    /**
     * restart the task and update the status
     *
     * @param taskName
     * @param taskGroup
     */
    public void restart(String taskName, String taskGroup) {
        TriggerKey triggerKey = TriggerKey.triggerKey(taskName, taskGroup);
        try {
            if (checkExists(taskName, taskGroup)) {
                scheduler.resumeTrigger(triggerKey);
                Trigger.TriggerState state = scheduler.getTriggerState(triggerKey);
                String taskStatus = state.name();
                taskInfoRepo.updateStatus(taskGroup, taskName, taskStatus);
                logger.info("restart success, triggerKey:{}", triggerKey);
            }
        } catch (SchedulerException e) {
            logger.error("it happens when checking the task existence, e:{}", e.toString());
            e.printStackTrace();
        }
    }

    /**
     * check task existence based on task name and task group
     *
     * @param taskName
     * @param taskGroup
     * @return
     * @throws SchedulerException
     */
    public boolean checkExists(String taskName, String taskGroup) throws SchedulerException {
        TriggerKey triggerKey = TriggerKey.triggerKey(taskName, taskGroup);
        return scheduler.checkExists(triggerKey);
    }
}
