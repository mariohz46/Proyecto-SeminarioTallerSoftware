const express = require('express');
const router = express.Router();
const pagosController = require("../controllers/pagosController");
const { autenticarToken } = require("../services/authTokenServices");

router.post('/registro', autenticarToken, pagosController.registrarPago);
router.get('/listar', autenticarToken, pagosController.getPagos);

// ✅ NUEVA RUTA
router.put('/deshabilitar/:id',  pagosController.deshabilitarPago);

module.exports = router;
