import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Importación de todas tus páginas
import Inicio from './views/Inicio';
import { Login } from './views/Login'; 
import Empleado from './views/Empleado'; 
import InicioUsuario from './views/InicioUsuario';
import Ganancias from './views/Ganancias';
import Repartidores from './views/Repartidores'; // <-- Nueva importación de la página creada

function App() {
  return (
    <Router>
      <Routes>
        {/* Tus rutas originales restablecidas */}
        <Route path="/" element={<Inicio />} />
        <Route path="/login" element={<Login />} />
        <Route path="/empleado" element={<Empleado />} />
        <Route path="/inicio-usuario" element={<InicioUsuario />} />
        
        {/* Tu nueva pantalla de Ganancias integrada perfectamente */}
        <Route path="/ganancias" element={<Ganancias />} />

        {/* Tu nueva pantalla de Repartidores integrada perfectamente */}
        <Route path="/repartidor" element={<Repartidores />} />

        {/* Ruta de seguridad: Si escriben algo que no existe, redirige al inicio */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;