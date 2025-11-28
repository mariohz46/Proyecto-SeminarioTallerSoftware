const presupuestosService = require('../services/presupuestosService');

async function crearPresupuesto(req,res){
    try {
        const {usuarioId,categoriaId, monto, periodo, fechaInicio, fechaFin, descripcion}=req.body;

        const presupuesto =await presupuestosService.crearPresupuesto({usuarioId,categoriaId, monto, periodo, fechaInicio, fechaFin, descripcion});
        res.status(201).json('Presupuesto creado exitosamente',{
            idUsuario:presupuesto.usuarioId,
            idCategoria:presupuesto.categoriaId,
            monto:presupuesto.monto,
            periodo:presupuesto.periodo,
            fechaInicio:presupuesto.fechaInicio,
            fechaFin:presupuesto.fechaFin,
            descripcion:presupuesto.descripcion
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

async function listarPresupuestos(req,res){
    try {
        const presupuestos = await presupuestosService.getPresupuestos();
        res.json(presupuestos);
    } catch (error) {
        console.error("ERROR en listarCategorias:", error);
        res.status(500).json({message:"Error al obtener las categorias",error});
    }

};

async function obtenerPresupuesto(req,res){
    try {
        const {idPresupuesto}=req.params;

        const presupuesto =await presupuestosService.obtenerPresupuesto(idPresupuesto);
        res.status(201).json({presupuesto})
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
async function modificarPresupuesto(req,res){
    try {
        const {idPresupuesto} = req.params
        const { usuarioId, categoriaId, monto, periodo, fechaInicio, fechaFin, descripcion}=req.body;

        const presupuesto =await presupuestosService.modificarPresupuesto({idPresupuesto, usuarioId, categoriaId, monto, periodo, fechaInicio, fechaFin, descripcion});
        res.status(201).json('Presupuesto modificado exitosamente',{
            idPresupuesto:presupuesto.idPresupuesto,
            idUsuario:presupuesto.usuarioId,
            idCategoria:presupuesto.categoriaId,
            monto:presupuesto.monto,
            periodo:presupuesto.periodo,
            fechaInicio:presupuesto.fechaInicio,
            fechaFin:presupuesto.fechaFin,
            descripcion:presupuesto.descripcion
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
async function eliminarPresupuesto(req,res){
    try {
        const {idPresupuesto}=req.params;

        const presupuesto =await presupuestosService.eliminarPresupuesto(idPresupuesto);
        res.status(201).json('Presupuesto eliminado exitosamente',{presupuesto})
    } catch (error) {
        console.error(error); 
        res.status(400).json({
            message: error.message,
            stack: error.stack,       
            error: error              
        });
    }
}

module.exports={
    crearPresupuesto,
    obtenerPresupuesto,
    listarPresupuestos,
    modificarPresupuesto,
    eliminarPresupuesto

}