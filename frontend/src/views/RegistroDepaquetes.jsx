import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Search, 
  Package, 
  TrendingUp, 
  Clock, 
  FileText, 
  RefreshCw, 
  ArrowLeft 
} from "lucide-react";

function RegistroDePaquetes() {
  const navigate = useNavigate();
  
  const [encomiendas, setEncomiendas] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [cargando, setCargando] = useState(true);

  // 📡 ACTUALIZACIÓN MANUAL (Puerto 5000)
  const actualizarHistorialManual = async () => {
    try {
      setCargando(true);
      const respuesta = await fetch("http://localhost:5000/api/encomiendas/historial");
      if (respuesta.ok) {
        const datos = await respuesta.json();
        setEncomiendas(datos);
      }
    } catch (error) {
      console.error("Error de conexión manual con el backend:", error);
    } finally {
      setCargando(false);
    }
  };

  // 🔥 CARGA AUTOMÁTICA INICIAL (Puerto 5000)
  useEffect(() => {
    let activo = true;

    async function pedirDatosIniciales() {
      try {
        const respuesta = await fetch("http://localhost:5000/api/encomiendas/historial");
        if (respuesta.ok && activo) {
          const datos = await respuesta.json();
          setEncomiendas(datos);
        }
      } catch (error) {
        console.error("Error en la carga inicial de datos:", error);
      } finally {
        if (activo) {
          setCargando(false);
        }
      }
    }

    pedirDatosIniciales();

    return () => {
      activo = false;
    };
  }, []);

  // 🔍 BUSCADOR INTELIGENTE
  const encomiendasFiltradas = encomiendas.filter((enc) => {
    const buscar = searchTerm.toLowerCase();
    const clienteNombre = (enc.cliente || enc.remitenteNombre || "").toLowerCase();
    const deptoDestino = (enc.departamento || enc.destinoAgencia || "").toLowerCase();
    
    return (
      (enc.codigoGuia && enc.codigoGuia.toLowerCase().includes(buscar)) ||
      clienteNombre.includes(buscar) ||
      deptoDestino.includes(buscar)
    );
  });

  // 📊 MÉTRICAS
  const totalEnvios = encomiendas.length;
  const totalGanancias = encomiendas.reduce((acc, enc) => {
    const precio = enc.tarifaCalculada || enc.costoEnvio || 0;
    return acc + (parseFloat(precio) || 0);
  }, 0).toFixed(2);
  const enviosPendientes = encomiendas.filter(enc => enc.estado === "En Ruta" || enc.estado === "Pendiente").length;

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-100 p-6 font-sans">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <button 
            onClick={() => navigate(-1)} 
            className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-blue-400 transition-all uppercase tracking-widest mb-2"
          >
            <ArrowLeft size={14} /> Volver al panel
          </button>
          <h1 className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
            Historial de Encomiendas Realizadas
          </h1>
        </div>

        <button 
          onClick={actualizarHistorialManual}
          className="flex items-center gap-2 bg-slate-800/60 hover:bg-slate-800 border border-slate-700/80 text-slate-300 text-xs font-bold px-4 py-2.5 rounded-xl transition-all"
        >
          <RefreshCw size={14} className={cargando ? "animate-spin" : ""} /> Actualizar Tabla
        </button>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
        <div className="bg-[#1e293b]/40 border border-slate-800 p-5 rounded-2xl flex items-center justify-between">
          <div>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Total Envíos</p>
            <h3 className="text-3xl font-black text-white">{totalEnvios}</h3>
          </div>
          <div className="p-3 bg-blue-500/10 text-blue-400 rounded-xl"><Package size={24} /></div>
        </div>

        <div className="bg-[#1e293b]/40 border border-slate-800 p-5 rounded-2xl flex items-center justify-between">
          <div>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Caja Estimada</p>
            <h3 className="text-3xl font-black text-emerald-400">${totalGanancias}</h3>
          </div>
          <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl"><TrendingUp size={24} /></div>
        </div>

        <div className="bg-[#1e293b]/40 border border-slate-800 p-5 rounded-2xl flex items-center justify-between">
          <div>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">En Distribución</p>
            <h3 className="text-3xl font-black text-amber-400">{enviosPendientes}</h3>
          </div>
          <div className="p-3 bg-amber-500/10 text-amber-400 rounded-xl"><Clock size={24} /></div>
        </div>
      </section>

      <div className="relative mb-6 max-w-md">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
        <input 
          type="text" 
          placeholder="Buscar por código de guía, cliente o sede..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-[#1e293b]/40 border border-slate-800 text-slate-200 placeholder-slate-500 text-xs pl-10 pr-4 py-3 rounded-xl focus:outline-none focus:border-blue-500 transition-all font-medium"
        />
      </div>

      <div className="bg-[#1e293b]/20 border border-slate-800/80 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 text-[11px] font-bold uppercase tracking-widest bg-[#1e293b]/50">
                <th className="py-4 px-5">Código Guía</th>
                <th className="py-4 px-5">Cliente / Remitente</th>
                <th className="py-4 px-5">Destino (Sede)</th>
                <th className="py-4 px-5">Producto</th>
                <th className="py-4 px-5">Tarifa</th>
                <th className="py-4 px-5">Estado</th>
                <th className="py-4 px-5 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-xs font-medium">
              {cargando ? (
                <tr>
                  <td colSpan="7" className="text-center py-10 text-slate-500">
                    <span className="inline-block animate-spin mr-2">⏳</span> Cargando historial logístico...
                  </td>
                </tr>
              ) : encomiendasFiltradas.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-10 text-slate-500">
                    🚫 No se encontraron encomiendas.
                  </td>
                </tr>
              ) : (
                encomiendasFiltradas.map((enc) => (
                  <tr key={enc._id} className="hover:bg-slate-800/30 transition-all group">
                    <td className="py-4 px-5 text-blue-400 font-bold tracking-wider">
                      {enc.codigoGuia || "S/G"}
                    </td>
                    <td className="py-4 px-5 text-slate-200">
                      <div className="font-semibold">{enc.cliente || enc.remitenteNombre || "No especificado"}</div>
                      <div className="text-[10px] text-slate-500 font-normal">{enc.telefono || "Sin teléfono"}</div>
                    </td>
                    <td className="py-4 px-5 text-slate-300">
                      {enc.departamento || enc.destinoAgencia || "No asignado"}
                    </td>
                    <td className="py-4 px-5 text-slate-400">
                      {enc.producto || "Varios"}
                    </td>
                    <td className="py-4 px-5 font-bold text-emerald-400">
                      ${parseFloat(enc.tarifaCalculada || enc.costoEnvio || 0).toFixed(2)}
                    </td>
                    <td className="py-4 px-5">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        enc.estado === "Entregado" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" :
                        enc.estado === "En Ruta" ? "bg-blue-500/10 text-blue-400 border border-blue-500/20" :
                        "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                      }`}>
                        {enc.estado || "Pendiente"}
                      </span>
                    </td>
                    <td className="py-4 px-5 text-center">
                      <button 
                        onClick={() => alert(`Guía: ${enc.codigoGuia || 'S/G'}\nCliente: ${enc.cliente || enc.remitenteNombre}\nDetalle: ${enc.direccionDetalle || 'No especificado'}`)}
                        className="p-2 bg-slate-800 hover:bg-blue-500/20 hover:text-blue-400 border border-slate-700/60 rounded-lg transition-all text-slate-400"
                      >
                        <FileText size={14} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default RegistroDePaquetes;