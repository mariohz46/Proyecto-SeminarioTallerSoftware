// src/pages/TransactionHistory.jsx
import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

const LS_KEY = "ff_transactions"; // misma clave para todo el proyecto

const money = (n) => Number(n || 0).toLocaleString("es-MX", { style: "currency", currency: "MXN" });
const readAll = () => {
  try { return JSON.parse(localStorage.getItem(LS_KEY) || "[]"); }
  catch { return []; }
};

export default function TransactionHistory() {
  const [all, setAll] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => setAll(readAll()), []);

  const categories = useMemo(() => {
    const s = new Set(all.map(t => t.category).filter(Boolean));
    return Array.from(s);
  }, [all]);

  const filtered = useMemo(() => {
    return all.filter(t => {
      const d = t.date ? new Date(t.date) : null;
      const d1 = startDate ? new Date(startDate + "T00:00:00") : null;
      const d2 = endDate ? new Date(endDate + "T23:59:59") : null;
      const okCat = !category || t.category === category;
      const ok1 = !d1 || (d && d >= d1);
      const ok2 = !d2 || (d && d <= d2);
      return okCat && ok1 && ok2;
    });
  }, [all, startDate, endDate, category]);

  const clear = () => { setStartDate(""); setEndDate(""); setCategory(""); };

  return (
    <>
    <div class="container">
      {/* Encabezado con Back */}
      <div className="d-flex align-items-center gap-2 mb-3">
        <Link to="/" className="text-decoration-none small " style={{ color: "#EC8305" }}>← Back</Link>
        <h4 className="m-0">Historial de Transacciones</h4>
      </div>

      {/* Card grande (marco exterior) */}
      <div className="card border-2 border-secondary-subtle">
        <div className="card-body">

          {/* Título + botón agregar */}
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="card-title m-0">Historial de Ingresos</h5>
            <Link to="/transacciones/nueva" className="btn fw-semibold text-light" style={{ backgroundColor: "#EC8305" }}>
              + Agregar Ingreso
            </Link>
          </div>

          {/* Filtros */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Filtros</label>
            <div className="row g-2 align-items-end">
              <div className="col-12 col-md-3">
                <label className="form-label small">Desde</label>
                <input type="date" className="form-control" value={startDate} onChange={e=>setStartDate(e.target.value)} />
              </div>
              <div className="col-12 col-md-3">
                <label className="form-label small">Hasta</label>
                <input type="date" className="form-control" value={endDate} onChange={e=>setEndDate(e.target.value)} />
              </div>
              <div className="col-12 col-md-3">
                <label className="form-label small">Categoría</label>
                <select className="form-select" value={category} onChange={e=>setCategory(e.target.value)}>
                  <option value="">Todas</option>
                  {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div className="col-12 col-md-3">
                <button className="btn btn-outline-secondary w-100" onClick={clear}>Limpiar filtros</button>
              </div>
            </div>
          </div>

          {/* Marco interno (rectángulo) con la tabla */}
          <div className="p-2 border border-2 rounded">
            <div className="table-responsive">
              <table className="table table-sm align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    <th>#</th>
                    <th>Fecha</th>
                    <th>Categoría</th>
                    <th>Descripción</th>
                    <th className="text-end">Monto</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="text-center py-4 text-muted">Sin resultados</td>
                    </tr>
                  ) : (
                    filtered.map((t, i) => (
                      <tr key={t.id ?? i}>
                        <td>{i + 1}</td>
                        <td>{t.date}</td>
                        <td>{t.category || "-"}</td>
                        <td>{t.description || "-"}</td>
                        <td className="text-end fw-semibold">{money(t.amount)}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
      </div>
    </>
  );
}
