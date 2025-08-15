import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const AddToCartButton = ({ 
  producto, 
  size = 'medium', 
  style = {}, 
  className = '',
  onSuccess = null,
  showQuantity = true 
}) => {
  const navigate = useNavigate();
  const { addToCart, isInCart, getItemQuantity } = useCart();

  // Verificar si el usuario está logueado
  const isUserLoggedIn = () => {
    const user = localStorage.getItem('user');
    return user !== null;
  };

  // Manejar agregar al carrito
  const handleAddToCart = () => {
    if (!isUserLoggedIn()) {
      // Si no está logueado, mostrar alerta y redirigir al login
      if (window.confirm('Debes iniciar sesión para agregar productos al carrito. ¿Quieres ir al login ahora?')) {
        navigate('/login');
      }
      return;
    }

    // Si está logueado, agregar al carrito
    addToCart(producto, 1);
    
    // Ejecutar callback de éxito si existe
    if (onSuccess) {
      onSuccess(producto);
    } else {
      // Mostrar notificación de éxito por defecto
      alert(`✅ ${producto.nombre} ha sido agregado al carrito`);
    }
  };

  // Estilos según el tamaño
  const sizeStyles = {
    small: {
      padding: '6px 12px',
      fontSize: '0.8rem',
      borderRadius: '6px'
    },
    medium: {
      padding: '10px 16px',
      fontSize: '0.9rem',
      borderRadius: '8px'
    },
    large: {
      padding: '12px 24px',
      fontSize: '1rem',
      borderRadius: '10px'
    }
  };

  // Estilos base del botón
  const baseStyle = {
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    fontWeight: 'bold',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    ...sizeStyles[size],
    ...style
  };

  // Si el producto ya está en el carrito
  if (isInCart(producto.id)) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        {showQuantity && (
          <span style={{
            backgroundColor: '#e6fffa',
            color: '#0d9488',
            padding: '6px 12px',
            borderRadius: '6px',
            fontSize: size === 'small' ? '0.8rem' : '0.9rem',
            fontWeight: 'bold',
            border: '1px solid #a7f3d0'
          }}>
            ✓ En carrito ({getItemQuantity(producto.id)})
          </span>
        )}
        <button
          onClick={handleAddToCart}
          className={className}
          style={{
            ...baseStyle,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            padding: size === 'small' ? '4px 8px' : '8px 12px',
            fontSize: size === 'small' ? '0.7rem' : '0.8rem'
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'scale(1)';
          }}
        >
          + Más
        </button>
      </div>
    );
  }

  // Botón normal para agregar al carrito
  return (
    <button
      onClick={handleAddToCart}
      className={className}
      style={{
        ...baseStyle,
        background: 'linear-gradient(135deg, #48bb78 0%, #38a169 100%)',
        color: 'white'
      }}
      onMouseEnter={(e) => {
        e.target.style.transform = 'translateY(-2px)';
        e.target.style.boxShadow = '0 4px 12px rgba(72, 187, 120, 0.3)';
      }}
      onMouseLeave={(e) => {
        e.target.style.transform = 'translateY(0)';
        e.target.style.boxShadow = 'none';
      }}
    >
      🛒 Agregar al carrito
    </button>
  );
};

export default AddToCartButton;
