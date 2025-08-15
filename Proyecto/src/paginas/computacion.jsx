
import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/plantilla/paginas.css';
import { useProductNotification } from '../context/ProductNotificationContext';

const Computacion = () => {
  const { newProducts } = useProductNotification();
  const nuevosComputacion = newProducts.filter(p => {
    if (!p.categoria_nombre) return false;
    return p.categoria_nombre.toLowerCase().includes('computacion') || p.categoria_nombre.toLowerCase().includes('computación');
  });
  return (
    <div>
      {nuevosComputacion.length > 0 && (
        <div className="productos-nuevos-agregados">
          <h2 style={{ color: '#10b981' }}>Nuevos productos agregados</h2>
          <div className="productos-grid">
            {nuevosComputacion.map(producto => (
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
          <Link to="/">Inicio</Link> &gt; <span>Computación</span>
        </div>
        <h1>Computación</h1>
        <div className="categoria-intro">
          <p>Todo lo que necesitas para tu computadora y oficina.</p>
        </div>
        <div className="subcategorias-grid">
          <div className="subcategoria-card">
            <div className="subcategoria-icon">💾</div>
            <h3>Enclosure</h3>
            <p>Enclosures USB para discos</p>
            <Link to="/computacion/enclosure-usb" className="ver-productos">Ver Productos</Link>
          </div>
          <div className="subcategoria-card">
            <div className="subcategoria-icon">🔌</div>
            <h3>Extensor</h3>
            <p>Hubs USB extensores</p>
            <Link to="/computacion/extensor-hub" className="ver-productos">Ver Productos</Link>
          </div>
          <div className="subcategoria-card">
            <div className="subcategoria-icon">🔒</div>
            <h3>Candado</h3>
            <p>Candados para laptops portátiles</p>
            <Link to="/computacion/candado-portatil" className="ver-productos">Ver Productos</Link>
          </div>
          <div className="subcategoria-card">
            <div className="subcategoria-icon">🖱️</div>
            <h3>Mouse</h3>
            <p>Mouse USB e inalámbricos</p>
            <div className="subcategoria-links">
              <Link to="/computacion/mouse-usb">USB</Link>
              <Link to="/computacion/mouse-wireless">Wireless</Link>
            </div>
          </div>
        </div>
        <div className="productos-destacados">
          <h2>Productos Destacados</h2>
          <div className="productos-grid">
            <div className="producto-card">
              <img src="/images/Destacado/computadorLev.jpg" alt="Computadora" />
              <h4>Laptop Gaming</h4>
              <p className="precio">$1299.99</p>
            </div>
            <div className="producto-card">
              <img src="/images/Destacado/monitor.jpeg" alt="Monitor" />
              <h4>Monitor 4K</h4>
              <p className="precio">$399.99</p>
            </div>
            <div className="producto-card">
              <img src="/images/Nuevo/candado.jpg" alt="Candado" />
              <h4>Candado Laptop</h4>
              <p className="precio">$19.99</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Computacion;
