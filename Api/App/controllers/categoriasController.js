const categoriasService = require('../services/CategoriasServices');

async function crearCategoria(req,res){
    try {
        const {nombre,tipo, descripcion}=req.body;

        const categoria =await categoriasService.crearCategoria({nombre,tipo,descripcion});
        res.status(201).json('Categoria creada exitosamente',{
            nombre:categoria.nombre,
            tipo:categoria.tipo,
            descripcion:categoria.descripcion
        })
    } catch (error) {
        console.error(error); 
        res.status(400).json({
            message: error.message,
            stack: error.stack,       
            error: error              
        });
    }
}

async function listarCategorias(req,res){
    try {
        const categorias = await categoriasService.getCategorias();
        res.json(categorias);
    } catch (error) {
        console.error("ERROR en listarCategorias:", error);
        res.status(500).json({message:"Error al obtener las categorias",error});
    }

};

async function obtenerCategoria(req,res){
    try {
        const {idCategoria}=req.params;

        const categoria =await categoriasService.obtenerCategoria(idCategoria);
        res.status(201).json({categoria})
    } catch (error) {
        console.error(error); 
        res.status(400).json({
            message: error.message,
            stack: error.stack,       
            error: error              
        });
    }
}
// async function obtenerCategorias(req,res){
//     try {

//         const categoria =await categoriasService.obtenerCategorias;
//         res.status(201).json({categoria})
//     } catch (error) {
//         console.error(error); 
//         res.status(400).json({
//             message: error.message,
//             stack: error.stack,       
//             error: error              
//         });
//     }
// }
async function modificarCategoria(req,res){
    try {
        const {idCategoria} = req.params
        const {nombre,tipo,descripcion}=req.body;

        const categoria =await categoriasService.modificarCategoria({idCategoria,nombre,tipo,descripcion});
        res.status(201).json('Categoria modificada exitosamente',{
            idCategoria:categoria.idCategoria,
            nombre:categoria.nombre,
            tipo:categoria.tipo,
            descripcion:categoria.descripcion
        })
    } catch (error) {
        console.error(error); 
        res.status(400).json({
            message: error.message,
            stack: error.stack,       
            error: error              
        });
    }
}
async function eliminarCategoria(req,res){
    try {
        const {idCategoria}=req.params;

        const categoria = await categoriasService.eliminarCategoria(idCategoria);

        res.status(200).json({
            message: 'Categoria eliminada exitosamente',
            categoria
        });

    } catch (error) {
        console.error(error); 
        res.status(400).json({
            message: error.message,
            error
        });
    }
}

module.exports={
    crearCategoria,
    obtenerCategoria,
    listarCategorias,
    modificarCategoria,
    eliminarCategoria

}