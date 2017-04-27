package com.example.enumtype;

/**
 * Created by mrpan on 2017/3/28.
 */
public enum Cell {
    ISHAFT1("ISHAFT1"), ISHAFT2("ISHAFT2"), ISHAFT3("ISHAFT3"), ISHAFT4("ISHAFT4"), BEPS1("BEPS1"), BEPS2("BEPS2")
    , BEPS3("BEPS3"), CEPS1("CEPS1"), CEPS2("CEPS2"), CEPS3("CEPS3"), CEPS4("CEPS4"), CEPS5("CEPS5");
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
