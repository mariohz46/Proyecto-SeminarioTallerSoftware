const express =require('express');
const router =express.Router();
const {listarBancos} =require('../controllers/bancosController');
/*ruta listar bancos*/
router.get('/',listarBancos);

module.exports=router;
