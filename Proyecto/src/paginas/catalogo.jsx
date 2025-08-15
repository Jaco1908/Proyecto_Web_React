import React from 'react';
import { Link } from 'react-router-dom';
import { useProductNotification } from '../context/ProductNotificationContext';
import '../assets/css/plantilla/paginas.css';

const Catalogo = () => {
  const { newProducts } = useProductNotification();

  return (
    <div className="pagina-container">
      <div className="breadcrumb">
        <Link to="/">Inicio</Link> &gt; <span>Catálogo</span>
      </div>
      
      <h1>Catálogo Completo</h1>
      
      <div className="categoria-intro">
        <p>Explora nuestro catálogo completo de productos tecnológicos organizados por categorías.</p>
      </div>

      {/* Sección de productos nuevos */}
      {newProducts.length > 0 && (
        <div className="productos-nuevos-catalogo" style={{ 
          marginBottom: '2rem', 
          padding: '1.5rem', 
          backgroundColor: '#f8fffe', 
          borderRadius: '12px',
          border: '2px solid #10b981'
        }}>
          <h2 style={{ 
            color: '#10b981', 
            marginBottom: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            ✨ Productos Recién Agregados
          </h2>
          <div className="productos-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: '1rem',
            marginBottom: '1rem'
          }}>
            {newProducts.slice(0, 6).map(producto => (
              <div 
                key={producto.id} 
                id={`producto-${producto.id}`}
                className="producto-nuevo-card" 
                style={{
                  backgroundColor: 'white',
                  borderRadius: '8px',
                  padding: '1rem',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  border: '1px solid #10b981',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 4px 16px rgba(16, 185, 129, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
                }}
              >
                <div style={{ position: 'relative' }}>
                  <span style={{
                    position: 'absolute',
                    top: '-0.5rem',
                    right: '-0.5rem',
                    backgroundColor: '#10b981',
                    color: 'white',
                    borderRadius: '50%',
                    width: '24px',
                    height: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '12px',
                    fontWeight: 'bold'
                  }}>
                    ✦
                  </span>
                  <img 
                    src={producto.foto || '/images/Productos/default.png'} 
                    alt={producto.nombre}
                    style={{ 
                      width: '100%', 
                      height: '120px', 
                      objectFit: 'cover', 
                      borderRadius: '6px',
                      marginBottom: '0.5rem'
                    }}
                  />
                </div>
                <h4 style={{ 
                  fontSize: '0.9rem', 
                  fontWeight: '600',
                  margin: '0.5rem 0',
                  color: '#333'
                }}>
                  {producto.nombre}
                </h4>
                <p style={{ 
                  color: '#10b981', 
                  fontWeight: '700',
                  fontSize: '1.1rem',
                  margin: '0.5rem 0'
                }}>
                  ${producto.precio}
                </p>
                <p style={{ 
                  fontSize: '0.8rem', 
                  color: '#666',
                  margin: '0.25rem 0'
                }}>
                  <strong>Categoría:</strong> {producto.categoria_nombre}
                </p>
                {producto.subcategoria_nombre && (
                  <p style={{ 
                    fontSize: '0.8rem', 
                    color: '#666',
                    margin: '0.25rem 0'
                  }}>
                    <strong>Subcategoría:</strong> {producto.subcategoria_nombre}
                  </p>
                )}
                <p style={{ 
                  fontSize: '0.8rem', 
                  color: '#666',
                  margin: '0.25rem 0'
                }}>
                  <strong>Marca:</strong> {producto.marca_nombre}
                </p>
                {producto.descripcion && (
                  <p style={{ 
                    fontSize: '0.75rem', 
                    color: '#888',
                    marginTop: '0.5rem',
                    lineHeight: '1.3'
                  }}>
                    {producto.descripcion.substring(0, 80)}
                    {producto.descripcion.length > 80 ? '...' : ''}
                  </p>
                )}
              </div>
            ))}
          </div>
          {newProducts.length > 6 && (
            <p style={{ 
              textAlign: 'center', 
              color: '#666',
              fontStyle: 'italic',
              marginTop: '1rem'
            }}>
              Y {newProducts.length - 6} productos nuevos más distribuidos en las categorías...
            </p>
          )}
        </div>
      )}

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
