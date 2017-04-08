package com.example.controller;

import com.example.util.CheckMail;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by mrpan on 2017/4/8.
 */
@RestController
@RequestMapping(value = "/users")
public class UserController {
    /**
     * 验证给定用户名和密码是否有权限登录
     *
     * @param json
     * @return
     */
    @RequestMapping(value = "/user", method = RequestMethod.POST)
    public String isValid(@RequestBody String json) {
        JsonParser parser = new JsonParser();
        JsonElement element = parser.parse(json);
        JsonObject object = element.getAsJsonObject();
        String userName = object.get("username").getAsString();
        String password = object.get("password").getAsString();
        boolean isValid = CheckMail.checkMail(userName, password);
        object.addProperty("valid", isValid);
        return object.toString();
    }
}
