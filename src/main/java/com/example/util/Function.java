package com.example.util;

import java.util.Calendar;
import java.util.Date;

/**
 * Created by mrpan on 2017/3/13.
 */
public class Function {

    /**
     * 计算每分钟的目标量
     *
     * @param target
     * @param totalMinutes
     * @param curMinutes
     * @return
     */
    public static double targetPerMinute(int target, double totalMinutes, long curMinutes) {
        // 当前生产数量 >= 总目标/总时间*已消耗时间
        return target / totalMinutes * curMinutes;
    }

    /**
     * 如果两个时间不在同一天，则加一天
     *
     * @param startDate
     * @param endDate
     * @return
     */
    public static Date addOneDay(Date startDate, Date endDate) {
        if (endDate.getTime() < startDate.getTime()) {
            Calendar calendar = Calendar.getInstance();
            calendar.setTime(endDate);
            calendar.add(Calendar.DAY_OF_MONTH, 1);
            return calendar.getTime();
        } else {
            return endDate;
        }
    }
}
