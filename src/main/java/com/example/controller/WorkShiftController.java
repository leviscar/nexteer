package com.example.controller;

import com.example.enumtype.ShiftType;
import com.example.enumtype.TaskType;
import com.example.model.TaskInfo;
import com.example.model.WorkShift;
import com.example.repository.WorkShiftRepo;
import com.example.task.TaskImpl;
import com.example.util.DateFormat;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.util.Date;
import java.util.List;

/**
 * Created by mrpan on 2017/3/9.
 */
@RestController
@RequestMapping(value = "/work-shift")
public class WorkShiftController {
    private WorkShiftRepo repo;
    private final String taskPrefix = "com.example.task.";
    private final String taskSuffix = "Task";
    private TaskImpl taskImpl;
    @Autowired
    public WorkShiftController(WorkShiftRepo repo, TaskImpl taskImpl) {
        this.repo = repo;
        this.taskImpl = taskImpl;
    }

    /**
     * Add shift
     *
     * @param ws
     * @return
     * @throws ParseException
     */
    @RequestMapping(method = RequestMethod.POST)
    public WorkShift add(@RequestBody WorkShift ws) throws ParseException {
        String startTime = ws.getStartTime();
        String endTime = ws.getEndTime();
        String cellName = ws.getCellName();
        String shiftType = ws.getShiftType();
        boolean open = ws.isOpen();
        if (open) {
            String taskType = shiftType + taskSuffix;
            // set the cron based on the shift's end time
//            int cronSecond = getCronSecond(Cell.valueOf(cellName), TaskType.valueOf(taskType));
            String cron = "0 " + endTime.substring(3, 5) + " " + endTime.substring(0, 2) + " * * ?";
            String description = "Add time: " + DateFormat.timeFormat().format(new Date()) + " 添加" + cellName
                    + "， " + shiftType + " 单元状态, ";
            // add saving the shift hourly output task
            addTask(cron, cellName, TaskType.valueOf(taskType), description);
            if (shiftType.equals(ShiftType.Ashift.toString())) {
                // add saving the last day's output information task
//                cronSecond = getCronSecond(Cell.valueOf(cellName), TaskType.DailyTask);
                cron = "0 " + startTime.substring(3, 5) + " " + startTime.substring(0, 2) + " * * ?";
                description = "Add time: " + DateFormat.timeFormat().format(new Date()) + "添加" + cellName
                        + "当天产量、Oee、Hce";
                addTask(cron, cellName, TaskType.DailyTask, description);
            }
        }
        repo.add(ws);
        return ws;
    }

    /**
     * Update work shift and reschedule task
     *
     * @param ws
     * @return
     */
    @RequestMapping(method = RequestMethod.PATCH)
    public WorkShift update(@RequestBody WorkShift ws) {
        String startTime = ws.getStartTime();
        String endTime = ws.getEndTime();
        String cellName = ws.getCellName();
        String shiftType = ws.getShiftType();
        String taskType = shiftType + taskSuffix;
        boolean open = ws.isOpen();
        if (open) {
            // set the cron based on the shift's end time
//            int cronSecond = getCronSecond(Cell.valueOf(cellName), TaskType.valueOf(taskType));
            String cron = "0 " + endTime.substring(3, 5) + " " + endTime.substring(0, 2) + " * * ?";
            String description = "Update time: " + DateFormat.timeFormat().format(new Date()) + " 添加" + cellName
                    + "， " + shiftType + " 单元状态, ";
            // add saving the shift hourly output task
            updateTask(cron, cellName, TaskType.valueOf(taskType), description);
            taskImpl.restart(taskPrefix + taskType, cellName);
            if (shiftType.equals(ShiftType.Ashift.toString())) {
                // add saving the last day's output information task
//                cronSecond = getCronSecond(Cell.valueOf(cellName), TaskType.DailyTask);
                cron = "0 " + startTime.substring(3, 5) + " " + startTime.substring(0, 2) + " * * ?";
                description = "Update time: " + DateFormat.timeFormat().format(new Date()) + "添加" + cellName
                        + "当天产量、Oee、Hce";
                updateTask(cron, cellName, TaskType.DailyTask, description);
                taskImpl.restart(taskPrefix + TaskType.DailyTask.toString(), cellName);
            }
        } else {
            taskImpl.pause(taskPrefix + taskType, cellName);
            taskImpl.pause(taskPrefix + TaskType.DailyTask.toString(), cellName);
        }
        repo.update(ws);
        return ws;
    }

    /**
     * Get latest work shift based on cell name and shift type
     *
     * @return
     */
    @RequestMapping(value = "/{cell_name}", method = RequestMethod.GET)
    public WorkShift getByShiftType(@PathVariable(value = "cell_name") String cellName
            , @RequestParam(value = "shift_type") String shiftType) {
        List<WorkShift> workShifts = repo.getLatestByShiftType(cellName, shiftType);
        if (workShifts.isEmpty()) {
            return new WorkShift();
        } else {
            return workShifts.get(0);
        }
    }

    /**
     * Get all scheduled tasks
     *
     * @return
     */
    @RequestMapping(value = "/scheduled-tasks", method = RequestMethod.GET)
    public List<TaskInfo> getAllScheduledTasks() {
        return taskImpl.getAllTasks();
    }

    /**
     * Get all scheduled tasks by group name
     *
     * @param cellName
     * @return
     */
    @RequestMapping(value = "/scheduled-tasks/{cell_name}", method = RequestMethod.GET)
    public List<TaskInfo> getScheduledTasksByGroup(@PathVariable(value = "cell_name") String cellName) {
        return taskImpl.getTasksByGroup(cellName);
    }

    /**
     * Add scheduled task
     *
     * @param cron
     * @param cellName
     * @param taskType
     */
    private void addTask(String cron, String cellName, TaskType taskType, String decription) {
        TaskInfo taskInfo = new TaskInfo();
        // set the cron based on time
        taskInfo.setCron(cron);
        // set task group
        taskInfo.setCellName(cellName);
        // set saving the output information task when current shift is ended
        taskInfo.setTaskName(taskPrefix + taskType.toString());
        // set description of task
        taskInfo.setDescription(decription);
        // add task
        taskImpl.add(taskInfo);
    }

    /**
     * Update scheduled task
     *
     * @param cron
     * @param cellName
     * @param taskType
     */
    private void updateTask(String cron, String cellName, TaskType taskType,String decription) {
        TaskInfo taskInfo = new TaskInfo();
        // set the cron based on time
        taskInfo.setCron(cron);
        // set task group
        taskInfo.setCellName(cellName);
        // set saving the output information task when current shift is ended
        taskInfo.setTaskName(taskPrefix + taskType.toString());
        // set description of task
        taskInfo.setDescription(decription);
        // update task
        taskImpl.update(taskInfo);
    }

}
