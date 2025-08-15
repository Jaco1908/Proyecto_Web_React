import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/plantilla/paginas.css';

const Movil = () => {
  return (
    <div className="pagina-container">
      <div className="breadcrumb">
        <Link to="/">Inicio</Link> &gt; <span>Móvil</span>
      </div>
      
      <h1>Móvil</h1>
      
      <div className="categoria-intro">
        <p>Dispositivos móviles y accesorios para teléfonos inteligentes.</p>
      </div>

      <div className="subcategorias-grid">
        <div className="subcategoria-card">
          <div className="subcategoria-icon">📱</div>
          <h3>Soporte</h3>
          <p>Soportes para monitor y televisor</p>
          <div className="subcategoria-links">
            <Link to="/movil/soporte-monitor">Monitor</Link>
            <Link to="/movil/soporte-televisor">Televisor</Link>
          </div>
        </div>

        <div className="subcategoria-card">
          <div className="subcategoria-icon">🚗</div>
          <h3>Carro a Batería</h3>
          <p>Carros recargables para niños</p>
          <Link to="/movil/carro-recargable" className="ver-productos">Ver Productos</Link>
        </div>

        <div className="subcategoria-card">
          <div className="subcategoria-icon">💡</div>
          <h3>Focos</h3>
          <p>Focos LED inteligentes</p>
          <Link to="/movil/focos-led" className="ver-productos">Ver Productos</Link>
        </div>

        <div className="subcategoria-card">
          <div className="subcategoria-icon">⌨️</div>
          <h3>Teclado</h3>
          <p>Teclados USB e inalámbricos</p>
          <div className="subcategoria-links">
            <Link to="/movil/teclado-usb">USB</Link>
            <Link to="/movil/teclado-wireless">Wireless</Link>
          </div>
        </div>
      </div>

      <div className="productos-destacados">
        <h2>Productos Destacados</h2>
        <div className="productos-grid">
          <div className="producto-card">
            <img src="/images/Nuevo/celularinfinix.jpg" alt="Celular Infinix" />
            <h4>Infinix Smartphone</h4>
            <p className="precio">$299.99</p>
          </div>
          <div className="producto-card">
            <img src="/images/Nuevo/celulartecno.jpg" alt="Celular Tecno" />
            <h4>Tecno Smartphone</h4>
            <p className="precio">$249.99</p>
          </div>
          <div className="producto-card">
            <img src="/images/Masvendidos/smartwatch.jpg" alt="Smartwatch" />
            <h4>Smartwatch Pro</h4>
            <p className="precio">$199.99</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Movil;
