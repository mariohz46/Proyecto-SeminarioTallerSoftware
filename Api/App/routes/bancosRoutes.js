const express =require('express');
const router =express.Router();
const {listarBancos} =require('../controllers/bancosController');

router.get('/',listarBancos);

module.exports=router;
