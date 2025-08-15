import React from 'react';
import { useProductNotification } from '../context/ProductNotificationContext';
import { Link } from 'react-router-dom';
import '../assets/css/plantilla/paginas.css';

const Almacenamiento = () => {
  const { newProducts } = useProductNotification();
  // Filtrar productos nuevos de almacenamiento
  const nuevosAlmacenamiento = newProducts.filter(p => {
    if (!p.categoria_nombre) return false;
    return p.categoria_nombre.toLowerCase().includes('almacenamiento');
  });
  return (
    <div className="pagina-container">
      <div className="breadcrumb">
        <Link to="/">Inicio</Link> &gt; <span>Almacenamiento</span>
      </div>
      
      <h1>Almacenamiento</h1>
      
      <div className="categoria-intro">
        <p>Soluciones de almacenamiento y dispositivos inteligentes para todas tus necesidades.</p>
      </div>

      <div className="subcategorias-grid">
        <div className="subcategoria-card">
          <div className="subcategoria-icon">⌚</div>
          <h3>Smartwatch</h3>
          <p>Relojes inteligentes móviles</p>
          <Link to="/almacenamiento/smartwatch-movil" className="ver-productos">Ver Productos</Link>
        </div>

        <div className="subcategoria-card">
          <div className="subcategoria-icon">🔊</div>
          <h3>Parlantes</h3>
          <p>Parlantes AUX y portátiles</p>
          <div className="subcategoria-links">
            <Link to="/almacenamiento/parlante-aux">AUX</Link>
            <Link to="/almacenamiento/parlante-portatil">Portátil</Link>
          </div>
        </div>
      </div>

      {/* Apartado de nuevos productos agregados en almacenamiento */}
      {nuevosAlmacenamiento.length > 0 && (
        <div className="productos-nuevos-agregados">
          <h2 style={{ color: '#10b981' }}>Nuevos productos agregados</h2>
          <div className="productos-grid">
            {nuevosAlmacenamiento.map(producto => (
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
      <div className="productos-destacados">
        <h2>Productos Destacados</h2>
        <div className="productos-grid">
          <div className="producto-card">
            <img src="/images/Masvendidos/smartwatch.jpg" alt="Smartwatch" />
            <h4>Smartwatch Pro</h4>
            <p className="precio">$199.99</p>
          </div>
          <div className="producto-card">
            <img src="/images/Destacado/Audio.jpg" alt="Parlante" />
            <h4>Parlante Bluetooth</h4>
            <p className="precio">$79.99</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Almacenamiento;
