package com.example.util;

import com.example.model.ProductInfo;

import java.util.*;

/**
 * Created by mrpan on 2017/3/26.
 */
public class ModelOutput {
    /**
     * Count the output based on various model
     *
     * @param products
     * @return map
     */
    public static Map<String, Integer> getEachModelOutput(List<ProductInfo> products) {
        // get the all models' output
        Map<String, Integer> map = new HashMap<>();
        for (ProductInfo product : products) {
            if (map.containsKey(product.getModel())) {
                map.put(product.getModel(), map.get(product.getModel()) + 1);
            } else {
                map.put(product.getModel(), 1);
            }
        }
        return map;
    }
}
