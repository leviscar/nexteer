package com.example.controller;

import com.example.model.ProductModel;
import com.example.repository.ProductModelRepo;
import com.google.gson.Gson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * Created by mrpan on 2017/3/26.
 */
@RestController
public class ProductModelController {
    private ProductModelRepo repo;

    @Autowired
    public ProductModelController(ProductModelRepo repo) {
        this.repo = repo;
    }

    /**
     * 添加型号信息
     *
     * @param json
     * @return
     */
    @RequestMapping(value = "/product-model", method = RequestMethod.POST)
    public String add(@RequestBody String json) {
        Gson gson = new Gson();
        ProductModel model = gson.fromJson(json, ProductModel.class);
        return repo.addModel(model);
    }

    /**
     * 获得所有型号的信息
     *
     * @return
     */
    @RequestMapping(value = "product-model", method = RequestMethod.GET)
    public List<ProductModel> get() {
        return repo.getAllModel();
    }
}
