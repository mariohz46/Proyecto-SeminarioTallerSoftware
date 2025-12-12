const express = require('express');
const router =express.Router();
const categoriasController = require('../controllers/categoriasController');

router.post('/crearCat',categoriasController.crearCategoria);
router.get('/obtenerCategoria/:idCategoria',categoriasController.obtenerCategoria);
router.get('/obtenerCategorias',categoriasController.listarCategorias);
router.put('/modificarCategoria/:idCategoria', categoriasController.modificarCategoria);
router.delete('/eliminarCategoria/:idCategoria', categoriasController.eliminarCategoria);

module.exports =router;