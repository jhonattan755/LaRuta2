import { useState } from "react";
import { 
  Package, 
  MapPin, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  ChevronRight, 
  Phone, 
  Search, 
  User,
  Navigation,
  ExternalLink
} from "lucide-react";

function Repartidores() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  // Datos simulados de los paquetes asignados al repartidor actual
  const [assignedPackages, setAssignedPackages] = useState([
    {
      id: "LR-2026-A1",
      customer: "María López",
      phone: "+503 7123-4567",
      address: "Colonia Escalón, Pasaje 3, #124",
      destination: "San Salvador",
      status: "Pendiente",
      type: "Estándar",
      codAmount: 0, // Cobro contra entrega
    },
    {
      id: "LR-2026-B4",
      customer: "Juan Carlos Pérez",
      phone: "+503 7845-1290",
      address: "Residencial Santa Teresa, Senda 5, Block C",
      destination: "Santa Tecla, La Libertad",
      status: "En Ruta",
      type: "Prioritario",
      codAmount: 25.00,
    },
    {
      id: "LR-2026-C8",
      customer: "Distribuidora Kemuel",
      phone: "+503 2255-8888",
      address: "6a Calle Oriente, Barrio El Centro",
      destination: "San Miguel",
      status: "Entregado",
      type: "Estándar",
      codAmount: 0,
    },
    {
      id: "LR-2026-D9",
      customer: "Elena Mendoza",
      phone: "+503 6011-2233",
      address: "Frente al Parque Central de Chalatenango",
      destination: "Chalatenango",
      status: "Incidencia",
      type: "Estándar",
      codAmount: 15.50,
      notes: "Dirección incompleta / No responde teléfono"
    },
    {
      id: "LR-2026-E2",
      customer: "Carlos Andrade",
      phone: "+503 7599-8844",
      address: "Urbanización Altavista, Polígono 14",
      destination: "Ilopango, San Salvador",
      status: "Pendiente",
      type: "Prioritario",
      codAmount: 40.00,
    }
  ]);

  // Contadores para las tarjetas de arriba
  const totalAsignados = assignedPackages.length;
  const entregados = assignedPackages.filter(p => p.status === "Entregado").length;
  const pendientes = assignedPackages.filter(p => p.status === "Pendiente" || p.status === "En Ruta").length;
  const incidencias = assignedPackages.filter(p => p.status === "Incidencia").length;

  // Filtrado de paquetes según búsqueda y pestañas
  const filteredPackages = assignedPackages.filter(p => {
    const matchesSearch = p.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          p.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.destination.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filterStatus === "all") return matchesSearch;
    if (filterStatus === "pendientes") return matchesSearch && (p.status === "Pendiente" || p.status === "En Ruta");
    if (filterStatus === "entregados") return matchesSearch && p.status === "Entregado";
    if (filterStatus === "incidencias") return matchesSearch && p.status === "Incidencia";
    return matchesSearch;
  });

  // Estilos rápidos para los badges de estado
  const getStatusBadge = (status) => {
    switch (status) {
      case "Entregado":
        return "bg-emerald-100 text-emerald-700 border-emerald-200";
      case "En Ruta":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "Incidencia":
        return "bg-rose-100 text-rose-700 border-rose-200";
      default:
        return "bg-amber-100 text-amber-700 border-amber-200";
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans pb-12">
      
      {/* ─── ENCABEZADO DEL REPARTIDOR ─── */}
      <header className="bg-blue-900 text-white shadow-md">
        <div className="max-w-4xl mx-auto px-4 py-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center border border-white/20">
              <User size={24} className="text-white" />
            </div>
            <div>
              <p className="text-xs text-blue-200 font-medium">Unidad de Reparto Asignada</p>
              <h1 className="text-lg font-black tracking-tight">Roberto Cardoza (Ruta Centro-Oriente)</h1>
            </div>
          </div>
          <div className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs px-3 py-1.5 rounded-full font-bold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span> Turno Activo
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 mt-6 space-y-6">

        {/* ─── TARJETAS DE RESUMEN DE JORNADA ─── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
            <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Asignados</span>
            <h3 className="text-2xl font-black text-slate-900 mt-1">{totalAsignados}</h3>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
            <span className="text-[10px] font-black uppercase text-emerald-600 tracking-wider">Entregados</span>
            <h3 className="text-2xl font-black text-emerald-600 mt-1">{entregados}</h3>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
            <span className="text-[10px] font-black uppercase text-amber-600 tracking-wider">Pendientes</span>
            <h3 className="text-2xl font-black text-amber-600 mt-1">{pendientes}</h3>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
            <span className="text-[10px] font-black uppercase text-rose-600 tracking-wider">Incidencias</span>
            <h3 className="text-2xl font-black text-rose-600 mt-1">{incidencias}</h3>
          </div>
        </div>

        {/* ─── FILTROS Y BUSCADOR ─── */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Buscar por ID, cliente o destino..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:bg-white transition-all"
            />
          </div>

          {/* Tabs de estado */}
          <div className="flex gap-1.5 overflow-x-auto pb-1 text-xs font-bold">
            <button 
              onClick={() => setFilterStatus("all")}
              className={`px-4 py-2 rounded-lg transition-all ${filterStatus === "all" ? "bg-blue-900 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>
              Todos ({totalAsignados})
            </button>
            <button 
              onClick={() => setFilterStatus("pendientes")}
              className={`px-4 py-2 rounded-lg transition-all ${filterStatus === "pendientes" ? "bg-blue-900 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>
              Por Entregar ({pendientes})
            </button>
            <button 
              onClick={() => setFilterStatus("entregados")}
              className={`px-4 py-2 rounded-lg transition-all ${filterStatus === "entregados" ? "bg-blue-900 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>
              Entregados ({entregados})
            </button>
            <button 
              onClick={() => setFilterStatus("incidencias")}
              className={`px-4 py-2 rounded-lg transition-all ${filterStatus === "incidencias" ? "bg-blue-900 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>
              Incidencias ({incidencias})
            </button>
          </div>
        </div>

        {/* ─── LISTADO DE PAQUETES ASIGNADOS ─── */}
        <div className="space-y-4">
          <h2 className="text-sm font-black text-slate-500 uppercase tracking-wider px-1">Manifiesto de Carga / Guías</h2>

          {filteredPackages.length === 0 ? (
            <div className="bg-white border border-dashed border-slate-300 rounded-2xl p-8 text-center text-slate-400 text-sm font-medium">
              No se encontraron paquetes con los filtros aplicados.
            </div>
          ) : (
            filteredPackages.map((pack) => (
              <div key={pack.id} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs flex flex-col md:flex-row justify-between gap-4 hover:border-slate-300 transition-all">
                
                {/* Bloque Izquierdo: Datos del Paquete y Destino */}
                <div className="space-y-3 flex-1">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <span className="text-sm font-black text-slate-900 flex items-center gap-1.5">
                      <Package size={16} className="text-blue-900" /> {pack.id}
                    </span>
                    <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border ${getStatusBadge(pack.status)}`}>
                      {pack.status}
                    </span>
                    {pack.type === "Prioritario" && (
                      <span className="text-[10px] font-extrabold bg-orange-100 text-orange-700 border border-orange-200 px-2.5 py-0.5 rounded-full animate-pulse">
                        ⚡ URGENTE
                      </span>
                    )}
                  </div>

                  {/* Información del Cliente */}
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{pack.customer}</h4>
                    <a href={`tel:${pack.phone}`} className="text-xs text-blue-600 font-bold flex items-center gap-1 mt-0.5 hover:underline">
                      <Phone size={12} /> {pack.phone}
                    </a>
                  </div>

                  {/* Destino Geográfico */}
                  <div className="flex items-start gap-1.5 text-xs text-slate-600 font-medium">
                    <MapPin size={16} className="text-slate-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-slate-900 block">{pack.destination}</span>
                      <p className="text-slate-500 text-[11px] mt-0.5">{pack.address}</p>
                    </div>
                  </div>

                  {/* Si hay notas por incidencia */}
                  {pack.notes && (
                    <div className="bg-rose-50 border border-rose-100 rounded-xl p-2.5 text-[11px] font-semibold text-rose-700 flex items-start gap-1.5">
                      <AlertCircle size={14} className="shrink-0 mt-0.5" />
                      <span>{pack.notes}</span>
                    </div>
                  )}
                </div>

                {/* Bloque Derecho: Cobros, Waze/Maps y Acciones Rápidas */}
                <div className="flex flex-row md:flex-col justify-between items-end md:justify-center gap-3 border-t md:border-t-0 border-slate-100 pt-4 md:pt-0 shrink-0 min-w-[140px]">
                  
                  {/* Cobro Contra Entrega */}
                  <div className="text-left md:text-right">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Monto a Cobrar</p>
                    <p className={`text-lg font-black ${pack.codAmount > 0 ? "text-emerald-600" : "text-slate-400"}`}>
                      {pack.codAmount > 0 ? `$${pack.codAmount.toFixed(2)}` : "Ya Pagado"}
                    </p>
                  </div>

                  {/* Boton de navegación y acciones */}
                  <div className="flex gap-2">
                    <a 
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(pack.address + ", " + pack.destination)}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-2 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-xl text-slate-700 transition-all flex items-center justify-center"
                      title="Ver en mapa">
                      <Navigation size={16} />
                    </a>
                    
                    <button className="bg-blue-900 hover:bg-blue-950 text-white font-bold text-xs py-2 px-3.5 rounded-xl flex items-center gap-1.5 shadow-xs transition-all">
                      Gestionar <ChevronRight size={14} />
                    </button>
                  </div>

                </div>

              </div>
            ))
          )}
        </div>

      </main>
    </div>
  );
}

export default Repartidores;