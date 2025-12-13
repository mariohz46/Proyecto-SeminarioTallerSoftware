import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function NewPago() {
  const [monto, setMonto] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [fechaPago, setFechaPago] = useState("");
  const [fechaVencimiento, setFechaVencimiento] = useState("");
  const [estado, setEstado] = useState("pendiente");
  const [destinatario, setDestinatario] = useState("");
  const [bancoId, setBancoId] = useState("");
  const [bancos, setBancos] = useState([]);
  const [ok, setOk] = useState(false);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch("http://localhost:3000/bancos")
      .then(res => res.json())
      .then(setBancos);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const payload = {
      bancoId: Number(bancoId),
      monto: Number(monto),
      destinatario,
      fechaPago,
      fechaVencimiento,
      descripcion,
      estado
    };

    try {
      const res = await fetch("http://localhost:3000/pagos/registro", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (!res.ok) throw new Error("Error al guardar pago");

      setOk(true);
      setMonto("");
      setDescripcion("");
      setFechaPago("");
      setFechaVencimiento("");
      setBancoId("");
      setDestinatario("");
      setEstado("pendiente");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container mt-4">
      <Link to="/pagos" style={{ color: "#EC8305" }}>← Historial de pagos</Link>
      <h4>Nuevo Pago</h4>

      <form onSubmit={handleSubmit}>
        <input type="number" value={monto} onChange={e=>setMonto(e.target.value)} required />
        <input type="date" value={fechaPago} onChange={e=>setFechaPago(e.target.value)} required />
        <input type="date" value={fechaVencimiento} onChange={e=>setFechaVencimiento(e.target.value)} />
        <select value={bancoId} onChange={e=>setBancoId(e.target.value)}>
          <option value="">Banco</option>
          {bancos.map(b => <option key={b.idBanco} value={b.idBanco}>{b.nombre}</option>)}
        </select>
        <input value={destinatario} onChange={e=>setDestinatario(e.target.value)} />
        <textarea value={descripcion} onChange={e=>setDescripcion(e.target.value)} />
        <select value={estado} onChange={e=>setEstado(e.target.value)}>
          <option value="pendiente">Pendiente</option>
          <option value="pagado">Pagado</option>
          <option value="vencido">Vencido</option>
        </select>

        {ok && <p>Pago guardado</p>}
        {error && <p>{error}</p>}

        <button type="submit">Guardar</button>
      </form>
    </div>
  );
}