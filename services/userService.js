const sequelize = require('../models').sequelize;
const { QueryTypes } = require('sequelize');

async function getInfo(username){
    try{
        const sql = `select * from KhachHang where KhachHang.Username = '${username}'`;
        
        let userInfo = null;
        userInfo = (await sequelize.query(sql,  { type: QueryTypes.SELECT }))[0];

        return userInfo;
    }
    catch(error){
        console.log(error);
    }
}

module.exports = {
    getInfo,

}