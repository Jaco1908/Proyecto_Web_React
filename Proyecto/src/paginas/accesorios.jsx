import React from 'react';
import { useParams, Link } from 'react-router-dom';
import '../assets/css/Accesorios.css';

const Accesorios = () => {
  // Puedes usar useParams si necesitas capturar parámetros de la URL
  const { categoria } = useParams();

  return (
    <div className="container">
      <div className="breadcrumb">
        <Link to="/">Home</Link> <span>ACCESORIOS</span>
      </div>

      <div className="content-wrapper">
        <div className="sidebar">
          <div className="filter-section brands-section">
            <h3>
              Marcas
              <Link to="/accesorios" className="view-all-brands">Ver todas</Link>
            </h3>
            <div className="brands-scrollable">
              <ul>
                <li><Link to="/accesorios/filtro/zebra">Zebra</Link></li>
                <li><Link to="/accesorios/filtro/tplink">TPLINK</Link></li>
                <li><Link to="/accesorios/filtro/speedmind">Speedmind</Link></li>
                <li><Link to="/accesorios/filtro/xiaomi">Xiaomi</Link></li>
                <li><Link to="/accesorios/filtro/genius">Genius</Link></li>
                <li><Link to="/accesorios/filtro/epson">Epson</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="main-content">
          {/* ... resto del contenido de la página de accesorios ... */}
        </div>
      </div>
    </div>
  );
};

export default Accesorios;