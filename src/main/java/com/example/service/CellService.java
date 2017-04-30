package com.example.service;

import com.example.enumtype.Cell;
import com.example.model.ProductInfo;
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

    @Autowired
    public CellService(Ishaft1ProductInfoRepo ishaft1ProductInfoRepo, CepsProductInfoRepo cepsProductInfoRepo) {
        this.ishaft1ProductInfoRepo = ishaft1ProductInfoRepo;
        this.cepsProductInfoRepo = cepsProductInfoRepo;
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
                ishaft1ProductInfoRepo.getByPeriod(start, end);
                break;
            case ISHAFT2:
                break;
            case ISHAFT3:
                break;
            case ISHAFT4:
                break;
            case BEPS1:
                break;
            case BEPS2:
                break;
            case BEPS3:
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
        List<Date> topNProduct = new ArrayList<>();
        String stationId;
        switch (cell) {
            case ISHAFT1:
                topNProduct = ishaft1ProductInfoRepo.getCurBeats(start, end, topN);
                break;
            case ISHAFT2:
                break;
            case ISHAFT3:
                break;
            case ISHAFT4:
                break;
            case BEPS1:
                break;
            case BEPS2:
                break;
            case BEPS3:
                break;
            case CEPS1:
                stationId = "SD000094X02";
                topNProduct = cepsProductInfoRepo.getTopN(start, end, topN, stationId);
                break;
            case CEPS2:
                stationId = "SD000102X01";
                topNProduct = cepsProductInfoRepo.getTopN(start, end, topN, stationId);
                break;
            case CEPS3:
                stationId = "SD000107X01";
                topNProduct = cepsProductInfoRepo.getTopN(start, end, topN, stationId);
                break;
            case CEPS4:
                stationId = "SD000122X01";
                topNProduct = cepsProductInfoRepo.getTopN(start, end, topN, stationId);
                break;
            case CEPS5:
                topNProduct = cepsProductInfoRepo.getCell5TopN(start, end, topN);
                break;
        }
        return topNProduct;
    }

    /**
     * Get cell id by cell
     *
     * @param cell
     * @return
     */
    public int getCellId(Cell cell) {
        int cellId = 0;
        switch (cell) {
            case ISHAFT1:
                cellId = 8;
                break;
            case ISHAFT2:
                break;
            case ISHAFT3:
                break;
            case ISHAFT4:
                break;
            case BEPS1:
                break;
            case BEPS2:
                break;
            case BEPS3:
                break;
            case CEPS1:
                cellId = 11;
                break;
            case CEPS2:
                cellId = 12;
                break;
            case CEPS3:
                cellId = 13;
                break;
            case CEPS4:
                cellId = 14;
                break;
            case CEPS5:
                cellId = 15;
                break;
        }
        return cellId;
    }
}
