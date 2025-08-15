import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/plantilla/paginas.css';

const Consola = () => {
  return (
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
  );
};

export default Consola;
