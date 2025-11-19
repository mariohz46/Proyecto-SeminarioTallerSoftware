// src/pages/Categorias.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const LS_CATEGORIES = "ff_categories";

const defaultCategories = [
  { id: 1, nombre: "Alimentación", tipo: "Gasto" },
  { id: 2, nombre: "Transporte", tipo: "Gasto" },
  { id: 3, nombre: "Servicios", tipo: "Gasto" },
  { id: 4, nombre: "Entretenimiento", tipo: "Gasto" },
];

function loadCategories() {
  try {
    const raw = localStorage.getItem(LS_CATEGORIES);
    if (!raw) {
      // si no hay nada, guardamos las default
      localStorage.setItem(LS_CATEGORIES, JSON.stringify(defaultCategories));
      return defaultCategories;
    }
    const list = JSON.parse(raw);
    if (!Array.isArray(list)) return defaultCategories;
    return list;
  } catch {
    return defaultCategories;
  }
}

function saveCategories(list) {
  localStorage.setItem(LS_CATEGORIES, JSON.stringify(list));
}

export default function Categorias() {
  const [categorias, setCategorias] = useState([]);
  const [nombre, setNombre] = useState("");
  const [tipo, setTipo] = useState("Gasto");

  useEffect(() => {
    const list = loadCategories();
    setCategorias(list);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nombre.trim()) {
      alert("El nombre de la categoría es obligatorio.");
      return;
    }

    // calcular siguiente id
    const maxId = categorias.reduce((max, c) => (c.id > max ? c.id : max), 0);
    const nuevaCategoria = {
      id: maxId + 1,
      nombre: nombre.trim(),
      tipo,
    };

    const updated = [...categorias, nuevaCategoria];
    setCategorias(updated);
    saveCategories(updated);

    // limpiar formulario
    setNombre("");
    setTipo("Gasto");
  };

  return (
    <div className="container mt-4">
      {/* Encabezado con Back */}
      <div className="d-flex align-items-center gap-2 mb-3">
        <Link to="/" className="text-decoration-none small" style={{ color: "#EC8305" }}>
          ← Back
        </Link>
        <h4 className="m-0">Categorías</h4>
      </div>

      <div className="card border-2 border-secondary-subtle">
        <div className="card-body">
          {/* Formulario arriba */}
          <div className="mb-4">
            <h5 className="card-title mb-3">Nueva Categoría</h5>
            <form onSubmit={handleSubmit} className="row g-3">
              <div className="col-12 col-md-6">
                <label className="form-label">Nombre de la categoría *</label>
                <input
                  type="text"
                  className="form-control"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  placeholder="Ej. Ropa, Salud, Sueldo"
                  required
                />
              </div>

              <div className="col-12 col-md-4">
                <label className="form-label">Tipo *</label>
                <select
                  className="form-select"
                  value={tipo}
                  onChange={(e) => setTipo(e.target.value)}
                >
                  <option value="Gasto">Gasto</option>
                  <option value="Ingreso">Ingreso</option>
                </select>
              </div>

              <div className="col-12 col-md-2 d-flex align-items-end">
                <button
                  type="submit"
                  className="btn fw-semibold text-light w-100"
                  style={{ backgroundColor: "#EC8305" }}
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>

          <hr />

          {/* Tabla abajo */}
          <div>
            <h5 className="card-title mb-3">Categorías registradas</h5>

            <div className="table-responsive">
              <table className="table table-hover align-middle">
                <thead>
                  <tr>
                    <th style={{ width: "10%" }}>ID</th>
                    <th>Nombre</th>
                    <th style={{ width: "20%" }}>Tipo</th>
                  </tr>
                </thead>
                <tbody>
                  {categorias.length === 0 ? (
                    <tr>
                      <td colSpan="3" className="text-center text-muted">
                        No hay categorías registradas.
                      </td>
                    </tr>
                  ) : (
                    categorias.map((c) => (
                      <tr key={c.id}>
                        <td>{c.id}</td>
                        <td>{c.nombre}</td>
                        <td>{c.tipo || "—"}</td>
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
  );
}
