
import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/plantilla/paginas.css';
import { useProductNotification } from '../context/ProductNotificationContext';

const Consola = () => {
  const { newProducts } = useProductNotification();
  const nuevosConsola = newProducts.filter(p => {
    if (!p.categoria_nombre) return false;
    return p.categoria_nombre.toLowerCase().includes('consola');
  });
  return (
    <div>
      {nuevosConsola.length > 0 && (
        <div className="productos-nuevos-agregados">
          <h2 style={{ color: '#10b981' }}>Nuevos productos agregados</h2>
          <div className="productos-grid">
            {nuevosConsola.map(producto => (
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
          <Link to="/">Inicio</Link> &gt; <span>Consola</span>
        </div>
        <h1>Consola</h1>
        <div className="categoria-intro">
          <p>Consolas de videojuegos y dispositivos de entretenimiento.</p>
        </div>
        <div className="subcategorias-grid">
          <div className="subcategoria-card">
            <div className="subcategoria-icon">📺</div>
            <h3>Streaming</h3>
            <p>Dispositivos Chromecast para streaming</p>
            <Link to="/consola/chromecast" className="ver-productos">Ver Productos</Link>
          </div>
          <div className="subcategoria-card">
            <div className="subcategoria-icon">🏊‍♂️</div>
            <h3>Piscina</h3>
            <p>Piscinas circulares y desmontables</p>
            <div className="subcategoria-links">
              <Link to="/consola/piscina-circular">Circular</Link>
              <Link to="/consola/piscina-desmontable">Desmontable</Link>
            </div>
          </div>
        </div>
        <div className="productos-destacados">
          <h2>Productos Destacados</h2>
          <div className="productos-grid">
            <div className="producto-card">
              <img src="/images/Nuevo/play.jpg" alt="PlayStation" />
              <h4>PlayStation 5</h4>
              <p className="precio">$499.99</p>
            </div>
            <div className="producto-card">
              <img src="/images/Destacado/Streaming.jpg" alt="Streaming Device" />
              <h4>Chromecast 4K</h4>
              <p className="precio">$49.99</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Consola;
