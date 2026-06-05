import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react'; // 🔄 Importamos useEffect para controlar los títulos

// Importación de todas tus páginas
import InicioEmpleado from './views/Inicio';
import { Login } from './views/Login'; 
import Empleado from './views/Empleado'; 
import InicioUsuario from './views/InicioUsuario';
import Ganancias from './views/Ganancias';
import Repartidores from './views/Repartidores'; 
import PanelDeEmpleados from './views/PanelDeEmpleados'; 
import FormularioUsuario from './views/FormularioUsuario'; 
import RegistroDepaquetes from './views/RegistroDepaquetes'; 

// 🎯 COMPONENTE INTERNO: Cambia el título de la pestaña automáticamente según la ruta activa
const DynamicTitle = () => {
  const location = useLocation();

  useEffect(() => {
    // Definimos el nombre que tendrá cada una de tus rutas
    const titles = {
      '/': 'Inicio | La Ruta Logistics',
      '/login': 'Iniciar Sesión | La Ruta Logistics',
      '/empleado': 'Panel de Control | La Ruta Logistics',
      '/inicio-usuario': 'Inicio Usuario | La Ruta Logistics',
      '/registro': 'Registro de Usuario | La Ruta Logistics',
      '/ganancias': 'Ganancias | La Ruta Logistics',
      '/repartidor': 'Repartidores | La Ruta Logistics',
      '/panel-empleados': 'Panel de Empleados | La Ruta Logistics',
      '/registro-paquetes': 'Registro de Paquetes | La Ruta Logistics',
    };

    // Aplica el título correspondiente, o usa uno por defecto si la ruta no está en la lista
    document.title = titles[location.pathname] || 'La Ruta Logistics';
  }, [location]);

  return null; // Este componente no altera la interfaz visual, solo maneja el título
};

function App() {
  return (
    <Router>
      {/* 🚀 Aquí se activa el componente dinámico para las pestañas */}
      <DynamicTitle />

      <Routes>
        {/* Tus rutas originales restablecidas */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/empleado" element={<Empleado />} />
        <Route path="/inicio-empleado" element={<InicioEmpleado />} />
        <Route path="/inicio-usuario" element={<InicioUsuario />} />
        
        {/* Tu nueva pantalla de Registro (FormularioUsuario) integrada perfectamente */}
        <Route path="/registro" element={<FormularioUsuario />} />

        {/* Tu nueva pantalla de Ganancias integrada perfectamente */}
        <Route path="/ganancias" element={<Ganancias />} />

        {/* Tu nueva pantalla de Repartidores integrada perfectamente */}
        <Route path="/repartidor" element={<Repartidores />} />

        {/* Tu nueva pantalla de Gestión de Empleados integrada perfectamente */}
        <Route path="/panel-empleados" element={<PanelDeEmpleados />} />

        {/* 📦 Nueva ruta agregada para el Historial, Edición y Búsqueda de Paquetes */}
        <Route path="/registro-paquetes" element={<RegistroDepaquetes />} />

        {/* Ruta de seguridad: Si escriben algo que no existe, redirige al inicio */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;