package com.example.util;

import com.example.model.WorkShift;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

/**
 * Created by mrpan on 2017/3/28.
 */
public class OutputTool {
    /**
     * Set the year, month, day to work shift's start time and end time based on current date
     *
     * @param curDate
     * @param workShift
     * @return
     */
    public static List<Date> changeShiftDate(Date curDate, WorkShift workShift) {
        Calendar calendar = Calendar.getInstance();
        List<Date> dates = new ArrayList<>();
        calendar.setTime(curDate);
        calendar.set(Calendar.HOUR_OF_DAY, Integer.parseInt(workShift.getStartTime().substring(0, 2)));
        calendar.set(Calendar.MINUTE, Integer.parseInt(workShift.getStartTime().substring(3, 5)));
        calendar.set(Calendar.SECOND, 0);
        dates.add(calendar.getTime());
        calendar.set(Calendar.HOUR_OF_DAY, Integer.parseInt(workShift.getEndTime().substring(0, 2)));
        calendar.set(Calendar.MINUTE, Integer.parseInt(workShift.getEndTime().substring(3, 5)));
        calendar.set(Calendar.SECOND, 0);
        dates.add(calendar.getTime());
        return dates;
    }

    /**
     * Calculate the current beat
     *
     * @param productsDates
     * @param topN
     * @return
     */
    public static int calcCurBeats(List<Date> productsDates, int topN) {
        int curBeats = 0;
        if (productsDates.size() >= topN) {
            Date finalProductDate = productsDates.get(0);
            Date firstProductDate = productsDates.get(topN - 1);
            curBeats = (int) ((finalProductDate.getTime() - firstProductDate.getTime()) / (1000 * (topN - 1)));
        }
        return curBeats;
    }

    /**
     * Calculate the status based on standard beat and current beat
     *
     * @param curBeats
     * @param standardBeats
     * @return
     */
    public static int getStatus(int curBeats, int standardBeats) {
        if (curBeats <= standardBeats && curBeats > 0) {
            // smile face
            return 1;
        } else {
            // cry face
            return 0;
        }

    }
}
