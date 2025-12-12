const {Op} =require("sequelize");
const Transacciones =require("../models/TransaccionesModel");
const Presupuestos =require ("../models/PresupuestosModel");


async function obtenerDashboard(usuarioId){
if(!usuarioId){
    throw new Error("No se obtuvo el id del usuario");

    const hoy = new Date();
    const mesActual = hoy.getMonth() + 1;
    const añoActual = hoy.getFullYear();

    const mesAnterior = mesActual === 1 ? 12 : mesActual - 1;
    const añoAnterior = mesActual === 1 ? añoActual - 1: añoActual;

    const rangoActual={
        [Op.between]:[
            new Date(`${añoActual}'${mesActual}-01`),
            new Date(`${añoActual}'${mesActual}-31`)
        ]
    };

    const rangoAnterior ={
        [Op.between]:[
            new Date(`${añoActual}'${mesAnterior}-01`),
            new Date(`${añoActual}'${mesAnterior}-31`)
        ]
    }

    const transActual = await Transacciones.findAll({
        where: {usuarioId,fecha:rangoActual}
    });

    const transAnterior = await Transacciones.findAll({
        where: {usuarioId,fecha:rangoAnterior}
    });

    const todas = await Transacciones.findAll({where:{usuarioId}});

    const sum=(arr,tipo) =>
        arr.filter(t => t.tipo===tipo).reduce((s,t)=>s+Number(t.monto),0)

}




}