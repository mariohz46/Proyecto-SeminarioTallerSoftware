const express = require('express');
const router = express.Router();
const pagosController = require("../controllers/pagosController");
const { autenticarToken } = require("../services/authTokenServices");

router.post('/registro', autenticarToken, pagosController.crearPago);
router.get('/listar', autenticarToken, pagosController.listarPagosPorUsuario);
//router.put("/deshabilitar/:id", autenticarToken, deshabilitarPago);




module.exports = router;
