import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useProductNotification } from '../context/ProductNotificationContext';
import '../assets/css/ProductNotifications.css';

const NewProductsSection = () => {
  const navigate = useNavigate();
  const { 
    newProducts, 
    clearNewProducts, 
    removeFromNewProducts,
    getProductRoute 
  } = useProductNotification();

  // Función para manejar clic en producto
  const handleProductClick = (product) => {
    const route = getProductRoute(product);
    navigate(route);
  };

  // Si no hay productos nuevos, no mostrar nada
  if (newProducts.length === 0) {
    return null;
  }

  return (
    <div className="new-products-section">
      <div className="new-products-header">
        <h2 className="new-products-title">
          <span>⚡</span>
          NUEVO STOCK
          <span className="new-badge">¡RECIÉN LLEGADO!</span>
          <span>⚡</span>
        </h2>
        <p style={{ margin: 0, opacity: 0.9, fontSize: '16px' }}>
          Descubre los productos más recientes agregados a nuestro catálogo
        </p>
      </div>

      <div className="new-products-grid">
        {newProducts.slice(0, 8).map(product => (
          <div 
            key={product.id} 
            className="new-product-card"
            onClick={() => handleProductClick(product)}
          >
            {product.foto && (
              <img 
                src={product.foto} 
                alt={product.nombre}
                className="new-product-image"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            )}
            <div className="new-product-name">
              {product.nombre}
            </div>
            <div className="new-product-price">
              ${product.precio}
            </div>
            <div style={{ 
              fontSize: '12px', 
              marginTop: '8px', 
              opacity: 0.8,
              display: 'flex',
              flexDirection: 'column',
              gap: '2px'
            }}>
              <span>📂 {product.categoria_nombre || 'General'}</span>
              {product.subcategoria_nombre && (
                <span>📁 {product.subcategoria_nombre}</span>
              )}
              <span>🏷️ {product.marca_nombre || 'Sin marca'}</span>
            </div>
            
            <button
              onClick={(e) => {
                e.stopPropagation();
                removeFromNewProducts(product.id);
              }}
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                background: 'rgba(239, 68, 68, 0.8)',
                color: 'white',
                border: 'none',
                borderRadius: '50%',
                width: '24px',
                height: '24px',
                fontSize: '14px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backdropFilter: 'blur(4px)',
                transition: 'all 0.2s ease'
              }}
              title="Ocultar producto"
              onMouseEnter={(e) => {
                e.target.style.background = 'rgba(239, 68, 68, 1)';
                e.target.style.transform = 'scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'rgba(239, 68, 68, 0.8)';
                e.target.style.transform = 'scale(1)';
              }}
            >
              ×
            </button>
          </div>
        ))}
      </div>

      {newProducts.length > 8 && (
        <div style={{ textAlign: 'center', marginTop: '15px' }}>
          <span style={{ opacity: 0.8, fontSize: '14px' }}>
            Y {newProducts.length - 8} productos más...
          </span>
        </div>
      )}

      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <button 
          className="clear-new-products"
          onClick={clearNewProducts}
        >
          🧹 Limpiar productos nuevos
        </button>
      </div>
    </div>
  );
};

export default NewProductsSection;
