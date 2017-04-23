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
        Collections.sort(products, new Comparator<ProductInfo>() {
            @Override
            public int compare(ProductInfo o1, ProductInfo o2) {
                if (Integer.valueOf(o1.getModel()) > Integer.valueOf(o2.getModel())) {
                    return -1;
                }
                if (Integer.valueOf(o1.getModel()) < Integer.valueOf(o2.getModel())) {
                    return 1;
                }
                return 0;
            }
        });
        // get the all models' output
        Map<String, Integer> map = new HashMap<>();
        int count = 0;
        for (ProductInfo product : products) {
            if (map.containsKey(product.getModel())) {
                map.put(product.getModel(), ++count);
            } else {
                count = 0;
                map.put(product.getModel(), ++count);
            }
        }
        return map;
    }
}
