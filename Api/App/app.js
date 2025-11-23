//Servidor de express
const express =require('express');
const App=express();
const cors =require('cors');


App.use(express.json());
App.use(express.urlencoded({extended: false}));
App.use(cors());
App.use('/usuarios',require('../App/routes/usuariosRoutes'));
App.use('/transacciones',require('../App/routes/transaccionesRoutes'));
App.use('/bancos',require('../App/routes/bancosRoutes'));
App.use('/categorias',require('../App/routes/categoriasRoutes'));


module.exports=App;
