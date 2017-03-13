package com.example.util;

/**
 * Created by mrpan on 2017/3/13.
 */
public class Function {
    // 当前生产数量 >= 总目标/总时间*已消耗时间
    public static double targetPerMinute(int target, double totalMinutes, long curMinutes) {
        return target / totalMinutes * curMinutes;
    }
}
