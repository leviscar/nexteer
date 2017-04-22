package com.example.util;

import java.util.Calendar;
import java.util.Date;

/**
 * Created by mrpan on 2017/3/13.
 */
public class Function {
    /**
     * add a day to end date if the end date is less than start date, meaning that end date is in the next day,
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
