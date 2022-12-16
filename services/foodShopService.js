const sequelize = require('../models');
const { QueryTypes } = require('sequelize');
const generateID = require('../utils/generateID');

async function getFoodShopList(search, page){
    try{
        const sql = 
            `select ChiNhanh.*, Quan.LoaiAmThuc 
            from ChiNhanh left join Quan on ChiNhanh.QuanID = Quan.QuanID
            where ChiNhanh.TenChiNhanh like N'%${search}%' or Quan.LoaiAmthuc like N'%${search}%'
            order by ChiNhanh.ChiNhanhID asc
            offset ${(page-1)*5} rows fetch next ${page*5} rows only`;
        
        const foodShopList = await sequelize.query(sql,  { type: QueryTypes.SELECT });
        console.log(foodShopList);

        return foodShopList.length === 0 ? null : foodShopList;
    }
    catch(error){
        console.log(error);
    }
}

module.exports = {
    getFoodShopList,
}