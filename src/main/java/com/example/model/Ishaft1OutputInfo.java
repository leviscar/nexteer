package com.example.model;

/**
 * Created by mrpan on 2017/3/18.
 */
public class Ishaft1OutputInfo {
    private int id;
    private String add_date;
    private String model;
    private int output_count;
    private String model_name; // R103等

    public Ishaft1OutputInfo() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }


    public String getAdd_date() {
        return add_date;
    }

    public void setAdd_date(String add_date) {
        this.add_date = add_date;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public int getOutput_count() {
        return output_count;
    }

    public void setOutput_count(int output_count) {
        this.output_count = output_count;
    }

    public String getModel_name() {
        return model_name;
    }

    public void setModel_name(String model_name) {
        this.model_name = model_name;
    }
}
