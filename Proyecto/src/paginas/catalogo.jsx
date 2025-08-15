import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/plantilla/paginas.css';

const Catalogo = () => {
  return (
    <div className="pagina-container">
      <div className="breadcrumb">
        <Link to="/">Inicio</Link> &gt; <span>Catálogo</span>
      </div>
      
      <h1>Catálogo Completo</h1>
      
      <div className="categoria-intro">
        <p>Explora nuestro catálogo completo de productos tecnológicos organizados por categorías.</p>
      </div>

      <div className="catalogo-categorias">
        <div className="categoria-grid">
          <Link to="/accesorios" className="categoria-item">
            <img src="/images/Catalogo/Accesorio.gif" alt="Accesorios" />
            <h3>ACCESORIOS</h3>
            <p>Mochilas, auriculares, grabadoras y más</p>
          </Link>

          <Link to="/almacenamiento" className="categoria-item">
            <img src="/images/Catalogo/Almace.gif" alt="Almacenamiento" />
            <h3>ALMACENAMIENTO</h3>
            <p>Smartwatch, parlantes y dispositivos de audio</p>
          </Link>

          <Link to="/conectividad" className="categoria-item">
            <img src="/images/Catalogo/Conexion.gif" alt="Conectividad" />
            <h3>CONECTIVIDAD</h3>
            <p>Micrófonos, cámaras, adaptadores</p>
          </Link>

          <Link to="/consola" className="categoria-item">
            <img src="/images/Catalogo/consola.gif" alt="Consola" />
            <h3>CONSOLA</h3>
            <p>Dispositivos de streaming y entretenimiento</p>
          </Link>

          <Link to="/computacion" className="categoria-item">
            <img src="/images/Catalogo/Computador.gif" alt="Computación" />
            <h3>COMPUTACIÓN</h3>
            <p>Enclosures, extensores, candados, mouse</p>
          </Link>

          <Link to="/electrodomesticos" className="categoria-item">
            <img src="/images/Catalogo/Electro.gif" alt="Electrodomésticos" />
            <h3>ELECTRODOMÉSTICOS</h3>
            <p>Cables, paneles solares y más</p>
          </Link>

          <Link to="/movil" className="categoria-item">
            <img src="/images/Catalogo/celular.gif" alt="Móvil" />
            <h3>MÓVIL</h3>
            <p>Soportes, carros, focos LED, teclados</p>
          </Link>
        </div>
      </div>

      <div className="ofertas-especiales">
        <h2>Ofertas Especiales</h2>
        <div className="ofertas-grid">
          <div className="oferta-card">
            <img src="/images/Promociones/Promo1.png" alt="Promoción 1" />
            <div className="oferta-info">
              <h4>Descuento del 30%</h4>
              <p>En todos los accesorios</p>
            </div>
          </div>
          <div className="oferta-card">
            <img src="/images/Promociones/Promo2.png" alt="Promoción 2" />
            <div className="oferta-info">
              <h4>2x1 en Auriculares</h4>
              <p>Lleva dos y paga uno</p>
            </div>
          </div>
          <div className="oferta-card">
            <img src="/images/Promociones/Promo3.png" alt="Promoción 3" />
            <div className="oferta-info">
              <h4>Envío Gratis</h4>
              <p>En compras mayores a $100</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Catalogo;
