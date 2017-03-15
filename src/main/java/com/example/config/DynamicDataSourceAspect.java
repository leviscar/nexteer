package com.example.config;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

/**
 * Created by mrpan on 2017/3/9.
 * 切换数据源
 */
@Aspect
@Order(-10)//保证该AOP在@Transactional之前执行
@Component
public class DynamicDataSourceAspect {
    @Before("@annotation(targetDataSource)")
    public void changeDataSource(JoinPoint point, TargetDataSource targetDataSource) {
        // 获得当前数据源id
        String dsId = targetDataSource.value();
        // 当前数据源不存在
        if (!DynamicDataSourceContextHolder.containsDataSource(dsId)) {
            System.err.println("数据源[{}]不存在，使用默认数据源 > {}" + targetDataSource.value() + point.getSignature());
        } else {
            System.out.println("Use DataSource : {} > {}"+targetDataSource.value()+point.getSignature());
            DynamicDataSourceContextHolder.setDataSourceType(targetDataSource.value());
        }
    }

    @After("@annotation(targetDataSource)")
    public void restoreDataSource(JoinPoint point, TargetDataSource targetDataSource){
        System.out.println("Revert DataSource : {} > {}"+targetDataSource.value()+point.getSignature());
        //方法执行完毕之后，销毁当前数据源信息，进行垃圾回收。
        DynamicDataSourceContextHolder.clearDataSourceType();
    }
}
