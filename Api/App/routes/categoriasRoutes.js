const express = require('express');
const router =express.Router();
const categoriasController = require('../controllers/categoriasController');

router.post('/crearCat',categoriasController.crearCategoria);
router.get('/obtenerCategoria/:idCategoria',categoriasController.obtenerCategoria);
router.get('/obtenerCategorias',categoriasController.listarCategorias);
router.put('/modificarCategoria/:id',categoriasController.modificarCategoria);
router.delete('/:id',categoriasController.eliminarCategoria);

module.exports =router;