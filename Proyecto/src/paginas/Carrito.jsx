import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Carrito = () => {
  const navigate = useNavigate();
  const { 
    items, 
    removeFromCart, 
    updateQuantity, 
    clearCart, 
    getCartTotal, 
    getCartItemCount 
  } = useCart();

  const [showClearConfirm, setShowClearConfirm] = useState(false);

  // Verificar si el carrito está vacío
  if (items.length === 0) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        backgroundColor: '#f8fafc',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          backgroundColor: 'white',
          border: '1px solid #e2e8f0',
          borderRadius: '12px',
          padding: '60px 40px',
          textAlign: 'center',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.07)',
          maxWidth: '500px'
        }}>
          <div style={{ fontSize: '4rem', marginBottom: '20px' }}>🛒</div>
          <h2 style={{ 
            color: '#2d3748', 
            fontSize: '1.8rem', 
            marginBottom: '15px',
            fontWeight: 'bold'
          }}>
            Tu carrito está vacío
          </h2>
          <p style={{ 
            color: '#718096', 
            fontSize: '1.1rem',
            marginBottom: '30px',
            lineHeight: '1.5'
          }}>
            Explora nuestros productos y encuentra lo que necesitas
          </p>
          <Link 
            to="/catalogo"
            style={{
              display: 'inline-block',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              textDecoration: 'none',
              padding: '15px 30px',
              borderRadius: '8px',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 8px 20px rgba(102, 126, 234, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = 'none';
            }}
          >
            🛍️ Ir de compras
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
        {/* Header del carrito */}
        <div style={{ marginBottom: '30px', textAlign: 'center' }}>
          <h1 style={{ 
            color: '#2d3748', 
            fontSize: '2.5rem', 
            fontWeight: 'bold',
            marginBottom: '10px'
          }}>
            🛒 Mi Carrito de Compras
          </h1>
          <p style={{ 
            color: '#718096', 
            fontSize: '1.1rem' 
          }}>
            {getCartItemCount()} {getCartItemCount() === 1 ? 'producto' : 'productos'} en tu carrito
          </p>
        </div>

        <div style={{ display: 'flex', gap: '30px' }}>
          {/* Lista de productos */}
          <div style={{ flex: 2 }}>
            <div style={{
              backgroundColor: 'white',
              border: '1px solid #e2e8f0',
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.07)'
            }}>
              <div style={{
                padding: '20px',
                borderBottom: '1px solid #e2e8f0',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <h3 style={{ 
                  color: '#2d3748', 
                  fontSize: '1.3rem', 
                  fontWeight: 'bold',
                  margin: 0
                }}>
                  Productos en el carrito
                </h3>
                <button
                  onClick={() => setShowClearConfirm(true)}
                  style={{
                    background: 'linear-gradient(135deg, #fc8181 0%, #e53e3e 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '8px 12px',
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    fontWeight: '500'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-1px)';
                    e.target.style.boxShadow = '0 4px 12px rgba(229, 62, 62, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = 'none';
                  }}
                >
                  🗑️ Vaciar carrito
                </button>
              </div>

              {items.map((item, index) => (
                <div key={item.id} style={{
                  padding: '20px',
                  borderBottom: index < items.length - 1 ? '1px solid #f7fafc' : 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '20px'
                }}>
                  {/* Imagen del producto */}
                  <img
                    src={item.imagen}
                    alt={item.nombre}
                    style={{
                      width: '100px',
                      height: '100px',
                      objectFit: 'cover',
                      borderRadius: '8px',
                      border: '1px solid #e2e8f0'
                    }}
                  />

                  {/* Información del producto */}
                  <div style={{ flex: 1 }}>
                    <h4 style={{
                      color: '#2d3748',
                      fontSize: '1.1rem',
                      fontWeight: 'bold',
                      marginBottom: '8px'
                    }}>
                      {item.nombre}
                    </h4>
                    
                    <div style={{ 
                      display: 'flex', 
                      gap: '8px', 
                      marginBottom: '10px'
                    }}>
                      {item.marca && (
                        <span style={{
                          backgroundColor: '#e6fffa',
                          color: '#0d9488',
                          padding: '4px 8px',
                          borderRadius: '6px',
                          fontSize: '0.8rem',
                          fontWeight: 'bold'
                        }}>
                          {item.marca}
                        </span>
                      )}
                      {item.categoria && (
                        <span style={{
                          backgroundColor: '#fef7e0',
                          color: '#d69e2e',
                          padding: '4px 8px',
                          borderRadius: '6px',
                          fontSize: '0.8rem',
                          fontWeight: 'bold'
                        }}>
                          {item.categoria}
                        </span>
                      )}
                    </div>

                    <div style={{ 
                      color: '#667eea', 
                      fontSize: '1.2rem', 
                      fontWeight: 'bold'
                    }}>
                      ${item.precio.toLocaleString()} c/u
                    </div>
                  </div>

                  {/* Controles de cantidad */}
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '10px',
                    backgroundColor: '#f7fafc',
                    padding: '10px',
                    borderRadius: '8px'
                  }}>
                    <button
                      onClick={() => updateQuantity(item.id, item.cantidad - 1)}
                      disabled={item.cantidad <= 1}
                      style={{
                        backgroundColor: item.cantidad <= 1 ? '#e2e8f0' : '#667eea',
                        color: item.cantidad <= 1 ? '#a0aec0' : 'white',
                        border: 'none',
                        borderRadius: '6px',
                        width: '32px',
                        height: '32px',
                        cursor: item.cantidad <= 1 ? 'not-allowed' : 'pointer',
                        fontSize: '1.2rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 'bold'
                      }}
                    >
                      −
                    </button>

                    <span style={{
                      fontSize: '1.1rem',
                      fontWeight: 'bold',
                      color: '#2d3748',
                      minWidth: '40px',
                      textAlign: 'center'
                    }}>
                      {item.cantidad}
                    </span>

                    <button
                      onClick={() => updateQuantity(item.id, item.cantidad + 1)}
                      style={{
                        backgroundColor: '#667eea',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        width: '32px',
                        height: '32px',
                        cursor: 'pointer',
                        fontSize: '1.2rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 'bold'
                      }}
                    >
                      +
                    </button>
                  </div>

                  {/* Subtotal y eliminar */}
                  <div style={{ 
                    textAlign: 'right',
                    minWidth: '120px'
                  }}>
                    <div style={{ 
                      color: '#2d3748', 
                      fontSize: '1.3rem', 
                      fontWeight: 'bold',
                      marginBottom: '10px'
                    }}>
                      ${(item.precio * item.cantidad).toLocaleString()}
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      style={{
                        backgroundColor: '#fed7d7',
                        color: '#c53030',
                        border: '1px solid #feb2b2',
                        borderRadius: '6px',
                        padding: '6px 12px',
                        fontSize: '0.9rem',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        fontWeight: '500'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = '#fc8181';
                        e.target.style.color = 'white';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = '#fed7d7';
                        e.target.style.color = '#c53030';
                      }}
                    >
                      🗑️ Eliminar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Resumen del pedido */}
          <div style={{ flex: 1, maxWidth: '400px' }}>
            <div style={{
              backgroundColor: 'white',
              border: '1px solid #e2e8f0',
              borderRadius: '12px',
              padding: '25px',
              position: 'sticky',
              top: '20px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.07)'
            }}>
              <h3 style={{ 
                color: '#2d3748', 
                fontSize: '1.4rem', 
                fontWeight: 'bold',
                marginBottom: '20px',
                textAlign: 'center'
              }}>
                📋 Resumen del Pedido
              </h3>

              <div style={{ marginBottom: '20px' }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '10px',
                  color: '#4a5568',
                  fontSize: '1rem'
                }}>
                  <span>Productos ({getCartItemCount()})</span>
                  <span>${getCartTotal().toLocaleString()}</span>
                </div>

                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '10px',
                  color: '#4a5568',
                  fontSize: '1rem'
                }}>
                  <span>Envío</span>
                  <span style={{ color: '#38a169', fontWeight: 'bold' }}>GRATIS</span>
                </div>

                <hr style={{ 
                  border: 'none', 
                  borderTop: '2px solid #e2e8f0',
                  margin: '15px 0'
                }} />

                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  color: '#2d3748',
                  fontSize: '1.3rem',
                  fontWeight: 'bold'
                }}>
                  <span>Total</span>
                  <span style={{ color: '#667eea' }}>${getCartTotal().toLocaleString()}</span>
                </div>
              </div>

              <button
                onClick={() => navigate('/checkout')}
                style={{
                  width: '100%',
                  background: 'linear-gradient(135deg, #48bb78 0%, #38a169 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '10px',
                  padding: '15px',
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  marginBottom: '15px'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 8px 20px rgba(72, 187, 120, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = 'none';
                }}
              >
                🚀 Proceder al Checkout
              </button>

              <Link
                to="/catalogo"
                style={{
                  display: 'block',
                  width: '100%',
                  textAlign: 'center',
                  backgroundColor: '#f7fafc',
                  color: '#4a5568',
                  textDecoration: 'none',
                  border: '2px solid #e2e8f0',
                  borderRadius: '10px',
                  padding: '12px',
                  fontSize: '1rem',
                  fontWeight: '500',
                  transition: 'all 0.3s ease',
                  boxSizing: 'border-box'
                }}
                onMouseEnter={(e) => {
                  e.target.style.borderColor = '#667eea';
                  e.target.style.color = '#667eea';
                }}
                onMouseLeave={(e) => {
                  e.target.style.borderColor = '#e2e8f0';
                  e.target.style.color = '#4a5568';
                }}
              >
                🛍️ Seguir comprando
              </Link>
            </div>
          </div>
        </div>

        {/* Modal de confirmación para vaciar carrito */}
        {showClearConfirm && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
          }}>
            <div style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              padding: '30px',
              maxWidth: '400px',
              textAlign: 'center',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '20px' }}>⚠️</div>
              <h3 style={{ 
                color: '#2d3748', 
                fontSize: '1.4rem', 
                marginBottom: '15px' 
              }}>
                ¿Vaciar carrito?
              </h3>
              <p style={{ 
                color: '#718096', 
                marginBottom: '25px',
                lineHeight: '1.5'
              }}>
                Esta acción eliminará todos los productos de tu carrito. ¿Estás seguro?
              </p>
              <div style={{ display: 'flex', gap: '15px' }}>
                <button
                  onClick={() => setShowClearConfirm(false)}
                  style={{
                    flex: 1,
                    backgroundColor: '#f7fafc',
                    color: '#4a5568',
                    border: '2px solid #e2e8f0',
                    borderRadius: '8px',
                    padding: '12px',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    fontWeight: '500'
                  }}
                >
                  Cancelar
                </button>
                <button
                  onClick={() => {
                    clearCart();
                    setShowClearConfirm(false);
                  }}
                  style={{
                    flex: 1,
                    background: 'linear-gradient(135deg, #fc8181 0%, #e53e3e 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '12px',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    fontWeight: 'bold'
                  }}
                >
                  Sí, vaciar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Carrito;
