package com.example.config;

import org.quartz.SchedulerException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.quartz.SchedulerFactoryBean;

import javax.sql.DataSource;
import java.io.IOException;
import java.util.Properties;

/**
 * Created by mrpan on 2017/4/13.
 */
@Configuration
@EnableScheduling
public class QuartzConfig {
    @Autowired
    private AutoWiringSpringBeanJobFactory autoWiringSpringBeanJobFactory;

    @Bean
    public SchedulerFactoryBean schedulerFactoryBean(@Qualifier("oneDataSource") DataSource dataSource) throws IOException, SchedulerException {
        SchedulerFactoryBean factory = new SchedulerFactoryBean();
        factory.setDataSource(dataSource);
        factory.setQuartzProperties(quartzProperties());
        factory.setOverwriteExistingJobs(true);
        factory.setStartupDelay(1);

        // config spring autowired
        factory.setJobFactory(autoWiringSpringBeanJobFactory);

        return factory;
    }

    public Properties quartzProperties() throws IOException {
        Properties prop = new Properties();
        prop.put("quartz.scheduler.instanceName", "ServerScheduler");
        prop.put("org.quartz.scheduler.instanceId", "AUTO");
        prop.put("org.quartz.scheduler.jobFactory.class", "org.quartz.simpl.SimpleJobFactory");
//        prop.put("org.quartz.scheduler.instanceId", "CLUSTERED");
        prop.put("org.quartz.jobStore.class", "org.quartz.impl.jdbcjobstore.JobStoreTX");
        prop.put("org.quartz.jobStore.driverDelegateClass", "org.quartz.impl.jdbcjobstore.StdJDBCDelegate");
//        prop.put("org.quartz.jobStore.dataSource", "quartzDataSource");
        prop.put("org.quartz.jobStore.tablePrefix", "QRTZ_");
        prop.put("org.quartz.jobStore.isClustered", "false");
        prop.put("org.quartz.threadPool.class", "org.quartz.simpl.SimpleThreadPool");
        prop.put("org.quartz.threadPool.threadCount", "20");
        prop.put("org.quartz.threadPool.threadsInheritContextClassLoaderOfInitializingThread", "true");
//        prop.put("org.quartz.dataSource.quartzDataSource.driver", "com.microsoft.sqlserver.jdbc.SQLServerDriver");
//        prop.put("org.quartz.dataSource.quartzDataSource.URL", "jdbc:microsoft:sqlserver://localhost:1433;SelectMethod=cursor;DatabaseName=nexteer");
//        prop.put("org.quartz.dataSource.quartzDataSource.user", "sa");
//        prop.put("org.quartz.dataSource.quartzDataSource.password", "password");
//        prop.put("org.quartz.dataSource.quartzDataSource.maxConnections", "10");
        return prop;
    }
}
