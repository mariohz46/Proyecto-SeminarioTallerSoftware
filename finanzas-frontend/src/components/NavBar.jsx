// src/components/Navbar.jsx
import { NavLink, useLocation } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();

  // Rutas donde solo se debe mostrar Login y Registro
  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/registro";

  return (
    <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: "#091057" }}>
      <div className="container-fluid">

        {/* Marca -> Dashboard */}
        <NavLink className="navbar-brand" to="/dashboard">
          Gestión de Finanzas Personal
        </NavLink>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">

            {isAuthPage ? (
              <>
                {/* Solo Login y Registro en /login y /registro */}

                <li className="nav-item">
                  <NavLink
                    to="/login"
                    className={({ isActive }) =>
                      "nav-link " + (isActive ? "active fw-bold" : "")
                    }
                  >
                    Login
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink
                    to="/registro"
                    className={({ isActive }) =>
                      "nav-link " + (isActive ? "active fw-bold" : "")
                    }
                  >
                    Registro
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                {/* En el resto de secciones NO se muestra Login ni Registro */}

                <li className="nav-item">
                  <NavLink
                    to="/dashboard"
                    className={({ isActive }) =>
                      "nav-link " + (isActive ? "active fw-bold" : "")
                    }
                  >
                    Inicio
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink
                    to="/categorias"
                    className={({ isActive }) =>
                      "nav-link " + (isActive ? "active fw-bold" : "")
                    }
                  >
                    Categorías
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink
                    to="/bancos"
                    className={({ isActive }) =>
                      "nav-link " + (isActive ? "active fw-bold" : "")
                    }
                  >
                    Bancos
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink
                    to="/pagos"
                    className={({ isActive }) =>
                      "nav-link " + (isActive ? "active fw-bold" : "")
                    }
                  >
                    Pagos
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink
                    to="/presupuestos"
                    className={({ isActive }) =>
                      "nav-link " + (isActive ? "active fw-bold" : "")
                    }
                  >
                    Presupuestos
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink
                    to="/historial"
                    className={({ isActive }) =>
                      "nav-link " + (isActive ? "active fw-bold" : "")
                    }
                  >
                    Transacciones
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink
                    to="/reportes"
                    className={({ isActive }) =>
                      "nav-link " + (isActive ? "active fw-bold" : "")
                    }
                  >
                    Reportes
                  </NavLink>
                </li>
              </>
            )}

          </ul>
        </div>
      </div>
    </nav>
  );
}
