const sequelize = require('../models');
const { QueryTypes } = require('sequelize');
const generateID = require('../utils/generateID');

async function getProductList(foodShop, search, page){
    try{
        const subSql = foodShop ? `ChiNhanh.ChiNhanhID = '${foodShop}' and` : '';
        const sql = 
            `select Mon.*, ChiNhanh.TenChiNhanh 
            from Mon join ChiNhanh on Mon.ThucDonID = ChiNhanh.ThucDonID
            where ${subSql} Mon.TenMon like N'%${search}%'
            order by Mon.MonID asc
            offset ${(page-1)*12} rows fetch next ${page*12} rows only`;
        
        const productList = await sequelize.query(sql,  { type: QueryTypes.SELECT });

        return productList.length === 0 ? null : productList;
    }
    catch(error){
        console.log(error);
    }
}

module.exports = {
    getProductList,
}