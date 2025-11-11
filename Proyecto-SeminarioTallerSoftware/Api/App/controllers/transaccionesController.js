const Transacciones =require('../models/TransaccionesModel');

async function crearTransaccion(req,res){
try {
    const idUsuarioAutenticado =req.user.idUsuario;

    const data={
        ...req.body,
        usuarioId:idUsuarioAutenticado,
        creadoEl: new Date()
    }
    //Validacion tipo de transaccion
    const tipoTransaccion =['Ingreso','Egreso'];
    if(!tipoTransaccion.includes(data.tipo)){
        return res.status(400).json({message:'Tipo de transaccion invalida'});
    }
    //Validacion monto mayor a 0
    if(data.monto <= 0){
        return res.status(400).json({message:'Monto debe ser mayor a cero.'});
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