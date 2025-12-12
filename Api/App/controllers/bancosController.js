const bancoService= require('../services/BancosServices');
/*listado de bancos */
async function listarBancos(req,res){
    try {
        const bancos = await bancoService.getBancos();
        res.json(bancos);
    } catch (error) {
        res.status(500).json({message:"Error al obtener los bancos",error});
    }
}

async function crearBanco(req, res){
    try {
        const {nombre} = req.body;
        const bancos = await bancoService.crearBancos({nombre});
        res.status(201).json('Banco creado exitosamente',{
            nombre:bancos.nombre
        })
    } catch (error) {
        res.status(500).json({message:"Error al crear el banco",error});
    }
}

async function eliminarBancos(req, res){
    try {
        const banco = req.params;
        const bancos = await bancoService.eliminarBanco(banco);
        res.json(bancos);
    } catch (error) {
        res.status(500).json({message:"Error al eliminar el banco",error});
    }
}


module.exports = {listarBancos, crearBanco, eliminarBancos};