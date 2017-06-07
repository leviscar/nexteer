package com.example.controller;

import com.example.model.WelcomeImage;
import com.example.repository.WelcomeImageRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * User: cheng
 * Date: 17-6-7
 * Description:
 */
@RestController
@RequestMapping(value = "/welcome")
public class WelcomeImageController {
    private WelcomeImageRepo imageRepo;

    @Autowired
    public WelcomeImageController(WelcomeImageRepo imageRepo) {
        this.imageRepo = imageRepo;
    }

    @RequestMapping(method = RequestMethod.POST)
    public WelcomeImage add(@RequestBody WelcomeImage image) {
        return imageRepo.add(image);
    }

    @RequestMapping(method = RequestMethod.GET)
    public WelcomeImage getByName(@RequestParam(value = "name") String name) {
        return imageRepo.getByName(name).get(0);
    }
}
