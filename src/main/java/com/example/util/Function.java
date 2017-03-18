package com.example.util;

import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

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
    public static Map<Date, Boolean> addOneDay(Date startDate, Date endDate) {
        Map<Date, Boolean> map = new HashMap<>();
        if (endDate.getTime() < startDate.getTime()) {
            Calendar calendar = Calendar.getInstance();
            calendar.setTime(endDate);
            calendar.add(Calendar.DAY_OF_MONTH, 1);
            map.put(calendar.getTime(), true);
            return map;
        } else {
            map.put(endDate, false);
            return map;
        }
    }
}
