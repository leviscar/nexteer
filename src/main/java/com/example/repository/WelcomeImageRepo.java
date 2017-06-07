package com.example.repository;

import com.example.mapper.WelcomeImageMapper;
import com.example.model.WelcomeImage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * User: cheng
 * Date: 17-6-7
 * Description:
 */
@Repository
public class WelcomeImageRepo {
    private JdbcTemplate jdbc;

    @Autowired
    public WelcomeImageRepo(@Qualifier("oneJdbcTemplate") JdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }

    /**
     * Add images into database
     *
     * @param image
     * @return
     */
    public WelcomeImage add(WelcomeImage image) {
        jdbc.update("INSERT INTO welcome_image (name, image) VALUES (?,?)", image.getName(), image.getImage());
        return image;
    }

    /**
     * Get image based on name
     *
     * @param name
     * @return
     */
    public List<WelcomeImage> getByName(String name) {
        List<WelcomeImage> images = jdbc.query("SELECT * FROM welcome_image WHERE name = ?"
                , new Object[]{name}, new WelcomeImageMapper());
        return images;
    }
}
