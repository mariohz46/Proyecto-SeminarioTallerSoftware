// src/pages/Register.jsx
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Register() {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    const usuarioLimpio = usuario.trim();

    // ✅ Validaciones para el nombre de usuario
    if (!usuarioLimpio) {
      setError("El nombre de usuario es obligatorio.");
      return;
    }

    if (usuarioLimpio.length < 3) {
      setError("El nombre de usuario debe tener al menos 3 caracteres.");
      return;
    }

    if (usuarioLimpio.length > 20) {
      setError("El nombre de usuario no debe superar los 20 caracteres.");
      return;
    }

    if (/\d/.test(usuarioLimpio)) {
      setError("El nombre de usuario no debe contener números.");
      return;
    }

    // Validación simple 
    if (password !== password2) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    if (password.length < 8) {
      setError("La contraseña debe tener al menos 8 caracteres.");
      return;
    }

    // Aquí irá tu API de registro más adelante:
    // await api.register({ usuario, password })

    console.log("Registrando usuario:", { usuario, password });
  };

  return (
    <div className="container my-4">
      <div className="row justify-content-center">
        <div className="col-12 col-md-6 col-lg-5">
          <div className="card border-2 border-secondary-subtle shadow-sm">
            <div className="card-body">
              <h4 className="mb-1 text-center">Registro</h4>
              <p className="text-muted text-center mb-4">
                Crea tu cuenta para empezar a registrar tus transacciones.
              </p>

              {/* Logo / ilustración */}
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
                    placeholder="elige un usuario"
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
                    placeholder="mín. 8 caracteres"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <div className="col-12">
                  <label className="form-label">Repite la contraseña</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="confirma tu contraseña"
                    value={password2}
                    onChange={(e) => setPassword2(e.target.value)}
                    required
                  />
                </div>

                {/* Mensaje de error */}
                {error && (
                  <div className="col-12">
                    <div className="alert alert-danger py-2">{error}</div>
                  </div>
                )}

                <div className="col-12">
                  <button
                    type="submit"
                    className="btn w-100 fw-semibold text-light"
                    style={{ backgroundColor: "#EC8305", borderColor: "#EC8305" }}
                  >
                    Registrarse
                  </button>
                </div>

                <div className="col-12 text-center">
                  <small className="text-muted">
                    ¿Ya tienes cuenta?{" "}
                    <Link to="/login" style={{ color: "#024CAA" }}>
                      Inicia sesión
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
