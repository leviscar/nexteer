package com.example.enumtype;

/**
 * Created by mrpan on 2017/3/28.
 */
public enum Cell {
    ISHAFT1("ishaft1"), ISHAFT2("ishaft2"), ISHAFT3("ishaft3"), ISHAFT4("ishaft4"), BEPS("beps"), CEPS("ceps");
    private String cellName;

    Cell(String cellName) {
        this.cellName = cellName;
    }

    @Override
    public String toString() {
        return cellName;
    }

    public void setCellName(String cellName) {
        this.cellName = cellName;
    }
}
