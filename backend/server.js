const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// Middleware para procesar formatos JSON
app.use(express.json());

// Conexión a MongoDB Compass (Local)
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('🚀 ¡Conexión exitosa a MongoDB Compass Local! Base de datos lista.'))
  .catch((error) => console.error('❌ Error al conectar a MongoDB Local:', error));

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('Servidor de Encomiendas SV - Modo Local Activo');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`📡 Servidor corriendo en: http://localhost:${PORT}`);
});