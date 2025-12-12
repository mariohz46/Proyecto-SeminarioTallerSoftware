import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

async function fetchCategoriasAPI() {
  const res = await fetch("http://localhost:3000/categorias/obtenerCategorias");
  if (!res.ok) throw new Error("Error al obtener categorías");
  return await res.json();
}

async function crearPresupuestoAPI(presupuesto) {
  const token = localStorage.getItem("token");

  const res = await fetch("http://localhost:3000/presupuestos/crearPres", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(presupuesto),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Error al crear el presupuesto");
  }

  return await res.json();
}

export default function BudgetForm() {
  const navigate = useNavigate();

  const [categoriaId, setCategoriaId] = useState("");
  const [monto, setMonto] = useState("");
  const [periodo, setPeriodo] = useState("Mensual");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    const cargarCategorias = async () => {
      try {
        const data = await fetchCategoriasAPI();
        setCategorias(data);
      } catch {
        alert("No se pudieron cargar las categorías");
      }
    };
    cargarCategorias();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!categoriaId || !monto || !periodo || !fechaInicio || !fechaFin) {
      alert("Completa todos los campos obligatorios.");
      return;
    }

    if (Number(monto) <= 0) {
      alert("El monto debe ser mayor a 0.");
      return;
    }

    if (new Date(fechaFin) < new Date(fechaInicio)) {
      alert("La fecha fin no puede ser menor que la fecha inicio.");
      return;
    }

    const nuevoPresupuesto = {
      categoriaId: Number(categoriaId),
      monto: Number(monto),
      periodo,
      fechaInicio,
      fechaFin,
      descripcion: descripcion || null,
    };

    try {
      await crearPresupuestoAPI(nuevoPresupuesto);

      setCategoriaId("");
      setMonto("");
      setPeriodo("Mensual");
      setFechaInicio("");
      setFechaFin("");
      setDescripcion("");

      navigate("/presupuestos");
    } catch (error) {
      alert("No se pudo crear el presupuesto: " + error.message);
    }
  };

  return (
    <div className="container my-4">
      <div className="d-flex align-items-center gap-2 mb-3">
        <Link to="/" className="text-decoration-none small text-warning">
          ← Back
        </Link>
        <h4 className="m-0">Nuevo Presupuesto</h4>
      </div>

      <div className="card border-2 border-secondary-subtle">
        <div className="card-body">
          <form onSubmit={handleSubmit} className="row g-3">
            <div className="col-12 col-md-4">
              <label className="form-label">Categoría *</label>
              <select
                className="form-select"
                value={categoriaId}
                onChange={(e) => setCategoriaId(e.target.value)}
              >
                <option value="">Selecciona…</option>
                {categorias.map((c) => (
                  <option key={c.idCategoria} value={c.idCategoria}>
                    {c.nombre}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-12 col-md-3">
              <label className="form-label">Monto *</label>
              <input
                type="number"
                step="0.01"
                min="0"
                className="form-control"
                placeholder="0.00"
                value={monto}
                onChange={(e) => setMonto(e.target.value)}
              />
            </div>

            <div className="col-12 col-md-2">
              <label className="form-label">Período *</label>
              <select
                className="form-select"
                value={periodo}
                onChange={(e) => setPeriodo(e.target.value)}
              >
                <option>Semanal</option>
                <option>Mensual</option>
                <option>Anual</option>
              </select>
            </div>

            <div className="col-12 col-md-3">
              <label className="form-label">Fecha inicio *</label>
              <input
                type="date"
                className="form-control"
                value={fechaInicio}
                onChange={(e) => setFechaInicio(e.target.value)}
              />
            </div>

            <div className="col-12 col-md-3">
              <label className="form-label">Fecha fin *</label>
              <input
                type="date"
                className="form-control"
                value={fechaFin}
                onChange={(e) => setFechaFin(e.target.value)}
              />
            </div>

            <div className="col-12">
              <label className="form-label">Descripción</label>
              <textarea
                className="form-control"
                rows="3"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                placeholder="Opcional"
              />
            </div>

            <div className="col-12 d-flex justify-content-between">
              <Link to="/" className="btn btn-outline-secondary">
                Cancelar
              </Link>
              <button
                type="submit"
                className="btn btn-primary"
                style={{ backgroundColor: "#EC8305" }}
              >
                Guardar presupuesto
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}