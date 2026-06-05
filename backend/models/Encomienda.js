import mongoose from "mongoose";

const EncomiendaSchema = new mongoose.Schema({
  codigoGuia: { type: String, required: true, unique: true },
  remitenteNombre: { type: String },
  cliente: { type: String }, // Soporte alternativo para nombre
  telefono: { type: String },
  destinoAgencia: { type: String },
  departamento: { type: String }, // Soporte alternativo para destino
  direccionDetalle: { type: String },
  producto: { type: String },
  tarifaCalculada: { type: Number },
  costoEnvio: { type: Number }, // Soporte alternativo para precio
  estado: { type: String, default: "Pendiente" },
  fechaRegistro: { type: Date, default: Date.now }
});

// Mongoose registrará la colección automáticamente como "encomiendas"
export default mongoose.model("Encomienda", EncomiendaSchema);