import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/plantilla/paginas.css';

const Conectividad = () => {
  return (
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
  );
};

export default Conectividad;
