const { Op, Sequelize } = require("sequelize");
const Transacciones = require("../models/TransaccionesModel");
const Presupuestos = require("../models/PresupuestosModel");

async function obtenerDashboard(usuarioId) {
    if (!usuarioId) {
        throw new Error("No se obtuvo el id del usuario");
    }

    const hoy = new Date();
    const mesActual = hoy.getMonth() + 1;
    const añoActual = hoy.getFullYear();

    const mesAnterior = mesActual === 1 ? 12 : mesActual - 1;
    const añoAnterior = mesActual === 1 ? añoActual - 1 : añoActual;

    
    const rangoActualInicio = `${añoActual}-${String(mesActual).padStart(2, "0")}-01`;
    const rangoActualFin = `${añoActual}-${String(mesActual).padStart(2, "0")}-31`;

    const rangoAnteriorInicio = `${añoAnterior}-${String(mesAnterior).padStart(2, "0")}-01`;
    const rangoAnteriorFin = `${añoAnterior}-${String(mesAnterior).padStart(2, "0")}-31`;

    
    const transActual = await Transacciones.findAll({
        where: {
            usuarioId,
            fecha: { [Op.between]: [rangoActualInicio, rangoActualFin] }
        }
    });

    const transAnterior = await Transacciones.findAll({
        where: {
            usuarioId,
            fecha: { [Op.between]: [rangoAnteriorInicio, rangoAnteriorFin] }
        }
    });

    const todas = await Transacciones.findAll({
        where: { usuarioId }
    });

    const presupuestos = await Presupuestos.findAll({
        where: { usuarioId }
    });

    
    const sum = (arr, tipo) =>
        arr
          .filter(t => t.tipo && t.tipo.toLowerCase() === tipo.toLowerCase())
          .reduce((s, t) => s + Math.abs(Number(t.monto) || 0), 0);

    
    const ingresosActual = sum(transActual, "Ingreso");
    const gastosActual = sum(transActual, "Egreso");

    
    const ingresosAnterior = sum(transAnterior, "Ingreso");
    const gastosAnterior = sum(transAnterior, "Egreso");


    const ingresosTotal = sum(todas, "Ingreso");
    const gastosTotal = sum(todas, "Egreso");

    
    const totalPresupuesto = presupuestos.reduce(
        (s, p) => s + Number(p.monto || 0),
        0
    );

    
    const balanceDisponible = ingresosTotal - gastosTotal;

    const ahorroNetoActual = ingresosActual - gastosActual;
    const ahorroNetoAnterior = ingresosAnterior - gastosAnterior;

    const tasaAhorro =
        ingresosTotal > 0
            ? ((ingresosTotal - gastosTotal) / ingresosTotal) * 100
            : 0;

    const relacionPagosIngresos =
        ingresosTotal > 0 ? (gastosTotal / ingresosTotal) * 100 : 0;

    
    return {
        balanceDisponible,
        ingresosActual,
        ingresosAnterior,
        gastosActual,
        gastosAnterior,
        ahorroNetoActual,
        ahorroNetoAnterior,
        totalIngresosMes: ingresosActual,
        totalGastosMes: gastosActual,
        totalPresupuesto,
        tasaAhorro,
        relacionPagosIngresos
    };
}

module.exports = { obtenerDashboard };