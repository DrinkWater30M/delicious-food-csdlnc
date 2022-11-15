const sequelize = require('../models').sequelize;
const { QueryTypes } = require('sequelize');

async function getAllFood(){
    try{
        const sql = `select * from Mon`;
        
        let listFood = null;
        listFood = (await sequelize.query(sql,  { type: QueryTypes.SELECT }));

        return listFood;
    }
    catch(error){
        console.log(error);
    }
}

module.exports = {
    getAllFood,

}