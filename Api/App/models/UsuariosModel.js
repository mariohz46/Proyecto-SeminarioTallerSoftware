const {DataTypes}=require('sequelize');
const sequelize =require('../config/db');

const Usuarios = sequelize.define('Usuarios',{
    idUsuario:{
        type:DataTypes.INTEGER,
        primaryKey: true,
        auntoIncrement:true
    },
    nombre:{
        type:DataTypes.CHAR(50)
    },
    email:{
        type:DataTypes.CHAR(100)
    },
    password:{
        type:DataTypes.CHAR(255)
    }
},{
    tableName:'usuarios',
    timestamps:true
});