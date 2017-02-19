package com.example.repository;

import com.example.model.TestModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

/**
 * Created by mrpan on 2017/2/18.
 */
@Repository
public class TestModelRepo {
    private JdbcTemplate jdbc;

    @Autowired
    public TestModelRepo(JdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }

    public List<TestModel> findAll() {
        return jdbc.query("select id, firstName, lastName " + "from TestModel order by id", new RowMapper<TestModel>() {
            @Override
            public TestModel mapRow(ResultSet resultSet, int i) throws SQLException {
                TestModel testModel = new TestModel();
                testModel.setId(resultSet.getInt(1));
                testModel.setFirstName(resultSet.getString(2));
                testModel.setLastName(resultSet.getString("lastName"));
                return testModel;
            }
        });
    }

    public void save(TestModel testModel) {
        jdbc.update("insert into TestModel " + "(firstName, lastName) " + "VALUES (?,?)",
                testModel.getFirstName(), testModel.getLastName());
    }
}
