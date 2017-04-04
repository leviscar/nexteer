package com.example.util;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by mrpan on 2017/3/13.
 */
public class Function {
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

    /**
     * sql date json 解析
     *
     * @return
     */
    public static ObjectMapper sqlDateMapper() {
        ObjectMapper mapper = new ObjectMapper();
        mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        mapper.setSerializationInclusion(JsonInclude.Include.NON_NULL);
        mapper.setSerializationInclusion(JsonInclude.Include.NON_EMPTY);
        mapper.configure(JsonParser.Feature.ALLOW_UNQUOTED_CONTROL_CHARS, true);
        return mapper;
    }
}
