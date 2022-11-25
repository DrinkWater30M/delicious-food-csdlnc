const sequelize = require('../models');
const { QueryTypes } = require('sequelize');
const generateID = require('../utils/generateID');

async function getProductList(page){
    try{
        const sql = 
            `select * from Mon
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