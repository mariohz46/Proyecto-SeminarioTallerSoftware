const Pagos =require('../models/PagosModel');
const Bancos =require('../models/BancosModel');
const Usuarios =require('../models/UsuariosModel');

async function crearPago(data) {
  return await Pagos.create(data);
}

async function listarPagosPorUsuario(usuarioId) {
  return await Pagos.findAll({
    where: { usuarioId },
    include: [
      { model: Bancos, as: "banco", attributes: ["nombre"] },
      { model: Usuarios, as: "usuario", attributes: ["nombre"] }
    ],
    order: [["fechaPago", "DESC"], ["idPago", "DESC"]]
  });
}

async function deshabilitarPago(idPago, usuarioId) {
  const pago = await Pagos.findOne({
    where: { idPago, usuarioId }
  });

  if (!pago) throw new Error("Pago no encontrado");

  pago.estado = "Inactivo";
  await pago.save();
  return pago;
}

module.exports = {
  crearPago,
  listarPagosPorUsuario,
  deshabilitarPago
};