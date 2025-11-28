const express = require('express');
const router =express.Router();
const presupuestosController = require('../controllers/presupuestosController');

router.post('/crearPres',presupuestosController.crearPresupuesto);
router.get('/obtenerPresupuesto/:idPresupuesto',presupuestosController.obtenerPresupuesto);
router.get('/obtenerPresupuestos',presupuestosController.listarPresupuestos);
router.put('/modificarPresupuesto/:idPresupuesto',presupuestosController.modificarPresupuesto);
router.delete('/eliminarPresupuesto/:idPresupuesto',presupuestosController.eliminarPresupuesto);

module.exports =router;