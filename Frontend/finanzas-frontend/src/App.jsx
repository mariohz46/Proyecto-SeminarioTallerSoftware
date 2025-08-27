import {Routes, Route} from 'react-router-dom'
import IngresosForm from './pages/ingresos';
import './App.css'

function App() {
  

  return (
<<<<<<< HEAD:Frontend/finanzas-frontend/src/App.jsx
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
=======
   <Routes>
      <Route path='/ingresos' element={<IngresosForm/>}></Route>
   </Routes>
>>>>>>> 49c33b4cbc8e1949c63349e6ccf880c9da953413:FrontEnd/src/App.tsx
  )
}

export default App
