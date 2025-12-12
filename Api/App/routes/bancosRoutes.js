const express = require('express');
const router = express.Router();
const bancoController = require('../controllers/bancosController');

router.get('/', bancoController.listarBancos);
router.post('/crear', bancoController.crearBanco);

router.put('/deshabilitar/:idBanco', bancoController.deshabilitarBanco);


router.delete('/deshabilitar/:idBanco', bancoController.eliminarBancos);

module.exports = router;

