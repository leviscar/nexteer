package com.example.service;

import com.example.enumtype.Cell;
import com.example.model.ProductInfo;
import com.example.repository.BepsProductInfoRepo;
import com.example.repository.CepsProductInfoRepo;
import com.example.repository.Ishaft1ProductInfoRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * Created by mrpan on 2017/4/26.
 */
@Service
public class CellService {
    private Ishaft1ProductInfoRepo ishaft1ProductInfoRepo;
    private CepsProductInfoRepo cepsProductInfoRepo;
    private BepsProductInfoRepo bepsProductInfoRepo;

    @Autowired
    public CellService(Ishaft1ProductInfoRepo ishaft1ProductInfoRepo, CepsProductInfoRepo cepsProductInfoRepo, BepsProductInfoRepo bepsProductInfoRepo) {
        this.ishaft1ProductInfoRepo = ishaft1ProductInfoRepo;
        this.cepsProductInfoRepo = cepsProductInfoRepo;
        this.bepsProductInfoRepo = bepsProductInfoRepo;
    }

    /**
     * Get products information by cell name
     *
     * @param start
     * @param end
     * @param cell
     * @return
     */
    public List<ProductInfo> getProducts(Date start, Date end, Cell cell) {
        List<ProductInfo> products = new ArrayList<>();
        String stationId;
        switch (cell) {
            case ISHAFT1:
                products = ishaft1ProductInfoRepo.getByPeriod(start, end);
                break;
            case ISHAFT2:
                break;
            case ISHAFT3:
                break;
            case ISHAFT4:
                break;
            case BEPS1:
                stationId = "SD001330X01";
                products = bepsProductInfoRepo.getByPeriodAndStationId(start, end, stationId);
                break;
            case BEPS2:
                stationId = "SD001343X01";
                products = bepsProductInfoRepo.getByPeriodAndStationId(start, end, stationId);
                break;
            case BEPS3:
                products = bepsProductInfoRepo.getCell5ByPeriod(start, end);
                break;
            case CEPS1:
                stationId = "SD000094X02";
                products = cepsProductInfoRepo.getByPeriodAndStationId(start, end, stationId);
                break;
            case CEPS2:
                stationId = "SD000102X01";
                products = cepsProductInfoRepo.getByPeriodAndStationId(start, end, stationId);
                break;
            case CEPS3:
                stationId = "SD000107X01";
                products = cepsProductInfoRepo.getByPeriodAndStationId(start, end, stationId);
                break;
            case CEPS4:
                stationId = "SD000122X01";
                products = cepsProductInfoRepo.getByPeriodAndStationId(start, end, stationId);
                break;
            case CEPS5:
                products = cepsProductInfoRepo.getCell5ByPeriod(start, end);
                break;
        }
        return products;
    }

    /**
     * Get topN products based on cell name
     *
     * @param start
     * @param end
     * @param topN
     * @param cell
     * @return
     */
    public List<Date> getTopNProducts(Date start, Date end, int topN, Cell cell) {
        List<Date> topNProducts = new ArrayList<>();
        String stationId;
        switch (cell) {
            case ISHAFT1:
                topNProducts = ishaft1ProductInfoRepo.getCurBeats(start, end, topN);
                break;
            case ISHAFT2:
                break;
            case ISHAFT3:
                break;
            case ISHAFT4:
                break;
            case BEPS1:
                stationId = "SD001330X01";
                topNProducts = bepsProductInfoRepo.getTopN(start, end, topN, stationId);
                break;
            case BEPS2:
                stationId = "SD001343X01";
                topNProducts = bepsProductInfoRepo.getTopN(start, end, topN, stationId);
                break;
            case BEPS3:
                topNProducts = bepsProductInfoRepo.getCell5TopN(start, end, topN);
                break;
            case CEPS1:
                stationId = "SD000094X02";
                topNProducts = cepsProductInfoRepo.getTopN(start, end, topN, stationId);
                break;
            case CEPS2:
                stationId = "SD000102X01";
                topNProducts = cepsProductInfoRepo.getTopN(start, end, topN, stationId);
                break;
            case CEPS3:
                stationId = "SD000107X01";
                topNProducts = cepsProductInfoRepo.getTopN(start, end, topN, stationId);
                break;
            case CEPS4:
                stationId = "SD000122X01";
                topNProducts = cepsProductInfoRepo.getTopN(start, end, topN, stationId);
                break;
            case CEPS5:
                topNProducts = cepsProductInfoRepo.getCell5TopN(start, end, topN);
                break;
        }
        return topNProducts;
    }

    /**
     * Get unit id
     *
     * @param cell
     * @return
     */
    public int getUnitId(Cell cell) {
        int unitId = 0;
        switch (cell) {
            case ISHAFT1:
                unitId = 1;
                break;
            case ISHAFT2:
                unitId = 1;
                break;
            case ISHAFT3:
                unitId = 1;
                break;
            case ISHAFT4:
                unitId = 1;
                break;
            case BEPS1:
                unitId = 4;
                break;
            case BEPS2:
                unitId = 5;
                break;
            case BEPS3:
                unitId = 7;
                break;
            case CEPS1:
                unitId = 3;
                break;
            case CEPS2:
                unitId = 4;
                break;
            case CEPS3:
                unitId = 5;
                break;
            case CEPS4:
                unitId = 6;
                break;
            case CEPS5:
                unitId = 7;
                break;
        }
        return unitId;
    }

    /**
     * Get cell name
     *
     * @param cell
     * @return
     */
    public String getCellName(Cell cell) {
        String cellName = "";
        switch (cell) {
            case ISHAFT1:
                cellName = "ISHAFT1";
                break;
            case ISHAFT2:
                cellName = "ISHAFT2";
                break;
            case ISHAFT3:
                cellName = "ISHAFT3";
                break;
            case ISHAFT4:
                cellName = "ISHAFT4";
                break;
            case BEPS1:
                cellName = "BEPS";
                break;
            case BEPS2:
                cellName = "BEPS";
                break;
            case BEPS3:
                cellName = "BEPS";
                break;
            case CEPS1:
                cellName = "CEPS";
                break;
            case CEPS2:
                cellName = "CEPS";
                break;
            case CEPS3:
                cellName = "CEPS";
                break;
            case CEPS4:
                cellName = "CEPS";
                break;
            case CEPS5:
                cellName = "CEPS";
                break;
        }
        return cellName;
    }

}
