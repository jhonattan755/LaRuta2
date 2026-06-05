import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const DynamicTitle = () => {
  const location = useLocation();

  useEffect(() => {
    // Mapea la ruta actual de la URL con el título que deseas mostrar
    const titles = {
      '/': 'Inicio | La Ruta Logistics',
      '/repartidor': 'Repartidor | La Ruta Logistics',
      '/panel-empleados': 'Panel de Empleados | La Ruta Logistics',
      '/empleado': 'Panel de Control | La Ruta Logistics',
      '/registro-paquetes': 'Registro de Paquetes | La Ruta Logistics',
      '/login': 'Iniciar Sesión | La Ruta Logistics'
    };

    // Si la ruta existe en el mapa la pone, si no, deja uno por defecto
    document.title = titles[location.pathname] || 'La Ruta Logistics';
  }, [location]);

  return null; // Este componente no renderiza nada visual
};

export default DynamicTitle;