import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import usuarioRoutes from './routes/usuarioRoutes.js';
// 🎯 CORRECCIÓN AQUÍ: Apuntamos al nombre exacto de tu archivo en plural
import encomiendasRoutes from "./routes/encomiendasRoutes.js"; // 👈 Asegúrate de que termine en 's'

// Forzar la carga explícita del archivo .env
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Enlace de las rutas de tu sistema
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/encomiendas', encomiendasRoutes); // 👈 Que use exactamente la misma variable con 's'

// --- DECLARACIÓN FIJA Y ÚNICA DEL PUERTO 5000 ---
const PORT = 5000; 
const URI = process.env.MONGO_URI;

if (!URI) {
  console.error("❌ ERROR CRÍTICO: No se detecta la variable MONGO_URI en el archivo .env");
  process.exit(1);
}

// --- CONEXIÓN MÁSTER A MONGODB ATLAS Y ARRANQUE DEL SERVIDOR ---
mongoose.connect(URI)
  .then(() => {
    console.log('☁️  ¡CONEXIÓN EXITOSA! Conectado a MongoDB Atlas en la nube de forma limpia.');
    app.listen(PORT, () => {
      console.log(`🚀 Servidor backend de La Ruta corriendo en el puerto ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('❌ Error fatal al conectar a MongoDB Atlas:', error.message);
  });