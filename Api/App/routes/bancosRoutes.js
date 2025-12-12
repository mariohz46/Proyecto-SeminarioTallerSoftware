const express =require('express');
const router =express.Router();
const bancoController =require('../controllers/bancosController');

/*ruta listar bancos*/
router.get('/',bancoController.listarBancos);
router.post('/crear', bancoController.crearBanco)
router.delete('/deshabilitar/:idBanco',bancoController.eliminarBancos);

module.exports=router;
