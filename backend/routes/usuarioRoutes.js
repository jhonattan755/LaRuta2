import express from 'express';
import { Usuario } from '../models/Usuario.js'; // Conecta con el modelo de la base de datos

const router = express.Router();

// 🚀 RUTA POST: http://localhost:5000/api/usuarios/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1. Buscar si el correo electrónico existe en MongoDB Atlas
    const usuarioEncontrado = await Usuario.findOne({ email });
    
    if (!usuarioEncontrado) {
      return res.status(404).json({ mensaje: 'El correo electrónico no está registrado.' });
    }

    // 2. Validar si la contraseña coincide directamente en texto plano
    if (usuarioEncontrado.password !== password) {
      return res.status(401).json({ mensaje: 'Contraseña incorrecta.' });
    }

    // 3. Si todo está perfecto, respondemos con el éxito y los datos que React necesita
    res.json({
      mensaje: '¡Inicio de sesión exitoso!',
      nombre: usuarioEncontrado.nombre,
      rol: usuarioEncontrado.rol
    });

  } catch (error) {
    console.error("Error en el login:", error);
    res.status(500).json({ mensaje: 'Error interno en el servidor al procesar el inicio de sesión.' });
  }
});

export default router;