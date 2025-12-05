const {DataTypes}=require('sequelize');
const sequelize =require('../config/db');
const Usuarios = require('../models/UsuariosModel');
const Bancos = require('../models/BancosModel');

const Pagos = sequelize.define('Pagos',{
    idPago:{
        type:DataTypes.INTEGER,
        allowNull:true,
        primaryKey:true,
        autoIncrement:true
    },
    usuarioId:{
        type:DataTypes.INTEGER,
        allowNull:false,
    },
    bancoId:{
        type:DataTypes.INTEGER,
        allowNull:false,
    },
    monto:{
        type:DataTypes.DECIMAL(10,2)
    },
    destinatario:{
        type:DataTypes.STRING(60)
    },
    fechaPago:{
        type:DataTypes.DATE
    },
    fechaVencimiento:{
        type:DataTypes.DATE
    },
    descripcion:{
        type:DataTypes.STRING(255)
    },
    estado:{
        type:DataTypes.STRING(10)
    }
},{
    tableName:'pagos',
    timestamps:false
});

Usuarios.hasMany(Pagos,{foreignKey:'usuarioId'});
Pagos.belongsTo(Usuarios,{foreignKey:'usuarioId'});

Bancos.hasMany(Pagos,{foreignKey:'bancoId'});
Pagos.belongsTo(Bancos,{foreignKey:'bancoId'});

module.exports=Pagos;