const Categorias =require('../models/CategoriasModel');


async function getCategorias(){

        return await Categorias.findAll();
}


module.exports={getCategorias};