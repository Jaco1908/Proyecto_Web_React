import React from 'react';
import { Link } from 'react-router-dom';
import { useProductNotification } from '../context/ProductNotificationContext';
import '../assets/css/plantilla/paginas.css';

const Electrodomesticos = () => {
  const { newProducts } = useProductNotification();
  const nuevosElectro = newProducts.filter(p => {
    if (!p.categoria_nombre) return false;
    return p.categoria_nombre.toLowerCase().includes('electrodoméstico') || p.categoria_nombre.toLowerCase().includes('electrodomestico');
  });
  return (
    <div>
      {nuevosElectro.length > 0 && (
        <div className="productos-nuevos-agregados">
          <h2 style={{ color: '#10b981' }}>Nuevos productos agregados</h2>
          <div className="productos-grid">
            {nuevosElectro.map(producto => (
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
          <Link to="/">Inicio</Link> &gt; <span>Electrodomésticos</span>
        </div>
        <h1>Electrodomésticos</h1>
        <div className="categoria-intro">
          <p>Electrodomésticos y soluciones de energía para tu hogar.</p>
        </div>
        <div className="subcategorias-grid">
          <div className="subcategoria-card">
            <div className="subcategoria-icon">🔌</div>
            <h3>Cable</h3>
            <p>Cables USB de calidad</p>
            <Link to="/electrodomesticos/cable-usb" className="ver-productos">Ver Productos</Link>
          </div>
          <div className="subcategoria-card">
            <div className="subcategoria-icon">☀️</div>
            <h3>Panel Solar</h3>
            <p>Paneles solares portátiles</p>
            <Link to="/electrodomesticos/panel-solar" className="ver-productos">Ver Productos</Link>
          </div>
        </div>
        <div className="productos-destacados">
          <h2>Productos Destacados</h2>
          <div className="productos-grid">
            <div className="producto-card">
              <img src="/images/Prom/TelevisorLG.jpg" alt="Televisor" />
              <h4>Televisor LG 55"</h4>
              <p className="precio">$799.99</p>
            </div>
            <div className="producto-card">
              <img src="/images/Prom/powerbank.jpg" alt="Power Bank" />
              <h4>Power Bank Solar</h4>
              <p className="precio">$89.99</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Electrodomesticos;
