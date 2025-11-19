const {getCategorias} =require('../services/categoriaServices');

async function listarCategorias(req,res){
    try {
        const categorias = await getCategorias();
        res.json(categorias);
    } catch (error) {
        res.status(500).json({message:"Error al obtener las categorias",error});
    }

};


module.exports ={listarCategorias};