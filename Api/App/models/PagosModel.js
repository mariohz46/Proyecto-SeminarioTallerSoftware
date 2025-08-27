const {DataTypes}=require('sequelize');
const sequelize =require('../config/db');

const Pagos = sequelize.define('',{
    idPago:{
        type:DataTypes.INTEGER,
        allownull:true,
        primarykey:true,
        autoincrement:true
    },
    usuarioId:{
        type:DataTypes.INTEGER,
        allownull:true,
    },
    monto:{
        type:DataTypes.DECIMAL(10,2)
    },
    destinatario:{
        type:DataTypes.CHAR(60)
    },
    fechaPago:{
        type:DataTypes.DATE
    },
    fechaVencimiento:{
        type:DataTypes.DATE
    },
    descripcion:{
        type:DataTypes.CHAR(255)
    },
    estado:{
        type:DataTypes.CHAR(10)
    }
},{
    tableName:'pagos',
    timestamps:true
})