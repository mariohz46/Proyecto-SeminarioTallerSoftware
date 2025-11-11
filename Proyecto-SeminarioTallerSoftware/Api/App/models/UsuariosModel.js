const {DataTypes}=require('sequelize');
const Sequelize =require('../config/db');

const Usuarios = Sequelize.define('usuarios',{
    idUsuario:{
        type:DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement:true
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
    timestamps:false
});

module.exports = Usuarios;