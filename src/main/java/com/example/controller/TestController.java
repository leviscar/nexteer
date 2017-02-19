package com.example.controller;

import com.example.model.TestModel;
import com.example.repository.TestModelRepo;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.List;

/**
 * Created by mrpan on 2017/2/17.
 */

@RestController
@RequestMapping(value = "/")
public class TestController {
    private TestModelRepo repo;

    @Autowired
    public TestController(TestModelRepo repo) {
        this.repo = repo;
    }

    @RequestMapping(value = "/findAll", method = RequestMethod.GET)
    public List<TestModel> findAll() {
        return repo.findAll();
    }

    /**
     * add the user with the passed id.
     */
    @RequestMapping(value = "/add", method = RequestMethod.POST)
    public String deleteById(@RequestBody String json) throws IOException {
        ObjectMapper mapper = new ObjectMapper();
        TestModel testModel = mapper.readValue(json, new TypeReference<TestModel>(){});
        repo.save(testModel);
        return "add " + testModel.getFirstName() + testModel.getLastName() + "ok";
    }
}
