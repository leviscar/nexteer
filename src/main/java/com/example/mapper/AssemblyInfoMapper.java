package com.example.mapper;

import com.example.model.ProductInfo;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

/**
 * Created by mrpan on 2017/4/25.
 */
public class AssemblyInfoMapper implements RowMapper<ProductInfo>{
    @Override
    public ProductInfo mapRow(ResultSet resultSet, int i) throws SQLException {
        ProductInfo pInfo = new ProductInfo();
        pInfo.setModel(resultSet.getString("NexteerModel"));
        pInfo.setTime(resultSet.getTimestamp("TimeStamp"));
        return pInfo;
    }
}
