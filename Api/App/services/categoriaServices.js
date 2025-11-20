const Categorias =require('../models/CategoriasModel');

/*listar categorias */
async function getCategorias(){

        return await Categorias.findAll();
}


module.exports={getCategorias};