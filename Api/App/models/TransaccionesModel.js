const {DataTypes}=require('sequelize');
const sequelize =require('../config/db');
const Usuarios = sequelize.define('Usuario',{usuarioId: DataTypes.INTEGER});
const Categorias = sequelize.define('Categoria',{categoriaId: DataTypes.INTEGER});
const Bancos = sequelize.define('Banco',{bancoId: DataTypes.INTEGER});

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

Usuarios.hasMany(Transacciones,{foreignKey:'usuarioid'});
Transacciones.belongsTo(Usuarios,{foreignKey:'usuarioid'});

Categorias.hasMany(Transacciones,{foreignKey:'categoriaId'});
Transacciones.belongsTo(Categorias,{foreignKey:'categoriaId'});

Bancos.hasMany(Transacciones,{foreignKey:'bancoId'});
Transacciones.belongsTo(Bancos,{foreignKey:'bancoId'});

module.exports =Transacciones;