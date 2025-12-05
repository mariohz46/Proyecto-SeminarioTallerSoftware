const Pagos = require('../models/PagosModel');
const Usuarios = require('../models//UsuariosModel');
const Bancos = require('../models/BancosModel');
const Categorias = require('../models/CategoriasModel');


async function crearPago({ usuarioId, bancoId, monto, destinatario, fechaPago, fechaVencimiento, descripcion, estado }) {
    const usuario = await Usuarios.findByPk(usuarioId);
    if (!usuario) throw new Error("El usuario con el que intenta realizar el pago no se encuentra registrado.");
    const fechaPagoFormato = new Date(fechaPago);
    const fechaVencimientoFormato = new Date(fechaVencimiento);
    try {

        const pagoNuevo = await Pagos.create(
            {
                usuarioId,
                bancoId,
                monto,
                destinatario,
                fechaPago: fechaPagoFormato,
                fechaVencimiento: fechaVencimientoFormato,
                descripcion,
                estado
            }
        );
        return pagoNuevo;
    } catch (error) {
        console.error('Error en servicio',error);
    }

}

async function listarPagos(){
    try {
        const pagos = await Pagos.findAll({
            include: [
                {model: Bancos, as:"banco",attributes:["nombre"]},
                {model: Usuarios, as:"usuario",attributes:["nombre"]}
            ],
            
        });

        return pagos;
    } catch (error) {
        console.error("Error en servicio de pagos, no se pudieron listar los pagos",error);
        throw errror;
    }
}


module.exports = { crearPago,listarPagos };