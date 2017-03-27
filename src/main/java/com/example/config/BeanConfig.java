package com.example.config;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.autoconfigure.jdbc.DataSourceBuilder;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.jdbc.core.JdbcTemplate;

import javax.sql.DataSource;

/**
 * Created by mrpan on 2017/3/24.
 */
@Configuration
public class BeanConfig {
    @Bean(name = "oneDataSource")
    @Qualifier("oneDataSource")
    @Primary
    @ConfigurationProperties(prefix = "spring.datasource")
    public DataSource oneDataSource() {
        return DataSourceBuilder.create().build();
    }

    @Bean(name = "twoDataSource")
    @Qualifier("twoDataSource")
    @ConfigurationProperties(prefix = "custom.datasource.ds1")
    public DataSource twoDataSource() {
        return DataSourceBuilder.create().build();
    }

    @Bean(name = "threeDataSource")
    @Qualifier("threeDataSource")
    @ConfigurationProperties(prefix = "custom.datasource.ds2")
    public DataSource threeDataSource() {
        return DataSourceBuilder.create().build();
    }

    @Bean(name = "oneJdbcTemplate")
    public JdbcTemplate oneJdbcTemplate(@Qualifier("oneDataSource") DataSource dataSource) {
        return new JdbcTemplate(dataSource);
    }

    @Bean(name = "twoJdbcTemplate")
    public JdbcTemplate twoJdbcTemplate(@Qualifier("twoDataSource") DataSource dataSource) {
        return new JdbcTemplate(dataSource);
    }

    @Bean(name = "threeJdbcTemplate")
    public JdbcTemplate threeJdbcTemplate(@Qualifier("threeDataSource") DataSource dataSource) {
        return new JdbcTemplate(dataSource);
    }
}
