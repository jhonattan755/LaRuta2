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

    // 🎯 SINCRO: Valida usando 'password' alineado a la estructura fija de Mongoose
    if (usuarioEncontrado.password !== password) {
      return res.status(401).json({ mensaje: 'Contraseña incorrecta.' });
    }

    // Responde con los campos estandarizados del nuevo esquema
    res.json({
      mensaje: '¡Inicio de sesión exitoso!',
      nombre: usuarioEncontrado.names,
      rol: usuarioEncontrado.role
    });

  } catch (error) {
    console.error("Error en el login:", error);
    res.status(500).json({ mensaje: 'Error interno en el servidor al procesar el inicio de sesión.' });
  }
});


// 📝 2. RUTA POST: REGISTRO DE USUARIOS DESDE EL PANEL
// Endpoint: http://localhost:5000/api/usuarios/registro
router.post('/registro', async (req, res) => {
  try {
    // Extraemos los nombres exactos que envía tu PanelDeEmpleados.jsx
    const { 
      names, 
      lastNames, 
      email, 
      pass, // Viene como 'pass' desde el estado de React
      role, 
      status, 
      dui, 
      phone, 
      address, 
      birthDate, 
      age, 
      nationality, 
      civilStatus, 
      gender, 
      bloodType 
    } = req.body;

    // Validación estricta con los nombres del Frontend
    if (!names || !lastNames || !email || !pass || !dui || !phone) {
      return res.status(400).json({ mensaje: '⚠️ Por favor, llena todos los campos obligatorios del formulario.' });
    }

    // Verificar si el correo ya está registrado en tu colección de MongoDB
    const usuarioExiste = await Usuario.findOne({ email });
    if (usuarioExiste) {
      return res.status(400).json({ mensaje: 'Este correo electrónico ya está registrado.' });
    }

    // Verificar si el DUI ya está registrado
    const duiExiste = await Usuario.findOne({ dui });
    if (duiExiste) {
      return res.status(400).json({ mensaje: 'Este número de DUI ya pertenece a otro expediente.' });
    }

    // Crear la instancia del nuevo usuario sincronizada con tu modelo mapeando pass -> password
    const nuevoUsuario = new Usuario({
      names,
      lastNames,
      email,
      password: pass, // 🎯 MAPEO: Recibe 'pass' de React y lo guarda como 'password' en MongoDB Atlas
      role: role || 'Empleado',
      status: status || 'Activo',
      dui,
      phone,
      address,
      birthDate,
      age,
      nationality,
      civilStatus,
      gender,
      bloodType
    });

    // Guardar en MongoDB Atlas
    await nuevoUsuario.save();

    res.status(201).json({ 
      mensaje: 'Usuario registrado exitosamente en la base de datos.'
    });

  } catch (error) {
    console.error('Error en el registro de usuario:', error);
    res.status(500).json({ mensaje: 'Hubo un error interno en el servidor al crear la cuenta.' });
  }
});


// 🔍 3. RUTA GET: OBTENER TODOS LOS EXPEDIENTES (Para llenar la tabla)
// Endpoint: http://localhost:5000/api/usuarios/lista
router.get('/lista', async (req, res) => {
  try {
    // Buscamos absolutamente todos los usuarios en la colección sin filtros pesados
    const usuarios = await Usuario.find({});
    res.json(usuarios);
  } catch (error) {
    console.error('Error al obtener la lista de usuarios:', error);
    res.status(500).json({ mensaje: 'Hubo un error en el servidor al cargar los datos de la tabla.' });
  }
});


// ✏️ 4. RUTA PUT: ACTUALIZAR UN EXPEDIENTE (Acción Editar)
// Endpoint: http://localhost:5000/api/usuarios/editar/:id
router.put('/editar/:id', async (req, res) => {
  const { id } = req.params;
  const { 
    names, lastNames, email, pass, role, status, 
    dui, phone, address, birthDate, age, nationality, 
    civilStatus, gender, bloodType 
  } = req.body;

  try {
    const usuarioActualizado = await Usuario.findByIdAndUpdate(
      id,
      { 
        names, 
        lastNames, 
        email, 
        password: pass, // 🎯 MAPEO: Mantiene la consistencia de guardado al actualizar
        role, 
        status, 
        dui, 
        phone, 
        address, 
        birthDate, 
        age, 
        nationality, 
        civilStatus, 
        gender, 
        bloodType 
      },
      { new: true } // Para que devuelva el documento con los cambios aplicados
    );

    if (!usuarioActualizado) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado.' });
    }

    res.json({ mensaje: 'Expediente actualizado con éxito.', usuario: usuarioActualizado });
  } catch (error) {
    console.error('Error al editar usuario:', error);
    res.status(500).json({ mensaje: 'Error interno en el servidor al actualizar.' });
  }
});


// 🗑️ 5. RUTA DELETE: ELIMINAR UN EXPEDIENTE (Acción Borrar)
// Endpoint: http://localhost:5000/api/usuarios/borrar/:id
router.delete('/borrar/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const usuarioEliminado = await Usuario.findByIdAndDelete(id);

    if (!usuarioEliminado) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado.' });
    }

    res.json({ mensaje: 'Expediente eliminado correctamente.' });
  } catch (error) {
    console.error('Error al eliminar usuario:', error);
    res.status(500).json({ mensaje: 'Error interno en el servidor al eliminar.' });
  }
});

export default router;