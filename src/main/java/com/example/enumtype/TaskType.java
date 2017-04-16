package com.example.enumtype;

/**
 * Created by mrpan on 2017/4/14.
 */
public enum TaskType {
    AshiftTask("AshiftTask"), BshiftTask("BshiftTask"), CshiftTask("CshiftTask"), DailyTask("DailyTask");
    private String taskType;

    TaskType(String taskType) {
        this.taskType = taskType;
    }

    @Override
    public String toString() {
        return taskType;
    }

    public void setTaskType(String taskType) {
        this.taskType = taskType;
    }
}
