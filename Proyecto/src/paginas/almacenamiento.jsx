import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/plantilla/paginas.css';

const Almacenamiento = () => {
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
