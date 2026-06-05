import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FormularioUsuario = () => {
  const navigate = useNavigate();

  // 🧠 ESTADOS PARA ALMACENAR LOS DATOS
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [telefono, setTelefono] = useState('');
  const [departamento, setDepartamento] = useState('');
  const [password, setPassword] = useState('');

  // 🔔 ESTADO PARA MANEJAR LAS ALERTAS EN PANTALLA
  const [mensaje, setMensaje] = useState({ texto: '', tipo: '' });

  // Estilos reutilizables consistentes con tu interfaz
  const estiloInput = "w-full bg-[#1e293b]/50 border border-slate-700 text-slate-200 placeholder-slate-500 text-sm px-4 py-3 rounded-full focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-sans";
  const estiloLabel = "block text-xs font-bold text-slate-400 mb-2 uppercase tracking-widest px-1";

  const manejarRegistro = async (e) => {
    e.preventDefault();
    setMensaje({ texto: '', tipo: '' }); // Limpar alertas previas

    // 1. VALIDACIÓN BÁSICA (Solo campos esenciales para evitar bloqueos por el select)
    if (!nombre || !correo || !telefono || !password) {
      setMensaje({ texto: 'Por favor, llena los campos principales para registrarte.', tipo: 'error' });
      return;
    }

    try {
      // 🚀 CONEXIÓN CON EL BACKEND (PUERTO 5000)
      const respuesta = await fetch('http://localhost:5000/api/usuarios/registro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: nombre,
          email: correo, // Mapeado a 'email' como lo espera tu modelo
          telefono: telefono,
          departamento: departamento || 'No especificado',
          password: password,
          rol: 'usuario' // Rol por defecto
        })
      });

      const datos = await respuesta.json();

      if (respuesta.ok) {
        setMensaje({ texto: '¡Registro exitoso! Redirigiendo al inicio de sesión...', tipo: 'exito' });
        
        // Limpiamos los campos
        setNombre('');
        setCorreo('');
        setTelefono('');
        setDepartamento('');
        setPassword('');

        // Redirección suave al Login
        setTimeout(() => {
          navigate('/login');
        }, 2200);
      } else {
        setMensaje({ texto: datos.message || datos.mensaje || 'Hubo un error al registrar la cuenta.', tipo: 'error' });
      }
    } catch (error) {
      setMensaje({ text: 'No se pudo conectar con el servidor. Verifica que tu backend esté encendido en el puerto 5000.', tipo: 'error' });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f172a] p-6">
      <div className="w-full max-w-md bg-[#1e293b]/30 border border-slate-800 p-8 rounded-3xl shadow-2xl backdrop-blur-xl">
        
        <h2 className="text-2xl font-extrabold text-slate-100 text-center mb-1 tracking-tight">
          Registro de Usuario
        </h2>
        <p className="text-slate-400 text-xs text-center mb-6 font-medium">
          Completa tus datos para ingresar a La Ruta.
        </p>

        {/* 🔔 CASILLA VISUAL DE ALERTAS */}
        {mensaje.texto && (
          <div className={`p-3.5 mb-5 rounded-2xl text-xs font-bold uppercase tracking-wider text-center transition-all ${
            mensaje.tipo === 'exito'
              ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400'
              : 'bg-rose-500/10 border border-rose-500/30 text-rose-400'
          }`}>
            {mensaje.texto}
          </div>
        )}

        <form onSubmit={manejarRegistro} className="space-y-4">
          {/* 1. NOMBRE */}
          <div>
            <label className={estiloLabel}>Nombre Completo / Tienda</label>
            <input 
              type="text" 
              placeholder="Ej. Tienda El Sol o Juan Pérez" 
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className={estiloInput}
            />
          </div>

          {/* 2. CORREO ELECTRÓNICO */}
          <div>
            <label className={estiloLabel}>Correo Electrónico</label>
            <input 
              type="email" 
              placeholder="ejemplo@correo.com" 
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              className={estiloInput}
            />
          </div>

          {/* 3. NÚMERO DE TELÉFONO */}
          <div>
            <label className={estiloLabel}>Número de Teléfono</label>
            <input 
              type="text" 
              placeholder="Ej. 77777777" 
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              className={estiloInput}
            />
          </div>

          {/* 4. DEPARTAMENTO */}
          <div>
            <label className={estiloLabel}>Departamento</label>
            <select 
              value={departamento} 
              onChange={(e) => setDepartamento(e.target.value)}
              className={`${estiloInput} appearance-none cursor-pointer`}
              style={{ colorScheme: 'dark' }}
            >
              <option value="">Selecciona tu departamento (Opcional)</option>
              <option value="Ahuachapán">Ahuachapán</option>
              <option value="Cabañas">Cabañas</option>
              <option value="Chalatenango">Chalatenango</option>
              <option value="Cuscatlán">Cuscatlán</option>
              <option value="La Libertad">La Libertad</option>
              <option value="La Paz">La Paz</option>
              <option value="La Unión">La Unión</option>
              <option value="Morazán">Morazán</option>
              <option value="San Miguel">San Miguel</option>
              <option value="San Salvador">San Salvador</option>
              <option value="San Vicente">San Vicente</option>
              <option value="Santa Ana">Santa Ana</option>
              <option value="Sonsonate">Sonsonate</option>
              <option value="Usulután">Usulután</option>
            </select>
          </div>

          {/* 5. CONTRASEÑA */}
          <div>
            <label className={estiloLabel}>Contraseña de la Cuenta</label>
            <input 
              type="password" 
              placeholder="Ingresa tu contraseña" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={estiloInput}
            />
          </div>

          {/* BOTÓN PRINCIPAL */}
          <button 
            type="submit" 
            className="w-full bg-[#5bc0be] hover:bg-[#46a6a4] text-[#111827] font-extrabold py-3.5 px-6 rounded-full text-sm uppercase tracking-widest transition-all duration-300 transform active:scale-95 shadow-xl shadow-[#5bc0be]/10 mt-4"
          >
            Crear mi Cuenta
          </button>

          {/* BOTÓN VOLVER AL LOGIN */}
          <button 
            type="button" 
            onClick={() => navigate('/login')} 
            className="w-full bg-transparent hover:bg-slate-800/40 text-slate-400 font-bold py-3 px-6 rounded-full text-xs uppercase tracking-widest transition-all mt-2 border border-slate-700/60"
          >
            Volver al Login
          </button>
        </form>

      </div>
    </div>
  );
};

export default FormularioUsuario;