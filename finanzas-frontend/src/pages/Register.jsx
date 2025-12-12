import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [saldoInicial, setSaldoInicial] = useState("");
  const [nombreBanco, setNombreBanco] = useState("");

  const [error, setError] = useState(null);
  const [mensajeOk, setMensajeOk] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setMensajeOk(null);

    if (password !== password2) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    if (password.length < 8) {
      setError("La contraseña debe tener al menos 8 caracteres.");
      return;
    }

    if (!saldoInicial || saldoInicial <= 0) {
      setError("Debes ingresar un saldo inicial válido.");
      return;
    }

    if (!nombreBanco.trim()) {
      setError("Debes ingresar el nombre del banco.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:3000/usuarios/registro", {
        nombre,
        email,
        password,
        saldoInicial,
        nombreBanco,
      });

      setMensajeOk("Usuario registrado correctamente");
      setNombre("");
      setEmail("");
      setPassword("");
      setPassword2("");
      setSaldoInicial("");
      setNombreBanco("");

    } catch (err) {
      setError(err.response?.data?.message || "Error registrando usuario");
    }
  };

  return (
    <div className="container my-4">
      <div className="row justify-content-center">
        <div className="col-12 col-md-6 col-lg-5">
          <div className="card border-2 border-secondary-subtle shadow-sm">
            <div className="card-body">
              <h4 className="mb-1 text-center">Registro</h4>

              <form onSubmit={handleSubmit} className="row g-3">
                <div className="col-12">
                  <label className="form-label">Nombre</label>
                  <input
                    type="text"
                    className="form-control"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                  />
                </div>

                <div className="col-12">
                  <label className="form-label">Correo electrónico</label>
                  <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="col-12">
                  <label className="form-label">Saldo inicial</label>
                  <input
                    type="number"
                    className="form-control"
                    value={saldoInicial}
                    onChange={(e) => setSaldoInicial(e.target.value)}
                    required
                  />
                </div>

                <div className="col-12">
                  <label className="form-label">Banco</label>
                  <input
                    type="text"
                    className="form-control"
                    value={nombreBanco}
                    onChange={(e) => setNombreBanco(e.target.value)}
                    required
                  />
                </div>

                <div className="col-12">
                  <label className="form-label">Contraseña</label>
                  <input
                    type="password"
                    className="form-control"
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
                    value={password2}
                    onChange={(e) => setPassword2(e.target.value)}
                    required
                  />
                </div>

                {error && (
                  <div className="alert alert-danger py-2">{error}</div>
                )}

                {mensajeOk && (
                  <div className="alert alert-success py-2">{mensajeOk}</div>
                )}

                <button
                  type="submit"
                  className="btn w-100 fw-semibold text-light"
                  style={{ backgroundColor: "#EC8305", borderColor: "#EC8305" }}
                >
                  Registrarse
                </button>

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