import { useState } from 'react';
// 🔌 IMPORTACIÓN CLAVE: El timón para cambiar de página en React Router
import { useNavigate } from 'react-router-dom';

export function Login() {
  // EL CEREBRO: Variables para recordar lo que el usuario escribe
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [recordarme, setRecordarme] = useState(false);
  // Inicializamos el timón de navegación
  const navigate = useNavigate();

  // LA PINTURA DE TU FOTO: Inputs oscuros, súper redondeados y elegantes
  const estiloInput = "w-full bg-[#1e293b]/50 border border-slate-700 text-slate-200 placeholder-slate-500 text-sm px-4 py-3 rounded-full focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-sans mb-5";

  const manejarEnvio = async (e) => {
    e.preventDefault();

    if (!correo || !password) {
      alert('Por favor, llena todos los campos.');
      return;
    }

    try {
      // 🚀 Mandamos los datos reales por las tuberías hacia tu backend local en puerto 5000
      const respuesta = await fetch('http://localhost:5000/api/usuarios/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: correo, password: password })
      });

      const datos = await respuesta.json();

      if (respuesta.ok) {
        // El backend lee el rol guardado en MongoDB Atlas y nos lo devuelve
        if (datos.rol === 'administrador') {
          navigate('/admin');
        } else if (datos.rol === 'empleado') {
          navigate('/empleado');
        } else {
          alert(`¡Hola ${datos.nombre}! Tu rol aún no tiene una ruta asignada.`);
        }
      } else {
        // Muestra si la clave está mal o si el correo no existe en la nube
        alert(datos.mensaje);
      }

    } catch (error) {
      alert('No se pudo conectar con el servidor. ¿Olvidaste encender el Backend con "node server.js"?');
    }
  };

  return (
    /* 🚀 CONTENEDOR TOTAL A PANTALLA COMPLETA */
    <div className="min-h-screen w-screen bg-[#111827] flex font-sans overflow-hidden">
      
      {/* 📦 ESTRUCTURA EXTENDIDA A TODO EL ENTORNO (Corregido w-col-12 por w-full) */}
      <div className="w-full grid grid-cols-1 md:grid-cols-12 min-h-screen">
        
        {/* LA MITAD IZQUIERDA: Ocupa el 50% de la pantalla completa, con curva masiva y foto real de fondo */}
        <div 
          className="hidden md:flex md:col-span-6 p-16 flex-col justify-between relative bg-cover bg-center rounded-r-[80px] lg:rounded-r-[140px] shadow-2xl z-10"
          style={{ 
            backgroundImage: `linear-gradient(to bottom, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.85)), url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1200')` 
          }}
        >
          
          {/* Encabezado: Nombre de la Empresa */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-[#1e3a8a] rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-lg shadow-blue-900/40">
              📍
            </div>
            <div>
              <h2 className="text-2xl font-black text-[#1e3a8a] tracking-wider m-0">LA RUTA</h2>
              <span className="text-xs text-slate-500 block font-bold tracking-widest">LOGÍSTICA SV</span>
            </div>
          </div>

          {/* Bloque de Información Centralizado sobre la imagen */}
          <div className="max-w-md my-auto border-l-4 border-[#1e3a8a] pl-6 py-4 bg-white/40 backdrop-blur-sm rounded-r-xl">
            <h3 className="text-2xl font-black text-slate-800 mb-2 uppercase tracking-tight">
              Control de Encomiendas
            </h3>
            <p className="text-sm font-semibold text-slate-600 leading-relaxed">
              Gestión total de envíos, monitoreo de unidades de entrega y control de tiempos límite en agencias a nivel nacional.
            </p>
          </div>

          {/* Pie de página del lado de la imagen */}
          <div className="text-xs text-slate-500 font-bold tracking-wide">
            © 2026 La Ruta S.A. de C.V. · Sistema Centralizado
          </div>

        </div>

        {/* LA MITAD DERECHA: Tu Formulario Oscuro extendido en la otra mitad de la pantalla */}
        <div className="col-span-1 md:col-span-6 p-8 sm:p-12 lg:p-24 flex flex-col justify-between bg-[#111827] relative z-0">
          
          {/* Div para equilibrar el espacio vertical */}
          <div className="hidden md:block"></div>

          {/* El contenedor del Formulario de Login */}
          <div className="w-full max-w-md mx-auto">
            <h1 className="text-4xl font-black text-white mb-2 tracking-tight">
              Login
            </h1>
            <p className="text-sm text-slate-400 mb-10 font-medium">
              Ingresa tus credenciales autorizadas de la empresa.
            </p>

            <form onSubmit={manejarEnvio}>
              {/* 1. TEXT BOX DEL CORREO */}
              <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-widest px-1">
                Usuario / Correo
              </label>
              <input 
                type="email" 
                placeholder="ejemplo@laruta.sv" 
                value={correo}
                className={estiloInput} 
                onChange={(e) => setCorreo(e.target.value)}
              />

              {/* 2. TEXT BOX DE LA CONTRASEÑA */}
              <div className="flex justify-between items-center mb-2 px-1">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                  Contraseña
                </label>
                <a href="#forgot" className="text-xs text-blue-400 hover:underline transition-all font-medium">
                  ¿Olvidaste tu contraseña?
                </a>
              </div>
              <input 
                type="password" 
                placeholder="••••••••" 
                value={password}
                className={estiloInput} 
                onChange={(e) => setPassword(e.target.value)}
              />

              {/* 3. 💡 CHECKBOX INTEGRADO CON TU DISEÑO OSCURO */}
              <div className="flex items-center mb-2 px-2">
                <input
                  id="recordarme"
                  type="checkbox"
                  checked={recordarme}
                  onChange={(e) => setRecordarme(e.target.checked)}
                  className="h-4 w-4 bg-slate-800 border-slate-700 rounded text-blue-500 focus:ring-0 focus:ring-offset-0 cursor-pointer"
                />
                <label htmlFor="recordarme" className="ml-2 text-xs text-slate-400 font-bold uppercase tracking-wider select-none cursor-pointer">
                  Recordar mi información
                </label>
              </div>

              {/* BOTÓN TOTALMENTE REDONDEADO */}
              <button 
                type="submit"
                className="w-full bg-[#5bc0be] hover:bg-[#46a6a4] text-[#111827] font-extrabold py-3.5 px-6 rounded-full transition-all duration-300 transform active:scale-95 shadow-xl shadow-[#5bc0be]/10 mt-6 text-sm uppercase tracking-widest"
              >
                Ingresar al Sistema
              </button>
            </form>

            <div className="text-center mt-8">
              <p className="text-xs text-slate-400 font-medium">
                ¿No tienes una cuenta de empleado?{' '}
                <span className="text-blue-400 font-bold cursor-pointer hover:underline">
                  Contactar Soporte IT
                </span>
              </p>
            </div>
          </div>

          {/* Información de soporte técnica en la esquina inferior */}
          <div className="text-center md:text-right text-xs text-slate-600 mt-12 md:mt-0 font-semibold tracking-wide">
            ¿Problemas de acceso? soporte@laruta.sv
          </div>

        </div>

      </div>
    </div>
  );
}