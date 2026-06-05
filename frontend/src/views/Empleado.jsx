import { useState } from 'react';
// IMPORTACIÓN: Traemos el hook para navegar entre pantallas
import { useNavigate } from 'react-router-dom';

const Empleado = () => {
  // INICIALIZACIÓN: Instanciamos el hook de navegación
  const navigate = useNavigate();

  // Estructura oficial de 14 sedes únicas (una para cada uno de los 14 departamentos de El Salvador)
  const destinosReales = {
    'Ahuachapán': [
      { nombre: 'Ahuachapán (Sede Central)', horario: 'Lun a Sáb: 9:00 am - 4:00 pm', lugar: 'Local de Entrega Principal', duracion: 'Paquete Dura 3 Dias' }
    ],
    'Santa Ana': [
      { nombre: 'Santa Ana Centro (Sede Central)', horario: 'Lun a Sáb: 9:00 am - 4:00 pm', lugar: 'Local de Entrega Principal', duracion: 'Paquete Dura 3 Dias' }
    ],
    'Sonsonate': [
      { nombre: 'Sonsonate (Sede Central)', horario: 'Lun a Sáb: 9:00 am - 4:00 pm / Dom: 12:40 pm-1:40 pm', lugar: 'Local de Entrega Principal', duracion: 'Paquete Dura 3 Dias' }
    ],
    'Chalatenango': [
      { nombre: 'Chalatenango (Sede Central)', horario: 'Lun a Sáb: 9:00 am - 4:00 pm', lugar: 'Local de Entrega Principal', duracion: 'Paquete Dura 3 Dias' }
    ],
    'La Libertad': [
      { nombre: 'Santa Tecla (Sede Central)', horario: 'Lun a Sáb: 9:00 am - 4:00 pm', lugar: 'Local de Entrega Principal', duracion: 'Paquete Dura 3 Dias' }
    ],
    'San Salvador': [
      { nombre: 'San Salvador - Metrogalerías (Sede Central)', horario: 'Lun a Sáb: 9:00 am - 4:00 pm / Sáb: 9:00 am - 1:00 pm', lugar: 'Local de Entrega Principal', duracion: 'Paquete Dura 3 Dias' }
    ],
    'Cuscatlán': [
      { nombre: 'Cojutepeque (Sede Central)', horario: 'Lun a Sáb: 9:00 am - 4:00 pm', lugar: 'Local de Entrega Principal', duracion: 'Paquete Dura 3 Dias' }
    ],
    'La Paz': [
      { nombre: 'Zacatecoluca (Sede Central)', horario: 'Lun a Sáb: 9:00 am - 4:00 pm', lugar: 'Local de Entrega Principal', duracion: 'Paquete Dura 3 Dias' }
    ],
    'Cabañas': [
      { nombre: 'Sensuntepeque (Sede Central)', horario: 'Lunes a Jueves: 9:00 am - 11:00 am', lugar: 'Local de Entrega Principal', duracion: 'Retención en Agencia' }
    ],
    'San Vicente': [
      { nombre: 'San Vicente (Sede Central)', horario: 'Lun a Sáb: 9:00 am - 4:00 pm', lugar: 'Local de Entrega Principal', duracion: 'Paquete Dura 3 Dias' }
    ],
    'Usulután': [
      { nombre: 'Usulután (Sede Central)', horario: 'Lun a Sáb: 9:00 am - 4:00 pm', lugar: 'Local de Entrega Principal', duracion: 'Paquete Dura 3 Dias' }
    ],
    'San Miguel': [
      { nombre: 'San Miguel (Sede Central)', horario: 'Lun a Sáb: 9:00 am - 4:00 pm', lugar: 'Local de Entrega Principal', duracion: 'Paquete Dura 3 Dias' }
    ],
    'Morazán': [
      { nombre: 'San Francisco Gotera (Sede Central)', horario: 'Lun a Sáb: 9:00 am - 4:00 pm', lugar: 'Local de Entrega Principal', duracion: 'Paquete Dura 3 Dias' }
    ],
    'La Unión': [
      { nombre: 'La Unión (Sede Central)', horario: 'Lun a Sáb: 9:00 am - 4:00 pm', lugar: 'Local de Entrega Principal', duracion: 'Paquete Dura 3 Dias' }
    ]
  };

  const [paquete, setPaquete] = useState({
    cliente: '',
    telefono: '',
    producto: 'Ropa',
    tipoTamano: 'Medidas',
    peso: '',
    largo: '',
    ancho: '',
    alto: '',
    departamento: 'Ahuachapán',
    destinoIndex: 0,
    direccionDetalle: ''
  });

  const [tarifaCalculada, setTarifaCalculada] = useState(0);
  const [fotoPreview, setFotoPreview] = useState(null);
  const [nombreArchivo, setNombreArchivo] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'departamento') {
      setPaquete({
        ...paquete,
        departamento: value,
        destinoIndex: 0 
      });
    } else {
      setPaquete({
        ...paquete,
        [name]: value
      });
    }
  };

  const handleTelefonoChange = (e) => {
    const inputLimpio = e.target.value.replace(/\D/g, '');
    const digitosLimitados = inputLimpio.slice(0, 8);
    let telephoneFormateado = digitosLimitados;
    if (digitosLimitados.length > 4) {
      telephoneFormateado = `${digitosLimitados.slice(0, 4)}-${digitosLimitados.slice(4)}`;
    }
    setPaquete({ ...paquete, telefono: telephoneFormateado });
  };

  const handleFotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFotoPreview(URL.createObjectURL(file));
      setNombreArchivo(file.name);
    }
  };

  // --- 📐 LOGIC: CALCULO DE TARIFAS ORIGINAL ---
  const calcularTarifa = (e) => {
    e.preventDefault();
    if (paquete.tipoTamano === 'Basico') {
      setTarifaCalculada((1.00).toFixed(2));
      return;
    }

    let base = 1.00; 
    let excedentePeso = 0;
    let excedenteDistancia = 0;

    const pesoNum = parseFloat(paquete.peso) || 0;
    if (pesoNum > 5) excedentePeso = (pesoNum - 5) * 0.50; 

    const volumen = (parseFloat(paquete.largo) || 0) * (parseFloat(paquete.ancho) || 0) * (parseFloat(paquete.alto) || 0);
    if (volumen > 1000) excedentePeso += 1.50; 

    const zonaOriente = ['San Miguel', 'La Unión', 'Morazán', 'Usulután'];
    const zonaOccidente = ['Santa Ana', 'Ahuachapán', 'Sonsonate'];

    if (zonaOriente.includes(paquete.departamento)) {
      excedenteDistancia = 2.00;
    } else if (zonaOccidente.includes(paquete.departamento)) {
      excedenteDistancia = 1.50;
    } else if (paquete.departamento !== 'San Salvador') {
      excedenteDistancia = 1.00; 
    }

    const total = base + excedentePeso + excedenteDistancia;
    setTarifaCalculada(total.toFixed(2));
  };

  // --- 🚀 CONEXIÓN CON MONGODB: GUARDAR ENCOMIENDA ---
  const registrarEncomiendaDB = async () => {
    if (tarifaCalculada <= 0) {
      alert("⚠️ Primero debes calcular la tarifa de envío antes de confirmar.");
      return;
    }

    // Calcular la fecha límite de forma automática usando JavaScript nativo
    const hoy = new Date();
    if (infoDestinoSeleccionado.duracion === 'Paquete Dura 3 Dias') {
      hoy.setDate(hoy.getDate() + 3);
    } else {
      hoy.setDate(hoy.getDate() + 5); // Por defecto 5 días si está retenido o es lejano
    }
    const fechaLimiteFormateada = hoy.toISOString().split('T')[0];

    // Empaquetamos los datos exactamente como los espera el modelo del Backend
    const datosEncomienda = {
      remitenteNombre: paquete.cliente.trim(),
      remitenteDui: "00000000-0", // Campo por defecto requerido por el modelo (O puedes añadir un input para recolectarlo)
      remitenteTelefono: paquete.telefono,
      origenAgencia: "Sede Despacho Central", 
      destinatarioNombre: paquete.cliente.trim() + " (Filtro Destino)", // Adaptado a tu input único
      destinatarioTelefono: paquete.telefono,
      destinoDireccion: paquete.direccionDetalle.trim() || "Entrega en Agencia Oficial",
      destinoAgencia: infoDestinoSeleccionado.nombre,
      tipoPaquete: paquete.producto,
      pesoLibras: paquete.tipoTamano === 'Basico' ? 2 : (parseFloat(paquete.peso) || 1),
      contenidoDescripcion: `Envío de ${paquete.producto}. Dimensiones: Volumétrico de control general.`,
      costoEnvio: parseFloat(tarifaCalculada),
      estadoPago: "Pagado", // Por defecto al despacharse en caja
      estadoEnvio: "En Agencia",
      fechaLimiteEntrega: fechaLimiteFormateada
    };

    try {
      const respuesta = await fetch('http://localhost:5000/api/encomiendas/crear', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datosEncomienda)
      });

      const resultado = await respuesta.json();

      if (respuesta.ok) {
        alert(`🎉 ¡Encomienda guardada exitosamente en MongoDB Atlas!\nCódigo de Seguimiento Asignado: ${resultado.codigoSeguimiento}`);
        resetFormulario();
      } else {
        alert(`Error del Servidor: ${resultado.mensaje}`);
      }
    } catch (error) {
      console.error(error);
      alert('❌ Error crítico de comunicación: Verifica que el backend esté encendido en el puerto 5000.');
    }
  };

  const resetFormulario = () => {
    setPaquete({
      cliente: '',
      telefono: '',
      producto: 'Ropa',
      tipoTamano: 'Medidas',
      peso: '',
      largo: '',
      ancho: '',
      alto: '',
      departamento: 'Ahuachapán',
      destinoIndex: 0, 
      direccionDetalle: ''
    });
    setTarifaCalculada(0);
    setFotoPreview(null);
    setNombreArchivo('');
  };

  const infoDestinoSeleccionado = destinosReales[paquete.departamento][paquete.destinoIndex] || destinosReales[paquete.departamento][0];

  return (
    <div style={{ backgroundColor: '#f3f4f6', minHeight: '100vh', padding: '24px', fontFamily: 'sans-serif' }}>
      
      {/* HEADER PRINCIPAL */}
      <header style={{ backgroundColor: '#1e3a8a', color: 'white', padding: '16px 24px', borderRadius: '8px', marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <button 
            onClick={() => navigate('/')} 
            style={{ backgroundColor: 'rgba(255, 255, 255, 0.15)', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '20px', fontWeight: 'bold', cursor: 'pointer', transition: '0.2s', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px' }}
            onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.25)'}
            onMouseLeave={(e) => e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.15)'}
          >
            🏠 Ver Inicio
          </button>
          <h1 style={{ margin: 0, fontSize: '24px', fontWeight: 'bold' }}>La Ruta - Panel de Despacho</h1>
        </div>
        <span style={{ backgroundColor: '#3b82f6', padding: '6px 12px', borderRadius: '20px', fontSize: '14px' }}>Empleado Activo</span>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        {/* Formulario */}
        <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
          <h2 style={{ marginTop: 0, color: '#1f2937', borderBottom: '2px solid #e5e7eb', paddingBottom: '10px' }}>Registrar Nueva Encomienda</h2>
          
          <form onSubmit={calcularTarifa}>
            <h3 style={{ color: '#4b5563', fontSize: '16px' }}>1. Datos del Cliente y Envío</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px', fontWeight: 'bold' }}>Nombre Cliente:</label>
                <input type="text" name="cliente" value={paquete.cliente} onChange={handleChange} required style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #d1d5db' }} placeholder="Ej. Juan Pérez" />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px', fontWeight: 'bold' }}>Teléfono (0000-0000):</label>
                <input type="text" name="telefono" value={paquete.telefono} onChange={handleTelefonoChange} required style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #d1d5db' }} placeholder="Ej. 7777-7777" />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px', alignItems: 'end' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px', fontWeight: 'bold' }}>Tipo de Producto:</label>
                <select name="producto" value={paquete.producto} onChange={handleChange} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #d1d5db' }}>
                  <option value="Ropa">Ropa / Calzado</option>
                  <option value="Tecnologia">Tecnología / Accesorios</option>
                  <option value="Documentos">Documentos</option>
                  <option value="Otro">Otro (Voluminoso)</option>
                </select>
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: 'bold' }}> Foto del Producto:</label>
                <input type="file" id="upload-photo" accept="image/*" onChange={handleFotoChange} style={{ display: 'none' }} />
                <label htmlFor="upload-photo" style={{ display: 'block', backgroundColor: '#3b82f6', color: 'white', padding: '9px 16px', borderRadius: '4px', textAlign: 'center', fontWeight: 'bold', cursor: 'pointer', transition: '0.2s', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                  {fotoPreview ? ' Cambiar Foto' : '➕ Agregar Foto'}
                </label>
                {nombreArchivo && (
                  <span style={{ display: 'block', fontSize: '11px', color: '#6b7280', marginTop: '4px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {nombreArchivo}
                  </span>
                )}
              </div>
            </div>

            <h3 style={{ color: '#4b5563', fontSize: '16px' }}>2. Dimensiones y Equivalencia</h3>
            <div style={{ display: 'flex', gap: '16px', marginBottom: '12px' }}>
              <label style={{ fontWeight: 'bold', fontSize: '14px', cursor: 'pointer' }}>
                <input type="radio" name="tipoTamano" value="Basico" checked={paquete.tipoTamano === 'Basico'} onChange={handleChange} style={{ marginRight: '6px' }} />
                Básico (Pequeño / Fijo $1.00)
              </label>
              <label style={{ fontWeight: 'bold', fontSize: '14px', cursor: 'pointer' }}>
                <input type="radio" name="tipoTamano" value="Medidas" checked={paquete.tipoTamano === 'Medidas'} onChange={handleChange} style={{ marginRight: '6px' }} />
                Calcular por Medidas/Peso
              </label>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '8px', marginBottom: '16px', opacity: paquete.tipoTamano === 'Basico' ? 0.4 : 1, transition: '0.3s' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '4px', fontSize: '12px', fontWeight: 'bold' }}>Peso (lbs):</label>
                <input type="number" name="peso" value={paquete.peso} onChange={handleChange} disabled={paquete.tipoTamano === 'Basico'} required={paquete.tipoTamano === 'Medidas'} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #d1d5db' }} placeholder="0" />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '4px', fontSize: '12px', fontWeight: 'bold' }}>Largo (cm):</label>
                <input type="number" name="largo" value={paquete.largo} onChange={handleChange} disabled={paquete.tipoTamano === 'Basico'} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #d1d5db' }} placeholder="0" />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '4px', fontSize: '12px', fontWeight: 'bold' }}>Ancho (cm):</label>
                <input type="number" name="ancho" value={paquete.ancho} onChange={handleChange} disabled={paquete.tipoTamano === 'Basico'} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #d1d5db' }} placeholder="0" />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '4px', fontSize: '12px', fontWeight: 'bold' }}>Alto (cm):</label>
                <input type="number" name="alto" value={paquete.alto} onChange={handleChange} disabled={paquete.tipoTamano === 'Basico'} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #d1d5db' }} placeholder="0" />
              </div>
            </div>

            <h3 style={{ color: '#4b5563', fontSize: '16px' }}>3. Destino Nacional (14 Sedes Oficiales)</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px', fontWeight: 'bold' }}>Departamento:</label>
                <select name="departamento" value={paquete.departamento} onChange={handleChange} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #d1d5db' }}>
                  {Object.keys(destinosReales).map((depto) => (
                    <option key={depto} value={depto}>{depto}</option>
                  ))}
                </select>
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px', fontWeight: 'bold' }}>Sede Logística:</label>
                <select 
                  name="destinoIndex" 
                  value={paquete.destinoIndex} 
                  onChange={(e) => setPaquete({ ...paquete, destinoIndex: parseInt(e.target.value) })} 
                  style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #d1d5db' }}
                >
                  {destinosReales[paquete.departamento].map((dest, idx) => (
                    <option key={idx} value={idx}>{dest.nombre}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Cuadro informativo dinámico */}
            <div style={{ backgroundColor: '#eff6ff', borderLeft: '4px solid #3b82f6', padding: '12px', borderRadius: '4px', marginBottom: '16px', fontSize: '13px', color: '#1e40af' }}>
              <strong>🗓️ Horario de Atención:</strong> {infoDestinoSeleccionado.horario} <br />
              <strong>📍 Punto de Control:</strong> {infoDestinoSeleccionado.lugar}
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px', fontWeight: 'bold' }}>Indicaciones adicionales de la dirección:</label>
              <input type="text" name="direccionDetalle" value={paquete.direccionDetalle} onChange={handleChange} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #d1d5db' }} placeholder="Ej. Detrás de la alcaldía, portón negro" />
            </div>

            <button type="submit" style={{ width: '100%', backgroundColor: '#10b981', color: 'white', padding: '12px', borderRadius: '6px', border: 'none', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' }}>
              Calcular Tarifa de Envío
            </button>
          </form>
        </div>

        {/* Columna Derecha: Tarjeta de Cotización */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div style={{ backgroundColor: '#1e3a8a', color: 'white', padding: '32px', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', flex: 1 }}>
            <h2 style={{ marginTop: 0, fontSize: '20px', color: '#93c5fd' }}>Costo Estimado de Encomienda</h2>
            <div style={{ fontSize: '64px', fontWeight: 'bold', margin: '10px 0' }}>
              ${tarifaCalculada}
            </div>
            
            {fotoPreview && (
              <div style={{ marginBottom: '24px', width: '100%', maxWidth: '320px' }}>
                <p style={{ margin: '0 0 10px 0', fontSize: '14px', color: '#93c5fd', fontWeight: '500' }}>Vista previa del producto:</p>
                <div style={{ width: '100%', height: '260px', borderRadius: '12px', overflow: 'hidden', border: '3px solid white', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.4)', backgroundColor: '#0f172a' }}>
                  <img src={fotoPreview} alt="Producto" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                </div>
              </div>
            )}

            {/* Alerta de Retención */}
            <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', padding: '14px', borderRadius: '8px', width: '100%', maxWidth: '320px', marginBottom: '16px', fontSize: '13px' }}>
              <span style={{ display: 'block', fontWeight: 'bold', color: '#fca5a5', marginBottom: '4px' }}>
                ⚠️ TIEMPO LÍMITE EN AGENCIA:
              </span>
              <span style={{ fontSize: '15px', fontWeight: 'bold', color: '#f8fafc' }}>
                {infoDestinoSeleccionado.duracion === 'Paquete Dura 3 Dias' ? '⏳ ¡Dura un máximo de 3 Días!' : '📦 Tiempo de retiro estándar'}
              </span>
            </div>

            <p style={{ margin: 0, fontSize: '14px', color: '#bfdbfe' }}>
              {paquete.tipoTamano === 'Basico' 
                ? 'Modalidad: Envío Básico con Tarifa Fija.' 
                : `Tarifa base: $1.00 + Equivalencia calculada para ${paquete.departamento}.`}
            </p>
            
            <p style={{ fontSize: '13px', color: '#93c5fd', marginTop: '6px', fontWeight: 'bold' }}>
              📍 Sede Destino: {infoDestinoSeleccionado.nombre}
            </p>
            
            {tarifaCalculada > 0 && (
              <button 
                type="button" 
                onClick={registrarEncomiendaDB} 
                style={{ marginTop: '20px', backgroundColor: 'white', color: '#1e3a8a', padding: '12px 24px', borderRadius: '6px', border: 'none', fontWeight: 'bold', cursor: 'pointer', fontSize: '16px', width: '100%', maxWidth: '320px' }}
              >
                Confirmar y Generar Guía de Ruta
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Empleado;