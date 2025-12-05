const Transacciones = require('../models/TransaccionesModel');
const TransaccionesServices = require('../services/TransaccionesServices');

async function crearTransaccion(req, res) {
    try {
        const idUsuarioAutenticado =  req.body.usuarioId;//cambiar esto cuando ya este implementado el login por el token

        const data = {
            ...req.body,
            usuarioId: idUsuarioAutenticado,
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


async function getTransacciones(req, res) {
    try {
        const data = await TransaccionesServices.listarTransacciones();
        res.json(data);
    } catch (error) {
        console.error("Error obteniendo transacciones:", error);
        res.status(500).json({ error: "Error obteniendo transacciones" });
    }
}

module.exports = { crearTransaccion, getTransacciones };