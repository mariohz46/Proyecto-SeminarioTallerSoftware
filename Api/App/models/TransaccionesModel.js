const {DataTypes}=require('sequelize');
const sequelize =require('../config/db');

const Transacciones = sequelize.define('Transacciones',{
    idTransacciones:{
        type:DataTypes.INTEGER,
        allownull:true,
        primarykey:true,
        autoincrement:true
    },
    usuarioId:{
        type:DataTypes.INTEGER,
        allownull:true,
    },
    categoriaId:{
        type:DataTypes.INTEGER,
        allownull:true,
    },

    tipo:{
        type:DataTypes.CHAR(10)
    },
    monto:{
        type:DataTypes.DECIMAL(10,2)
    },
    descripcion:{
        type:DataTypes.CHAR(255)
    },
    fecha:{
        type:DataTypes.DATE
    },
    creadoEl:{
        type:DataTypes.DATE(timestamps)
    }
},
{
    tableName:'transacciones',
    timestamps:true
});