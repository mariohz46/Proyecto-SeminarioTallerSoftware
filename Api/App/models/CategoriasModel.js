const {DataTypes}=require('sequelize');
const sequelize =require('../config/db');

const Categorias = sequelize.define('Categorias',{
    idCategoria:{
        type:DataTypes.INTEGER,
        allowNull:false,
        primaryKey:true,
        autoIncrement:true
    },
    nombre:{
        type:DataTypes.CHAR(50),
        allowNull:false
    },
    tipo:{
        type:DataTypes.ENUM("ingreso", "egreso"),
        allowNull:false
    },
    descripcion:{
        type:DataTypes.CHAR(255),
        allowNull:false
    }
},{
    tableName:'categorias',
    timestamps:false
});
module.exports = Categorias;