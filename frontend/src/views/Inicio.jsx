
// 1. AQUÍ CAMBIÓ: Importamos useNavigate para el manejo de rutas internas
import { useNavigate } from 'react-router-dom';

const Inicio = () => {
  // 2. AQUÍ CAMBIÓ: Inicializamos el hook de navegación
  const navigate = useNavigate();

  // 3. AQUÍ CAMBIÓ: Modificamos la función para que use la ruta interna de React
  const irAlPanel = () => {
    navigate('/empleado');
  };

  return (
    <div style={{ backgroundColor: '#fcfbf7', minHeight: '100vh', fontFamily: 'sans-serif', color: '#1f2937', margin: 0, padding: 0 }}>
      
      {/* 1. BARRA DE NAVEGACIÓN */}
      <nav style={{ backgroundColor: '#1e3a8a', padding: '16px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'white', position: 'sticky', top: 0, zIndex: 1000 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '24px', fontWeight: 'bold', letterSpacing: '1px' }}>📍 LA RUTA</span>
        </div>
        <div style={{ display: 'flex', gap: '30px', fontSize: '15px', fontWeight: '500' }}>
          <span style={{ cursor: 'pointer', opacity: 0.9 }}>Iniciooo</span>
          <span style={{ cursor: 'pointer', opacity: 0.7 }}>Repartidor</span>
          <span style={{ cursor: 'pointer', opacity: 0.7 }}>Panel de empleados</span>
          <span style={{ cursor: 'pointer', opacity: 0.7 }}>Panel de control</span>
        </div>
        <div>
          <button onClick={irAlPanel} style={{ backgroundColor: '#f59e0b', color: '#1e3a8a', border: 'none', padding: '10px 20px', borderRadius: '25px', fontWeight: 'bold', cursor: 'pointer', fontSize: '14px', transition: '0.3s' }}>
            Ingresar al Panel
          </button>
        </div>
      </nav>

      {/* 2. SECCIÓN HERO PRINCIPAL */}
      <section style={{ backgroundColor: '#1e3a8a', color: 'white', padding: '60px 40px', display: 'grid', gridTemplateColumns: '1fr 1fr', alignItems: 'center', gap: '40px', borderBottomLeftRadius: '40px', borderBottomRightRadius: '40px' }}>
        <div style={{ paddingLeft: '20px' }}>
          <span style={{ backgroundColor: '#3b82f6', color: 'white', padding: '6px 14px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold', letterSpacing: '1px' }}>
            LOGÍSTICA NACIONAL SEGURA
          </span>
          <h1 style={{ fontSize: '54px', fontWeight: '800', lineHeight: '1.1', margin: '20px 0', textTransform: 'uppercase' }}>
            Rápidoxsssss, Seguro <br /><span style={{ color: '#f59e0b' }}>Y Hecho a tu Medida.</span>
          </h1>
          <p style={{ fontSize: '16px', color: '#bfdbfe', lineHeight: '1.6', maxWidth: '450px', marginBottom: '30px' }}>
            Conectamos tus productos con todo El Salvador. Llevamos tus paquetes a agencias autorizadas con total control de dimensiones, tarifas transparentes y recolección eficiente.
          </p>
          <button onClick={irAlPanel} style={{ backgroundColor: '#e11d48', color: 'white', border: 'none', padding: '14px 32px', borderRadius: '25px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 4px 10px rgba(0,0,0,0.2)' }}>
            CREAR ENCOMIENDA
          </button>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{ width: '100%', maxWidth: '440px', height: '340px', backgroundColor: '#2563eb', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
            <div style={{ textAlign: 'center', padding: '20px' }}>
              <span style={{ fontSize: '80px' }}>📦</span>
              <h3 style={{ fontSize: '24px', margin: '10px 0 0 0', fontWeight: 'bold' }}>La Ruta Logistics</h3>
              <p style={{ fontSize: '13px', color: '#93c5fd', margin: '5px 0 0 0' }}>Control total de envíos en tiempo real</p>
            </div>
            <div style={{ position: 'absolute', bottom: '20px', right: '20px', backgroundColor: '#f59e0b', color: '#1e3a8a', padding: '8px 15px', borderRadius: '15px', fontWeight: 'bold', fontSize: '13px' }}>
              Tarifas desde $1.00
            </div>
          </div>
        </div>
      </section>

      {/* 3. BLOQUE DE CATEGORÍAS */}
      <section style={{ padding: '60px 40px', display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '24px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ backgroundColor: '#ffffff', padding: '30px', borderRadius: '20px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', display: 'flex', gap: '20px', alignItems: 'center', border: '1px solid #e5e7eb' }}>
          <div style={{ width: '140px', height: '140px', backgroundColor: '#eff6ff', borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '50px' }}>
            🛠️
          </div>
          <div>
            <h3 style={{ fontSize: '22px', fontWeight: 'bold', margin: '0 0 8px 0', color: '#1e3a8a' }}>Especialistas en Distribución</h3>
            <p style={{ fontSize: '14px', color: '#4b5563', lineHeight: '1.5', margin: 0 }}>
              Gestionamos con sumo cuidado paquetes de todo tipo: desde indumentaria y calzado fitness hasta tecnología delicada y repuestos o accesorios pesados para motocicletas.
            </p>
          </div>
        </div>

        <div style={{ backgroundColor: '#fef3c7', padding: '30px', borderRadius: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ zIndex: 2 }}>
            <h3 style={{ fontSize: '24px', fontWeight: '800', margin: '0 0 5px 0', color: '#92400e' }}>ENVÍO BÁSICO</h3>
            <p style={{ fontSize: '13px', color: '#b45309', margin: '0 0 12px 0', fontWeight: '500' }}>Paquetes pequeños de entrega inmediata.</p>
            <span style={{ backgroundColor: '#92400e', color: 'white', padding: '5px 12px', borderRadius: '10px', fontSize: '13px', fontWeight: 'bold' }}>Tarifa Fija: $1.00</span>
          </div>
          <div style={{ fontSize: '70px', opacity: 0.8, userSelect: 'none' }}>
            🏷️
          </div>
        </div>
      </section>

      {/* 4. SECCIÓN INFORMATIVA DETALLADA */}
      <section style={{ backgroundColor: '#f9fafb', padding: '60px 40px', borderTop: '1px solid #e5e7eb' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ width: '100%', maxWidth: '400px', height: '400px', backgroundColor: '#e5e7eb', borderRadius: '30px', overflow: 'hidden', border: '8px solid white', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: '120px' }}>🛵</span>
            </div>
          </div>

          <div>
            <h2 style={{ fontSize: '36px', fontWeight: '800', margin: '0 0 10px 0', textTransform: 'uppercase', color: '#1e3a8a' }}>
              ¿CÓMO OPERA NUESTRA <br />RED DE ENCOMIENDAS?
            </h2>
            <p style={{ color: '#6b7280', fontSize: '15px', marginBottom: '35px' }}>
              Diseñamos un flujo ágil para registrar, pesar y despachar mercadería de forma transparente y sin complicaciones.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
              <div>
                <h4 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  🏢 Cobertura en Agencias
                </h4>
                <p style={{ margin: 0, fontSize: '13px', color: '#4b5563', lineHeight: '1.5' }}>
                  Llegamos a los 14 departamentos del país conectando con las terminales de despacho y alcaldías céntricas.
                </p>
              </div>

              <div>
                <h4 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  ⏳ Retiro de 3 Días
                </h4>
                <p style={{ margin: 0, fontSize: '13px', color: '#4b5563', lineHeight: '1.5' }}>
                  Los paquetes permanecen seguros en la agencia de destino listos para ser reclamados por el cliente.
                </p>
              </div>

              <div>
                <h4 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  ⚖️ Cálculo Justo
                </h4>
                <p style={{ margin: 0, fontSize: '13px', color: '#4b5563', lineHeight: '1.5' }}>
                  Tarifa base económica con suplementos transparentes basados estrictamente en peso (lbs) y volumen (cm).
                </p>
              </div>

              <div>
                <h4 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  📸 Evidencia Visual
                </h4>
                <p style={{ margin: 0, fontSize: '13px', color: '#4b5563', lineHeight: '1.5' }}>
                  Cada encomienda se registra con su respectiva fotografía digitalizada para garantizar el estado real del producto.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FOOTER INFERIOR */}
      <footer style={{ backgroundColor: '#111827', color: 'white', padding: '30px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px' }}>
        <div style={{ fontWeight: 'bold', letterSpacing: '0.5px' }}>
          LA RUTA LOGISTICS © 2026
        </div>
        <div style={{ display: 'flex', gap: '20px', color: '#9ca3af' }}>
          <span>Términos de Servicio</span>
          <span>Políticas de Envío</span>
          <span>Soporte</span>
        </div>
        <div style={{ color: '#f59e0b', fontWeight: '500' }}>
          El Salvador
        </div>
      </footer>

    </div>
  );
};

export default Inicio;