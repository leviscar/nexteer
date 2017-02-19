package com.example.model;

/**
 * Created by mrpan on 2017/2/17.
 */

public class TestModel {
    private Integer id;
    private String firstName;
    private String lastName;

    public TestModel() {
    }

    public TestModel(Integer id) {
        this.id = id;
    }

    public TestModel(String firstName, String lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }
}
