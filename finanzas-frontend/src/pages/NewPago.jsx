// src/pages/NewPago.jsx
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function NewPago() {
  const [monto, setMonto] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [fechaPago, setFechaPago] = useState("");
  const [fechaVencimiento, setFechaVencimiento] = useState("");
  const [estado, setEstado] = useState("pendiente");
  const [destinatario, setDestinatario] = useState("");
  const [bancoId, setBancoId] = useState("");
  const [bancos, setBancos] = useState([]);
  const [ok, setOk] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // Cargar bancos desde la API, igual que en NewTransaction.jsx
  useEffect(() => {
    fetch("http://localhost:3000/bancos").then(res => res.json()).then(data => setBancos(data)).catch(error => console.log("error cargando bancos", error));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setOk(false);

    if (!monto || !fechaPago || !bancoId) {
      setError("Monto, fecha y banco son obligatorios");
      return;
    }

    try {
      const body = {
        bancoId: Number(bancoId),
        monto: Number(monto),
        destinatario,
        fechaPago,
        fechaVencimiento,
        descripcion,
        estado,
      };

      const res = await fetch("http://localhost:3000/pagos/registro", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization":`Bearer ${token}`
         },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const errBody = await res.json().catch(() => ({}));
        throw new Error(errBody.message || "No se pudo guardar el pago");
      }

      setOk(true);
      setBancoId("");
      setMonto("");
      setDestinatario("");
      setFechaPago("");
      setFechaVencimiento("");
      setDescripcion("");
      setEstado("pendiente");

      // Si quieres que regrese al historial automáticamente, descomenta:
      // navigate("/pagos");
    } catch (err) {
      setError(err.message || "Error inesperado");
    }
  };

  return (
    <div className="container mt-4">
      {/* Encabezado */}
      <div className="d-flex align-items-center gap-2 mb-3">
        <Link
          to="/pagos"
          className="text-decoration-none small"
          style={{ color: "#EC8305" }}
        >
          ← Historial de pagos
        </Link>
        <h4 className="m-0">Nuevo Pago</h4>
      </div>

      <div className="card shadow-sm">
        <div className="card-body">
          <form onSubmit={handleSubmit} className="row g-3">
            <div className="col-md-4">
              <label className="form-label">Monto</label>
              <input
                type="number"
                className="form-control"
                step="0.01"
                min="0"
                value={monto}
                onChange={(e) => setMonto(e.target.value)}
                required
              />
            </div>

            <div className="col-md-4">
              <label className="form-label">Fecha de pago</label>
              <input
                type="date"
                className="form-control"
                value={fechaPago}
                onChange={(e) => setFechaPago(e.target.value)}
                required
              />
            </div>

            <div className="col-md-4">
              <label className="form-label">Fecha de vencimiento del pago</label>
              <input
                type="date"
                className="form-control"
                value={fechaVencimiento}
                onChange={(e) => setFechaVencimiento(e.target.value)}
                required
              />
            </div>

            <div className="col-md-4">
              <label className="form-label">Banco</label>
              <select
                className='form-select'
                value={bancoId}
                onChange={e => setBancoId(e.target.value)}
              >

                <option value="">Seleccione un banco</option>
                {bancos.map(b => (
                  <option key={b.idBanco} value={b.idBanco}>
                    {b.nombre}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-md-6">
              <label className="form-label">Estado</label>
              <select
                className="form-select"
                value={estado}
                onChange={(e) => setEstado(e.target.value)}
              >
                <option value="pendiente">Pendiente</option>
                <option value="pagado">Pagado</option>
                <option value="vencido">Vencido</option>
              </select>
            </div>

            <div className="col-12">
              <label className="form-label">Destinatario</label>
              <input className="form-control" type="text" value={destinatario} onChange={(e)=> setDestinatario(e.target.value)} ></input>
            </div>

            <div className="col-12">
              <label className="form-label">Descripción</label>
              <textarea
                className="form-control"
                rows="2"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                placeholder="Ej. Pago de tarjeta, servicio, préstamo..."
              />
            </div>

            {ok && (
              <div className="col-12">
                <div className="alert alert-success py-2 mb-0">
                  ✅ Pago guardado correctamente
                </div>
              </div>
            )}

            {error && (
              <div className="col-12">
                <div className="alert alert-danger py-2 mb-0">
                  ⚠️ {error}
                </div>
              </div>
            )}

            <div className="col-12 d-flex justify-content-end">
              <button
                type="submit"
                className="btn fw-semibold text-light"
                style={{ backgroundColor: "#EC8305" }}
              >
                Guardar pago
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
