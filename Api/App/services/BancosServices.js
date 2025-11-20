const Bancos =require('../models/BancosModel');

/*listar bancos */
async function getBancos(){

    return await Bancos.findAll();
}

module.exports = {getBancos};