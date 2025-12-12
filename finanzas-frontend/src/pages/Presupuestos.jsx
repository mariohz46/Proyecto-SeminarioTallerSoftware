import React, { useEffect, useMemo, useState } from "react";

const LS_BUDGETS = "ff_budgets";
const LS_CATEGORIES = "ff_categories";

const defaultCategories = [
  { id: 1, nombre: "Alimentación" },
  { id: 2, nombre: "Transporte" },
  { id: 3, nombre: "Servicios" },
  { id: 4, nombre: "Entretenimiento" },
];

async function fetchPresupuestosAPI() {
  try {
    const res = await fetch(
      "http://localhost:3000/presupuestos/obtenerPresupuestos"
    ); // GET
    if (!res.ok) throw new Error("Error al obtener el presupuesto");
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
    return [];
  }
}

async function fetchCategoriasAPI() {
  try {
    const res = await fetch("http://localhost:3000/categorias/obtenerCategorias"); // GET
    if (!res.ok) throw new Error("Error al obtener categorías");
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
    return [];
  }
}

// ✅ NUEVO: actualizar presupuesto
async function actualizarPresupuestoAPI(id, payload) {
  const res = await fetch(
    `http://localhost:3000/presupuestos/actualizar/${id}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }
  );

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "Error al actualizar presupuesto");
  }

  return await res.json();
}

// ✅ NUEVO: deshabilitar presupuesto (borrado suave)
async function deshabilitarPresupuestoAPI(id) {
  const res = await fetch(
    `http://localhost:3000/presupuestos/deshabilitar/${id}`,
    { method: "PUT" }
  );

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "Error al deshabilitar presupuesto");
  }

  return await res.json();
}

function calcularEstado(budget, hoy = new Date()) {
  if (!budget.fechaInicio || !budget.fechaFin) return "-";

  const ini = new Date(budget.fechaInicio);
  const fin = new Date(budget.fechaFin);

  if (hoy < ini) return "Próximo";
  if (hoy > fin) return "Vencido";
  return "Vigente";
}

function formatearMoneda(v) {
  return Number(v || 0).toLocaleString("es-HN", {
    style: "currency",
    currency: "HNL",
  });
}

