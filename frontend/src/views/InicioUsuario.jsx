import { useState } from 'react';
import { Box, Truck } from 'lucide-react';

function InicioUsuario() {
  const [vistaActual, setVistaActual] = useState('inicio');

  const infoPaquete = {
    codigo: "LR-SV-845CC9",
    origen: "Agencia San Salvador Centro",
    destino: "Entrega Domicilio - Santa Ana",
    pasos: [
      { id: 1, titulo: "Recibido en Agencia", desc: "Paquete registrado con éxito", hora: "08:30 AM", completado: true },
      { id: 2, titulo: "En Ruta de Distribución", desc: "La unidad va sobre la Carretera Panamericana", hora: "02:15 PM", completado: true },
      { id: 3, titulo: "En Manos del Repartidor", desc: "Listo para entregar en destino", hora: "En progreso", completado: false },
    ]
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 flex flex-col">
      <header className="bg-[#111827] text-white p-4 flex justify-between items-center">
        <h2 className="text-lg font-black tracking-wider">LA RUTA - CLIENTES SV</h2>
      </header>
      <main className="p-8 flex-1">
        <h1 className="text-2xl font-bold">Estado de tu envío: {infoPaquete.codigo}</h1>
        {/* Tu diseño de seguimiento aquí */}
      </main>
    </div>
  );
}

export default InicioUsuario;