import { useState } from "react";
import { 
  LayoutDashboard, 
  Truck, 
  Map, 
  DollarSign, 
  TrendingUp, 
  Users, 
  AlertTriangle, 
  Search, 
  Bell, 
  Plus, 
  Settings, 
  Download, 
  Save 
} from "lucide-react";

function Ganancias() {
  const [searchTerm, setSearchTerm] = useState("");

  const [rates, setRates] = useState([
    { id: 1, dept: "San Salvador", difficulty: "Low (Urban)", color: "bg-blue-50 text-blue-600 border-blue-200", multiplier: "1.00x", surcharges: "None" },
    { id: 2, dept: "La Libertad", difficulty: "Medium (Coast)", color: "bg-cyan-50 text-cyan-600 border-cyan-200", multiplier: "1.15x", surcharges: "Fuel Adj. (+2%)" },
    { id: 3, dept: "Santa Ana", difficulty: "Medium (Highland)", color: "bg-indigo-50 text-indigo-600 border-indigo-200", multiplier: "1.10x", surcharges: "None" },
    { id: 4, dept: "Chalatenango", difficulty: "High (Mountain)", color: "bg-orange-50 text-orange-600 border-orange-200", multiplier: "1.45x", surcharges: "Distance Levy" },
    { id: 5, dept: "San Miguel", difficulty: "Medium (East)", color: "bg-purple-50 text-purple-600 border-purple-200", multiplier: "1.25x", surcharges: "Regional Tax" },
  ]);

  const shipments = [
    { id: "SV-9921-X9", status: "In Transit", statusColor: "bg-emerald-100 text-emerald-700", eta: "14:30 · San Salvador", progress: "w-3/4 bg-blue-600" },
    { id: "SV-8842-P2", status: "Pick-up", statusColor: "bg-orange-100 text-orange-700", eta: "Awaiting Courier · Santa Tecla", progress: "w-1/4 bg-orange-500" },
    { id: "SV-7712-L1", status: "Delayed", statusColor: "bg-rose-100 text-rose-700", eta: "Weather Warning · La Unión", progress: "w-1/2 bg-rose-500" },
    { id: "SV-1123-Z0", status: "In Transit", statusColor: "bg-emerald-100 text-emerald-700", eta: "16:45 · San Miguel", progress: "w-5/6 bg-blue-600" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex">
      
      {/* ─── BARRA LATERAL IZQUIERDA ─── */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col justify-between hidden md:flex">
        <div>
          {/* Logo */}
          <div className="p-6 flex items-center gap-3 border-b border-slate-100">
            <div className="w-8 h-8 bg-blue-900 rounded-lg flex items-center justify-center text-white font-bold">
              📦
            </div>
            <span className="text-xl font-black tracking-tight text-slate-900">Logistics</span>
          </div>

          {/* Menú de Navegación */}
          <nav className="p-4 space-y-1">
            <button className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold rounded-xl bg-blue-50 text-blue-900 transition-all">
              <LayoutDashboard size={18} /> Menu Principal
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold rounded-xl text-slate-500 hover:bg-slate-50 hover:text-slate-800 transition-all">
              <Truck size={18} /> Repartidores
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold rounded-xl text-slate-500 hover:bg-slate-50 hover:text-slate-800 transition-all">
              <Map size={18} /> Panel de Empleados
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold rounded-xl text-slate-500 hover:bg-slate-50 hover:text-slate-800 transition-all">
              <DollarSign size={18} /> Salir
            </button>
           
          </nav>
        </div>

        {/* Footer de la Barra Lateral */}
        <div className="p-4 border-t border-slate-100 space-y-4">
          <button className="w-full bg-orange-800 hover:bg-orange-900 text-white font-bold text-sm py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-sm transition-all">
            <Plus size={16} /> New Shipment
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-2 text-sm font-semibold text-slate-500 hover:text-slate-800 transition-all">
            <Settings size={18} /> Settings
          </button>
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-3 flex items-center gap-3">
            <div className="w-9 h-9 bg-blue-600 rounded-lg text-white font-bold flex items-center justify-center text-xs shadow-sm">
              AD
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900">Admin User</h4>
              <p className="text-[10px] text-slate-500 font-medium">El Salvador Hub</p>
            </div>
          </div>
        </div>
      </aside>

      {/* ─── CONTENIDO PRINCIPAL ─── */}
      <main className="flex-1 flex flex-col min-w-0">
        
        {/* Barra Superior de Búsqueda */}
        <header className="bg-white border-b border-slate-200 h-16 px-8 flex items-center justify-between gap-4 sticky top-0 z-10">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Track shipment ID..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-sm outline-none focus:border-blue-500 focus:bg-white transition-all"
            />
          </div>
          <button className="p-2 text-slate-400 hover:text-slate-600 relative rounded-xl hover:bg-slate-50">
            <Bell size={20} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full"></span>
          </button>
        </header>

        {/* Contenedor del Dashboard */}
        <div className="p-8 space-y-8 flex-1 overflow-y-auto max-w-7xl w-full mx-auto">
          
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Logistics Control Panel</h1>
            <p className="text-xs font-semibold text-slate-500 mt-0.5">Real-time distribution metrics for El Salvador</p>
          </div>

          {/* ─── TARJETAS DE MÉTRICAS (KPIs) ─── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
              <div className="flex justify-between items-start text-slate-400">
                <span className="text-[11px] font-black uppercase tracking-wider">Total Deliveries Today</span>
                <Truck size={20} className="text-slate-700" />
              </div>
              <div className="mt-4">
                <h3 className="text-3xl font-black text-slate-900 leading-none">1,284</h3>
                <span className="text-[11px] text-emerald-600 font-bold flex items-center gap-1 mt-2">
                  📈 +12.5% from yesterday
                </span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
              <div className="flex justify-between items-start text-slate-400">
                <span className="text-[11px] font-black uppercase tracking-wider">Active Couriers</span>
                <Users size={20} className="text-amber-600" />
              </div>
              <div className="mt-4">
                <h3 className="text-3xl font-black text-slate-900 leading-none">156</h3>
                <span className="text-[11px] text-slate-500 font-bold flex items-center gap-1 mt-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse"></span> 94% capacity utilization
                </span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
              <div className="flex justify-between items-start text-slate-400">
                <span className="text-[11px] font-black uppercase tracking-wider">Pending Issues</span>
                <AlertTriangle size={20} className="text-rose-500" />
              </div>
              <div className="mt-4">
                <h3 className="text-3xl font-black text-rose-600 leading-none">08</h3>
                <span className="text-[11px] text-rose-600 font-bold block mt-2">
                  ⚠ 3 Critical / 5 Delayed
                </span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
              <div className="flex justify-between items-start text-slate-400">
                <span className="text-[11px] font-black uppercase tracking-wider">Daily Revenue</span>
                <DollarSign size={20} className="text-blue-600" />
              </div>
              <div className="mt-4">
                <h3 className="text-3xl font-black text-slate-900 leading-none">$4,820</h3>
                <span className="text-[11px] text-slate-500 font-medium block mt-2">
                  Avg. $3.75 per delivery
                </span>
              </div>
            </div>
          </div>

          {/* ─── MAPA Y ENVÍOS ─── */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            <div className="lg:col-span-2 bg-blue-50 border border-blue-100 rounded-2xl p-6 relative min-h-[350px] flex flex-col justify-between overflow-hidden">
              <div className="relative z-10 bg-white border border-slate-200 rounded-xl p-3 self-start shadow-sm">
                <h4 className="text-xs font-black text-slate-900 flex items-center gap-1.5">🗺 Live Network View</h4>
                <p className="text-[10px] text-slate-500 font-medium mt-0.5">Showing 156 couriers in 14 departments</p>
              </div>

              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-3 h-3 bg-orange-500 rounded-full absolute left-1/4 top-1/3 animate-ping opacity-75"></div>
                <div className="w-2.5 h-2.5 bg-orange-600 rounded-full absolute left-1/4 top-1/3 shadow-sm"></div>
                <div className="w-2.5 h-2.5 bg-orange-600 rounded-full absolute left-1/3 top-1/2 shadow-sm"></div>
                <div className="w-2.5 h-2.5 bg-orange-600 rounded-full absolute left-1/2 top-1/3 shadow-sm"></div>
                <div className="w-3 h-3 bg-blue-900 rounded-full absolute left-1/3 top-1/3 border-2 border-white shadow-md"></div>
                <div className="w-2.5 h-2.5 bg-orange-600 rounded-full absolute right-1/4 top-2/3 shadow-sm"></div>
              </div>

              <div className="relative z-10 bg-white border border-slate-200 rounded-xl p-3 self-end flex gap-4 text-[10px] font-bold shadow-sm">
                <span className="flex items-center gap-1.5 text-slate-700"><span className="w-2 h-2 rounded-full bg-orange-600"></span> Active Transit</span>
                <span className="flex items-center gap-1.5 text-slate-700"><span className="w-2 h-2 rounded-full bg-blue-900"></span> Logistics Hub</span>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col justify-between shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-black text-slate-900">Live Shipments</h3>
                <button className="text-xs font-bold text-blue-600 hover:underline">View All</button>
              </div>
              
              <div className="space-y-3 flex-1">
                {shipments.map((ship, idx) => (
                  <div key={idx} className="border border-slate-100 rounded-xl p-3.5 space-y-2 hover:bg-slate-50 transition-all">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-black text-slate-900">{ship.id}</span>
                      <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${ship.statusColor}`}>{ship.status}</span>
                    </div>
                    <p className="text-[11px] text-slate-500 font-medium">{ship.eta}</p>
                    <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${ship.progress}`}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ─── SECCIÓN: RATE MANAGER ─── */}
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-50">
              <div>
                <h3 className="text-base font-black text-slate-900">Rate Manager</h3>
                <p className="text-xs text-slate-500 font-medium mt-0.5">Adjust pricing multipliers based on operational difficulty</p>
              </div>
              <div className="flex gap-2 w-full sm:w-auto">
                <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-white border border-slate-200 text-slate-700 font-bold text-xs px-4 py-2 rounded-xl hover:bg-slate-50 transition-all">
                  <Download size={14} /> Export CSV
                </button>
                <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-blue-950 text-white font-bold text-xs px-4 py-2 rounded-xl hover:bg-blue-900 shadow-sm transition-all">
                  <Save size={14} /> Save Changes
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 text-[11px] font-black text-slate-400 uppercase tracking-wider bg-slate-50">
                    <th className="py-4 px-6">Department</th>
                    <th className="py-4 px-6">Zone Difficulty</th>
                    <th className="py-4 px-6">Base Multiplier</th>
                    <th className="py-4 px-6">Active Surcharges</th>
                    <th className="py-4 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs font-semibold text-slate-700">
                  {rates.map((rate) => (
                    <tr key={rate.id} className="hover:bg-slate-50/50 transition-all">
                      <td className="py-4 px-6 font-bold text-slate-900">{rate.dept}</td>
                      <td className="py-4 px-6">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${rate.color}`}>
                          {rate.difficulty}
                        </span>
                      </td>
                      <td className="py-4 px-6 font-mono text-slate-900 font-bold">{rate.multiplier}</td>
                      <td className="py-4 px-6 text-slate-500">{rate.surcharges}</td>
                      <td className="py-4 px-6 text-right">
                        <button className="text-blue-600 font-bold hover:text-blue-800 transition-all">Edit</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-100 text-center">
              <button className="text-xs font-bold text-blue-900 hover:underline">
                Show all 14 Departments
              </button>
            </div>
          </div>

        </div>

        <footer className="h-14 border-t border-slate-200 px-8 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-400 font-medium bg-white mt-auto">
          <span>© 2026 Encomiendas SV. Logistics Excellence for El Salvador.</span>
          <div className="flex gap-4">
            <a href="#privacy" className="hover:underline">Privacy Policy</a>
            <a href="#terms" className="hover:underline">Terms of Service</a>
          </div>
        </footer>
      </main>
    </div>
  );
}

export default Ganancias;