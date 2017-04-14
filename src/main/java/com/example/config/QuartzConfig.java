package com.example.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.quartz.SchedulerFactoryBean;

import java.io.IOException;

/**
 * Created by mrpan on 2017/4/13.
 */
@Configuration
@EnableScheduling
public class QuartzConfig {
    @Autowired
    private AutoWiringSpringBeanJobFactory autoWiringSpringBeanJobFactory;

    @Bean
    public SchedulerFactoryBean schedulerFactoryBean() throws IOException {
        SchedulerFactoryBean factory = new SchedulerFactoryBean();
        factory.setOverwriteExistingJobs(true);
        factory.setStartupDelay(1);
        // config spring autowired
        factory.setJobFactory(autoWiringSpringBeanJobFactory);

        return factory;
    }

}
