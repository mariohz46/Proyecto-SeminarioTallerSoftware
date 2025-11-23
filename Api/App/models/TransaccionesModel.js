const {DataTypes}=require('sequelize');
const sequelize =require('../config/db');
const Usuarios = require("./UsuariosModel");
const Bancos = require("./BancosModel");
const Categorias = require("./CategoriasModel");

const Transacciones = sequelize.define('transacciones',{
    idTransaccion:{
        type: DataTypes.INTEGER,
        allowNull: true,
        primaryKey: true,
        autoIncrement: true
    },
    usuarioId:{
        type:DataTypes.INTEGER,
        allownull:true,
    },
    categoriaId:{
        type:DataTypes.INTEGER,
        allownull:true,
    },
    bancoId:{
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
        type:DataTypes.DATE
    }
},
{
    tableName:'transacciones',
    timestamps:false,

});

Usuarios.hasMany(Transacciones,{foreignKey:'usuarioId'});
Transacciones.belongsTo(Usuarios,{foreignKey:'usuarioId'});

Categorias.hasMany(Transacciones,{foreignKey:'categoriaId'});
Transacciones.belongsTo(Categorias,{foreignKey:'categoriaId'});

Bancos.hasMany(Transacciones,{foreignKey:'bancoId'});
Transacciones.belongsTo(Bancos,{foreignKey:'bancoId'});

module.exports =Transacciones;