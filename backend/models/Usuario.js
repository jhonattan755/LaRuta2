import mongoose from 'mongoose';

const UsuarioSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  // 🚀 NUEVO: Campo para almacenar el número telefónico
  telefono: {
    type: String,
    required: true,
    trim: true
  },
  // 🚀 NUEVO: Campo para almacenar el departamento de El Salvador
  departamento: {
    type: String,
    required: true,
    trim: true
  },
  rol: {
    type: String,
    enum: ['usuario', 'empleado', 'administrador'],
    default: 'usuario'
  },
  fechaCreacion: {
    type: Date,
    default: Date.now
  }
});

// Exportamos el modelo listo para usar en las rutas
export const Usuario = mongoose.model('Usuario', UsuarioSchema);