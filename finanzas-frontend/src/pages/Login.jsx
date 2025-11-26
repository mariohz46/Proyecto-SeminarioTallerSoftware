// src/pages/Login.jsx
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [errores, setErrores] = useState({
    usuario: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nuevosErrores = { usuario: "", password: "", };
    let esValido = true;

    const usuarioLimpio = usuario.trim();

    // Validación de nombre de usuario
    if (!usuarioLimpio) {
      nuevosErrores.usuario = "El nombre de usuario es obligatorio.";
      esValido = false;
    } else {
      if (usuarioLimpio.length < 3) {
        nuevosErrores.usuario =
          "El nombre de usuario debe tener al menos 3 caracteres.";
        esValido = false;
      }
      /*if (usuarioLimpio.length > 20) {
        nuevosErrores.usuario =
          "El nombre de usuario no debe superar los 20 caracteres.";
        esValido = false;
      }
      if (/\d/.test(usuarioLimpio)) {
        nuevosErrores.usuario = "El nombre de usuario no debe contener números.";
        esValido = false;
      }*/
    }

    // Validación de contraseña
    if (!password) {
      nuevosErrores.password = "La contraseña es obligatoria.";
      esValido = false;
    } else {
      if (password.length < 6) {
        nuevosErrores.password =
          "La contraseña debe tener al menos 6 caracteres.";
        esValido = false;
      }
      if (password.length > 50) {
        nuevosErrores.password =
          "La contraseña no debe superar los 50 caracteres.";
        esValido = false;
      }
    }

    setErrores(nuevosErrores);

    if (!esValido) return;
    try {
      const response = await fetch("http://localhost:3000/usuarios/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: usuarioLimpio,
          password: password,
        }),
      });
      const data = await response.json();

      if(!response.ok){
        alert(data.message|| "Error en el inicio de sesión");
        return;
      }
      localStorage.setItem("token",data.user.token);
      localStorage.setItem("usuario",JSON.stringify(data.user.usuario));
      alert("Inicio de sesion exitoso");

      window.location.href ="/dashboard";
    }catch(error){
      console.error("Error en el login",error);
      alert("Fallo servidor");
    }

 }

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
                  <label className="form-label">Correo</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="correo@ejemplo.com"
                    value={usuario}
                    onChange={(e) => setUsuario(e.target.value)}
                    required
                    
                  />
                  {errores.usuario && (
                    <small className="text-danger d-block mt-1">
                      {errores.usuario}
                    </small>
                  )}
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
                    minLength={6}
                    maxLength={50}
                  />
                  {errores.password && (
                    <small className="text-danger d-block mt-1">
                      {errores.password}
                    </small>
                  )}
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
