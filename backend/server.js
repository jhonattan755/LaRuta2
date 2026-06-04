import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import usuarioRoutes from './routes/usuarioRoutes.js';

// Forzar la carga explícita del archivo .env
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Enlace de las rutas del Login
app.use('/api/usuarios', usuarioRoutes);

const PORT = process.env.PORT || 5000;
const URI = process.env.MONGO_URI;

if (!URI) {
  console.error("❌ ERROR CRÍTICO: No se detecta la variable MONGO_URI en el archivo .env");
  process.exit(1);
}

// Intentar la conexión máster
mongoose.connect(URI)
  .then(() => {
    console.log('☁️  ¡CONEXIÓN EXITOSA! Conectado a MongoDB Atlas en la nube de forma limpia.');
    app.listen(PORT, () => console.log(`📡 Servidor de La Ruta corriendo en el puerto ${PORT}`));
  })
  .catch((error) => {
    console.error('❌ Error fatal al conectar a MongoDB Atlas:', error.message);
  });