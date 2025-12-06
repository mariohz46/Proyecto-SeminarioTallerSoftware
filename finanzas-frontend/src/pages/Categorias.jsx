// src/pages/Categorias.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const LS_CATEGORIES = "ff_categories";

// const defaultCategories = [
//   { id: 1, nombre: "Alimentación", tipo: "Gasto" },
  
// ];

async function crearCategoriaAPI(categoria) {
  try {
    const res = await fetch("http://localhost:3000/categorias/crearCat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(categoria),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Error al crear categoría");
    }

    const data = await res.json();
    return data; 
  } catch (err) {
    console.error(err);
    throw err;
  }
}

// function loadCategories() {
//   try {
//     const raw = localStorage.getItem(LS_CATEGORIES);
//     if (!raw) {
//       // si no hay nada, guardamos las default
//       localStorage.setItem(LS_CATEGORIES, JSON.stringify(defaultCategories));
//       return defaultCategories;
//     }
//     const list = JSON.parse(raw);
//     if (!Array.isArray(list)) return defaultCategories;
//     return list;
//   } catch {
//     return defaultCategories;
//   }
// }

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

function saveCategories(list) {
  localStorage.setItem(LS_CATEGORIES, JSON.stringify(list));
}

export default function Categorias() {
  const [categorias, setCategorias] = useState([]);
  const [nombre, setNombre] = useState("");
  const [tipo, setTipo] = useState("egreso");
  const [descripcion, setDescripcion] = useState("");

  useEffect(() => {
    const loadCategorias = async () => {
    const list = await fetchCategoriasAPI();
    setCategorias(list);
    };
    loadCategorias();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nombre.trim()) {
      alert("El nombre de la categoría es obligatorio.");
      return;
    }
    const nuevaCategoria = {
    nombre: nombre.trim(),
    tipo,
    descripcion: descripcion.trim(), 
  };

  try {
    
    const categoriaCreada = await crearCategoriaAPI(nuevaCategoria);

    setCategorias(prev => [...prev, categoriaCreada]);

    setNombre("");
    setTipo("Egreso");
    setDescripcion("");
    } catch (error) {
      alert("No se pudo crear la categoría: " + error.message);
    }
  };
  //   // calcular siguiente id
  //   const maxId = categorias.reduce((max, c) => (c.id > max ? c.id : max), 0);
  //   const nuevaCategoria = {
  //     id: maxId + 1,
  //     nombre: nombre.trim(),
  //     tipo,
  //   };

  //   const updated = [...categorias, nuevaCategoria];
  //   setCategorias(updated);
  //   saveCategories(updated);

  //   // limpiar formulario
  //   setNombre("");
  //   setTipo("Gasto");
  // };

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
                  <option value="Egreso">Egreso</option>
                  <option value="Ingreso">Ingreso</option>
                </select>
              </div>

              <div className="col-12 col-md-6">
                <label className="form-label">Descripción *</label>
                <input
                  type="text"
                  className="form-control"
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                  placeholder="Ej. Para usarse en emergencias, imprevistos, etc."
                  required
                />
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
                    <th>Descripcion</th>
                  </tr>
                </thead>
                <tbody>
                  {categorias.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="text-center text-muted">
                        No hay categorías registradas.
                      </td>
                    </tr>
                  ) : (
                    categorias.map((c) => (
                      <tr key={c.idCategoria}>
                        <td>{c.idCategoria}</td>
                        <td>{c.nombre}</td>
                        <td>{c.tipo || "—"}</td>
                        <td>{c.descripcion}</td>
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
