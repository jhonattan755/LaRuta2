import express from 'express';
// 🎯 SINCRO: Importamos el modelo cuidando la ruta de carpetas
import { Encomienda } from '../models/encomienda.js'; 

const router = express.Router();

// 📦 RUTA POST: CREAR ENCOMIENDA
// Endpoint: http://localhost:5000/api/encomiendas/crear
router.post('/crear', async (req, res) => {
  try {
    const datosRecibidos = req.body;

    // Validación rápida de campos críticos
    if (!datosRecibidos.remitenteNombre || !datosRecibidos.pesoLibras || !datosRecibidos.costoEnvio) {
      return res.status(400).json({ mensaje: '⚠️ Por favor, llena todos los campos requeridos del envío.' });
    }

    // Generar un código único automático estilo "LR-83921"
    const numeroAleatorio = Math.floor(10000 + Math.random() * 90000);
    const codigoSeguimiento = `LR-${numeroAleatorio}`;

    // Armamos la encomienda integrando el código generado
    const nuevaEncomienda = new Encomienda({
      ...datosRecibidos,
      codigoSeguimiento
    });

    await nuevaEncomienda.save();

    res.status(201).json({
      mensaje: '¡Encomienda registrada con éxito!',
      codigoSeguimiento: codigoSeguimiento
    });

  } catch (error) {
    console.error('Error al registrar la encomienda:', error);
    res.status(500).json({ mensaje: 'Error interno en el servidor al procesar el envío.' });
  }
});

export default router;