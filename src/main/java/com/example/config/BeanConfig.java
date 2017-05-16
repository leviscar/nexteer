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

    @Bean(name = "cepsDataSource")
    @Qualifier("cepsDataSource")
    @ConfigurationProperties(prefix = "custom.datasource.ds3")
    public DataSource cepsDataSource() {
        return DataSourceBuilder.create().build();
    }

    @Bean(name = "cell5DataSource")
    @Qualifier("cell5DataSource")
    @ConfigurationProperties(prefix = "custom.datasource.ds4")
    public DataSource cell5DataSource() {
        return DataSourceBuilder.create().build();
    }

    @Bean(name = "bepsDataSource")
    @Qualifier("bepsDataSource")
    @ConfigurationProperties(prefix = "custom.datasource.ds5")
    public DataSource bepsDataSource() {
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

    @Bean(name = "cepsJdbc")
    public JdbcTemplate cepsJdbcTemplate(@Qualifier("cepsDataSource") DataSource dataSource) {
        return new JdbcTemplate(dataSource);
    }

    @Bean(name = "cell5Jdbc")
    public JdbcTemplate cell5JdbcTemplate(@Qualifier("cell5DataSource") DataSource dataSource) {
        return new JdbcTemplate(dataSource);
    }

    @Bean(name = "bepsJdbc")
    public JdbcTemplate bepsJdbcTemplate(@Qualifier("bepsDataSource") DataSource dataSource) {
        return new JdbcTemplate(dataSource);
    }
}
