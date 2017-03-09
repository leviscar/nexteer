package com.example.config;

import java.lang.annotation.*;

/**
 * Created by mrpan on 2017/3/9.
 * 用于指定使用哪个数据源
 */
@Target({ElementType.METHOD, ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface TargetDataSource {
    String value();
}
