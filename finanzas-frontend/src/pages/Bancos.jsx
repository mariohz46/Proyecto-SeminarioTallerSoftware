// src/pages/Bancos.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// 🔹 API helpers
async function crearBancoAPI(payload) {
  const res = await fetch("http://localhost:3000/bancos/crear", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error("Error al crear banco");
  return await res.json();
}

async function actualizarBancoAPI(id, payload) {
  const res = await fetch(
    `http://localhost:3000/bancos/actualizar/${id}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }
  );

  if (!res.ok) throw new Error("Error al actualizar banco");
  return await res.json();
}

async function deshabilitarBancoAPI(id) {
  const res = await fetch(
    `http://localhost:3000/bancos/deshabilitar/${id}`,
    {
      method: "DELETE",
    }
  );

  if (!res.ok) throw new Error("Error al deshabilitar banco");
  return await res.json();
}

export default function Bancos() {
  const [bancos, setBancos] = useState([]);
  const [nombre, setNombre] = useState("");

  // 🔹 NUEVO: modo edición
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const cargar = async () => {
      try {
        const res = await fetch("http://localhost:3000/bancos");
        const data = await res.json();
        setBancos(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error al cargar los bancos", error);
      }
    };
    cargar();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nombre.trim()) {
      alert("El nombre del banco es obligatorio");
      return;
    }

    try {
      if (editingId === null) {
        // 🔹 Crear
        const nuevoBanco = await crearBancoAPI({
          nombre: nombre.trim(),
        });
        setBancos((prev) => [...prev, nuevoBanco]);
        alert("Banco registrado exitosamente");
      } else {
        // 🔹 Actualizar
        const bancoActualizado = await actualizarBancoAPI(editingId, {
          nombre: nombre.trim(),
        });

        setBancos((prev) =>
          prev.map((b) =>
            b.idBanco === editingId ? bancoActualizado : b
          )
        );
        alert("Banco actualizado correctamente");
      }

      // limpiar form
      setNombre("");
      setEditingId(null);
    } catch (error) {
      alert(error.message);
    }
  };

  // 🔹 Editar
  const handleEditClick = (banco) => {
    setEditingId(banco.idBanco);
    setNombre(banco.nombre || "");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // 🔹 Deshabilitar
  const handleDeshabilitarClick = async (id) => {
    if (!window.confirm("¿Deseas deshabilitar este banco?")) return;

    try {
      await deshabilitarBancoAPI(id);

      setBancos((prev) =>
        prev.map((b) =>
          b.idBanco === id ? { ...b, estado: "Inactivo" } : b
        )
      );
    } catch (error) {
      alert("No se pudo deshabilitar el banco");
    }
  };

  return (
    <div className="container mt-4">
      {/* Encabezado */}
      <div className="d-flex align-items-center gap-2 mb-3">
        <Link
          to="/"
          className="text-decoration-none small"
          style={{ color: "#EC8305" }}
        >
          ← Back
        </Link>
        <h4 className="m-0">Bancos</h4>
      </div>

      <div className="card border-2 border-secondary-subtle">
        <div className="card-body">
          {/* Formulario */}
          <div className="mb-4">
            <h5 className="card-title mb-3">
              {editingId ? "Editar Banco" : "Nuevo Banco"}
            </h5>

            <form onSubmit={handleSubmit} className="row g-3">
              <div className="col-12 col-md-8">
                <label className="form-label">Nombre del banco *</label>
                <input
                  type="text"
                  className="form-control"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  placeholder="Ej. BAC, FICOHSA, Atlántida"
                  required
                />
              </div>

              <div className="col-12 col-md-4 d-flex align-items-end">
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

          {/* Tabla */}
          <div>
            <h5 className="card-title mb-3">Bancos registrados</h5>

            <div className="table-responsive">
              <table className="table table-hover align-middle">
                <thead>
                  <tr>
                    <th style={{ width: "10%" }}>ID</th>
                    <th>Nombre</th>
                    <th className="text-center" style={{ width: "20%" }}>
                      Acciones
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {bancos.length === 0 ? (
                    <tr>
                      <td colSpan="3" className="text-center text-muted">
                        No hay bancos registrados.
                      </td>
                    </tr>
                  ) : (
                    bancos.map((b) => (
                      <tr key={b.idBanco}>
                        <td>{b.idBanco}</td>
                        <td>{b.nombre}</td>
                        <td className="text-center">
                          <button
                            className="btn btn-sm btn-danger"
                            type="button"
                            onClick={() =>
                              handleDeshabilitarClick(b.idBanco)
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
