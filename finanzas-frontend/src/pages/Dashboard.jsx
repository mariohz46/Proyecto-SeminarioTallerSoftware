// src/pages/Dashboard.jsx
import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

const LS_TRANSACTIONS = "ff_transactions";
const LS_BUDGETS = "ff_budgets";

const money = (n) =>
  Number(n || 0).toLocaleString("es-HN", {
    style: "currency",
    currency: "HNL",
  });

function readTransactions() {
  try {
    return JSON.parse(localStorage.getItem(LS_TRANSACTIONS) || "[]");
  } catch {
    return [];
  }
}

function readBudgets() {
  try {
    return JSON.parse(localStorage.getItem(LS_BUDGETS) || "[]");
  } catch {
    return [];
  }
}

export default function Dashboard() {
  const [tx, setTx] = useState([]);
  const [budgets, setBudgets] = useState([]);

  useEffect(() => {
    setTx(readTransactions());
    setBudgets(readBudgets());
  }, []);

  // --- Helpers de fechas para "mes actual" y "mes anterior"
  const now = new Date();
  const thisMonth = now.getMonth();
  const thisYear = now.getFullYear();

  const prevMonthDate = new Date(thisYear, thisMonth - 1, 1);
  const prevMonth = prevMonthDate.getMonth();
  const prevYear = prevMonthDate.getFullYear();

  function isSameMonth(d, m, y) {
    return d.getMonth() === m && d.getFullYear() === y;
  }

  // --- Partición de transacciones por mes
  const { currentTx, previousTx } = useMemo(() => {
    const current = [];
    const previous = [];

    tx.forEach((t) => {
      if (!t.date) return;
      const d = new Date(t.date);
      if (Number.isNaN(d.getTime())) return;

      if (isSameMonth(d, thisMonth, thisYear)) current.push(t);
      else if (isSameMonth(d, prevMonth, prevYear)) previous.push(t);
    });

    return { currentTx: current, previousTx: previous };
  }, [tx, thisMonth, thisYear, prevMonth, prevYear]);

  // --- Cálculo de ingresos, gastos y ahorro
  function acumula(lista) {
    let ingresos = 0;
    let gastos = 0;

    for (const t of lista) {
      const tipo = t.tipo || t.type; // por si usas otro nombre
      const raw = t.amount ?? t.monto ?? 0;
      const monto = Number(raw) || 0;

      if (tipo === "Ingreso") {
        ingresos += monto;
      } else if (tipo === "Egreso") {
        gastos += monto;
      } else {
        // fallback si no hay tipo: positivos = ingresos, negativos = gastos
        if (monto >= 0) ingresos += monto;
        else gastos += Math.abs(monto);
      }
    }

    const ahorro = ingresos - gastos;
    return { ingresos, gastos, ahorro };
  }

  const actual = useMemo(() => acumula(currentTx), [currentTx]);
  const anterior = useMemo(() => acumula(previousTx), [previousTx]);

  const balanceDisponible = actual.ahorro;
  const tasaAhorro =
    actual.ingresos > 0 ? (actual.ahorro / actual.ingresos) * 100 : 0;
  const ratioPagos =
    actual.ingresos > 0 ? (actual.gastos / actual.ingresos) * 100 : 0;

  const totalPresupuestado = useMemo(
    () => budgets.reduce((acc, b) => acc + Number(b.monto || 0), 0),
    [budgets]
  );

  const estadoEsCritico = actual.gastos > actual.ingresos;

  return (
    <div className="container my-4">
      {/* -------- VISTA RÁPIDA -------- */}
      <div className="card border-2 border-secondary-subtle mb-4">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <div>
              <h4 className="mb-0">Vista Rápida Financiera</h4>
              <small className="text-muted">
                Comparación real: Ingresos vs Pagos del mes actual
              </small>
            </div>
            <div className="d-none d-md-block">
              <Link
                to="/transacciones/nueva"
                className="btn fw-semibold text-light"
                style={{ backgroundColor: "#EC8305", borderColor: "#EC8305" }}
              >
                + Nueva Transacción
              </Link>
            </div>
          </div>

          {/* Tarjetas superiores */}
          <div className="row g-3 mb-3">
            {/* Balance disponible */}
            <div className="col-12 col-md-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body">
                  <p className="text-muted mb-1">Balance Real Disponible</p>
                  <h4
                    className={
                      balanceDisponible >= 0 ? "text-success mb-1" : "text-danger mb-1"
                    }
                  >
                    {money(balanceDisponible)}
                  </h4>
                  <span className="badge rounded-pill text-bg-secondary">
                    {balanceDisponible >= 0 ? "Disponible" : "En negativo"}
                  </span>
                </div>
              </div>
            </div>

            {/* Tasa de ahorro */}
            <div className="col-12 col-md-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body">
                  <p className="text-muted mb-1">Tasa de Ahorro Real</p>
                  <h4 className="mb-1" style={{ color: "#024CAA" }}>
                    {tasaAhorro.toFixed(1)}%
                  </h4>
                  <span className="badge rounded-pill text-bg-light border">
                    {tasaAhorro <= 0
                      ? "Sin ahorro"
                      : tasaAhorro < 10
                      ? "Mejorar"
                      : "Buen nivel"}
                  </span>
                </div>
              </div>
            </div>

            {/* Pagos / Ingreso */}
            <div className="col-12 col-md-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body">
                  <p className="text-muted mb-1">Pagos / Ingreso</p>
                  <h4 className="mb-1" style={{ color: "#EC8305" }}>
                    {ratioPagos.toFixed(1)}%
                  </h4>
                  <span className="badge rounded-pill text-bg-success">
                    {ratioPagos <= 50
                      ? "Saludable"
                      : ratioPagos <= 80
                      ? "En observación"
                      : "Crítico"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Estado financiero */}
          <div className="p-3 rounded-3" style={{ backgroundColor: "#F9FAFB" }}>
            <p className="mb-1 fw-semibold">Estado Financiero Real</p>
            {estadoEsCritico ? (
              <>
                <span className="badge rounded-pill text-bg-danger me-2">
                  Atención
                </span>
                <small className="text-muted">
                  Tus pagos superan tus ingresos — requiere acción inmediata.
                </small>
                <div className="mt-1 small text-muted">
                  Total ingresos del mes: {money(actual.ingresos)} · Total pagos
                  del mes: {money(actual.gastos)}
                </div>
              </>
            ) : (
              <>
                <span className="badge rounded-pill text-bg-success me-2">
                  Saludable
                </span>
                <small className="text-muted">
                  Tus ingresos cubren tus pagos. Mantén tu tasa de ahorro.
                </small>
                <div className="mt-1 small text-muted">
                  Total ingresos del mes: {money(actual.ingresos)} · Total pagos
                  del mes: {money(actual.gastos)}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* -------- COMPARACIÓN TEMPORAL -------- */}
      <div className="card border-2 border-secondary-subtle">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
              <h4 className="mb-0">Comparación Temporal</h4>
              <small className="text-muted">
                Análisis comparativo vs mes anterior
              </small>
            </div>
            <div className="btn-group">
              <button
                type="button"
                className="btn btn-sm text-light"
                style={{ backgroundColor: "#091057" }}
              >
                Mensual
              </button>
              <button type="button" className="btn btn-sm btn-outline-secondary">
                Trimestral
              </button>
              <button type="button" className="btn btn-sm btn-outline-secondary">
                Anual
              </button>
            </div>
          </div>

          <div className="row g-3">
            {/* Ingresos netos */}
            <div className="col-12 col-md-4">
              <div className="border rounded-3 p-3 h-100">
                <p className="fw-semibold mb-2">
                  $ Ingresos Netos{" "}
                  <span className="text-muted small">
                    ({((actual.ingresos || 0) - (anterior.ingresos || 0) >= 0
                      ? "↑"
                      : "↓") +
                      " " +
                      Math.abs(
                        actual.ingresos - anterior.ingresos
                      ).toLocaleString("es-HN")}
                    )
                  </span>
                </p>
                <div className="small text-muted">Actual:</div>
                <div className="fw-semibold">{money(actual.ingresos)}</div>
                <div className="small text-muted mt-2">Anterior:</div>
                <div>{money(anterior.ingresos)}</div>
                <div className="small text-muted mt-2">Diferencia:</div>
                <div>{money(actual.ingresos - anterior.ingresos)}</div>
              </div>
            </div>

            {/* Gastos totales */}
            <div className="col-12 col-md-4">
              <div className="border rounded-3 p-3 h-100">
                <p className="fw-semibold mb-2">📊 Gastos Totales</p>
                <div className="small text-muted">Actual:</div>
                <div className="fw-semibold">{money(actual.gastos)}</div>
                <div className="small text-muted mt-2">Anterior:</div>
                <div>{money(anterior.gastos)}</div>
                <div className="small text-muted mt-2">Diferencia:</div>
                <div>{money(actual.gastos - anterior.gastos)}</div>
              </div>
            </div>

            {/* Ahorro neto + presupuesto */}
            <div className="col-12 col-md-4">
              <div className="border rounded-3 p-3 h-100">
                <p className="fw-semibold mb-2">🎯 Ahorro Neto</p>
                <div className="small text-muted">Actual:</div>
                <div className="fw-semibold">{money(actual.ahorro)}</div>
                <div className="small text-muted mt-2">Anterior:</div>
                <div>{money(anterior.ahorro)}</div>
                <div className="small text-muted mt-2">Diferencia:</div>
                <div>{money(actual.ahorro - anterior.ahorro)}</div>

                <hr />
                <div className="small text-muted">Presupuesto total activo:</div>
                <div>{money(totalPresupuestado)}</div>
              </div>
            </div>
          </div>

          {/* Enlaces de acción */}
          
          <div className="mt-3 d-flex flex-wrap gap-2">
            <Link to="/historial" className="btn btn-outline-secondary btn-sm">
              Ver historial de transacciones
            </Link>
            <Link
              to="/presupuesto/nuevo"
              className="btn btn-outline-secondary btn-sm"
            >
              Crear nuevo presupuesto
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
