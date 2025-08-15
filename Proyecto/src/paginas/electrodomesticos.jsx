import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/plantilla/paginas.css';

const Electrodomesticos = () => {
  return (
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
  );
};

export default Electrodomesticos;
