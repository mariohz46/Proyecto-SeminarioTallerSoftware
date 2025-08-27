const Usuarios =require('./UsuariosModel');
const Presupuestos =require('./PresupuestosModel');
const Categorias =require('./CategoriasModel');
const Transacciones =require('./TransaccionesModel');
constPagos =require('./PagosModel');

//Usuario categorias
Usuarios.hasMany(Categorias,{foreignKey:'usuarioId'});
Categorias.belongsTo(Usuarios,{foreignKey:'usuarioId'});
//Usuario presupuestos
Usuarios.hasMany(Presupuestos,{foreignKey:'usuarioId'});
Presupuestos.belongsTo(Usuarios,{foreignKey:'usuarioId'});
//Usuario pagos
Usuarios.hasMany(Pagos,{foreignKey:'usuarioId'});
Pagos.belongsTo(Usuarios,{foreignKey:'usuarioId'});
//Usuario transacciones
Usuarios.hasMany(Transacciones,{foreignKey:'usuarioId'});
Transacciones.belongsTo(Usuarios,{foreignKey:'usuarioId'});
//Categoria presupuestos
Categorias.hasMany(Presupuestos,{foreignKey:'categoriaId'});
Presupuestos.belongsTo(Categorias,{foreignKey:'categoriaId'});
//Categoria transacciones
Categorias.hasMany(Transacciones,{foreignKey:'categoriaId'});
Transacciones.belongsTo(Categorias,{foreignKey:'categoriaId'});
