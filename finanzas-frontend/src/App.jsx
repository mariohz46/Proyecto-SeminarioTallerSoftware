import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import NewTransaction from './pages/NewTransaction.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Navbar from './components/NavBar.jsx'
import TransactionHistory from "./pages/TransactionHistory";
import BudgetForm from "./pages/BudgetForm";

export default function App() {
  return (
    
    <div className=".container">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Register />} />
          <Route path="/transacciones/nueva" element={<NewTransaction />} />
          <Route path="/historial" element={<TransactionHistory />} />
          <Route path="/presupuesto/nuevo" element={<BudgetForm />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </div>
  )
}
