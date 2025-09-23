const {DataTypes}= require('sequelize');
const Sequelize =require('../config/db');

const Bancos =Sequelize.define('bancos',{
    idBanco:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    nombre:{
        type:DataTypes.CHAR(50)
    },
},{
    tableName:'bancos',
    timestamps:false,
});

module.exports=Bancos;