import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Login } from './views/Login';
import Empleado from './views/Empleado'; 
import Inicio from './views/Inicio'; // Tu página que actúa como Admin

function App() {
  return (
    <Router>
      <Routes>
        {/* La puerta de entrada principal es tu nuevo Login oscuro */}
        <Route path="/" element={<Login />} />
        
        {/* Ruta exclusiva para el Empleado / Ventanilla */}
        <Route path="/empleado" element={<Empleado />} />
        
        {/* Ruta exclusiva para el Administrador */}
        <Route path="/admin" element={<Inicio />} />
      </Routes>
    </Router>
  );
}

export default App;