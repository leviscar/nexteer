package com.example.controller;

import com.example.enumtype.Cell;
import com.example.enumtype.ShiftType;
import com.example.enumtype.TaskType;
import com.example.model.TaskInfo;
import com.example.model.WorkShift;
import com.example.repository.WorkShiftRepo;
import com.example.task.TaskImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.util.List;

/**
 * Created by mrpan on 2017/3/9.
 */
@RestController
@RequestMapping(value = "/work-shift")
public class WorkShiftController {
    private WorkShiftRepo repo;
    private TaskImpl taskImpl;
    private final String taskPrefix = "com.example.task.";
    private final String taskSuffix = "Task";

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
            int cronSecond = getCronSecond(Cell.valueOf(cellName), TaskType.valueOf(taskType));
            String cron = cronSecond + " " + endTime.substring(3, 5) + " " + endTime.substring(0, 2) + " * * ?";
            // add saving the shift hourly output task
            addTask(cron, cellName, TaskType.valueOf(taskType));
            if (shiftType.equals(ShiftType.Ashift.toString())){
                // add saving the last day's output information task
                cronSecond = getCronSecond(Cell.valueOf(cellName), TaskType.DailyTask);
                cron = cronSecond + " " + startTime.substring(3, 5) + " " + startTime.substring(0, 2) + " * * ?";
                addTask(cron, cellName, TaskType.DailyTask);
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
            int cronSecond = getCronSecond(Cell.valueOf(cellName), TaskType.valueOf(taskType));
            String cron = cronSecond + " " + endTime.substring(3, 5) + " " + endTime.substring(0, 2) + " * * ?";
            // add saving the shift hourly output task
            updateTask(cron, cellName, TaskType.valueOf(taskType));
            taskImpl.restart(taskPrefix + taskType, cellName);
            if (shiftType.equals(ShiftType.Ashift.toString())) {
                // add saving the last day's output information task
                cronSecond = getCronSecond(Cell.valueOf(cellName), TaskType.DailyTask);
                cron = cronSecond + " " + startTime.substring(3, 5) + " " + startTime.substring(0, 2) + " * * ?";
                updateTask(cron, cellName, TaskType.DailyTask);
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
    private void addTask(String cron, String cellName, TaskType taskType) {
        TaskInfo taskInfo = new TaskInfo();
        // set the cron based on time
        taskInfo.setCron(cron);
        // set task group
        taskInfo.setCellName(cellName);
        // set saving the output information task when current shift is ended
        taskInfo.setTaskName(taskPrefix + taskType.toString());
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
    private void updateTask(String cron, String cellName, TaskType taskType) {
        TaskInfo taskInfo = new TaskInfo();
        // set the cron based on time
        taskInfo.setCron(cron);
        // set task group
        taskInfo.setCellName(cellName);
        // set saving the output information task when current shift is ended
        taskInfo.setTaskName(taskPrefix + taskType.toString());
        // update task
        taskImpl.update(taskInfo);
    }

    /**
     * Set cron second based on cell and task type
     * @param cell
     * @param taskType
     * @return
     */
    private int getCronSecond(Cell cell, TaskType taskType){
        int second = 0;
        switch (cell) {
            case ISHAFT1:
                second = 1;
                break;
            case ISHAFT2:
                second = 2;
                break;
            case ISHAFT3:
                second = 3;
                break;
            case ISHAFT4:
                second = 4;
                break;
            case BEPS1:
                second = 5;
                break;
            case BEPS2:
                second = 6;
                break;
            case BEPS3:
                second = 7;
                break;
            case CEPS1:
                second = 8;
                break;
            case CEPS2:
                second = 9;
                break;
            case CEPS3:
                second = 10;
                break;
            case CEPS4:
                second = 11;
                break;
            case CEPS5:
                second = 12;
                break;
        }
        if (taskType.equals(TaskType.DailyTask)){
            return 2*second - 1;
        } else {
            return 2*second;
        }
    }
}
