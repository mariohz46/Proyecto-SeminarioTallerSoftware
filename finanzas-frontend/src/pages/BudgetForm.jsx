import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const LS_BUDGETS = "ff_budgets";
const LS_CATEGORIES = "ff_categories"; // si luego las traes del backend, reemplaza el useEffect

const defaultCategories = [
  { id: 1, nombre: "Alimentación" },
  { id: 2, nombre: "Transporte" },
  { id: 3, nombre: "Servicios" },
  { id: 4, nombre: "Entretenimiento" },
];

function loadCategories() {
  try {
    const raw = localStorage.getItem(LS_CATEGORIES);
    const list = raw ? JSON.parse(raw) : defaultCategories;
    if (!raw) localStorage.setItem(LS_CATEGORIES, JSON.stringify(list));
    return list;
  } catch {
    return defaultCategories;
  }
}

function saveBudget(budget) {
  // ⬇️ Cambia este bloque por tu fetch POST a /api/presupuestos cuando tengas backend
  const list = JSON.parse(localStorage.getItem(LS_BUDGETS) || "[]");
  list.push(budget);
  localStorage.setItem(LS_BUDGETS, JSON.stringify(list));
}

export default function BudgetForm() {
  const navigate = useNavigate();

  // Campos del modelo
  const [usuarioId, setUsuarioId] = useState(1); // ajusta según tu auth
  const [categoriaId, setCategoriaId] = useState("");
  const [monto, setMonto] = useState("");
  const [periodo, setPeriodo] = useState("Mensual"); // CHAR(10)
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    setCategorias(loadCategories());
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validaciones simples
    if (!usuarioId || !categoriaId || !monto || !periodo || !fechaInicio || !fechaFin) {
      alert("Completa todos los campos obligatorios.");
      return;
    }
    if (Number(monto) <= 0) {
      alert("El monto debe ser mayor a 0.");
      return;
    }
    const ini = new Date(fechaInicio);
    const fin = new Date(fechaFin);
    if (fin < ini) {
      alert("La fecha fin no puede ser menor que la fecha inicio.");
      return;
    }

    const newBudget = {
      idPresupuesto: crypto.randomUUID(),   // local; en backend será autoincrement
      usuarioId: Number(usuarioId),
      categoriaId: Number(categoriaId),
      monto: Number(monto),                 // DECIMAL(10,2)
      periodo,                              // CHAR(10)
      fechaInicio,                          // DATE (YYYY-MM-DD)
      fechaFin,                             // DATE
      descripcion: descripcion || null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    saveBudget(newBudget);
    // Redirige al inicio (o crea /presupuestos/historial y cámbialo)
    navigate("/");
  };

  return (
    <div className="container my-4">
      <div className="d-flex align-items-center gap-2 mb-3">
        <Link to="/" className="text-decoration-none small text-warning">← Back</Link>
        <h4 className="m-0">Nuevo Presupuesto</h4>
      </div>

      <div className="card border-2 border-secondary-subtle">
        <div className="card-body">
          <form onSubmit={handleSubmit} className="row g-3">

            <div className="col-12 col-md-3">
              <label className="form-label">Usuario ID *</label>
              <input
                type="number" min="1" className="form-control"
                value={usuarioId} onChange={(e)=>setUsuarioId(e.target.value)}
              />
            </div>

            <div className="col-12 col-md-4">
              <label className="form-label">Categoría *</label>
              <select
                className="form-select"
                value={categoriaId}
                onChange={(e)=>setCategoriaId(e.target.value)}
              >
                <option value="">Selecciona…</option>
                {categorias.map(c => (
                  <option key={c.id} value={c.id}>{c.nombre}</option>
                ))}
              </select>
            </div>

            <div className="col-12 col-md-3">
              <label className="form-label">Monto *</label>
              <input
                type="number" step="0.01" min="0" className="form-control"
                placeholder="0.00" value={monto}
                onChange={(e)=>setMonto(e.target.value)}
              />
            </div>

            <div className="col-12 col-md-2">
              <label className="form-label">Período *</label>
              <select
                className="form-select" value={periodo}
                onChange={(e)=>setPeriodo(e.target.value)}
              >
                <option>Semanal</option>
                <option>Quincenal</option>
                <option>Mensual</option>
                <option>Trimestral</option>
                <option>Anual</option>
              </select>
            </div>

            <div className="col-12 col-md-3">
              <label className="form-label">Fecha inicio *</label>
              <input
                type="date" className="form-control"
                value={fechaInicio} onChange={(e)=>setFechaInicio(e.target.value)}
              />
            </div>

            <div className="col-12 col-md-3">
              <label className="form-label">Fecha fin *</label>
              <input
                type="date" className="form-control"
                value={fechaFin} onChange={(e)=>setFechaFin(e.target.value)}
              />
            </div>

            <div className="col-12">
              <label className="form-label">Descripción</label>
              <textarea
                className="form-control" rows="3"
                value={descripcion} onChange={(e)=>setDescripcion(e.target.value)}
                placeholder="Opcional"
              />
            </div>

            <div className="col-12 d-flex justify-content-between">
              <Link to="/" className="btn btn-outline-secondary">Cancelar</Link>
              <button type="submit" className="btn btn-primary" style={{ backgroundColor: "#EC8305" }}>Guardar presupuesto</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
