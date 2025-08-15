
import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/plantilla/paginas.css';
import { useProductNotification } from '../context/ProductNotificationContext';

const Conectividad = () => {
  const { newProducts } = useProductNotification();
  const nuevosConectividad = newProducts.filter(p => {
    if (!p.categoria_nombre) return false;
    return p.categoria_nombre.toLowerCase().includes('conectividad');
  });
  return (
    <div>
      {nuevosConectividad.length > 0 && (
        <div className="productos-nuevos-agregados">
          <h2 style={{ color: '#10b981' }}>Nuevos productos agregados</h2>
          <div className="productos-grid">
            {nuevosConectividad.map(producto => (
              <div className="producto-card" key={producto.id}>
                <img src={producto.foto || '/images/Productos/default.png'} alt={producto.nombre} style={{ maxHeight: 120 }} />
                <h4>{producto.nombre}</h4>
                <p className="precio">${producto.precio}</p>
                <p><b>Categoría:</b> {producto.categoria_nombre}</p>
                {producto.subcategoria_nombre && <p><b>Subcategoría:</b> {producto.subcategoria_nombre}</p>}
                <p><b>Marca:</b> {producto.marca_nombre}</p>
                <p style={{ fontSize: '0.9em', color: '#555' }}>{producto.descripcion}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="pagina-container">
        <div className="breadcrumb">
          <Link to="/">Inicio</Link> &gt; <span>Conectividad</span>
        </div>
        <h1>Conectividad</h1>
        <div className="categoria-intro">
          <p>Todos los dispositivos para mantener tus equipos conectados y funcionando.</p>
        </div>
        <div className="subcategorias-grid">
          <div className="subcategoria-card">
            <div className="subcategoria-icon">🎤</div>
            <h3>Micrófono</h3>
            <p>Micrófonos USB profesionales</p>
            <Link to="/conectividad/microfono-usb" className="ver-productos">Ver Productos</Link>
          </div>
          <div className="subcategoria-card">
            <div className="subcategoria-icon">📷</div>
            <h3>Cámara</h3>
            <p>Cámaras USB para videoconferencias</p>
            <Link to="/conectividad/camara-usb" className="ver-productos">Ver Productos</Link>
          </div>
          <div className="subcategoria-card">
            <div className="subcategoria-icon">🔌</div>
            <h3>Adaptadores</h3>
            <p>Adaptadores HDMI y VGA</p>
            <div className="subcategoria-links">
              <Link to="/conectividad/adaptador-hdmi">HDMI</Link>
              <Link to="/conectividad/adaptador-vga">VGA</Link>
            </div>
          </div>
          <div className="subcategoria-card">
            <div className="subcategoria-icon">⌨️</div>
            <h3>Combo</h3>
            <p>Combos de teclado y mouse</p>
            <Link to="/conectividad/combo-teclado" className="ver-productos">Ver Productos</Link>
          </div>
        </div>
        <div className="productos-destacados">
          <h2>Productos Destacados</h2>
          <div className="productos-grid">
            <div className="producto-card">
              <img src="/images/Masvendidos/Micro.jpg" alt="Micrófono" />
              <h4>Micrófono USB</h4>
              <p className="precio">$59.99</p>
            </div>
            <div className="producto-card">
              <img src="/images/Destacado/Camara ip.jpg" alt="Cámara IP" />
              <h4>Cámara IP</h4>
              <p className="precio">$89.99</p>
            </div>
            <div className="producto-card">
              <img src="/images/Masvendidos/Adaptador.jpg" alt="Adaptador" />
              <h4>Adaptador HDMI</h4>
              <p className="precio">$24.99</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Conectividad;
