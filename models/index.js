const { Sequelize } = require('sequelize');
var initModels = require("./init-models");

//create instance db
const sequelize = new Sequelize(
    process.env.DB_NAME, 
    process.env.DB_USERNAME, 
    process.env.DB_PASSWORD, 
    {
        host: process.env.DB_HOST,
        dialect: process.env.DB_TYPE
    }
);


//init instance model
var models = initModels(sequelize);

module.exports = {sequelize, models};