package com.example.mapper;

import com.example.model.WelcomeImage;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

/**
 * User: cheng
 * Date: 17-6-7
 * Description:
 */
public class WelcomeImageMapper implements RowMapper<WelcomeImage> {
    @Override
    public WelcomeImage mapRow(ResultSet resultSet, int i) throws SQLException {
        WelcomeImage image = new WelcomeImage();
        image.setName(resultSet.getString("name"));
        image.setImage(resultSet.getString("image"));
        return image;
    }
}
