'use strict'
const {Sequelize} =require('sequelize');
require('dotenv').config();

const sequelize= new Sequelize(process.env.DB_NAME,process.env.USER,process.env.PASSWORD, {
    host:process.env.HOST,
    dialect:process.env.DIALECT,
    port:process.env.MYSQL_PORT,
    dialectOptions:{
        connectTimeout:10000
    },
    operatorAliases: false,
    pool:{
        max: parseInt(process.env.POOL_MAX),
        min: parseInt(process.env.POOL_MIN),
        acquire: parseInt(process.env.POOL_ACQUIRE),
        idle:parseInt(process.env.POOL_IDLE)
    }
});

module.exports =sequelize;
