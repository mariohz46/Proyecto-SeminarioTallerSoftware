import { NavLink } from "react-router-dom";

export default function NavBar() {
  const isAuth = !!localStorage.getItem("token");

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <span className="navbar-brand">Gestión Finanzas</span>

        <div className="collapse navbar-collapse show">
          <ul className="navbar-nav ms-auto">
            {!isAuth && (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/login">Login</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/registro">Registro</NavLink>
                </li>
              </>
            )}

            {isAuth && (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/dashboard">Dashboard</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/categorias">Categorías</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/bancos">Bancos</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/login">LogOut</NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}