export default function Presupuestos() {
  const [presupuestos, setPresupuestos] = useState([]);
  const [categorias, setCategorias] = useState([]);

  // ✅ NUEVO: modo edición
  const [editingId, setEditingId] = useState(null);

  // Filtros
  const [fPeriodo, setFPeriodo] = useState("");
  const [fCategoriaId, setFCategoriaId] = useState("");
  const [fFechaIni, setFFechaIni] = useState("");
  const [fFechaFin, setFFechaFin] = useState("");

  useEffect(() => {
    const cargarDatos = async () => {
      const cats = await fetchCategoriasAPI();
      setCategorias(cats);

      const presup = await fetchPresupuestosAPI();
      setPresupuestos(presup);
    };

    cargarDatos();
  }, []);

  const presupuestosFiltrados = useMemo(() => {
    return presupuestos.filter((p) => {
      const okPeriodo = !fPeriodo || p.periodo === fPeriodo;
      const okCat =
        !fCategoriaId || String(p.categoriaId) === String(fCategoriaId);

      const d = p.fechaInicio ? new Date(p.fechaInicio) : null;
      const dFin = p.fechaFin ? new Date(p.fechaFin) : null;

      const fIni = fFechaIni ? new Date(fFechaIni + "T00:00:00") : null;
      const fFin = fFechaFin ? new Date(fFechaFin + "T23:59:59") : null;

      let okFecha = true;

      if (fIni && d && d < fIni) okFecha = false;
      if (fFin && dFin && dFin > fFin) okFecha = false;

      return okPeriodo && okCat && okFecha;
    });
  }, [presupuestos, fPeriodo, fCategoriaId, fFechaIni, fFechaFin]);

  const resumen = useMemo(() => {
    const hoy = new Date();
    let total = 0;
    let vigentes = 0;
    let vencidos = 0;

    presupuestosFiltrados.forEach((p) => {
      total += Number(p.monto || 0);
      const estado = calcularEstado(p, hoy);
      if (estado === "Vigente") vigentes++;
      if (estado === "Vencido") vencidos++;
    });

    return { total, vigentes, vencidos };
  }, [presupuestosFiltrados]);

  const limpiarFiltros = () => {
    setFPeriodo("");
    setFCategoriaId("");
    setFFechaIni("");
    setFFechaFin("");
  };

  const obtenerNombreCategoria = (idCategoria) => {
    const categoria = categorias.find(
      (c) => String(c.idCategoria) === String(idCategoria)
    );
    return categoria ? categoria.nombre : idCategoria;
  };

  // ✅ NUEVO: Editar (por ahora solo activa modo edición)
  // Si quieres editar en esta MISMA pantalla, necesitas un formulario aquí o redirigir a /presupuesto/nuevo?id=...
  const handleEditClick = (p) => {
    setEditingId(p.idPresupuesto);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ✅ NUEVO: Deshabilitar (borrado suave)
  const handleDeshabilitarClick = async (id) => {
    if (!window.confirm("¿Deseas deshabilitar este presupuesto?")) return;

    try {
      await deshabilitarPresupuestoAPI(id);

      // marcar como inactivo en memoria
      setPresupuestos((prev) =>
        prev.map((x) =>
          x.idPresupuesto === id ? { ...x, estado: "Inactivo" } : x
        )
      );
    } catch (error) {
      alert("No se pudo deshabilitar el presupuesto: " + error.message);
    }
  };

  return (
    <div className="container my-4">
      {/* Encabezado */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="d-flex align-items-center gap-2">
          <a
            href="/"
            className="text-decoration-none small"
            style={{ color: "#EC8305" }}
          >
            ← Back
          </a>
          <h4 className="m-0">Gestión de Presupuestos</h4>
        </div>

        <a
          href="/presupuesto/nuevo"
          className="btn text-light fw-semibold"
          style={{ backgroundColor: "#EC8305" }}
        >
          + Nuevo Presupuesto
        </a>
      </div>

      {/* (Opcional) aviso modo edición */}
      {editingId && (
        <div className="alert alert-warning py-2">
          Modo edición activo para ID: <strong>{editingId}</strong>
          <button
            type="button"
            className="btn btn-sm btn-outline-secondary ms-2"
            onClick={() => setEditingId(null)}
          >
            Cancelar
          </button>
        </div>
      )}

      {/* Tarjetas resumen */}
      <div className="row mb-3">
        <div className="col-md-4 mb-2">
          <div className="card text-bg-light">
            <div className="card-body">
              <h6 className="card-title">Total presupuestado (filtrado)</h6>
              <p className="card-text fw-bold mb-0">
                {formatearMoneda(resumen.total)}
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-2">
          <div className="card text-bg-light">
            <div className="card-body">
              <h6 className="card-title">Presupuestos vigentes</h6>
              <p className="card-text fw-bold mb-0">{resumen.vigentes}</p>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-2">
          <div className="card text-bg-light">
            <div className="card-body">
              <h6 className="card-title">Presupuestos vencidos</h6>
              <p className="card-text fw-bold mb-0">{resumen.vencidos}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filtros */}
      <div className="card mb-3">
        <div className="card-body">
          <h6 className="card-title mb-3">Filtros</h6>
          <div className="row g-2 align-items-end">
            <div className="col-12 col-md-3">
              <label className="form-label small">Período</label>
              <select
                className="form-select"
                value={fPeriodo}
                onChange={(e) => setFPeriodo(e.target.value)}
              >
                <option value="">Todos</option>
                <option value="Semanal">Semanal</option>
                <option value="Mensual">Mensual</option>
                <option value="anual">Anual</option>
              </select>
            </div>

            <div className="col-12 col-md-3">
              <label className="form-label small">Categoría</label>
              <select
                className="form-select"
                value={fCategoriaId}
                onChange={(e) => setFCategoriaId(e.target.value)}
              >
                <option value="">Todas</option>
                {categorias.map((c) => (
                  <option key={c.idCategoria} value={c.idCategoria}>
                    {c.nombre}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-12 col-md-3">
              <label className="form-label small">Desde (inicio)</label>
              <input
                type="date"
                className="form-control"
                value={fFechaIni}
                onChange={(e) => setFFechaIni(e.target.value)}
              />
            </div>

            <div className="col-12 col-md-3">
              <label className="form-label small">Hasta (fin)</label>
              <input
                type="date"
                className="form-control"
                value={fFechaFin}
                onChange={(e) => setFFechaFin(e.target.value)}
              />
            </div>

            <div className="col-12 col-md-3 mt-2">
              <button
                type="button"
                className="btn btn-outline-secondary btn-sm w-100"
                onClick={limpiarFiltros}
              >
                Limpiar filtros
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabla de presupuestos */}
      <div className="card">
        <div className="card-body">
          <h6 className="card-title mb-3">Listado de Presupuestos</h6>

          <div className="table-responsive">
            <table className="table table-sm table-striped align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th>#</th>
                  <th>Período</th>
                  <th>Categoría</th>
                  <th>Fecha inicio</th>
                  <th>Fecha fin</th>
                  <th className="text-end">Monto</th>
                  <th>Estado</th>
                  <th className="text-center" style={{ width: "20%" }}>
                    Acciones
                  </th>
                </tr>
              </thead>

              <tbody>
                {presupuestosFiltrados.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="text-center py-4 text-muted">
                      No hay presupuestos que coincidan con los filtros.
                    </td>
                  </tr>
                ) : (
                  presupuestosFiltrados.map((p, i) => (
                    <tr key={p.idPresupuesto ?? i}>
                      <td>{i + 1}</td>
                      <td>{p.periodo}</td>
                      <td>{obtenerNombreCategoria(p.categoriaId)}</td>
                      <td>{p.fechaInicio}</td>
                      <td>{p.fechaFin}</td>
                      <td className="text-end fw-semibold">
                        {formatearMoneda(p.monto)}
                      </td>
                      <td>{calcularEstado(p)}</td>

                      {/* ✅ BOTONES NUEVOS */}
                      <td className="text-center">
                        <button
                          type="button"
                          className="btn btn-sm btn-warning me-1"
                          onClick={() => handleEditClick(p)}
                        >
                          ✏️ Editar
                        </button>
                        <button
                          type="button"
                          className="btn btn-sm btn-danger"
                          onClick={() =>
                            handleDeshabilitarClick(p.idPresupuesto)
                          }
                        >
                          🚫 Deshabilitar
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </div>
  );
}
