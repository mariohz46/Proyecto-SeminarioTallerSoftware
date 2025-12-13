import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const money = (n) =>
  Number(n || 0).toLocaleString("es-HN", {
    style: "currency",
    currency: "HNL",
  });

export default function PagosHistory() {
  const [pagos, setPagos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargar = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch("http://localhost:3000/pagos/listar", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error("No autorizado");
        }

        const data = await res.json();
        setPagos(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err.message);
        setPagos([]);
      } finally {
        setLoading(false);
      }
    };

    cargar();
  }, []);

  const formatFecha = (value) => {
    if (!value) return "—";
    const d = new Date(value);
    return isNaN(d.getTime()) ? value : d.toLocaleDateString("es-HN");
  };

  const deshabilitarPago = async (id) => {
    if (!window.confirm("¿Deseas deshabilitar este pago?")) return;

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `http://localhost:3000/pagos/deshabilitar/${id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) throw new Error();

      setPagos((prev) =>
        prev.map((p) =>
          p.idPago === id ? { ...p, estado: "Inactivo" } : p
        )
      );
    } catch {
      alert("No se pudo deshabilitar el pago");
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex align-items-center gap-2 mb-3">
        <Link
          to="/"
          className="text-decoration-none small"
          style={{ color: "#EC8305" }}
        >
          ← Back
        </Link>
        <h4 className="m-0">Historial de Pagos</h4>
      </div>

      <div className="card border-2 border-secondary-subtle">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="card-title m-0">Pagos registrados</h5>
            <Link
              to="/pagos/nuevo"
              className="btn fw-semibold text-light"
              style={{ backgroundColor: "#EC8305" }}
            >
              + Agregar pago
            </Link>
          </div>

          {loading && <p>Cargando pagos...</p>}

          {error && (
            <div className="alert alert-danger py-2">⚠️ {error}</div>
          )}

          {!loading && !error && (
            <>
              {pagos.length === 0 ? (
                <p>No hay pagos registrados.</p>
              ) : (
                <div className="table-responsive">
                  <table className="table table-sm table-hover align-middle">
                    <thead className="table-light">
                      <tr>
                        <th>#</th>
                        <th>Fecha</th>
                        <th>Banco</th>
                        <th>Usuario</th>
                        <th>Monto</th>
                        <th>Descripción</th>
                        <th>Estado</th>
                        <th className="text-center">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pagos.map((pago, index) => (
                        <tr key={pago.idPago}>
                          <td>{index + 1}</td>
                          <td>{formatFecha(pago.fechaPago)}</td>
                          <td>{pago.banco?.nombre || "—"}</td>
                          <td>{pago.usuario?.nombre || "—"}</td>
                          <td>{money(pago.monto)}</td>
                          <td>{pago.descripcion || "—"}</td>
                          <td>{pago.estado || "—"}</td>
                          <td className="text-center">
                            <button
                              className="btn btn-sm btn-danger"
                              onClick={() => deshabilitarPago(pago.idPago)}
                            >
                              🚫 Deshabilitar
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}