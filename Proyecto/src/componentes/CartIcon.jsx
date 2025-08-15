import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const CartIcon = () => {
  const { getCartItemCount, getCartTotal } = useCart();
  const itemCount = getCartItemCount();
  const total = getCartTotal();

  return (
    <Link 
      to="/carrito" 
      style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        textDecoration: 'none',
        color: '#2d3748',
        padding: '8px 12px',
        borderRadius: '8px',
        transition: 'all 0.3s ease',
        backgroundColor: 'white',
        border: '2px solid #e2e8f0',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = '#667eea';
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.2)';
        e.currentTarget.style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = '#e2e8f0';
        e.currentTarget.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      {/* Ícono del carrito */}
      <div style={{ 
        fontSize: '1.5rem',
        marginRight: itemCount > 0 ? '8px' : '0'
      }}>
        🛒
      </div>

      {/* Contador de productos */}
      {itemCount > 0 && (
        <>
          <div style={{
            position: 'absolute',
            top: '-8px',
            right: '-8px',
            backgroundColor: '#e53e3e',
            color: 'white',
            borderRadius: '50%',
            width: '24px',
            height: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.8rem',
            fontWeight: 'bold',
            boxShadow: '0 2px 4px rgba(229, 62, 62, 0.3)',
            animation: itemCount > 0 ? 'bounce 0.6s ease-in-out' : 'none'
          }}>
            {itemCount > 99 ? '99+' : itemCount}
          </div>

          <div style={{ 
            display: 'flex', 
            flexDirection: 'column',
            alignItems: 'flex-start',
            fontSize: '0.9rem'
          }}>
            <span style={{ 
              fontWeight: 'bold', 
              color: '#2d3748',
              lineHeight: '1.2'
            }}>
              {itemCount} {itemCount === 1 ? 'producto' : 'productos'}
            </span>
            <span style={{ 
              color: '#667eea', 
              fontSize: '0.85rem',
              fontWeight: 'bold'
            }}>
              ${total.toLocaleString()}
            </span>
          </div>
        </>
      )}

      {/* CSS para animación */}
      <style jsx>{`
        @keyframes bounce {
          0%, 20%, 53%, 80%, 100% {
            animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
            transform: translate3d(0,0,0);
          }
          40%, 43% {
            animation-timing-function: cubic-bezier(0.755, 0.050, 0.855, 0.060);
            transform: translate3d(0, -8px, 0);
          }
          70% {
            animation-timing-function: cubic-bezier(0.755, 0.050, 0.855, 0.060);
            transform: translate3d(0, -4px, 0);
          }
          90% {
            transform: translate3d(0, -1px, 0);
          }
        }
      `}</style>
    </Link>
  );
};

export default CartIcon;
