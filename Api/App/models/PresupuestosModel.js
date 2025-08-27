const {DataTypes}=require('sequelize');
const sequelize =require('../config/db');

const Presupuestos = sequelize.define('Presupuestos',{
    idPresupuesto:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    usuarioId:{
        type: DataTypes.INTEGER,
    },
    categoriaId:{
        type: DataTypes.INTEGER,
    },
    monto:{
        type:DataTypes.DECIMAL(10,2)
    },
    periodo:{
        type:DataTypes.CHAR(10)
    },
    fechaInicio:{
        type:DataTypes.DATE
    },
    fechaFin:{
        type:DataTypes.DATE
    },
    descripcion:{
        type:DataTypes.CHAR(255)
    }
    
},{
    tableName:'presupuestos',
    timestamps:true
});