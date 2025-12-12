import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Categorias from "./pages/Categorias";
import Bancos from "./pages/Bancos";
import PagosHistory from "./pages/PagosHistory";
import Presupuestos from "./pages/Presupuestos";
import TransactionHistory from "./pages/TransactionHistory";
import NavBar from "./components/NavBar";

export default function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/categorias" element={<Categorias />} />
        <Route path="/bancos" element={<Bancos />} />
        <Route path="/pagos" element={<PagosHistory />} />
        <Route path="/presupuestos" element={<Presupuestos />} />
        <Route path="/historial" element={<TransactionHistory />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}