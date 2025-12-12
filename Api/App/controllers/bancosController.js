const bancoService = require('../services/BancosServices');
const Bancos = require('../models/BancosModel'); 
/* listado de bancos */
async function listarBancos(req, res) {
  try {
    const bancos = await bancoService.getBancos();
    res.json(bancos);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los bancos", error });
  }
}

async function crearBanco(req, res) {
  try {
    const { nombre } = req.body;
    const bancos = await bancoService.crearBancos({ nombre });
    res.status(201).json('Banco creado exitosamente', {
      nombre: bancos.nombre
    })
  } catch (error) {
    res.status(500).json({ message: "Error al crear el banco", error });
  }
}

// (tu función actual - elimina)
async function eliminarBancos(req, res) {
  try {
    const banco = req.params;
    const bancos = await bancoService.eliminarBanco(banco);
    res.json(bancos);
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el banco", error });
  }
}


async function deshabilitarBanco(req, res) {
  try {
    const { idBanco } = req.params;

    const banco = await Bancos.findByPk(idBanco);
    if (!banco) return res.status(404).json({ message: "Banco no encontrado" });

    // Borrado suave: marca estado
  
    await Bancos.update(
      { estado: "Inactivo" },
      { where: { idBanco } }
    );

    return res.json({ message: "Banco deshabilitado correctamente" });
  } catch (error) {
    console.error("Error deshabilitando banco:", error);
    return res.status(500).json({ message: "Error al deshabilitar el banco", error: error.message });
  }
}

module.exports = { listarBancos, crearBanco, eliminarBancos, deshabilitarBanco };
