import React from 'react';
import { Link } from 'react-router-dom';
import FiltrosDinamicos from '../componentes/FiltrosDinamicos';
import ProductosList from '../componentes/ProductosList';
import useProductos from '../hooks/useProductos';
import { useProductNotification } from '../context/ProductNotificationContext';

const CategoriaGenerica = ({ 
  categoriaId,
  nombreCategoria,
  icono,
  descripcion,
  subcategorias = [],
  rutaBreadcrumb
}) => {
  // Filtrar productos de la categoría específica
  const filtrosIniciales = { categoria: categoriaId };
  
  const {
    productos,
    loading,
    error,
    filtros,
    actualizarFiltros,
    limpiarFiltros,
    totalProductos
  } = useProductos(filtrosIniciales);

  const { newProducts } = useProductNotification();
  
  // Filtrar productos nuevos de esta categoría
  const nuevosProductosCategoria = newProducts.filter(p => {
    if (!p.categoria_nombre) return false;
    return p.categoria_nombre.toLowerCase().includes(nombreCategoria.toLowerCase());
  });

  if (error) {
    return (
      <div className="pagina-container">
        <div className="error-container" style={{
          padding: '40px',
          textAlign: 'center',
          backgroundColor: '#fed7d7',
          borderRadius: '12px',
          margin: '20px 0'
        }}>
          <h2 style={{ color: '#c53030' }}>Error al cargar {nombreCategoria.toLowerCase()}</h2>
          <p style={{ color: '#742a2a' }}>{error}</p>
          <button 
            onClick={() => window.location.reload()}
            style={{
              background: '#c53030',
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '8px',
              cursor: 'pointer',
              marginTop: '16px'
            }}
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pagina-container">
      <div className="breadcrumb">
        <Link to="/">Inicio</Link> &gt; <span>{nombreCategoria}</span>
      </div>
      
      <div className="categoria-header">
        <h1>{icono} {nombreCategoria}</h1>
        <div className="categoria-descripcion">
          <p>{descripcion}</p>
        </div>
      </div>

      {/* Notificación de productos nuevos */}
      {nuevosProductosCategoria.length > 0 && (
        <div className="nuevos-productos-alerta" style={{
          background: 'linear-gradient(135deg, #48bb78 0%, #38a169 100%)',
          color: 'white',
          padding: '16px 20px',
          borderRadius: '12px',
          margin: '20px 0',
          boxShadow: '0 4px 12px rgba(72, 187, 120, 0.3)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '1.5rem' }}>🎉</span>
            <div>
              <h3 style={{ margin: '0 0 4px 0', fontSize: '1.1rem' }}>¡Nuevos Productos Disponibles!</h3>
              <p style={{ margin: 0, fontSize: '0.9rem', opacity: 0.9 }}>
                {nuevosProductosCategoria.length} nuevo{nuevosProductosCategoria.length !== 1 ? 's' : ''} producto{nuevosProductosCategoria.length !== 1 ? 's' : ''} en {nombreCategoria.toLowerCase()}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="categoria-layout" style={{
        display: 'grid',
        gridTemplateColumns: '280px 1fr',
        gap: '30px',
        marginTop: '30px'
      }}>
        {/* Filtros dinámicos */}
        <FiltrosDinamicos
          filtros={filtros}
          onChange={actualizarFiltros}
          onReset={limpiarFiltros}
          totalProductos={totalProductos}
        />

        {/* Lista de productos */}
        <div className="productos-container">
          {loading ? (
            <div className="loading-container" style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: '400px',
              flexDirection: 'column',
              gap: '16px'
            }}>
              <div className="loading-spinner" style={{
                border: '4px solid #e2e8f0',
                borderTop: '4px solid #667eea',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                animation: 'spin 1s linear infinite'
              }}></div>
              <p style={{ color: '#4a5568', fontSize: '1.1rem' }}>Cargando {nombreCategoria.toLowerCase()}...</p>
            </div>
          ) : totalProductos === 0 ? (
            <div className="no-productos" style={{
              backgroundColor: 'white',
              border: '1px solid #e2e8f0',
              borderRadius: '12px',
              padding: '60px 40px',
              textAlign: 'center',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.07)'
            }}>
              <div style={{ fontSize: '4rem', marginBottom: '20px' }}>🔍</div>
              <h3 style={{ color: '#4a5568', fontSize: '1.5rem', marginBottom: '10px' }}>
                No se encontraron productos
              </h3>
              <p style={{ color: '#718096', fontSize: '1rem', marginBottom: '30px' }}>
                Intenta ajustar los filtros para encontrar lo que buscas en {nombreCategoria.toLowerCase()}
              </p>
              <button
                onClick={limpiarFiltros}
                style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '12px 24px',
                  fontSize: '1rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontWeight: '500'
                }}
              >
                Ver todos los productos de {nombreCategoria.toLowerCase()}
              </button>
            </div>
          ) : (
            <ProductosList productos={productos} />
          )}
        </div>
      </div>

      {/* Subcategorías destacadas */}
      {subcategorias.length > 0 && (
        <div className="subcategorias-destacadas" style={{ marginTop: '60px' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>Subcategorías de {nombreCategoria}</h2>
          <div className="subcategorias-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '20px'
          }}>
            {subcategorias.map((sub, index) => (
              <Link key={index} to={sub.ruta} className="subcategoria-card">
                <img src={sub.imagen} alt={sub.nombre} />
                <h4>{sub.nombre}</h4>
                <p>{sub.descripcion}</p>
              </Link>
            ))}
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .categoria-layout {
          margin-top: 30px;
        }

        @media (max-width: 768px) {
          .categoria-layout {
            grid-template-columns: 1fr;
            gap: 20px;
          }
        }

        .categoria-header {
          text-align: center;
          margin: 30px 0;
        }

        .categoria-header h1 {
          color: #2d3748;
          font-size: 2.5rem;
          margin-bottom: 15px;
        }

        .categoria-descripcion p {
          color: #4a5568;
          font-size: 1.1rem;
          line-height: 1.6;
          max-width: 800px;
          margin: 0 auto;
        }

        .subcategorias-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
        }

        .subcategoria-card {
          background: white;
          border-radius: 12px;
          padding: 20px;
          text-align: center;
          text-decoration: none;
          box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
          transition: all 0.3s ease;
          border: 1px solid #e2e8f0;
        }

        .subcategoria-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
          border-color: #667eea;
        }

        .subcategoria-card img {
          width: 80px;
          height: 80px;
          border-radius: 8px;
          margin-bottom: 15px;
          object-fit: cover;
        }

        .subcategoria-card h4 {
          color: #2d3748;
          margin: 0 0 8px 0;
          font-size: 1.1rem;
        }

        .subcategoria-card p {
          color: #718096;
          margin: 0;
          font-size: 0.9rem;
        }
      `}</style>
    </div>
  );
};

export default CategoriaGenerica;
