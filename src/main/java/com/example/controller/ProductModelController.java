package com.example.controller;

import com.example.model.ProductModel;
import com.example.repository.ProductModelRepo;
import com.google.gson.Gson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.util.List;

/**
 * Created by mrpan on 2017/3/26.
 */
@RestController
@RequestMapping(value = "/product-model")
public class ProductModelController {
    private ProductModelRepo repo;

    @Autowired
    public ProductModelController(ProductModelRepo repo) {
        this.repo = repo;
    }

    /**
     * Add product model record into database
     *
     * @param json
     * @return
     */
    @RequestMapping(method = RequestMethod.POST)
    public ProductModel add(@RequestBody String json) {
        Gson gson = new Gson();
        ProductModel model = gson.fromJson(json, ProductModel.class);
        return repo.add(model);
    }

    /**
     * Get all records
     *
     * @return
     */
    @RequestMapping(method = RequestMethod.GET)
    public List<ProductModel> get() {
        return repo.getAllModel();
    }

    /**
     * Get the records by cell name
     *
     * @param cellName
     * @return
     */
    @RequestMapping(value = "/{cell}", method = RequestMethod.GET)
    public List<ProductModel> getByCell(@PathVariable(value = "cell") String cellName) {
        return repo.getModelByCellName(cellName);
    }

    /**
     * Update record
     *
     * @param model
     * @return
     */
    @RequestMapping(method = RequestMethod.PATCH)
    public ProductModel update(@RequestBody ProductModel model) {
        return repo.update(model);
    }

    /**
     * Delete record based on model id
     *
     * @param modelId
     * @return
     */
    @RequestMapping(method = RequestMethod.DELETE)
    public void delete(@RequestParam(value = "modelId") String modelId) {
        repo.deleteByModelId(modelId);
    }

}
