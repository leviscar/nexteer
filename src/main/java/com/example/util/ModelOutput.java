package com.example.util;

import com.example.model.Ishaft1Product;

import java.util.*;

/**
 * Created by mrpan on 2017/3/26.
 */
public class ModelOutput {
    /**
     * 将所有的产品分型号统计数量
     * @param products
     * @return map
     */
    public static Map<String, Integer> getEachModelOutput(List<Ishaft1Product> products) {
        Collections.sort(products, new Comparator<Ishaft1Product>() {
            @Override
            public int compare(Ishaft1Product o1, Ishaft1Product o2) {
                if (Integer.valueOf(o1.getModel()) > Integer.valueOf(o2.getModel())) {
                    return -1;
                }
                if (Integer.valueOf(o1.getModel()) < Integer.valueOf(o2.getModel())) {
                    return 1;
                }
                return 0;
            }
        });
        // 统计所有型号的产量
        Map<String, Integer> map = new HashMap<>();
        int count = 0;
        for (Ishaft1Product product : products) {
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
