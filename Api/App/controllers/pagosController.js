const { crearPago,listarPagos } = require("../services/PagosServices");

async function registrarPago(req, res) {
    try {
        console.log("Usuario:",req.usuario);
        console.log("Datos:",req.body);

        const {bancoId, monto, destinatario, fechaPago, fechaVencimiento, descripcion, estado } = req.body;
        const usuarioId = req.usuario.idUsuario;

        const pago = await crearPago({
            usuarioId,
            bancoId,
            monto,
            destinatario,
            fechaPago,
            fechaVencimiento,
            descripcion,
            estado
        });
        res.json(pago);
    } catch (error) {
        res.status(500).json('Error en Controlador',{mensaje:error.message});
    }

}

async function getPagos(req,res){
    try {
        const data = await listarPagos();
        res.json(data);
    } catch (error) {
        console.error("Error en controlador de pagos, no se pudo obtener los pagos", error);
        res.status(500).json({error:"Error obteniendo los pagos"});
    }
}

module.exports = { registrarPago,getPagos };