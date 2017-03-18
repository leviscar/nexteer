package com.example.repository;

import com.example.model.Ishaft1OutputInfo;
import com.google.gson.JsonObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

/**
 * Created by mrpan on 2017/3/18.
 */
@Repository
public class Ishaft1OutputInfoRepo {
    private JdbcTemplate jdbc;

    @Autowired
    public Ishaft1OutputInfoRepo(JdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }

    /**
     * 添加当天的数据
     *
     * @param outputInfo
     * @return
     */
    public String add(Ishaft1OutputInfo outputInfo) {
        String sql = "insert into ishaft1_output_info (add_date, model, output_count) values(?, ?, ?)";
        jdbc.update(sql, outputInfo.getAdd_date(), outputInfo.getModel(), outputInfo.getOutput_count());
        JsonObject jsonObject = new JsonObject();
        jsonObject.addProperty("status", true);
        jsonObject.addProperty("log", "add ok");
        return jsonObject.toString();
    }
}
