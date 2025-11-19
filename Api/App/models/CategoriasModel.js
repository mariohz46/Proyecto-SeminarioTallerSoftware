const {DataTypes}=require('sequelize');
const sequelize =require('../config/db');

const Categorias = sequelize.define('Categorias',{
    idCategoria:{
        type:DataTypes.INTEGER,
        allowNull:true,
        primaryKey:true,
        autoIncrement:true
    },
    nombre:{
        type:DataTypes.CHAR(50)
    },
    tipo:{
        type:DataTypes.CHAR(10)
    },
    descripcion: {
        type: DataTypes.STRING(255),
        allowNull: true
    }
},{
    tableName:'categorias',
    timestamps:false
});


module.exports = Categorias;