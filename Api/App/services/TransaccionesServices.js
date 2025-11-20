const Transacciones = require('../models/TransaccionesModel');
const Usuarios = require('../models/TransaccionesModel');
const Categorias = require('../models/CategoriasModel');
const Bancos = require('../models/BancosModel');

async function registrarTransaccion(data){
    const usuario = await Usuarios.findOne({ where: { usuarioId: data.usuarioId } });
    if (!usuario) {
        throw new Error('El usuario no existe');
    }

    const categoria = await Categorias.findOne({ where: { categoriaId: data.categoriaId } });
    if (!categoria) {
        throw new Error('La categoria no existe');
    }

    const banco = await Bancos.findOne({ where: { bancoId: data.bancoId } });
    if (!banco) {
        throw new Error('El banco no existe');
    }

    const tipoTransaccion = ['Ingreso', 'Egreso'];
    if (!tipoTransaccion.includes(data.tipo)) {
        throw new Error("Tipo de transaccion invalido");
    }

    if (data.monto <= 0) {
        throw new Error("Monto debe de ser mayor que cero ");
    }

    //validacion nueva probar antes de subir a github
    if (data.tipo === 'Egreso') {
        const saldoActual = await Transacciones.sum(
            sequelize.literal(`case when tipo = 'Ingreso' then monto else -monto end`),
            {
                where: {
                    usuarioId: data.usuarioId,
                    fecha: { [Op.lt]: data.fecha || new Date() }
                }
            }
        ) || 0;

        const saldoProyectado = saldoActual - data.monto;
        if (saldoProyectado < 0) {
            throw new Error(
                `Fondos insuficientes: tu saldo actual es $${saldoActual.toFixed(2)} y estás intentando retirar $${data.monto.toFixed(2)}.`
            );
        }
    }
    return await Transacciones.create(data);
    
    /* const transaction = await sequelize.transaction();
     try {
         const fechaTransaccion = data.fecha || new Date();  // Default a ahora si no se proporciona
         const dataCompleta = {
             ...data,
             fecha: fechaTransaccion,
             creadoEl: new Date()  // Si no viene en data
         };
         const transaccion = await Transacciones.create(dataCompleta, { transaction });
         await transaction.commit();
         return transaccion;
     } catch (error) {
         await transaction.rollback();
         throw error;  // Propaga el error original
     }
     */

}

async function actualizarTransaccion(idTransaccion,data){
    const transaccion = await Transacciones.findByPk(idTransaccion);
    if(!transaccion){
        throw new Error('Transaccion no fue encontrada.');
    }

    if(data.usuarioId){
        const usuario= await Usuarios.findByPk(data.usuarioId);
        if(!usuario) throw new Error('El usuario seleccionado no existe');
    }
    
    if(data.categoriaId){
        const categoria = await Categorias.findByPk(data.categoriaId);
        if(!categoria) throw new Error('La categoria seleccionada no existe');
    }

    if(data.bancoId){
        const banco = await Categorias.findByPk(data.bancoId);
        if(!banco) throw new Error('el banco seleccionado no existe');
    }

    if(data.tipo && !['Ingreso','Egreso'].includes(data.tipo)){
        throw new Error ("Tipo de transaccion invalido");
    }

    if(data.monto <= 0){
        throw new Error("El monto debe ser mayor que 0");
    }
    return await Transacciones.update(data);
}



module.exports = { registrarTransaccion, actualizarTransaccion };