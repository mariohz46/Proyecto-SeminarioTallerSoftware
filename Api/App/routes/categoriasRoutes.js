const express =require('express');
const router =express.Router();
const {listarCategorias} =require('../controllers/categoriasController');
/*ruta listar categorias*/
router.get('/',listarCategorias);


module.exports=router;