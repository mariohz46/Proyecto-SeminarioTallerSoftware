import { NavLink } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: "#091057" }}>
      <div className="container-fluid">
        <a className="navbar-brand" href="#">Gestion de Finanzas Personal</a>

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
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/">Inicio</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/transacciones/nueva">Nueva Transacción</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/historial">Historial de Transacciones</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/reportes">Reportes</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>



/*<nav className="navbar">
      <h1 className="logo">💰 Finanzas</h1>
      <div className="links">
        <NavLink to="/" end>Dashboard</NavLink>
        <NavLink to="/transacciones/nueva">Nueva</NavLink>
        <NavLink to="/login">Entrar</NavLink>
        <NavLink to="/registro">Registro</NavLink>
      </div>
    </nav>
     
    // EL DE BOOSTRAP
    <nav class="navbar bg-primary" data-bs-theme="dark">
  <div class="container-fluid">
    <span class="navbar-text">
      Navbar text with an inline element
    </span>
  </div>
</nav>*/
)
}
