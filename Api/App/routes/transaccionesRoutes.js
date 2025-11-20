const express =require('express');
const router= express.Router();
const TransaccionesController =require('../controllers/transaccionesController');
const {autenticarToken} =require('../services/authTokenServices');

router.post('/nuevaTransaccion',autenticarToken,TransaccionesController.crearTransaccion);

module.exports =router;