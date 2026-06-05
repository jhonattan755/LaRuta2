import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegistroDepaquetes = () => {
  const navigate = useNavigate();

  // --- ESTADOS DE BÚSQUEDA Y DATOS ---
  const [criterioBusqueda, setCriterioBusqueda] = useState('');
  const [paqueteEncontrado, setPaqueteEncontrado] = useState(null);
  
  // --- ESTADOS PARA MODALES DE SEGURIDAD ---
  const [mostrarModalAdmin, setMostrarModalAdmin] = useState(false);
  const [accionPendiente, setAccionPendiente] = useState(''); // 'editar' o 'eliminar'
  const [passwordAdmin, setPasswordAdmin] = useState('');

  // --- ESTADOS DE EDICIÓN DEL FORMULARIO ---
  const [estaEditando, setEstaEditando] = useState(false);
  const [datosPaquete, setDatosPaquete] = useState({
    nombreCliente: '',
    telefono: '',
    tipoProducto: 'Ropa / Calzado',
    peso: 0,
    largo: 0,
    ancho: 0,
    alto: 0,
    departamento: 'Ahuachapán',
    sedeLogistica: 'Ahuachapán (Sede Central)',
    indicaciones: '',
    costo: 0
  });

  // Estilos globales de tus inputs
  const estiloInput = "w-full bg-[#111827]/80 border border-slate-700 text-slate-200 placeholder-slate-500 text-sm px-4 py-2.5 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all";
  const estiloLabel = "block text-xs font-bold text-slate-400 mb-1.5 uppercase tracking-widest px-1";

  // --- 🔍 SIMULACIÓN DE BÚSQUEDA DEL PAQUETE ---
  const manejarBusqueda = async (e) => {
    e.preventDefault();
    if (!criterioBusqueda) return alert('Ingresa un nombre de cliente o ID de paquete.');

    try {
      // 🚀 Endpoint ficticio para buscar el paquete en tu backend Node/Express
      // const respuesta = await fetch(`http://localhost:5000/api/paquetes/buscar?q=${criterioBusqueda}`);
      // const datos = await respuesta.json();
      
      // Simulación de datos recuperados (idénticos a la estructura de la captura del empleado)
      const mockPaquete = {
        nombreCliente: 'Jhonattan Sanchez',
        telefono: '7777-7777',
        tipoProducto: 'Ropa / Calzado',
        peso: 12,
        largo: 30,
        ancho: 20,
        alto: 15,
        departamento: 'Ahuachapán',
        sedeLogistica: 'Ahuachapán (Sede Central)',
        indicaciones: 'Detrás de la alcaldía, portón negro',
        costo: 15.50
      };

      setPaqueteEncontrado(mockPaquete);
      setDatosPaquete(mockPaquete);
      setEstaEditando(false);
    } catch (error) {
      alert('Error al conectar con el servidor.');
    }
  };

  // --- 🔐 CONTROL DE AUTORIZACIÓN PARA EL ADMIN ---
  const abrirVerificacionAdmin = (accion) => {
    if (!paqueteEncontrado) return;
    setAccionPendiente(accion);
    setPasswordAdmin('');
    setMostrarModalAdmin(true);
  };

  const ejecutarAccionAutorizada = async () => {
    // 🚀 Validación de credenciales en tu Backend
    if (passwordAdmin === 'admin123') { // Cambiar por tu validación real en la API
      setMostrarModalAdmin(false);
      
      if (accionPendiente === 'eliminar') {
        // Lógica para fetch DELETE
        alert('Paquete eliminado correctamente del sistema.');
        setPaqueteEncontrado(null);
      } else if (accionPendiente === 'editar') {
        setEstaEditando(true);
      }
    } else {
      alert('Contraseña de administrador incorrecta. Acción denegada.');
    }
  };

  // --- 💾 GUARDAR CAMBIOS EDITADOS ---
  const guardarCambios = async (e) => {
    e.preventDefault();
    // Aquí mandas el fetch PUT/PATCH a tu backend local
    alert('Cambios guardados exitosamente en la base de datos.');
    setPaqueteEncontrado(datosPaquete);
    setEstaEditando(false);
  };

  return (
    <div className="min-h-screen w-screen bg-[#111827] flex flex-col font-sans text-white p-4 md:p-8 overflow-x-hidden">
      
      {/* HEADER DE LA SECCIÓN */}
      <div className="max-w-6xl w-full mx-auto flex flex-col md:flex-row justify-between items-center mb-8 gap-4 border-b border-slate-800 pb-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#1e3a8a] rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg">📍</div>
          <div>
            <h1 className="text-2xl font-black tracking-tight text-white uppercase">Control e Historial de Paquetes</h1>
            <span className="text-xs text-slate-500 font-bold tracking-widest">SISTEMA CENTRALIZADO LA RUTA</span>
          </div>
        </div>
        <button 
          onClick={() => navigate(-1)}
          className="bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold py-2 px-5 rounded-full text-xs uppercase tracking-widest transition-all border border-slate-700"
        >
          Volver Atrás
        </button>
      </div>

      {/* BARRA DE BÚSQUEDA */}
      <div className="max-w-6xl w-full mx-auto mb-8">
        <form onSubmit={manejarBusqueda} className="flex gap-3 max-w-xl bg-[#1e293b]/40 p-2 rounded-full border border-slate-800 backdrop-blur-sm shadow-lg">
          <input 
            type="text" 
            placeholder="Buscar por Nombre de Cliente o Código de Envío..." 
            value={criterioBusqueda}
            onChange={(e) => setCriterioBusqueda(e.target.value)}
            className="w-full bg-transparent text-sm text-slate-200 placeholder-slate-500 pl-4 focus:outline-none"
          />
          <button 
            type="submit"
            className="bg-[#5bc0be] hover:bg-[#46a6a4] text-[#111827] font-black text-xs uppercase tracking-widest px-6 py-2.5 rounded-full transition-all shrink-0 shadow-md"
          >
            Buscar
          </button>
        </form>
      </div>

      {/* ÁREA DE CONTENIDO: PANEL DE PAQUETE */}
      <div className="max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        {paqueteEncontrado ? (
          <>
            {/* LADO IZQUIERDO: DETALLES ORIGINALES O FORMULARIO DE EDICIÓN */}
            <div className="col-span-1 lg:col-span-8 bg-[#1e293b]/30 border border-slate-800/80 p-6 md:p-8 rounded-[24px] backdrop-blur-md shadow-2xl">
              <h2 className="text-xl font-black mb-6 text-slate-200 border-b border-slate-800 pb-3 flex justify-between items-center">
                <span>{estaEditando ? '📝 Editando Registro de Encomienda' : '📦 Ficha Técnica de la Encomienda'}</span>
                <span className="text-xs text-[#5bc0be] tracking-wider uppercase font-bold bg-[#5bc0be]/10 px-3 py-1 rounded-full">Activo</span>
              </h2>

              <form onSubmit={guardarCambios} className="space-y-6">
                {/* 1. Datos del Cliente */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={estiloLabel}>Nombre del Cliente</label>
                    <input 
                      type="text" 
                      disabled={!estaEditando}
                      value={datosPaquete.nombreCliente}
                      onChange={(e) => setDatosPaquete({...datosPaquete, nombreCliente: e.target.value})}
                      className={`${estiloInput} ${!estaEditando && 'bg-slate-800/20 border-transparent text-slate-400 font-semibold'}`}
                    />
                  </div>
                  <div>
                    <label className={estiloLabel}>Teléfono (0000-0000)</label>
                    <input 
                      type="text" 
                      disabled={!estaEditando}
                      value={datosPaquete.telefono}
                      onChange={(e) => setDatosPaquete({...datosPaquete, telefono: e.target.value})}
                      className={`${estiloInput} ${!estaEditando && 'bg-slate-800/20 border-transparent text-slate-400 font-semibold'}`}
                    />
                  </div>
                </div>

                {/* 2. Tipo de producto */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={estiloLabel}>Tipo de Producto</label>
                    <select 
                      disabled={!estaEditando}
                      value={datosPaquete.tipoProducto}
                      onChange={(e) => setDatosPaquete({...datosPaquete, tipoProducto: e.target.value})}
                      className={`${estiloInput} ${!estaEditando ? 'bg-slate-800/20 border-transparent text-slate-400 font-semibold appearance-none' : 'cursor-pointer'}`}
                    >
                      <option value="Ropa / Calzado">Ropa / Calzado</option>
                      <option value="Electrónicos">Electrónicos</option>
                      <option value="Repuestos">Repuestos</option>
                      <option value="Otros">Otros</option>
                    </select>
                  </div>
                </div>

                {/* 3. Dimensiones */}
                <div>
                  <h3 className="text-xs font-black text-blue-400 uppercase tracking-widest mb-3">Dimensiones y Peso</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div>
                      <label className={estiloLabel}>Peso (lbs)</label>
                      <input type="number" disabled={!estaEditando} value={datosPaquete.peso} onChange={(e) => setDatosPaquete({...datosPaquete, peso: e.target.value})} className={estiloInput} />
                    </div>
                    <div>
                      <label className={estiloLabel}>Largo (cm)</label>
                      <input type="number" disabled={!estaEditando} value={datosPaquete.largo} onChange={(e) => setDatosPaquete({...datosPaquete, largo: e.target.value})} className={estiloInput} />
                    </div>
                    <div>
                      <label className={estiloLabel}>Ancho (cm)</label>
                      <input type="number" disabled={!estaEditando} value={datosPaquete.ancho} onChange={(e) => setDatosPaquete({...datosPaquete, ancho: e.target.value})} className={estiloInput} />
                    </div>
                    <div>
                      <label className={estiloLabel}>Alto (cm)</label>
                      <input type="number" disabled={!estaEditando} value={datosPaquete.alto} onChange={(e) => setDatosPaquete({...datosPaquete, alto: e.target.value})} className={estiloInput} />
                    </div>
                  </div>
                </div>

                {/* 4. Ruta y Destino */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={estiloLabel}>Departamento Destino</label>
                    <input type="text" disabled value={datosPaquete.departamento} className={`${estiloInput} bg-slate-800/20 border-transparent text-slate-400 font-semibold`} />
                  </div>
                  <div>
                    <label className={estiloLabel}>Sede Logística Asignada</label>
                    <input type="text" disabled value={datosPaquete.sedeLogistica} className={`${estiloInput} bg-slate-800/20 border-transparent text-slate-400 font-semibold`} />
                  </div>
                </div>

                {/* 5. Direcciones Adicionales */}
                <div>
                  <label className={estiloLabel}>Indicaciones Adicionales de la Dirección</label>
                  <textarea 
                    rows="2"
                    disabled={!estaEditando}
                    value={datosPaquete.indicaciones}
                    onChange={(e) => setDatosPaquete({...datosPaquete, indicaciones: e.target.value})}
                    className={`${estiloInput} rounded-2xl resize-none ${!estaEditando && 'bg-slate-800/20 border-transparent text-slate-400 font-semibold'}`}
                  ></textarea>
                </div>

                {/* BOTÓN EXTRA SI ESTÁ EDITANDO */}
                {estaEditando && (
                  <div className="flex gap-3 justify-end pt-2">
                    <button type="button" onClick={() => setEstaEditando(false)} className="bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold py-2.5 px-6 rounded-full text-xs uppercase tracking-widest transition-all">Cancelar</button>
                    <button type="submit" className="bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold py-2.5 px-6 rounded-full text-xs uppercase tracking-widest transition-all shadow-lg">Guardar Cambios</button>
                  </div>
                )}
              </form>
            </div>

            {/* LADO DERECHO: COSTOS ESTIMADOS Y BOTONES DE ACCIÓN DE ADMIN */}
            <div className="col-span-1 lg:col-span-4 flex flex-col gap-6">
              
              {/* Tarjeta de precio estática */}
              <div className="bg-gradient-to-br from-[#1e3a8a] to-[#0f172a] p-8 rounded-[24px] border border-blue-900/40 text-center shadow-xl relative overflow-hidden">
                <span className="text-xs text-blue-300 font-bold uppercase tracking-widest block mb-1">Valor de Tarifación</span>
                <h3 className="text-sm font-semibold text-slate-300 mb-2">Costo Estimado de Encomienda</h3>
                <div className="text-5xl font-black text-white my-4">${datosPaquete.costo.toFixed(2)}</div>
                
                <div className="bg-[#111827]/60 border border-blue-900/40 rounded-xl p-3 text-left mt-4">
                  <span className="text-[10px] text-amber-400 block font-bold uppercase tracking-wider mb-1">⚠️ Tiempo límite en Agencia:</span>
                  <p className="text-xs text-slate-300 font-medium">¡Dura un máximo de 3 Días hábiles en Sede!</p>
                </div>
              </div>

              {/* Panel de Control de Cambios Protegido */}
              <div className="bg-[#1e293b]/30 border border-slate-800/80 p-6 rounded-[24px] backdrop-blur-md">
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 px-1">Acciones de Administrador</h3>
                
                <div className="flex flex-col gap-3">
                  <button 
                    type="button"
                    onClick={() => abrirVerificacionAdmin('editar')}
                    className="w-full bg-[#5bc0be] hover:bg-[#46a6a4] text-[#111827] font-extrabold py-3 px-6 rounded-full text-xs uppercase tracking-widest transition-all transform active:scale-95 shadow-md shadow-[#5bc0be]/10"
                  >
                    Modificar Registro
                  </button>
                  <button 
                    type="button"
                    onClick={() => abrirVerificacionAdmin('eliminar')}
                    className="w-full bg-transparent hover:bg-red-950/20 text-red-400 border border-red-900/60 font-extrabold py-3 px-6 rounded-full text-xs uppercase tracking-widest transition-all transform active:scale-95"
                  >
                    Eliminar Paquete
                  </button>
                </div>
              </div>

            </div>
          </>
        ) : (
          /* Mensaje de espera si no se ha buscado nada */
          <div className="col-span-12 bg-[#1e293b]/10 border border-dashed border-slate-800 rounded-[24px] p-16 text-center">
            <div className="text-4xl mb-3">🔍</div>
            <h3 className="text-lg font-bold text-slate-400">Ningún paquete seleccionado</h3>
            <p className="text-xs text-slate-600 max-w-sm mx-auto mt-1">Usa la barra superior para buscar un paquete por cliente o ID y gestionar sus configuraciones de envío.</p>
          </div>
        )}
      </div>

      {/* --- 🔐 MODAL FLOTANTE: VERIFICACIÓN DE CREDENCIALES ADMIN --- */}
      {mostrarModalAdmin && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-[#1e293b] border border-slate-800 w-full max-w-sm rounded-[24px] p-6 shadow-2xl">
            <div className="text-center mb-4">
              <span className="text-2xl">🔒</span>
              <h3 className="text-lg font-black text-white mt-1 uppercase tracking-tight">Autorización Requerida</h3>
              <p className="text-xs text-slate-400 mt-1">Ingresa la clave maestra para {accionPendiente === 'editar' ? 'modificar' : 'eliminar'} el envío.</p>
            </div>

            <div className="mb-5">
              <label className={estiloLabel}>Contraseña Admin</label>
              <input 
                type="password" 
                placeholder="••••••••" 
                value={passwordAdmin}
                onChange={(e) => setPasswordAdmin(e.target.value)}
                className={estiloInput}
              />
            </div>

            <div className="flex gap-3">
              <button 
                onClick={() => setMostrarModalAdmin(false)}
                className="w-1/2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold py-2.5 px-4 rounded-full text-xs uppercase tracking-widest transition-all"
              >
                Cancelar
              </button>
              <button 
                onClick={ejecutarAccionAutorizada}
                className="w-1/2 bg-[#5bc0be] hover:bg-[#46a6a4] text-[#111827] font-black py-2.5 px-4 rounded-full text-xs uppercase tracking-widest transition-all"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default RegistroDepaquetes;