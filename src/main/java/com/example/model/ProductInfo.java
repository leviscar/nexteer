package com.example.model;

import java.util.Date;

/**
 * Created by mrpan on 2017/3/12.
 */
public class ProductInfo {
    private String model;
    private Date time;

    public ProductInfo() {
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public Date getTime() {
        return time;
    }

    public void setTime(Date time) {
        this.time = time;
    }
}
