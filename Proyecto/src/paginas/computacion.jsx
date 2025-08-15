import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/plantilla/paginas.css';

const Computacion = () => {
  return (
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
  );
};

export default Computacion;
