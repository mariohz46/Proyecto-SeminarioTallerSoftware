const PagosServices = require("../services/PagosServices");

async function crearPago(req, res) {
  try {
    const idUsuario = req.usuario.idUsuario;
    const data = {
      ...req.body,
      usuarioId: idUsuario,
      creadoEl: new Date()
    };

    const pago = await PagosServices.crearPago(data);
    res.status(201).json(pago);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function listarPagosPorUsuario(req, res) {
  try {
    const idUsuario = req.usuario.idUsuario;
    const pagos = await PagosServices.listarPagosPorUsuario(idUsuario);
    res.json(pagos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function deshabilitarPago(req, res) {
  try {
    const idPago = req.params.id;
    const idUsuario = req.usuario.idUsuario;

    const pago = await PagosServices.deshabilitarPago(idPago, idUsuario);
    res.json(pago);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

module.exports = {
  crearPago,
  listarPagosPorUsuario,
  deshabilitarPago
};