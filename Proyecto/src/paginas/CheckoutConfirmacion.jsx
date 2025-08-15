import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const CheckoutConfirmacion = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    // Obtener datos del pedido desde el state de la navegación
    if (location.state && location.state.order) {
      setOrder(location.state.order);
    } else {
      // Si no hay datos del pedido, redirigir al home
      navigate('/');
    }
  }, [location, navigate]);

  if (!order) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        backgroundColor: '#f8fafc',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '20px' }}>⏳</div>
          <p style={{ color: '#718096' }}>Cargando información del pedido...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
        
        {/* Animación de confirmación */}
        <div style={{ 
          textAlign: 'center', 
          marginBottom: '40px',
          backgroundColor: 'white',
          padding: '40px',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.07)'
        }}>
          <div style={{ 
            fontSize: '4rem', 
            marginBottom: '20px',
            animation: 'bounce 1s ease-in-out'
          }}>
            ✅
          </div>
          <h1 style={{ 
            color: '#38a169', 
            fontSize: '2.5rem', 
            fontWeight: 'bold',
            marginBottom: '15px'
          }}>
            ¡Pedido Confirmado!
          </h1>
          <p style={{ 
            color: '#4a5568', 
            fontSize: '1.2rem',
            lineHeight: '1.5',
            marginBottom: '20px'
          }}>
            Tu pedido ha sido procesado exitosamente. Recibirás una confirmación por email.
          </p>
          <div style={{
            backgroundColor: '#f0fff4',
            border: '2px solid #9ae6b4',
            borderRadius: '8px',
            padding: '15px',
            display: 'inline-block'
          }}>
            <span style={{ 
              color: '#2d3748', 
              fontSize: '1.1rem', 
              fontWeight: 'bold'
            }}>
              Número de Pedido: #{order.id}
            </span>
          </div>
        </div>

        {/* Detalles del pedido */}
        <div style={{ 
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '30px',
          marginBottom: '20px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.07)'
        }}>
          <h3 style={{ 
            color: '#2d3748', 
            fontSize: '1.5rem', 
            fontWeight: 'bold',
            marginBottom: '25px',
            borderBottom: '2px solid #e2e8f0',
            paddingBottom: '10px'
          }}>
            📦 Detalles del Pedido
          </h3>

          {/* Productos */}
          <div style={{ marginBottom: '25px' }}>
            <h4 style={{ 
              color: '#4a5568', 
              fontSize: '1.2rem', 
              marginBottom: '15px' 
            }}>
              Productos:
            </h4>
            {order.items.map((item) => (
              <div key={item.id} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '12px',
                backgroundColor: '#f7fafc',
                borderRadius: '8px',
                marginBottom: '10px'
              }}>
                <div style={{ flex: 1 }}>
                  <div style={{ 
                    fontWeight: 'bold', 
                    color: '#2d3748',
                    marginBottom: '4px'
                  }}>
                    {item.nombre}
                  </div>
                  <div style={{ 
                    fontSize: '0.9rem', 
                    color: '#718096' 
                  }}>
                    Cantidad: {item.cantidad} | Precio unitario: ${item.precio.toLocaleString()}
                  </div>
                </div>
                <div style={{ 
                  fontWeight: 'bold', 
                  color: '#667eea',
                  fontSize: '1.1rem'
                }}>
                  ${(item.precio * item.cantidad).toLocaleString()}
                </div>
              </div>
            ))}
            
            <div style={{
              borderTop: '2px solid #e2e8f0',
              paddingTop: '15px',
              marginTop: '15px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <span style={{ 
                fontSize: '1.3rem', 
                fontWeight: 'bold',
                color: '#2d3748'
              }}>
                Total:
              </span>
              <span style={{ 
                fontSize: '1.5rem', 
                fontWeight: 'bold',
                color: '#38a169'
              }}>
                ${order.total.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Información de envío */}
          <div style={{ marginBottom: '25px' }}>
            <h4 style={{ 
              color: '#4a5568', 
              fontSize: '1.2rem', 
              marginBottom: '15px' 
            }}>
              🚚 Información de Envío:
            </h4>
            <div style={{
              backgroundColor: '#f7fafc',
              padding: '20px',
              borderRadius: '8px',
              border: '1px solid #e2e8f0'
            }}>
              <p style={{ margin: '5px 0', color: '#2d3748' }}>
                <strong>Destinatario:</strong> {order.shippingData.nombre} {order.shippingData.apellido}
              </p>
              <p style={{ margin: '5px 0', color: '#2d3748' }}>
                <strong>Email:</strong> {order.shippingData.email}
              </p>
              <p style={{ margin: '5px 0', color: '#2d3748' }}>
                <strong>Teléfono:</strong> {order.shippingData.telefono}
              </p>
              <p style={{ margin: '5px 0', color: '#2d3748' }}>
                <strong>Dirección:</strong> {order.shippingData.direccion}
              </p>
              <p style={{ margin: '5px 0', color: '#2d3748' }}>
                <strong>Ciudad:</strong> {order.shippingData.ciudad}, {order.shippingData.provincia}
              </p>
              {order.shippingData.codigoPostal && (
                <p style={{ margin: '5px 0', color: '#2d3748' }}>
                  <strong>Código Postal:</strong> {order.shippingData.codigoPostal}
                </p>
              )}
              {order.shippingData.referencias && (
                <p style={{ margin: '5px 0', color: '#2d3748' }}>
                  <strong>Referencias:</strong> {order.shippingData.referencias}
                </p>
              )}
            </div>
          </div>

          {/* Método de pago */}
          <div style={{ marginBottom: '25px' }}>
            <h4 style={{ 
              color: '#4a5568', 
              fontSize: '1.2rem', 
              marginBottom: '15px' 
            }}>
              💳 Método de Pago:
            </h4>
            <div style={{
              backgroundColor: '#f7fafc',
              padding: '15px',
              borderRadius: '8px',
              border: '1px solid #e2e8f0'
            }}>
              <span style={{
                display: 'inline-block',
                backgroundColor: '#667eea',
                color: 'white',
                padding: '6px 12px',
                borderRadius: '20px',
                fontSize: '0.9rem',
                fontWeight: 'bold'
              }}>
                {order.paymentMethod === 'tarjeta' && '💳 Tarjeta de Crédito/Débito'}
                {order.paymentMethod === 'transferencia' && '🏦 Transferencia Bancaria'}
                {order.paymentMethod === 'efectivo' && '💰 Efectivo (Contra entrega)'}
              </span>
            </div>
          </div>

          {/* Notas especiales */}
          {order.notasEspeciales && (
            <div>
              <h4 style={{ 
                color: '#4a5568', 
                fontSize: '1.2rem', 
                marginBottom: '15px' 
              }}>
                📝 Notas Especiales:
              </h4>
              <div style={{
                backgroundColor: '#fef7e0',
                padding: '15px',
                borderRadius: '8px',
                border: '1px solid #fbd38d',
                color: '#2d3748'
              }}>
                {order.notasEspeciales}
              </div>
            </div>
          )}
        </div>

        {/* Próximos pasos */}
        <div style={{ 
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '30px',
          marginBottom: '30px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.07)'
        }}>
          <h3 style={{ 
            color: '#2d3748', 
            fontSize: '1.5rem', 
            fontWeight: 'bold',
            marginBottom: '20px'
          }}>
            📋 Próximos Pasos
          </h3>
          
          <div style={{ display: 'grid', gap: '15px' }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center',
              padding: '15px',
              backgroundColor: '#e6fffa',
              borderRadius: '8px',
              border: '1px solid #81e6d9'
            }}>
              <span style={{ fontSize: '2rem', marginRight: '15px' }}>📧</span>
              <div>
                <strong style={{ color: '#2d3748' }}>Confirmación por email</strong>
                <p style={{ margin: '5px 0', color: '#4a5568', fontSize: '0.9rem' }}>
                  Recibirás un email de confirmación con todos los detalles de tu pedido
                </p>
              </div>
            </div>

            <div style={{ 
              display: 'flex', 
              alignItems: 'center',
              padding: '15px',
              backgroundColor: '#fef7e0',
              borderRadius: '8px',
              border: '1px solid #fbd38d'
            }}>
              <span style={{ fontSize: '2rem', marginRight: '15px' }}>📦</span>
              <div>
                <strong style={{ color: '#2d3748' }}>Procesamiento</strong>
                <p style={{ margin: '5px 0', color: '#4a5568', fontSize: '0.9rem' }}>
                  Tu pedido será procesado y preparado para envío en 24-48 horas
                </p>
              </div>
            </div>

            <div style={{ 
              display: 'flex', 
              alignItems: 'center',
              padding: '15px',
              backgroundColor: '#f0fff4',
              borderRadius: '8px',
              border: '1px solid #9ae6b4'
            }}>
              <span style={{ fontSize: '2rem', marginRight: '15px' }}>🚚</span>
              <div>
                <strong style={{ color: '#2d3748' }}>Envío</strong>
                <p style={{ margin: '5px 0', color: '#4a5568', fontSize: '0.9rem' }}>
                  Recibirás un código de seguimiento para rastrear tu envío
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Botones de acción */}
        <div style={{ 
          display: 'flex', 
          gap: '20px', 
          justifyContent: 'center',
          marginBottom: '40px'
        }}>
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
            🛍️ Seguir Comprando
          </Link>

          <Link
            to="/"
            style={{
              display: 'inline-block',
              backgroundColor: '#f7fafc',
              color: '#4a5568',
              textDecoration: 'none',
              border: '2px solid #e2e8f0',
              padding: '15px 30px',
              borderRadius: '8px',
              fontSize: '1.1rem',
              fontWeight: '500',
              transition: 'all 0.3s ease'
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
            🏠 Ir al Inicio
          </Link>
        </div>

        {/* CSS para animaciones */}
        <style jsx>{`
          @keyframes bounce {
            0%, 20%, 53%, 80%, 100% {
              animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
              transform: translate3d(0,0,0);
            }
            40%, 43% {
              animation-timing-function: cubic-bezier(0.755, 0.050, 0.855, 0.060);
              transform: translate3d(0, -20px, 0);
            }
            70% {
              animation-timing-function: cubic-bezier(0.755, 0.050, 0.855, 0.060);
              transform: translate3d(0, -10px, 0);
            }
            90% {
              transform: translate3d(0, -4px, 0);
            }
          }
        `}</style>
      </div>
    </div>
  );
};

export default CheckoutConfirmacion;
