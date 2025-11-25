const Transacciones = require("../models/TransaccionesModel");
const Usuarios = require("../models/UsuariosModel");
const Bancos = require("../models/BancosModel");
const Categorias = require("../models/CategoriasModel");

async function listarTransacciones() {
  try {
    const transacciones = await Transacciones.findAll({
      include: [
        { model: Usuarios, as: "usuario", attributes: ["nombre", "email"] },
        { model: Categorias, as: "Categoria", attributes: ["nombre", "tipo"] },
        { model: Bancos, as: "banco", attributes: ["nombre"] }
      ],
      order: [["fecha", "DESC"], ["idTransaccion", "DESC"]]
    });

    return transacciones;
  } catch (error) {
    console.error("ERROR al listar transacciones:", error);
    throw error;
  }
}

async function crearTransaccion(data) {
  try {
    return await Transacciones.create(data);
  } catch (error) {
    console.error("ERROR creando transacción:", error);
    throw error;
  }
}

module.exports = {
  listarTransacciones,
  crearTransaccion
};