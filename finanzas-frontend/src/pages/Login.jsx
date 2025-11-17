// src/pages/Login.jsx
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí luego vas a llamar a tu API de login
    // console.log({ usuario, password });
  };

  return (
    <div className="container my-4">
      <div className="row justify-content-center">
        <div className="col-12 col-md-6 col-lg-5">
          <div className="card border-2 border-secondary-subtle shadow-sm">
            <div className="card-body">
              <h4 className="mb-1 text-center">Inicio de sesión</h4>
              <p className="text-muted text-center mb-4">
                Accede para gestionar tus ingresos, egresos y reportes.
              </p>

              {/* Logo / título superior opcional */}
              <div className="text-center mb-3">
                <div
                  style={{
                    height: 120,
                    border: "2px dashed rgba(0,0,0,.1)",
                    borderRadius: 16,
                    display: "grid",
                    placeItems: "center",
                    fontSize: ".9rem",
                    color: "#6b7280",
                  }}
                >
                  Logo / Ilustración
                </div>
              </div>

              <form onSubmit={handleSubmit} className="row g-3">
                <div className="col-12">
                  <label className="form-label">Nombre de usuario</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="tu-usuario"
                    value={usuario}
                    onChange={(e) => setUsuario(e.target.value)}
                    required
                  />
                </div>

                <div className="col-12">
                  <label className="form-label">Contraseña</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <div className="col-12">
                  <button
                    type="submit"
                    className="btn w-100 fw-semibold text-light"
                    style={{ backgroundColor: "#EC8305", borderColor: "#EC8305" }}
                  >
                    Iniciar sesión
                  </button>
                </div>

                <div className="col-12 text-center">
                  <small className="text-muted">
                    ¿No tienes cuenta?{" "}
                    <Link to="/registro" style={{ color: "#024CAA" }}>
                      Crear una cuenta
                    </Link>
                  </small>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
