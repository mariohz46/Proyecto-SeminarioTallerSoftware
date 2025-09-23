const {DataTypes}=require('sequelize');
const sequelize =require('../config/db');
const Usuarios = sequelize.define('Usuario',{usuarioId:DataTypes.INTEGER});
const Categorias = sequelize.define('Categoria',{categoriaId:DataTypes.INTEGER});

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

Usuarios.HasMany(Presupuestos,{foreignKey:'usuarioId'});
Presupuestos.belongsTo(Usuarios,{foreignKey:'usuarioId'});

Categorias.HasMany(Presupuestos,{foreignKey:'categoriaId'});
Presupuestos.belongsTo(Categorias,{foreignKey:'categoriaId'});

module.exports= {Presupuestos, Categorias, Usuarios};