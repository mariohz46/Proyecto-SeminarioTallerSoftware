const express =require('express');
const router= express.Router();
const TransaccionesController =require('../controllers/transaccionesController');
const {autenticarToken} =require('../services/authTokenServices');


//router.post('/',autenticarToken,TransaccionesController.crearTransaccion);
router.post('/',TransaccionesController.crearTransaccion);
router.get('/',autenticarToken,TransaccionesController.getTransacciones);
router.put('/deshabilitar/:id',TransaccionesController.eliminarTransacciones);

module.exports =router;