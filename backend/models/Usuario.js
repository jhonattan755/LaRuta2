import mongoose from 'mongoose';

const UsuarioSchema = new mongoose.Schema({
  names: { type: String, required: true },
  lastNames: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // 🔒 Forzamos el uso de 'password' estándar
  role: { type: String, required: true, default: 'Empleado' },
  status: { type: String, required: true, default: 'Activo' },
  dui: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  address: { type: String },
  birthDate: { type: String },
  age: { type: Number },
  nationality: { type: String, default: 'Salvadoreña' },
  civilStatus: { type: String, default: 'Soltero/a' },
  gender: { type: String, default: 'Masculino' },
  bloodType: { type: String, default: 'O+' }
});

export const Usuario = mongoose.model('Usuario', UsuarioSchema);