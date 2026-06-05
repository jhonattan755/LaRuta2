import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FormularioUsuario = () => {
  const navigate = useNavigate();

  // EL CEREBRO: Estados para almacenar los datos del formulario
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [telefono, setTelefono] = useState('');
  const [departamento, setDepartamento] = useState('');
  const [password, setPassword] = useState('');

  // 🔔 NUEVO: Estado para manejar los mensajes de éxito o error con estilo en pantalla
  const [mensaje, setMensaje] = useState({ texto: '', tipo: '' });

  // Estilo reutilizable para mantener consistencia con los inputs de tu Login
  const estiloInput = "w-full bg-[#1e293b]/50 border border-slate-700 text-slate-200 placeholder-slate-500 text-sm px-4 py-3 rounded-full focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-sans";
  const estiloLabel = "block text-xs font-bold text-slate-400 mb-2 uppercase tracking-widest px-1";

  // Manejador para formatear el teléfono automáticamente mientras el usuario escribe (####-####)
  const manejarCambioTelefono = (e) => {
    const valorOriginal = e.target.value.replace(/\D/g, ''); // Remueve lo que no sea número
    let valorFormateado = valorOriginal;

    if (valorOriginal.length > 4) {
      valorFormateado = `${valorOriginal.slice(0, 4)}-${valorOriginal.slice(4, 8)}`;
    }

    // Limita la longitud máxima al formato correcto de 9 caracteres (8 números + 1 guión)
    setTelefono(valorFormateado.slice(0, 9));
  };

  const manejarRegistro = async (e) => {
    e.preventDefault();
    setMensaje({ texto: '', tipo: '' }); // Limpiar alertas previas

    // 1. Validación básica de campos vacíos
    if (!nombre || !correo || !telefono || !departamento || !password) {
      setMensaje({ texto: 'Por favor, llena todos los campos para registrarte.', tipo: 'error' });
      return;
    }

    // 2. 🔐 NUEVA VALIDACIÓN: Correo obligatorio de Gmail (@gmail.com)
    // Convierte a minúsculas para evitar problemas si escriben GMAIL.COM
    if (!correo.toLowerCase().endsWith('@gmail.com')) {
      alert('Por favor, ingresa un correo electrónico válido que termine estrictamente en @gmail.com');
      return;
    }

    // 3. Validación de Formato de Teléfono de El Salvador (####-####)
    const expresionTelefono = /^[267][0-9]{3}-[0-9]{4}$/;
    if (!expresionTelefono.test(telefono)) {
      alert('Por favor, ingresa un número de teléfono válido con el formato de El Salvador (Ej: 7777-7777).');
      return;
    }

    // 4. Validación de longitud de Contraseña (Máximo 10 caracteres)
    if (password.length > 10) {
      alert('La contraseña es demasiado larga. El límite máximo permitido es de 10 caracteres.');
      return;
    }

    try {
      // 🚀 Conexión con tu Backend 
      const respuesta = await fetch('http://localhost:5000/api/usuarios/registro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: nombre,
          email: correo,      // Mapeado a 'email' tal como lo espera tu modelo
          telefono: telefono,
          departamento: departamento,
          password: password,
          rol: 'usuario'      // Rol por defecto
        })
      });

      const datos = await respuesta.json();

      if (respuesta.ok) {
        setMensaje({ texto: '¡Registro exitoso! Redirigiendo al inicio de sesión...', tipo: 'exito' });
        
        // Limpiamos los campos del formulario
        setNombre('');
        setCorreo('');
        setTelefono('');
        setDepartamento('');
        setPassword('');

        // Espera 2 segundos para que el usuario logre leer el mensaje de éxito antes de moverlo
        setTimeout(() => {
          navigate('/login');
        }, 2200);

      } else {
        // Muestra el mensaje exacto que configuraste en el backend (ej: "Este correo ya existe")
        setMensaje({ texto: datos.message || datos.mensaje || 'Hubo un error al registrar la cuenta.', tipo: 'error' });
      }
    } catch (error) {
      setMensaje({ texto: 'No se pudo conectar con el servidor. Verifica que tu backend esté encendido.', tipo: 'error' });
    }
  };

  return (
    <div className="min-h-screen w-screen bg-[#111827] flex flex-col items-center justify-center font-sans text-white p-6 overflow-y-auto">
      <div className="w-full max-w-md bg-[#1e293b]/50 border border-slate-700 p-8 rounded-[30px] shadow-xl my-8">
        
        <h1 className="text-3xl font-black mb-2 tracking-tight text-white text-center">
          Registro de Usuario
        </h1>
        <p className="text-sm text-slate-400 mb-8 text-center">
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
        
        <form onSubmit={manejarRegistro} className="space-y-5">
          {/* 1. NOMBRE DE LA TIENDA O PERSONA */}
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

          {/* 2. CORREO ELECTRÓNICO (GMAIL CORREGIDO) */}
          <div>
            <label className={estiloLabel}>Correo Electrónico</label>
            <input 
              type="email" 
              placeholder="ejemplo@gmail.com" 
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              className={estiloInput} 
            />
          </div>

          {/* 3. NÚMERO DE TELÉFONO */}
          <div>
            <label className={estiloLabel}>Número de Teléfono</label>
            <input 
              type="tel" 
              placeholder="Ej. 7777-7777" 
              value={telefono}
              onChange={manejarCambioTelefono}
              className={estiloInput} 
            />
          </div>

          {/* 4. DEPARTAMENTO DONDE HABITA */}
          <div>
            <label className={estiloLabel}>Departamento</label>
            <div className="relative">
              <select 
                value={departamento}
                onChange={(e) => setDepartamento(e.target.value)}
                className={`${estiloInput} appearance-none cursor-pointer`}
                style={{ colorScheme: 'dark' }}
              >
                <option value="" disabled className="text-slate-500">Selecciona tu departamento</option>
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
          </div>

          {/* 5. CONTRASEÑA */}
          <div>
            <label className={estiloLabel}>Contraseña de la Cuenta</label>
            <input 
              type="password" 
              placeholder="Máximo 10 caracteres" 
              maxLength={10}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={estiloInput} 
            />
          </div>

          {/* BOTÓN PRINCIPAL PARA CREAR CUENTA */}
          <button 
            type="submit"
            className="w-full bg-[#5bc0be] hover:bg-[#46a6a4] text-[#111827] font-extrabold py-3.5 px-6 rounded-full text-sm uppercase tracking-widest transition-all duration-300 transform active:scale-95 shadow-xl shadow-[#5bc0be]/10 mt-4"
          >
            Crear mi Cuenta
          </button>
        </form>

        {/* BOTÓN SECUNDARIO VOLVER AL LOGIN */}
        <button 
          type="button"
          onClick={() => navigate('/login')}
          className="w-full bg-transparent hover:bg-slate-800/40 text-slate-400 font-bold py-3 px-6 rounded-full text-xs uppercase tracking-widest transition-all mt-4 border border-slate-700/60"
        >
          Volver al Login
        </button>

      </div>
    </div>
  );
};

export default FormularioUsuario;