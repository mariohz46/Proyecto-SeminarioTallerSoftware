// src/pages/Categorias.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const LS_CATEGORIES = "ff_categories";

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

// 🔹 NUEVO: actualizar categoría en API (ajusta el endpoint si tu backend usa otro nombre)
async function actualizarCategoriaAPI(id, categoria) {
  const res = await fetch(`http://localhost:3000/categorias/actualizar/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(categoria),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "Error al actualizar categoría");
  }

  return await res.json();
}

// 🔹 NUEVO: deshabilitar categoría (borrado suave)
async function deshabilitarCategoriaAPI(id) {
  const res = await fetch(`http://localhost:3000/categorias/eliminarCategoria/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "Error al deshabilitar categoría");
  }

  return await res.json();
}

export default function Categorias() {
  const [categorias, setCategorias] = useState([]);
  const [nombre, setNombre] = useState("");
  const [tipo, setTipo] = useState("egreso");
  const [descripcion, setDescripcion] = useState("");

  // 🔹 NUEVO: para saber si estamos editando
  const [editingId, setEditingId] = useState(null);

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

    const datosCategoria = {
      nombre: nombre.trim(),
      tipo,
      descripcion: descripcion.trim(),
    };

    try {
      if (editingId === null) {
        // 🔸 Crear (misma lógica que ya tenías)
        const categoriaCreada = await crearCategoriaAPI(datosCategoria);
        setCategorias((prev) => [...prev, categoriaCreada]);
      } else {
        // 🔹 Actualizar
        const categoriaActualizada = await actualizarCategoriaAPI(
          editingId,
          datosCategoria
        );

        setCategorias((prev) =>
          prev.map((c) =>
            c.idCategoria === editingId ? categoriaActualizada : c
          )
        );
      }

      // Limpiar formulario y salir de modo edición
      setNombre("");
      setTipo("Egreso");
      setDescripcion("");
      setEditingId(null);
    } catch (error) {
      alert(
        (editingId
          ? "No se pudo actualizar la categoría: "
          : "No se pudo crear la categoría: ") + error.message
      );
    }
  };

  // 🔹 NUEVO: cargar datos en el formulario para editar
  const handleEditClick = (categoria) => {
    setEditingId(categoria.idCategoria);
    setNombre(categoria.nombre || "");
    setTipo(categoria.tipo || "Egreso");
    setDescripcion(categoria.descripcion || "");
    // Opcional: subir al inicio del formulario
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // 🔹 NUEVO: deshabilitar (borrado suave)
  const handleDeshabilitarClick = async (id) => {
    if (!window.confirm("¿Deseas deshabilitar esta categoría?")) return;

    try {
      await deshabilitarCategoriaAPI(id);

      // Actualizar la lista en memoria (la marcamos como Inactiva)
      setCategorias((prev) =>
        prev.map((c) =>
          c.idCategoria === id ? { ...c, estado: "Inactiva" } : c
        )
      );
    } catch (error) {
      alert("No se pudo deshabilitar la categoría: " + error.message);
    }
  };

  return (
    <div className="container mt-4">
      {/* Encabezado con Back */}
      <div className="d-flex align-items-center gap-2 mb-3">
        <Link
          to="/"
          className="text-decoration-none small"
          style={{ color: "#EC8305" }}
        >
          ← Back
        </Link>
        <h4 className="m-0">Categorías</h4>
      </div>

      <div className="card border-2 border-secondary-subtle">
        <div className="card-body">
          {/* Formulario arriba */}
          <div className="mb-4">
            <h5 className="card-title mb-3">
              {editingId ? "Editar Categoría" : "Nueva Categoría"}
            </h5>
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
                  {editingId ? "Actualizar" : "Guardar"}
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
                    <th className="text-center" style={{ width: "20%" }}>
                      Acciones {/* 👈 NUEVO */}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {categorias.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="text-center text-muted">
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
                        {/* 👇 Botones NUEVOS */}
                        <td className="text-center">
                          <button
                            className="btn btn-sm btn-danger"
                            type="button"
                            onClick={() =>
                              handleDeshabilitarClick(c.idCategoria)
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
  );
}

