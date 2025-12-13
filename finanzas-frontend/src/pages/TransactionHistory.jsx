// src/pages/TransactionHistory.jsx
import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

const LS_KEY = "ff_transactions"; // misma clave para todo el proyecto

const money = (n) =>
  Number(n || 0).toLocaleString("es-MX", {
    style: "currency",
    currency: "MXN",
  });

const readAll = () => {
  try {
    return JSON.parse(localStorage.getItem(LS_KEY) || "[]");
  } catch {
    return [];
  }
};


async function deshabilitarTransaccionAPI(id) {
  const res = await fetch(
    `http://localhost:3000/transacciones/deshabilitar/${id}`,
    {
      method: "PUT",
    }
  );

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "Error al deshabilitar transacción");
  }

  return await res.json();
}

export default function TransactionHistory() {
  const [all, setAll] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [category, setCategory] = useState("");

  // ✅ NUEVO: edición (igual que categorías)
  const [editingId, setEditingId] = useState(null);

  /* UseEffect es para jalar la informacion de la base de datos */
  useEffect(() => {
    const cargar = async () => {
      try {
        const token = localStorage.getItem("token"); 
        if (!token) {
          console.error("Token no encontrado");
          return;
        }
        const res = await fetch("http://localhost:3000/transacciones", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const data = await res.json();
        setAll(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error al cargar las transacciones", error);
        // fallback por si quieres usar localStorage
        setAll(readAll());
      }
    };
    cargar();
  }, []);

  // ✅ Categorías desde t.Categoria.nombre
  const categories = useMemo(() => {
    const s = new Set(
      all
        .map((t) => t?.Categoria?.nombre)
        .filter(Boolean)
        .map((x) => String(x))
    );
    return Array.from(s);
  }, [all]);

  // ✅ Filtro usando t.fecha y Categoria.nombre
  const filtered = useMemo(() => {
    return all.filter((t) => {
      const d = t?.fecha ? new Date(t.fecha) : null;
      const d1 = startDate ? new Date(startDate + "T00:00:00") : null;
      const d2 = endDate ? new Date(endDate + "T23:59:59") : null;

      const catName = t?.Categoria?.nombre || "";
      const okCat = !category || catName === category;
      const ok1 = !d1 || (d && d >= d1);
      const ok2 = !d2 || (d && d <= d2);

      // opcional: si el backend manda estado, puedes ocultar inactivas aquí
      // const okEstado = t.estado !== "Inactiva";
      // return okCat && ok1 && ok2 && okEstado;

      return okCat && ok1 && ok2;
    });
  }, [all, startDate, endDate, category]);

  const clear = () => {
    setStartDate("");
    setEndDate("");
    setCategory("");
  };

  // ✅ NUEVO: activar modo edición (aquí solo lo marco; si quieres editar en esta misma pantalla,
  // debes tener formulario y llenarlo como en Categorías)
  const handleEditClick = (t) => {
    setEditingId(t.idTransaccion);
    // si luego agregas formulario aquí, llenarías estados con t.fecha, t.descripcion, etc.
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ✅ NUEVO: deshabilitar (borrado suave)
  const handleDeshabilitarClick = async (id) => {
    if (!window.confirm("¿Deseas deshabilitar esta transacción?")) return;

    try {
      await deshabilitarTransaccionAPI(id);

      /* marcar como inactiva en memoria
      setAll((prev) =>
        prev.map((x) =>
          x.idTransaccion === id ? { ...x, estado: "Inactiva" } : x
        )
      );*/

      setAll(prev => prev.filter(x => x.idTransaccion !== id));
    } catch (error) {
      alert("No se pudo deshabilitar la transacción: " + error.message);
    }
  };

  // ✅ (opcional) ejemplo rápido de “actualizar” si luego haces un form:
  // const handleUpdate = async (payload) => {
  //   try {
  //     const updated = await actualizarTransaccionAPI(editingId, payload);
  //     setAll(prev => prev.map(x => x.idTransaccion === editingId ? updated : x));
  //     setEditingId(null);
  //   } catch (e) {
  //     alert("No se pudo actualizar: " + e.message);
  //   }
  // };

  return (
    <>
      <div className="container">
        {/* Encabezado con Back */}
        <div className="d-flex align-items-center gap-2 mb-3">
          <Link
            to="/"
            className="text-decoration-none small "
            style={{ color: "#EC8305" }}
          >
            ← Back
          </Link>
          <h4 className="m-0">Historial de Transacciones</h4>
        </div>

        {/* Card grande (marco exterior) */}
        <div className="card border-2 border-secondary-subtle">
          <div className="card-body">
            {/* Título + botón agregar */}
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="card-title m-0">Historial de Ingresos</h5>
              <Link
                to="/transacciones/nueva"
                className="btn fw-semibold text-light"
                style={{ backgroundColor: "#EC8305" }}
              >
                + Agregar Ingreso
              </Link>
            </div>

            {/* (Opcional) Mostrar que está en modo edición */}
            {editingId && (
              <div className="alert alert-warning py-2">
                Modo edición activo para ID: <strong>{editingId}</strong>{" "}
                <button
                  className="btn btn-sm btn-outline-secondary ms-2"
                  type="button"
                  onClick={() => setEditingId(null)}
                >
                  Cancelar
                </button>
              </div>
            )}

            {/* Filtros */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Filtros</label>
              <div className="row g-2 align-items-end">
                <div className="col-12 col-md-3">
                  <label className="form-label small">Desde</label>
                  <input
                    type="date"
                    className="form-control"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>
                <div className="col-12 col-md-3">
                  <label className="form-label small">Hasta</label>
                  <input
                    type="date"
                    className="form-control"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>
                <div className="col-12 col-md-3">
                  <label className="form-label small">Categoría</label>
                  <select
                    className="form-select"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="">Todas</option>
                    {categories.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-12 col-md-3">
                  <button
                    className="btn btn-outline-secondary w-100"
                    onClick={clear}
                    type="button"
                  >
                    Limpiar filtros
                  </button>
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
                      <th className="text-center" style={{ width: "18%" }}>
                        Acciones
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {filtered.length === 0 ? (
                      <tr>
                        <td colSpan="6" className="text-center py-4 text-muted">
                          Sin resultados
                        </td>
                      </tr>
                    ) : (
                      filtered.map((t, i) => (
                        <tr key={t.idTransaccion ?? i}>
                          <td>{i + 1}</td>

                          <td>
                            {t.fecha ? new Date(t.fecha).toLocaleDateString() : "-"}
                          </td>

                          <td>{t?.Categoria?.nombre || "-"}</td>

                          <td>{t.descripcion || "-"}</td>

                          <td className="text-end fw-semibold">{money(t.monto)}</td>

                          <td className="text-center">

                            <button
                              className="btn btn-sm btn-danger"
                              type="button"
                              onClick={() =>
                                handleDeshabilitarClick(t.idTransaccion)
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
      </div>
    </>
  );
}
