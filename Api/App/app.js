//Servidor de express
const express =require('express');
const App=express();


App.use(express.json());
App.use(express.urlencoded({extended: false}));
App.use(require('../App/routes/usuariosRoutes'));



module.exports=App;
