package com.example.util;

import java.text.SimpleDateFormat;

/**
 * Created by mrpan on 2017/4/18.
 * Date format util
 */
public class DateFormat {
    /**
     * Format the date as "yyyy-MM-dd"
     *
     * @return
     */
    public static SimpleDateFormat dateFormat() {
        return new SimpleDateFormat("yyyy-MM-dd");
    }

    /**
     * Format the date as "yyyy-MM-dd HH:mm:ss"
     *
     * @return
     */
    public static SimpleDateFormat timeFormat() {
        return new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    }

    /**
     * Format the date as "HH:mm"
     *
     * @return
     */
    public static SimpleDateFormat hourFormat() {
        return new SimpleDateFormat("HH:mm");
    }
}
