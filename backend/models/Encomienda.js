import mongoose from 'mongoose';

const EncomiendaSchema = new mongoose.Schema({
  remitenteNombre: { type: String, required: true, trim: true },
  remitenteDui: { type: String, required: true, trim: true },
  remitenteTelefono: { type: String, required: true, trim: true },
  origenAgencia: { type: String, required: true },
  destinatarioNombre: { type: String, required: true, trim: true },
  destinatarioTelefono: { type: String, required: true, trim: true },
  destinoDireccion: { type: String, required: true, trim: true },
  destinoAgencia: { type: String, required: true },
  tipoPaquete: { type: String, required: true },
  pesoLibras: { type: Number, required: true },
  contenidoDescripcion: { type: String, trim: true },
  costoEnvio: { type: Number, required: true },
  estadoPago: { type: String, required: true, default: 'Pagado' }, 
  codigoSeguimiento: { type: String, required: true, unique: true }, 
  estadoEnvio: { type: String, required: true, default: 'En Agencia' }, 
  fechaRegistro: { type: Date, default: Date.now },
  fechaLimiteEntrega: { type: String, required: true }
});

export const Encomienda = mongoose.model('Encomienda', EncomiendaSchema);