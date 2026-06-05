import { useState, useEffect } from 'react';
import { 
  Box, 
  Truck, 
  MapPin, 
  Navigation, 
  Search, 
  ShieldCheck, 
  Clock, 
  Layers, 
  Compass, 
  ExternalLink,
  DollarSign,
  Building2,
  Headphones,
  Map,
  ArrowRight
} from 'lucide-react';

function InicioUsuario() {
  const [progresoMapa, setProgresoMapa] = useState(40);

  // Simulación de movimiento del camión en el mapa en tiempo real
  useEffect(() => {
    const intervalo = setInterval(() => {
      setProgresoMapa((prev) => (prev >= 85 ? 25 : prev + 2));
    }, 2000);
    return () => clearInterval(intervalo);
  }, []);

  const infoPaquete = {
    codigo: "LR-SV-845CC9",
    origen: "Agencia San Salvador Centro",
    destino: "Entrega Domicilio - Residencial Santa Teresa, Santa Tecla",
    repartidor: "Roberto Cardoza (Unidad 4)",
    tiempoEstimado: "25 - 40 min",
    pasos: [
      { id: 1, titulo: "Recibido en Agencia", desc: "Paquete registrado con éxito", hora: "08:30 AM", completado: true },
      { id: 2, titulo: "En Ruta de Distribución", desc: "La unidad va sobre la Carretera Panamericana", hora: "02:15 PM", completado: true },
      { id: 3, titulo: "En Manos del Repartidor", desc: "Unidad en camino hacia tu ubicación", hora: "En progreso", completado: false, actual: true },
    ] 
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 flex flex-col font-sans scrolling-smooth">
      
      {/* ─── BARRA DE NAVEGACIÓN (Enlaces con scroll de la imagen image_8afa6b.png) ─── */}
      <header className="bg-[#0b1329] text-white px-6 py-4 flex justify-between items-center border-b border-white/10 sticky top-0 z-50 shadow-md">
        <div className="flex items-center gap-2">
          <div className="bg-blue-600 p-1.5 rounded-lg text-white">
            <Truck size={20} />
          </div>
          <h2 className="text-sm font-black tracking-widest text-white">LA RUTA <span className="text-blue-400">| CLIENTES SV</span></h2>
        </div>
        <nav className="hidden md:flex gap-6 text-xs font-bold text-slate-300">
          <a href="#rastreo" className="hover:text-white transition-all">Rastreo</a>
          <a href="#tarifas" className="hover:text-white transition-all">Tarifas</a>
          <a href="#agencias" className="hover:text-white transition-all">Agencias</a>
          <a href="#soporte" className="hover:text-white transition-all">Soporte</a>
        </nav>
        <div className="text-[11px] bg-blue-500/10 border border-blue-500/30 text-blue-400 font-bold px-3 py-1 rounded-full">
          🇸🇻 El Salvador
        </div>
      </header>

      {/* ─── BLOQUE 1: HERO BANNER PRINCIPAL ─── */}
      <section className="bg-gradient-to-br from-[#0b1329] via-[#1c2541] to-[#3a506b] text-white pt-16 pb-28 px-4 text-center relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="max-w-3xl mx-auto space-y-4 relative z-10">
          <span className="text-xs font-black uppercase tracking-widest text-blue-400 bg-blue-500/10 px-4 py-1.5 rounded-full border border-blue-500/20">
            Logística Integrada Nacional
          </span>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-none text-white">
            Todo tu ecosistema logístico <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">En una sola plataforma.</span>
          </h1>
          <p className="text-slate-300 text-xs md:text-sm max-w-xl mx-auto font-medium">
            Consulta envíos en tiempo real, calcula tus tarifas de distribución y localiza nuestros puntos de recolección en todo el país.
          </p>
        </div>
      </section>

      {/* ─── CONTENEDOR DE SECCIONES CONTINUAS (Estilo Long-Page de c16280d4ee6401bb6d7dcef0eceb17fb.jpg) ─── */}
      <div className="max-w-5xl w-full mx-auto px-4 -mt-16 pb-16 relative z-20 space-y-12">
        
        {/* ─── SECCIÓN A: RASTREO Y MAPA EN VIVO (ID: rastreo) ─── */}
        <section id="rastreo" className="bg-white rounded-3xl border border-slate-200/80 shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 scroll-mt-24">
          
          {/* Ficha Lateral de Datos */}
          <div className="lg:col-span-4 bg-slate-50 border-r border-slate-100 p-6 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <span className="text-[10px] font-black uppercase text-blue-900 tracking-wider flex items-center gap-1">
                <Box size={12} /> Estado de Envío Activo
              </span>
              <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-xs">
                <p className="text-xs text-slate-400 font-bold mb-0.5">Código de Guía</p>
                <p className="text-base font-mono font-black text-slate-900">{infoPaquete.codigo}</p>
              </div>

              <div className="space-y-3 pt-2 text-xs font-semibold text-slate-600">
                <div className="flex items-start gap-2">
                  <MapPin size={16} className="text-slate-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] font-black uppercase text-slate-400 block">Origen</span>
                    <p className="text-slate-900 font-bold">{infoPaquete.origen}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Navigation size={16} className="text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] font-black uppercase text-blue-500 block">Destino</span>
                    <p className="text-slate-900 font-bold">{infoPaquete.destino}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 p-3 rounded-xl border border-blue-100/60 text-[11px] font-medium text-blue-800">
              <p className="font-bold flex items-center gap-1 mb-0.5">
                <Clock size={12} /> Reparto en progreso
              </p>
              El camión avanza por geolocalización automatizada.
            </div>
          </div>

          {/* Línea de tiempo + Mapa unificados en el panel derecho */}
          <div className="lg:col-span-8 p-6 md:p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Bitácora de pasos física */}
              <div className="space-y-4">
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider">Historial de Ruta</h3>
                <div className="relative border-l-2 border-slate-200 ml-2 pl-4 space-y-4">
                  {infoPaquete.pasos.map((paso) => (
                    <div key={paso.id} className="relative text-xs">
                      <span className={`absolute -left-[23px] top-0.5 w-3 h-3 rounded-full border bg-white ${
                        paso.actual ? 'border-amber-500 bg-amber-500 ring-4 ring-amber-100' : paso.completado ? 'border-emerald-500 bg-emerald-500' : 'border-slate-300'
                      }`} />
                      <div className="font-bold">
                        <p className={paso.actual ? 'text-amber-600' : 'text-slate-800'}>{paso.titulo}</p>
                        <span className="text-[10px] text-slate-400 font-normal">{paso.desc} ({paso.hora})</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mini Mapa de Monitoreo Dinámico */}
              <div className="space-y-2">
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider flex justify-between items-center">
                  <span>Ubicación GPS en Vivo</span>
                  <span className="text-[10px] text-amber-600 font-bold animate-pulse">● {infoPaquete.tiempoEstimado}</span>
                </h3>
                
                <div className="bg-slate-100 border border-slate-200 rounded-xl h-44 relative overflow-hidden shadow-inner flex items-center justify-center">
                  <div className="absolute inset-0 opacity-15" style={{ 
                    backgroundImage: 'radial-gradient(#3b82f6 1px, transparent 1px), radial-gradient(#3b82f6 1px, #f1f5f9 1px)', 
                    backgroundSize: '15px 15px' 
                  }}></div>

                  {/* Carretera Simulada */}
                  <svg className="absolute inset-0 w-full h-full stroke-slate-300 stroke-[4] fill-none">
                    <path d="M 30,130 Q 120,40 220,110 T 380,50" stroke="#cbd5e1" strokeWidth="6" />
                    <path d="M 30,130 Q 120,40 220,110 T 380,50" stroke="#3b82f6" strokeWidth="2" strokeDasharray="4,4" />
                  </svg>

                  {/* Marcador Cliente Final */}
                  <div className="absolute right-[40px] top-[45px] flex flex-col items-center">
                    <MapPin size={16} className="text-emerald-600 drop-shadow-xs animate-bounce" />
                  </div>

                  {/* Vehículo en Movimiento Continuo */}
                  <div 
                    className="absolute bg-[#0b1329] text-white py-1 px-2 rounded-lg shadow-lg flex items-center gap-1 transition-all duration-1000 ease-in-out"
                    style={{ left: `${progresoMapa}%`, top: `${110 - (progresoMapa * 0.5)}px` }}
                  >
                    <Truck size={10} className="text-white" />
                    <span className="text-[8px] font-black font-mono">LA RUTA</span>
                  </div>
                </div>
                <p className="text-[10px] text-slate-400 font-semibold text-center italic">Operando en Carretera Panamericana SV</p>
              </div>

            </div>
          </div>
        </section>

        {/* ─── SECCIÓN B: TARIFAS Y COSTOS DE ENVÍO (ID: tarifas) ─── */}
        <section id="tarifas" className="bg-white rounded-3xl border border-slate-200/80 p-6 md:p-8 shadow-xl space-y-6 scroll-mt-24">
          <div className="border-b border-slate-100 pb-3">
            <h2 className="text-base font-black text-slate-900 flex items-center gap-2">
              <DollarSign size={18} className="text-blue-600" /> Tarifas de Envío Nacionales
            </h2>
            <p className="text-xs text-slate-500 font-medium">Costos estandarizados competitivos para comercios y personas particulares.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="border border-slate-200 rounded-2xl p-4 bg-slate-50/50 space-y-2">
              <span className="font-black text-blue-900 uppercase text-[10px] tracking-wider block">Zona Central</span>
              <p className="text-xl font-black text-slate-900">$3.50 <span className="text-[11px] text-slate-400 font-medium">Base</span></p>
              <p className="text-slate-500 text-[11px] font-semibold">San Salvador, La Libertad, Cuscatlán. Entrega en menos de 24 horas hábiles.</p>
            </div>
            <div className="border border-slate-200 rounded-2xl p-4 bg-slate-50/50 space-y-2">
              <span className="font-black text-purple-900 uppercase text-[10px] tracking-wider block">Zonas Departamentales</span>
              <p className="text-xl font-black text-slate-900">$5.00 <span className="text-[11px] text-slate-400 font-medium">Fijo</span></p>
              <p className="text-slate-500 text-[11px] font-semibold">Santa Ana, San Miguel, Sonsonate, Ahuachapán, Usulután y demás cabeceras.</p>
            </div>
            <div className="border border-blue-200 bg-blue-50/30 rounded-2xl p-4 space-y-2">
              <span className="font-black text-emerald-700 uppercase text-[10px] tracking-wider block">Servicio COD (Contra Entrega)</span>
              <p className="text-xl font-black text-slate-900">+$1.00 <span className="text-[11px] text-slate-400 font-medium">Adicional</span></p>
              <p className="text-slate-500 text-[11px] font-semibold">Recolectamos el dinero en efectivo de tu venta y te lo liquidamos en tiempo récord.</p>
            </div>
          </div>
        </section>

        {/* ─── SECCIÓN C: NUESTRAS AGENCIAS (ID: agencias) ─── */}
        <section id="agencias" className="bg-white rounded-3xl border border-slate-200/80 p-6 md:p-8 shadow-xl space-y-6 scroll-mt-24">
          <div className="border-b border-slate-100 pb-3">
            <h2 className="text-base font-black text-slate-900 flex items-center gap-2">
              <Building2 size={18} className="text-blue-600" /> Cobertura y Puntos de Entrega
            </h2>
            <p className="text-xs text-slate-500 font-medium">Estaciones físicas para recolectar o retirar tus paquetes directamente sin costo extra.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs font-semibold">
            <div className="border border-slate-100 rounded-xl p-3 hover:bg-slate-50 transition-all">
              <p className="font-black text-slate-900">Agencia San Salvador Centro</p>
              <p className="text-slate-400 text-[11px] font-medium">Calle Arce, #412 frente a plazas comerciales.</p>
              <span className="text-[10px] text-emerald-600 font-bold block mt-1">Abierto: 8:00 AM - 5:30 PM</span>
            </div>
            <div className="border border-slate-100 rounded-xl p-3 hover:bg-slate-50 transition-all">
              <p className="font-black text-slate-900">Agencia Santa Ana</p>
              <p className="text-slate-400 text-[11px] font-medium">Avenida Independencia Sur, contiguo a Catedral.</p>
              <span className="text-[10px] text-emerald-600 font-bold block mt-1">Abierto: 8:00 AM - 5:00 PM</span>
            </div>
            <div className="border border-slate-100 rounded-xl p-3 hover:bg-slate-50 transition-all">
              <p className="font-black text-slate-900">Agencia San Miguel</p>
              <p className="text-slate-400 text-[11px] font-medium">Ruta Militar, Plaza San Francisco Local #5.</p>
              <span className="text-[10px] text-emerald-600 font-bold block mt-1">Abierto: 8:00 AM - 5:00 PM</span>
            </div>
          </div>
        </section>

        {/* ─── SECCIÓN D: SOPORTE Y CONTACTO (ID: soporte) ─── */}
        <section id="soporte" className="bg-gradient-to-r from-[#0b1329] to-[#1c2541] rounded-3xl p-6 md:p-8 text-white shadow-xl grid grid-cols-1 md:grid-cols-12 gap-6 items-center scroll-mt-24">
          <div className="md:col-span-7 space-y-2">
            <span className="text-[10px] font-black uppercase text-blue-400 tracking-wider flex items-center gap-1">
              <Headphones size={12} /> Soporte Inmediato
            </span>
            <h3 className="text-xl font-black tracking-tight">¿Tienes algún inconveniente con tu entrega?</h3>
            <p className="text-slate-300 text-xs font-medium max-w-md">
              Nuestro equipo de atención al cliente está listo para ayudarte con reclamos de guías, cambios de dirección o retrasos climáticos.
            </p>
          </div>
          <div className="md:col-span-5 flex flex-col sm:flex-row gap-2 md:justify-end">
            <a 
              href="https://wa.me/50370000000" 
              target="_blank" 
              rel="noreferrer" 
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-5 py-3 rounded-xl transition-all text-center shadow-md whitespace-nowrap"
            >
              Contactar por WhatsApp
            </a>
            <button className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs px-5 py-3 rounded-xl transition-all text-center">
              Abrir Ticket Técnico
            </button>
          </div>
        </section>

      </div>

      {/* ─── SECCIÓN DE VALORES Y FIABILIDAD ─── */}
      <section className="bg-white border-t border-slate-200 py-12 px-4 text-center">
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-4 space-y-2 flex flex-col items-center">
            <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-900"><ShieldCheck size={20} /></div>
            <h4 className="text-xs font-black uppercase text-slate-900 tracking-wider">Seguridad Total</h4>
            <p className="text-[11px] text-slate-500 font-semibold">Tus paquetes viajan asegurados mediante estrictos controles de sellos de carga.</p>
          </div>
          <div className="p-4 space-y-2 flex flex-col items-center">
            <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-900"><Clock size={20} /></div>
            <h4 className="text-xs font-black uppercase text-slate-900 tracking-wider">Tiempos Optimizados</h4>
            <p className="text-[11px] text-slate-500 font-semibold">Mapeo logístico inteligente para cubrir todas las zonas del país sin demoras.</p>
          </div>
          <div className="p-4 space-y-2 flex flex-col items-center">
            <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-900"><Layers size={20} /></div>
            <h4 className="text-xs font-black uppercase text-slate-900 tracking-wider">Cobertura Nacional</h4>
            <p className="text-[11px] text-slate-500 font-semibold">Llegamos hasta el último rincón de los 14 departamentos de El Salvador.</p>
          </div>
        </div>
      </section>

      {/* ─── FOOTER CORPORATIVO ─── */}
      <footer className="bg-[#0b1329] text-slate-400 text-[11px] font-semibold py-6 px-6 border-t border-white/5 text-center sm:flex sm:justify-between sm:items-center mt-auto">
        <p>© 2026 La Ruta SV. Todos los derechos reservados.</p>
        <div className="flex justify-center gap-4 mt-2 sm:mt-0 font-bold">
          <a href="#" className="hover:text-white transition-all">Términos</a>
          <a href="#" className="hover:text-white transition-all">Privacidad</a>
          <a href="#" className="hover:text-white transition-all flex items-center gap-0.5">Módulo API <ExternalLink size={10} /></a>
        </div>
      </footer>

    </div>
  );
}

export default InicioUsuario;