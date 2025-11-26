// src/pages/NewTransaction.jsx
import { useEffect, useState } from 'react'
import './NewTransaction.css'
//import { api } from '../services/api'
//import { useAuth } from '../hooks/useAuth'

export default function NewTransaction() {
  //const { token } = useAuth()
  const [monto, setMonto] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [tipo, setTipo] = useState('Egreso')
  const [fecha, setFecha] = useState('')
  const [categoriaId, setCategoriaId] = useState('')
  const [bancoId, setBancoId] = useState('')
  const [ok, setOk] = useState(false)
  const [error, setError] = useState(null)
  const [categorias, setCategorias] = useState([])
  const [bancos, setBancos] = useState([])

  /*El useEffect se utiliza para cargar informacion desde la BD. En este caso estamos cargando los nombres de la categoria y bancos para mostrarlos en el combobox del 
  formulario */
  useEffect(() => {
    fetch("http://localhost:3000/categorias/obtenerCategorias").then(res => res.json()).then(data => setCategorias(data)).catch(error => console.log("error cargando categorias", error));
    fetch("http://localhost:3000/bancos").then(res => res.json()).then(data => setBancos(data)).catch(error => console.log("error cargando bancos", error));

  }, [])

  async function onSubmit(e) {
    e.preventDefault()
    setError(null)
    setOk(false)

    // 🔹 Validación de monto > 0
    if (!monto || isNaN(monto) || parseFloat(monto) <= 0) {
      setError("El monto debe ser un número mayor a cero.")
      return
    }

    // 🔹 Validación de descripción
    if (!descripcion || descripcion.trim().length < 3) {
      setError("La descripción debe tener al menos 3 caracteres.")
      return
    }

    // 🔹 Validación de categoría (opcional pero válida si se escribe)
    if (categoriaId && (isNaN(categoriaId) || parseInt(categoriaId) <= 0)) {
      setError("La categoría debe ser un número entero positivo.")
      return
    }

    // 🔹 Validación de banco (opcional pero válida si se escribe)
    if (bancoId && (isNaN(bancoId) || parseInt(bancoId) <= 0)) {
      setError("El banco debe ser un número entero positivo.")
      return
    }

    // 🔹 Validación de fecha (no debe ser futura)
    const hoy = new Date()
    if (fecha) {
      const fechaIngresada = new Date(fecha)
      if (fechaIngresada > hoy) {
        setError("La fecha no puede ser mayor a la actual.")
        return
      }
    }

    try {
      const payload = {
        usuarioId: 7,
        tipo,
        monto: parseFloat(monto),
        descripcion: descripcion.trim(),
        fecha,
        categoriaId: categoriaId ? parseInt(categoriaId) : null,
        bancoId: bancoId ? parseInt(bancoId) : null
      }
<<<<<<< HEAD
      await fetch("http://localhost:3000/transacciones", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });
=======

      // ⚠ Descomenta cuando la API esté lista
      // await api.nuevaTransaccion(payload, token)

>>>>>>> 52a0aae05c0817d3236d7a8ac2a2f860f199b8b4
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
                  min="1"
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
              {/* cmbCategoria */}
              <div className="col">
                <label htmlFor='categoria' className='form-label'>Categoria</label>
<<<<<<< HEAD
                <select className="form-select" id="categoria" value={categoriaId} onChange={e => setCategoriaId(e.target.value)}>
=======
                <select
                  className="form-select"
                  id="categoria"
                  value={categoriaId}
                  onChange={e => setCategoriaId(e.target.value)}
                >
>>>>>>> 52a0aae05c0817d3236d7a8ac2a2f860f199b8b4
                  <option value="">Seleccione una categoria</option>
                  {categorias.map(c => (
                    <option key={c.idCategoria} value={c.idCategoria}>
                      {c.nombre}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Banco */}
            <div className="mb-3">
              <label className='form-label'>Bancos</label>
<<<<<<< HEAD
              <select className='form-select' value={bancoId} onChange={e => setBancoId(e.target.value)}>
=======
              <select
                className='form-select'
                value={bancoId}
                onChange={e => setBancoId(e.target.value)}
              >
>>>>>>> 52a0aae05c0817d3236d7a8ac2a2f860f199b8b4
                <option value="">Seleccione un banco</option>
                {bancos.map(b => (
                  <option key={b.idBanco} value={b.idBanco}>
                    {b.nombre}
                  </option>
                ))}
              </select>
            </div>

            {/* Mensajes */}
            {ok && <div className="alert alert-success py-2">✅ Transacción guardada</div>}
            {error && <div className="alert alert-danger py-2">⚠️ {error}</div>}

            {/* Botón */}
            <button
              type="submit"
              className="btn btn-primary w-100"
              style={{ backgroundColor: "#EC8305" }}
            >
              Guardar
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}



