const Bancos =require('../models/BancosModel');

/*listar bancos */
async function getBancos(){

    return await Bancos.findAll();
}

async function crearBancos({nombre}){
    const bancoExistente = await Bancos.findOne({ where: { nombre } });
    if (bancoExistente) {
        throw new Error('Este banco ya existe');
    }
    const nuevoBanco = await Bancos.create({
        nombre
    });
    return { nuevoBanco };
}

async function eliminarBanco(idBanco){

    return await Bancos.destroy({where: idBanco});
}

module.exports = {
    getBancos, 
    crearBancos, 
    eliminarBanco
};