const { where } = require('sequelize');
const Presupuestos = require("../models/PresupuestosModel");
const Usuarios = require("../models/UsuariosModel");
const Categorias = require("../models/CategoriasModel");

async function crearPresupuesto({ usuarioId, categoriaId, monto, periodo, fechaInicio, fechaFin, descripcion }) {
    const categoriaExistente = await Categorias.findOne({ where: { idCategoria: categoriaId } });
    if (!categoriaExistente) {
        throw new Error('Esta categoria no existe');
    }
    const usuarioExistente = await Usuarios.findOne({ where: { idUsuario: usuarioId } });
    if (!usuarioExistente) {
        throw new Error('Este usuario no existe');
    }
    const nuevoPresupuesto = await Presupuestos.create({
        usuarioId,
        categoriaId,
        monto,
        periodo,
        fechaInicio,
        fechaFin,
        descripcion
    });
    return { nuevoPresupuesto };
}
async function obtenerPresupuesto(idPresupuesto) {
    const revisarPresupuesto = await Presupuestos.findOne({ where:{idPresupuesto} });
    if (!revisarPresupuesto) {
        throw new Error('El presupuesto no existe');
    }
    return  revisarPresupuesto;
}

async function getPresupuestos() {

    return await Presupuestos.findAll();
}

async function modificarPresupuesto({ idPresupuesto, usuarioId, categoriaId, monto, periodo, fechaInicio, fechaFin, descripcion }) {
    const revisarPresupuesto = await Presupuestos.findOne({ where:{idPresupuesto} });
    if (!revisarPresupuesto) {
        throw new Error('El presupuesto no existe');
    }
    const modPresupuesto = await Presupuestos.update(
        {
            usuarioId,
            categoriaId,
            monto,
            periodo,
            fechaInicio,
            fechaFin,
            descripcion
        },
        {
            where: { idPresupuesto }
        }
    );
    return { modPresupuesto };
}
async function eliminarPresupuesto(idPresupuesto) {
    const revisarPresupuesto = await Presupuestos.findOne({ where:{idPresupuesto} });
    if (!revisarPresupuesto) {
        throw new Error('El presupuesto no existe');
    }
    const delPresupuesto = await Presupuestos.destroy({ where: { idPresupuesto } });
    return { delPresupuesto };
}

module.exports = {
    crearPresupuesto,
    obtenerPresupuesto,
    getPresupuestos,
    modificarPresupuesto,
    eliminarPresupuesto
};