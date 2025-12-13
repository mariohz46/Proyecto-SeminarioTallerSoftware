const Transacciones = require('../models/TransaccionesModel');
const TransaccionesServices = require('../services/TransaccionesServices');

async function crearTransaccion(req, res) {
  try {
    const idUsuarioAutenticado = req.usuario.idUsuario;

    const data = {
      ...req.body,
      usuarioId: idUsuarioAutenticado,
      fecha: req.body.fecha || null,
      creadoEl: new Date()
    };

    const nuevaTransaccion = await Transacciones.create(data);
    res.status(201).json(nuevaTransaccion);

  } catch (error) {
    console.error("Error al crear transacción:", error);
    res.status(400).json({
      message: error.message
    });
  }
}

/*
async function getTransacciones(req, res) {
    try {
        const data = await TransaccionesServices.listarTransacciones();
        res.json(data);
    } catch (error) {
        console.error("Error obteniendo transacciones:", error);
        res.status(500).json({ error: "Error obteniendo transacciones" });
    }
}
*/
async function getTransacciones(req, res) {
    try {
        const idUsuario = req.usuario.idUsuario;

        const data = await TransaccionesServices.listarTransaccionesPorUsuario(idUsuario);
        res.json(data);
    } catch (error) {
        console.error("Error obteniendo transacciones:", error);
        res.status(500).json({ error: "Error obteniendo transacciones" });
    }
}

async function eliminarTransacciones(req,res){
    try {
        const {id} =req.params;
        const transaccion = await Transacciones.findByPk(id);
        if(!transaccion){
            console.log("Transaccion no encontrada");
            return res.status(404).json({message:"Transaccion no encontrada"})
        }
        await transaccion.destroy();
        res.json({message:"Transaccion eliminada correctamente"});
    } catch (error) {
        console.error("Error eliminando la transaccion", error);
        res.status(500).json({error:"Error eliminando la transaccion"});
    }
}

module.exports = { crearTransaccion, getTransacciones, eliminarTransacciones};