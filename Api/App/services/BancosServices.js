const Bancos =require('../models/BancosModel');


async function getBancos(){

    return await Bancos.findAll();
}

module.exports = {getBancos};