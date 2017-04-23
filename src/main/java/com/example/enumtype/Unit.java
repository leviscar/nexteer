package com.example.enumtype;

/**
 * Created by mrpan on 2017/4/22.
 */
public enum Unit {
    Cell1("Cell1"), Cell2("Cell2"), Cell3("Cell3"), Cell4("Cell4");
    private String unitName;

    Unit(String unitName) {
        this.unitName = unitName;
    }

    @Override
    public String toString() {
        return unitName;
    }

    public void setUnitName(String unitName) {
        this.unitName = unitName;
    }
}
