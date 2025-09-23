const {DataTypes}=require('sequelize');
const sequelize =require('../config/db');
const Usuarios = sequelize.define('Usuario',{usuarioId: DataTypes.INTEGER});
const Bancos = sequelize.define('Banco',{bancoId: DataTypes.INTEGER});

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
    bancoId:{
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
});

Usuarios.HasMany(Pagos,{foreignKey:'usuarioId'});
Pagos.belongsTo(Usuarios,{foreignKey:'usuarioId'});

Bancos.HasMany(Pagos,{foreignKey:'bancoId'});
Pagos.belongsTo(Bancos,{foreignKey:'bancoId'});

module.exports={Usuarios, Pagos, Bancos};