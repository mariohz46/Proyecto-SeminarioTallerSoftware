const {getBancos}= require('../services/BancosServices');
/*listado de bancos */
async function listarBancos(req,res){
    try {
        const bancos = await getBancos();
        res.json(bancos);
    } catch (error) {
        res.status(500).json({message:"Error al obtener las categorias",error});
    }
}


module.exports = {listarBancos};