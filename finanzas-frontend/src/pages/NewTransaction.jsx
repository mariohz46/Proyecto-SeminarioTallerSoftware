import { useState } from 'react'
//import { api } from '../services/api'
//import { useAuth } from '../hooks/useAuth'
import './NewTransaction.css'
export default function NewTransaction() {
//nst { token } = useAuth()
  const [monto, setMonto] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [tipo, setTipo] = useState('Egreso')
  const [fecha, setFecha] = useState('')
  const [categoriaId, setCategoriaId] = useState('')
  const [bancoId, setBancoId] = useState('')
  const [ok, setOk] = useState(false)
  const [error, setError] = useState(null)

  async function onSubmit(e) {
    e.preventDefault()
    setError(null)
    setOk(false)
    try {
      const payload = {
        tipo,
        monto: parseFloat(monto),
        descripcion,
        fecha,
        idCategoria: categoriaId ? parseInt(categoriaId) : null,
        idBanco: bancoId ? parseInt(bancoId) : null
      }
      await api.nuevaTransaccion(payload, token)
      setOk(true)
      setMonto('')
      setDescripcion('')
      setTipo('Egreso')
      setFecha('')
      setCategoriaId('')
      setBancoId('')
    } catch (err) {
      setError(err.message)
    }
  }

  return (
   <div className="container mt-4">
  <h2 className="mb-4 text-center">Nueva Transacción</h2>

  <div className="card mx-auto" style={{ maxWidth: 600 }}>
    <div className="card-body">
      <form onSubmit={onSubmit}>
        {/* Tipo y Monto */}
        <div className="row mb-3">
          <div className="col">
            <label htmlFor="tipo" className="form-label">Tipo</label>
            <select
              id="tipo"
              className="form-select"
              value={tipo}
              onChange={e => setTipo(e.target.value)}
            >
              <option value="Egreso">Egreso</option>
              <option value="Ingreso">Ingreso</option>
            </select>
          </div>

          <div className="col">
            <label htmlFor="monto" className="form-label">Monto</label>
            <input
              id="monto"
              type="number"
              step="0.01"
              className="form-control"
              value={monto}
              onChange={e => setMonto(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Descripción */}
        <div className="mb-3">
          <label htmlFor="descripcion" className="form-label">Descripción</label>
          <input
            id="descripcion"
            type="text"
            className="form-control"
            value={descripcion}
            onChange={e => setDescripcion(e.target.value)}
            required
          />
        </div>

        {/* Fecha y Categoría */}
        <div className="row mb-3">
          <div className="col">
            <label htmlFor="fecha" className="form-label">Fecha</label>
            <input
              id="fecha"
              type="date"
              className="form-control"
              value={fecha}
              onChange={e => setFecha(e.target.value)}
            />
          </div>

          <div className="col">
            <label htmlFor="categoria" className="form-label">Categoría</label>
            <input
              id="categoria"
              type="number"
              className="form-control"
              value={categoriaId}
              onChange={e => setCategoriaId(e.target.value)}
              placeholder="ID categoría"
            />
          </div>
        </div>

        {/* Banco */}
        <div className="mb-3">
          <label htmlFor="banco" className="form-label">Banco</label>
          <input
            id="banco"
            type="number"
            className="form-control"
            value={bancoId}
            onChange={e => setBancoId(e.target.value)}
            placeholder="ID banco"
          />
        </div>

        {/* Mensajes */}
        {ok && <div className="alert alert-success py-2">✅ Transacción guardada</div>}
        {error && <div className="alert alert-danger py-2">⚠️ {error}</div>}

        {/* Botón */}
        <button type="submit" className="btn btn-primary w-100" style={{ backgroundColor: "#EC8305" }}>Guardar</button>  {/* //EC8305 */}
      </form>
    </div>
  </div>
</div>

  )
}
