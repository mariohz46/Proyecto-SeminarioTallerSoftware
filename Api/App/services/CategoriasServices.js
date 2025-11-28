const { where } = require('sequelize');
const Categoria = require('../models/CategoriasModel');

async function crearCategoria({ nombre, tipo, descripcion }) {
    const categoriaExistente = await Categoria.findOne({ where: { nombre } });
    if (categoriaExistente) {
        throw new Error('La categoria ya existe');
    }
    const nuevaCategoria = await Categoria.create({
        nombre,
        tipo,
        descripcion
    });
    return { nuevaCategoria };
}
async function obtenerCategoria(idCategoria) {
    const revisarCategoria = await Categoria.findOne({ where:{idCategoria} });
    if (!revisarCategoria) {
        throw new Error('La categoria no existe');
    }
    return  revisarCategoria;
}

async function getCategorias() {

    return await Categoria.findAll();
}

async function modificarCategoria({ idCategoria, nombre, tipo, descripcion }) {
    const revisarCategorias = await Categoria.findOne({ where: { idCategoria } });
    if (!revisarCategorias) {
        throw new Error('La categoria no existe');
    }
    const modCategoria = await Categoria.update(
        {
            nombre,
            tipo,
            descripcion
        },
        {where: { idCategoria }}
    );
    return { modCategoria };
}
async function eliminarCategoria(idCategoria) {
    const revisarCategorias = await Categoria.findOne({ where: { idCategoria } });
    if (!revisarCategorias) {
        throw new Error('La categoria no existe');
    }
    const delCategoria = await Categoria.destroy({ where: { idCategoria } });
    return { delCategoria };
}

module.exports = {
    crearCategoria,
    obtenerCategoria,
    getCategorias,
    modificarCategoria,
    eliminarCategoria
};