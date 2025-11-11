const {DataTypes}=require('sequelize');
const sequelize =require('../config/db');

const Categorias = sequelize.define('Categorias',{
    idCategoria:{
        type:DataTypes.INTEGER,
        notnull:true,
        primarykey:true,
        autoIncrement:true
    },
    usuarioId:{
        type:DataTypes.INTEGER,
        notnull:true
    },
    nombre:{
        type:DataTypes.CHAR(50)
    },
    tipo:{
        type:DataTypes.CHAR(10)
    }
},{
    tableName:'categorias',
    timestamps:true
});