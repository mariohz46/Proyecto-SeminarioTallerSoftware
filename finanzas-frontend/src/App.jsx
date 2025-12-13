import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Categorias from "./pages/Categorias";
import Bancos from "./pages/Bancos";
import NavBar from "./components/NavBar";

export default function App() {
  return (
    <Routes>
      {/* Públicas */}
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/registro" element={<Register />} />

      {/* Privadas (con navbar) */}
      <Route
        path="/dashboard"
        element={
          <>
            <NavBar />
            <Dashboard />
          </>
        }
      />
      <Route
        path="/categorias"
        element={
          <>
            <NavBar />
            <Categorias />
          </>
        }
      />
      <Route
        path="/bancos"
        element={
          <>
            <NavBar />
            <Bancos />
          </>
        }
      />

      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}