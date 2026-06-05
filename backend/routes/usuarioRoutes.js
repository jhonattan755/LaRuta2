import express from 'express';
import { Usuario } from '../models/Usuario.js'; // Conecta con tu modelo de la base de datos

const router = express.Router();

// 🔒 1. RUTA POST: INICIO DE SESIÓN (LOGIN)
// Endpoint: http://localhost:5000/api/usuarios/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Buscar si el correo electrónico existe en MongoDB
    const usuarioEncontrado = await Usuario.findOne({ email });
    
    if (!usuarioEncontrado) {
      return res.status(404).json({ mensaje: 'El correo electrónico no está registrado.' });
    }

    // Validar si la contraseña coincide directamente en texto plano
    if (usuarioEncontrado.password !== password) {
      return res.status(401).json({ mensaje: 'Contraseña incorrecta.' });
    }

    // Responder con éxito y los datos que React necesita almacenar
    res.json({
      mensaje: '¡Inicio de sesión exitoso!',
      nombre: usuarioEncontrado.nombre,
      rol: usuarioEncontrado.rol
    });

  } catch (error) {
    console.error("Error en el login:", error);
    res.status(500).json({ mensaje: 'Error interno en el servidor al procesar el inicio de sesión.' });
  }
}); // <-- Aquí se cierra correctamente el Login


// 📝 2. RUTA POST: REGISTRO DE USUARIOS NUEVOS
// Endpoint: http://localhost:5000/api/usuarios/registro
router.post('/registro', async (req, res) => {
  try {
    // Sincronizado con todos los campos reales que envía tu FormularioUsuario de React
    const { nombre, email, telefono, departamento, password, rol } = req.body;

    // Validar que vengan todos los campos obligatorios
    if (!nombre || !email || !telefono || !departamento || !password) {
      return res.status(400).json({ mensaje: 'Por favor, llena todos los campos obligatorios.' });
    }

    // Verificar si el correo ya está registrado en tu colección de MongoDB
    const usuarioExiste = await Usuario.findOne({ email });
    if (usuarioExiste) {
      return res.status(400).json({ mensaje: 'Este correo electrónico ya está registrado.' });
    }

    // Crear la instancia del nuevo usuario con toda la información de El Salvador
    const nuevoUsuario = new Usuario({
      nombre,
      email,
      telefono,
      departamento,
      password,
      rol: rol || 'usuario' // Si no viene un rol, por defecto le asigna 'usuario'
    });

    // Guardar el documento en MongoDB Compass
    await nuevoUsuario.save();

    // Responder con éxito al frontend
    res.status(201).json({ 
      mensaje: 'Usuario registrado exitosamente.'
    });

  } catch (error) {
    console.error('Error en el registro de usuario:', error);
    res.status(500).json({ mensaje: 'Hubo un error interno en el servidor al crear la cuenta.' });
  }
});

export default router;