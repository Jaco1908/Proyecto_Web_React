
import React from 'react';
import { Link } from 'react-router-dom';
import FiltrosDinamicos from '../componentes/FiltrosDinamicos';
import ProductosList from '../componentes/ProductosList';
import useProductos from '../hooks/useProductos';
import '../assets/css/plantilla/paginas.css';

const Catalogo = () => {
  const {
    productos,
    loading,
    error,
    filtros,
    actualizarFiltros,
    limpiarFiltros,
    totalProductos
  } = useProductos();

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
          <h2 style={{ color: '#c53030' }}>Error al cargar productos</h2>
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
        <Link to="/">Inicio</Link> &gt; <span>Catálogo</span>
      </div>
      
      <h1>Catálogo Completo</h1>
      <div className="categoria-intro">
        <p>Explora nuestro catálogo completo de productos tecnológicos organizados por categorías.</p>
      </div>

      <div className="catalogo-layout" style={{
        display: 'grid',
        gridTemplateColumns: '280px 1fr',
        gap: '30px',
        marginTop: '30px'
      }}>
        {/* Filtros */}
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
              minHeight: '300px',
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
              <p style={{ color: '#4a5568', fontSize: '1.1rem' }}>Cargando productos...</p>
            </div>
          ) : (
            <ProductosList productos={productos} />
          )}
        </div>
      </div>

    </div>
  );
};

export default Catalogo;
