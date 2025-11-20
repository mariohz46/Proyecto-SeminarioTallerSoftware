const Transacciones =require('../models/TransaccionesModel');

async function crearTransaccion(req,res){
try {
    const idUsuarioAutenticado =req.user.idUsuario;

    const data={
        ...req.body,
        usuarioId:idUsuarioAutenticado,
        creadoEl: new Date()
    }
    
    const nuevaTransaccion = await Transacciones.create(data);
    res.status(201).json(nuevaTransaccion);

} catch (error) {
    console.error(error);
    res.status(400).json({
        message: error.message,
        stack: error.stack,       
        error: error  
    });
}
}

module.exports ={crearTransaccion};