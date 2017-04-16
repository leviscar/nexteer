package com.example.util;

import com.example.enumtype.ShiftType;
import com.example.model.WorkShift;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

/**
 * Created by mrpan on 2017/3/28.
 * 产量状态和统计页面相关方法
 */
public class OutputTool {
    /**
     * 根据当前日期修改班次信息中的日期
     *
     * @param curDate
     * @param workShift
     * @param shiftType
     * @return
     */
    public static List<Date> changeShiftDate(Date curDate, WorkShift workShift, ShiftType shiftType) {
        Calendar calendar = Calendar.getInstance();
        List<Date> dates = new ArrayList<>();
        calendar.setTime(curDate);
        switch (shiftType) {
            case Ashift:
                calendar.set(Calendar.HOUR_OF_DAY, Integer.parseInt(workShift.getMorning_shift_start().substring(0, 2)));
                calendar.set(Calendar.MINUTE, Integer.parseInt(workShift.getMorning_shift_start().substring(3, 5)));
                calendar.set(Calendar.SECOND, 0);
                dates.add(calendar.getTime());
                calendar.set(Calendar.HOUR_OF_DAY, Integer.parseInt(workShift.getMorning_shift_end().substring(0, 2)));
                calendar.set(Calendar.MINUTE, Integer.parseInt(workShift.getMorning_shift_end().substring(3, 5)));
                calendar.set(Calendar.SECOND, 0);
                dates.add(calendar.getTime());
                break;
            case Bshift:
                calendar.set(Calendar.HOUR_OF_DAY, Integer.parseInt(workShift.getMiddle_shift_start().substring(0, 2)));
                calendar.set(Calendar.MINUTE, Integer.parseInt(workShift.getMiddle_shift_start().substring(3, 5)));
                calendar.set(Calendar.SECOND, 0);
                dates.add(calendar.getTime());
                calendar.set(Calendar.HOUR_OF_DAY, Integer.parseInt(workShift.getMiddle_shift_end().substring(0, 2)));
                calendar.set(Calendar.MINUTE, Integer.parseInt(workShift.getMiddle_shift_end().substring(3, 5)));
                calendar.set(Calendar.SECOND, 0);
                dates.add(calendar.getTime());
                break;
            case Cshift:
                calendar.set(Calendar.HOUR_OF_DAY, Integer.parseInt(workShift.getNight_shift_start().substring(0, 2)));
                calendar.set(Calendar.MINUTE, Integer.parseInt(workShift.getNight_shift_start().substring(3, 5)));
                calendar.set(Calendar.SECOND, 0);
                dates.add(calendar.getTime());
                calendar.set(Calendar.HOUR_OF_DAY, Integer.parseInt(workShift.getNight_shift_end().substring(0, 2)));
                calendar.set(Calendar.MINUTE, Integer.parseInt(workShift.getNight_shift_end().substring(3, 5)));
                calendar.set(Calendar.SECOND, 0);
                dates.add(calendar.getTime());
                break;

        }
        return dates;
    }

    /**
     * 根据班次信息，判断所属班次
     *
     * @return
     */
    public static ShiftType getShiftType(WorkShift workShift, Date curTime) throws ParseException {
        SimpleDateFormat sdf = new SimpleDateFormat("HH:mm");
        // 判断当前时刻所属班次
        if (workShift.getMorning_shift_start() != null && workShift.getMorning_shift_end() != null) {
            Date startTime = sdf.parse(workShift.getMorning_shift_start());
            Date endTime = sdf.parse(workShift.getMorning_shift_end());
            endTime = (Date) Function.addOneDay(startTime, endTime).keySet().toArray()[0];
            curTime = (Date) Function.addOneDay(startTime, curTime).keySet().toArray()[0];
            if (curTime.compareTo(endTime) <= 0 && curTime.compareTo(startTime) >= 0) {
                return ShiftType.Ashift;
            }
        }
        if (workShift.getNight_shift_start() != null && workShift.getNight_shift_end() != null) {
            Date startTime = sdf.parse(workShift.getNight_shift_start());
            Date endTime = sdf.parse(workShift.getNight_shift_end());
            endTime = (Date) Function.addOneDay(startTime, endTime).keySet().toArray()[0];
            curTime = (Date) Function.addOneDay(startTime, curTime).keySet().toArray()[0];
            if (curTime.compareTo(endTime) <= 0 && curTime.compareTo(startTime) >= 0) {
                return ShiftType.Cshift;
            }
        }
        if (workShift.getMiddle_shift_end() != null && workShift.getMiddle_shift_end() != null) {
            Date startTime = sdf.parse(workShift.getMiddle_shift_start());
            Date endTime = sdf.parse(workShift.getMiddle_shift_end());
            endTime = (Date) Function.addOneDay(startTime, endTime).keySet().toArray()[0];
            curTime = (Date) Function.addOneDay(startTime, curTime).keySet().toArray()[0];
            if (curTime.compareTo(endTime) <= 0 && curTime.compareTo(startTime) >= 0) {
                return ShiftType.Bshift;
            }
        }
        return null;
    }

    /**
     * 计算当前节拍
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
     * 计算状态
     *
     * @param curBeats
     * @param standardBeats
     * @return
     */
    public static int getStatus(int curBeats, int standardBeats) {
        // 当前节拍小于等于标准节拍
        if (curBeats <= standardBeats && curBeats > 0) {
            // 笑脸
            return 1;
        } else {
            // 哭脸
            return 0;
        }

    }
}
