// src/pages/Bancos.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const LS_BANKS = "ff_bancos";

function loadBanks() {
  try {
    const raw = localStorage.getItem(LS_BANKS);
    if (!raw) return [];
    const list = JSON.parse(raw);
    if (!Array.isArray(list)) return [];
    return list;
  } catch {
    return [];
  }
}

function saveBanks(list) {
  localStorage.setItem(LS_BANKS, JSON.stringify(list));
}

export default function Bancos() {
  const [bancos, setBancos] = useState([]);
  const [nombre, setNombre] = useState("");

  useEffect(() => {
    setBancos(loadBanks());
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nombre.trim()) {
      alert("El nombre del banco es obligatorio.");
      return;
    }

    const maxId = bancos.reduce((max, b) => (b.idBanco > max ? b.idBanco : max), 0);
    const nuevoBanco = {
      idBanco: maxId + 1,
      nombre: nombre.trim(),
    };

    const updated = [...bancos, nuevoBanco];
    setBancos(updated);
    saveBanks(updated);

    setNombre("");
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
        <h4 className="m-0">Bancos</h4>
      </div>

      <div className="card border-2 border-secondary-subtle">
        <div className="card-body">
          {/* Formulario arriba */}
          <div className="mb-4">
            <h5 className="card-title mb-3">Nuevo Banco</h5>
            <form onSubmit={handleSubmit} className="row g-3">
              <div className="col-12 col-md-8">
                <label className="form-label">Nombre del banco *</label>
                <input
                  type="text"
                  className="form-control"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  placeholder="Ej. Banco Atlántida, BAC, FICOHSA"
                  required
                />
              </div>

              <div className="col-12 col-md-4 d-flex align-items-end">
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
            <h5 className="card-title mb-3">Bancos registrados</h5>

            <div className="table-responsive">
              <table className="table table-hover align-middle">
                <thead>
                  <tr>
                    <th style={{ width: "10%" }}>ID</th>
                    <th>Nombre</th>
                  </tr>
                </thead>
                <tbody>
                  {bancos.length === 0 ? (
                    <tr>
                      <td colSpan="2" className="text-center text-muted">
                        No hay bancos registrados.
                      </td>
                    </tr>
                  ) : (
                    bancos.map((b) => (
                      <tr key={b.idBanco}>
                        <td>{b.idBanco}</td>
                        <td>{b.nombre}</td>
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
