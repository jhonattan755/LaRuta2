import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { Box, Truck } from 'lucide-react';
import { Login } from './views/Login';
import Empleado from './views/Empleado'; 
import Inicio from './views/Inicio';
import Ganancias from './views/Ganancias';

// ─── 1. COMPONENTE: INICIO USUARIO (VISTA CON IMÁGENES E INFORMACIÓN) ───
function InicioUsuario() {
  const [vistaActual, setVistaActual] = useState('inicio');

  const infoPaquete = {
    codigo: "LR-SV-845CC9",
    origen: "Agencia San Salvador Centro",
    destino: "Entrega Domicilio - Santa Ana",
    fechaEnvio: "03 Jun 2026",
    repartidor: "Carlos Mendoza",
    repartidorTelefono: "+503 7123-4567",
    pasos: [
      { id: 1, titulo: "Recibido en Agencia", desc: "Paquete registrado con éxito", hora: "08:30 AM", completado: true },
      { id: 2, titulo: "En Ruta de Distribución", desc: "La unidad va sobre la Carretera Panamericana", hora: "02:15 PM", completado: true },
      { id: 3, titulo: "En Manos del Repartidor", desc: "Listo para entregar en destino", hora: "En progreso", completado: false },
    ]
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 font-sans flex flex-col">
      {/* Encabezado */}
      <header className="bg-[#111827] text-white sticky top-0 z-50 shadow-md px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setVistaActual('inicio')}>
          <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-lg">📍</div>
          <div>
            <h2 className="text-lg font-black tracking-wider m-0 leading-none">LA RUTA</h2>
            <span className="text-[9px] text-slate-400 font-bold tracking-widest block">CLIENTES SV</span>
          </div>
        </div>
        <nav className="flex items-center gap-6">
          <button 
            onClick={() => setVistaActual('inicio')}
            className={`text-sm font-bold tracking-wide transition-all cursor-pointer ${vistaActual === 'inicio' ? 'text-[#5bc0be] border-b-2 border-[#5bc0be] pb-1' : 'text-slate-300 hover:text-white'}`}
          >
            Inicio
          </button>
          <button 
            onClick={() => setVistaActual('rastreo')}
            className={`text-sm font-extrabold tracking-wide flex items-center gap-2 px-4 py-1.5 rounded-full transition-all cursor-pointer relative ${
              vistaActual === 'rastreo' ? 'bg-[#5bc0be] text-[#111827]' : 'bg-blue-600/20 text-blue-400 border border-blue-500/30'
            }`}
          >
            <Box size={16} />
            Mi Paquete
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
          </button>
        </nav>
      </header>

      {/* Contenido Dinámico */}
      <main className="flex-1">
        {vistaActual === 'inicio' && (
          <div className="animate-fadeIn">
            <div className="p-8 max-w-6xl mx-auto">
              
              {/* Banner de Bienvenida */}
              <div className="bg-gradient-to-r from-[#1e3a8a] to-[#0f172a] text-white rounded-3xl p-8 md:p-12 shadow-xl mb-12 relative overflow-hidden">
                <div className="relative z-10">
                  <span className="bg-blue-500/20 text-blue-300 border border-blue-500/30 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                    Panel de Operación Logística Activo
                  </span>
                  <h1 className="text-3xl md:text-5xl font-black mt-4 mb-4 tracking-tight">¿Qué hacemos en La Ruta?</h1>
                  <p className="text-slate-300 text-sm md:text-base max-w-2xl leading-relaxed">
                    Somos una red especializada en la **logística integral y distribución express** dentro de El Salvador. Nos encargamos de recolectar, clasificar, transportar y entregar tus paquetes comerciales y encomiendas familiares de manera ágil, eficiente y con total seguridad.
                  </p>
                </div>
                <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-blue-600/10 rounded-full blur-2xl"></div>
              </div>

              {/* Sección de Tarjetas con Imágenes Reales */}
              <div className="mb-6">
                <h3 className="text-xl font-black text-slate-900 tracking-tight mb-2">Nuestras Líneas de Distribución</h3>
                <p className="text-xs text-slate-500 mb-6">Gestionamos envíos adaptados a cada necesidad con cobertura en los 14 departamentos.</p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Tarjeta 1 */}
                  <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs flex flex-col">
                    <div className="h-44 w-full overflow-hidden relative bg-slate-900">
                      <img 
                        src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=500&q=80" 
                        alt="Centro de Distribución La Ruta" 
                        className="w-full h-full object-cover opacity-90"
                      />
                      <span className="absolute top-3 left-3 bg-blue-600 text-white font-extrabold text-[9px] px-2.5 py-0.5 rounded-md uppercase tracking-wider">Carga Comercial</span>
                    </div>
                    <div className="p-4 flex-1">
                      <h4 className="font-bold text-sm text-slate-800 mb-1">Distribución Al por Mayor</h4>
                      <p className="text-[11px] text-slate-500 leading-relaxed">Movilización masiva interdepartamental para abastecimiento de inventarios y negocios.</p>
                    </div>
                  </div>

                  {/* Tarjeta 2 */}
                  <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs flex flex-col">
                    <div className="h-44 w-full overflow-hidden relative bg-slate-900">
                      <img 
                        src="https://images.unsplash.com/photo-1549194388-f61be84a6e9e?auto=format&fit=crop&w=500&q=80" 
                        alt="Entrega Última Milla" 
                        className="w-full h-full object-cover opacity-90"
                      />
                      <span className="absolute top-3 left-3 bg-indigo-600 text-white font-extrabold text-[9px] px-2.5 py-0.5 rounded-md uppercase tracking-wider">Última Milla</span>
                    </div>
                    <div className="p-4 flex-1">
                      <h4 className="font-bold text-sm text-slate-800 mb-1">Envíos Corporativos y E-commerce</h4>
                      <p className="text-[11px] text-slate-500 leading-relaxed">Entregas directo a domicilio para optimizar los tiempos de entrega de tus ventas digitales.</p>
                    </div>
                  </div>

                  {/* Tarjeta 3 */}
                  <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs flex flex-col">
                    <div className="h-44 w-full overflow-hidden relative bg-slate-900">
                      <img 
                        src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=500&q=80" 
                        alt="Flota de transporte" 
                        className="w-full h-full object-cover opacity-90"
                      />
                      <span className="absolute top-3 left-3 bg-emerald-600 text-white font-extrabold text-[9px] px-2.5 py-0.5 rounded-md uppercase tracking-wider">Control GPS</span>
                    </div>
                    <div className="p-4 flex-1">
                      <h4 className="font-bold text-sm text-slate-800 mb-1">Seguridad y Monitoreo</h4>
                      <p className="text-[11px] text-slate-500 leading-relaxed">Cada unidad cuenta con seguimiento satelital activo para garantizar el resguardo de la mercancía.</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* Vista de Rastreo */}
        {vistaActual === 'rastreo' && (
          <div className="w-full h-[calc(100vh-68px)] flex flex-col md:flex-row overflow-hidden">
            <div className="flex-1 bg-slate-200 relative min-h-[300px] md:min-h-full">
              <div className="absolute inset-0 bg-[#e5e9f0] bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:16px_16px] flex items-center justify-center">
                <svg className="absolute w-full h-full opacity-40 stroke-blue-500 stroke-dasharray-4 fill-none" viewBox="0 0 800 500">
                  <path d="M100,300 Q250,150 450,280 T700,200" strokeWidth="4" />
                </svg>
                <div className="absolute left-[15%] top-[55%] text-center">
                  <div className="w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow-md mx-auto"></div>
                  <span className="bg-white text-[10px] font-bold px-2 py-0.5 rounded shadow-xs block mt-1">San Salvador</span>
                </div>
                <div className="absolute left-[45%] top-[42%] text-center animate-bounce">
                  <div className="bg-[#111827] text-white p-2.5 rounded-full shadow-xl border-2 border-[#5bc0be] flex items-center justify-center">
                    <Truck size={20} className="text-[#5bc0be]" />
                  </div>
                  <div className="bg-[#111827] text-white text-[9px] font-extrabold px-2 py-0.5 rounded-full tracking-wider mt-1 border border-slate-700 shadow-sm flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>EN RUTA
                  </div>
                </div>
                <div className="absolute right-[20%] top-[35%] text-center">
                  <div className="w-5 h-5 bg-emerald-500 rounded-full border-4 border-white shadow-md mx-auto flex items-center justify-center text-white text-[8px]">⭐</div>
                  <span className="bg-white text-[10px] font-bold px-2 py-0.5 rounded shadow-xs block mt-1">Santa Ana</span>
                </div>
              </div>
            </div>

            <div className="w-full md:w-[420px] bg-white border-t md:border-t-0 md:border-l border-slate-200 flex flex-col h-full overflow-y-auto">
              <div className="p-6 border-b border-slate-100 bg-slate-50/50">
                <span className="text-[10px] font-black tracking-widest text-blue-600 bg-blue-50 px-2 py-1 rounded-md">Código de Rastreo</span>
                <h2 className="text-xl font-black text-slate-800 mt-1.5 mb-3">{infoPaquete.codigo}</h2>
              </div>
              <div className="p-6 flex-1 border-b border-slate-100">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Estado del Trayecto</h3>
                <div className="relative pl-6 space-y-6">
                  <div className="absolute left-[9px] top-2 bottom-2 w-0.5 bg-slate-200"></div>
                  {infoPaquete.pasos.map((paso) => (
                    <div key={paso.id} className="relative flex gap-4 items-start">
                      <div className={`absolute -left-[23px] w-5 h-5 rounded-full flex items-center justify-center border-4 border-white shadow-xs z-10 ${paso.completado ? 'bg-blue-600' : 'bg-slate-300'}`}></div>
                      <div className="flex-1">
                        <div className="flex justify-between items-baseline">
                          <h4 className="text-sm font-bold text-slate-800">{paso.titulo}</h4>
                          <span className="text-[10px] font-semibold text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">{paso.hora}</span>
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5">{paso.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

// ─── 2. ENRUTADOR PRINCIPAL (MANTIENE TUS RUTAS ORIGINALES Y AGREGA /GANANCIAS) ───
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/login" element={<Login />} />
        <Route path="/empleado" element={<Empleado />} />
        <Route path="/inicio-usuario" element={<InicioUsuario />} />
        <Route path="/ganancias" element={<Ganancias />} />
      </Routes>
    </Router>
  );
}

export default App;