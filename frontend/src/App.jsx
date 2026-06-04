import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Login } from './views/Login';
import Empleado from './views/Empleado'; 
// 1. IMPORTACIÓN AÑADIDA: Traemos la nueva página de inicio informativa
import Inicio from './views/Inicio';

function App() {
  return (
    <Router>
      <Routes>
        {/* 2. CAMBIO AQUÍ: La raíz ahora muestra la Landing Page informativa */}
        <Route path="/" element={<Inicio />} />
        
        {/* 3. NUEVA RUTA: Movemos el Login a su propio espacio */}
        <Route path="/login" element={<Login />} />
        
        {/* Esta es la ruta para tu panel de encomiendas */}
        <Route path="/empleado" element={<Empleado />} />
        
        {/* Aquí agregaremos más rutas luego, como /cliente o /admin */}
      </Routes>
    </Router>
  );
}

export default App;