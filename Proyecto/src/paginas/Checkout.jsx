import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Checkout = () => {
  const navigate = useNavigate();
  const { items, getCartTotal, clearCart } = useCart();
  
  // Estados para el formulario
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  
  // Datos del formulario
  const [formData, setFormData] = useState({
    // Datos personales
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    
    // Dirección de envío
    direccion: '',
    ciudad: '',
    provincia: '',
    codigoPostal: '',
    referencias: '',
    
    // Método de pago
    metodoPago: 'tarjeta',
    numeroTarjeta: '',
    fechaExpiracion: '',
    cvv: '',
    nombreTitular: '',
    
    // Notas adicionales
    notasEspeciales: ''
  });

  // Verificar si el usuario está logueado
  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      setFormData(prev => ({
        ...prev,
        nombre: parsedUser.nombre || '',
        email: parsedUser.email || ''
      }));
    } else {
      // Redirigir al login si no está autenticado
      alert('Debes iniciar sesión para continuar con la compra');
      navigate('/login');
      return;
    }

    // Verificar si el carrito no está vacío
    if (items.length === 0) {
      navigate('/carrito');
    }
  }, [items, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const nextStep = () => {
    if (validateCurrentStep()) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  const validateCurrentStep = () => {
    switch (currentStep) {
      case 1: // Datos personales
        if (!formData.nombre || !formData.apellido || !formData.email || !formData.telefono) {
          alert('Por favor completa todos los datos personales');
          return false;
        }
        break;
      case 2: // Dirección de envío
        if (!formData.direccion || !formData.ciudad || !formData.provincia) {
          alert('Por favor completa los datos de dirección');
          return false;
        }
        break;
      case 3: // Método de pago
        if (formData.metodoPago === 'tarjeta') {
          if (!formData.numeroTarjeta || !formData.fechaExpiracion || !formData.cvv || !formData.nombreTitular) {
            alert('Por favor completa todos los datos de la tarjeta');
            return false;
          }
        }
        break;
    }
    return true;
  };

  const handleSubmitOrder = async () => {
    if (!validateCurrentStep()) return;
    
    setLoading(true);
    
    try {
      // Simular proceso de compra
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Crear objeto del pedido
      const order = {
        id: Date.now(),
        user: user,
        items: items,
        total: getCartTotal(),
        shippingData: {
          nombre: formData.nombre,
          apellido: formData.apellido,
          email: formData.email,
          telefono: formData.telefono,
          direccion: formData.direccion,
          ciudad: formData.ciudad,
          provincia: formData.provincia,
          codigoPostal: formData.codigoPostal,
          referencias: formData.referencias
        },
        paymentMethod: formData.metodoPago,
        notasEspeciales: formData.notasEspeciales,
        status: 'confirmado',
        date: new Date().toISOString()
      };
      
      // Guardar pedido en localStorage (en producción sería una API)
      const orders = JSON.parse(localStorage.getItem('orders') || '[]');
      orders.push(order);
      localStorage.setItem('orders', JSON.stringify(orders));
      
      // Limpiar carrito
      clearCart();
      
      // Redirigir a confirmación
      navigate('/checkout/confirmacion', { state: { order } });
      
    } catch (error) {
      console.error('Error al procesar el pedido:', error);
      alert('Hubo un error al procesar tu pedido. Por favor intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  const renderStep1 = () => (
    <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '12px', marginBottom: '20px' }}>
      <h3 style={{ color: '#2d3748', fontSize: '1.4rem', marginBottom: '20px' }}>
        👤 Datos Personales
      </h3>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#4a5568' }}>
            Nombre *
          </label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleInputChange}
            style={{
              width: '100%',
              padding: '12px',
              border: '2px solid #e2e8f0',
              borderRadius: '8px',
              fontSize: '1rem',
              boxSizing: 'border-box'
            }}
            required
          />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#4a5568' }}>
            Apellido *
          </label>
          <input
            type="text"
            name="apellido"
            value={formData.apellido}
            onChange={handleInputChange}
            style={{
              width: '100%',
              padding: '12px',
              border: '2px solid #e2e8f0',
              borderRadius: '8px',
              fontSize: '1rem',
              boxSizing: 'border-box'
            }}
            required
          />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#4a5568' }}>
            Email *
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            style={{
              width: '100%',
              padding: '12px',
              border: '2px solid #e2e8f0',
              borderRadius: '8px',
              fontSize: '1rem',
              boxSizing: 'border-box'
            }}
            required
          />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#4a5568' }}>
            Teléfono *
          </label>
          <input
            type="tel"
            name="telefono"
            value={formData.telefono}
            onChange={handleInputChange}
            style={{
              width: '100%',
              padding: '12px',
              border: '2px solid #e2e8f0',
              borderRadius: '8px',
              fontSize: '1rem',
              boxSizing: 'border-box'
            }}
            required
          />
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '12px', marginBottom: '20px' }}>
      <h3 style={{ color: '#2d3748', fontSize: '1.4rem', marginBottom: '20px' }}>
        🏠 Dirección de Envío
      </h3>
      <div style={{ display: 'grid', gap: '20px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#4a5568' }}>
            Dirección *
          </label>
          <input
            type="text"
            name="direccion"
            value={formData.direccion}
            onChange={handleInputChange}
            placeholder="Calle, número, apartamento..."
            style={{
              width: '100%',
              padding: '12px',
              border: '2px solid #e2e8f0',
              borderRadius: '8px',
              fontSize: '1rem',
              boxSizing: 'border-box'
            }}
            required
          />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#4a5568' }}>
              Ciudad *
            </label>
            <input
              type="text"
              name="ciudad"
              value={formData.ciudad}
              onChange={handleInputChange}
              style={{
                width: '100%',
                padding: '12px',
                border: '2px solid #e2e8f0',
                borderRadius: '8px',
                fontSize: '1rem',
                boxSizing: 'border-box'
              }}
              required
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#4a5568' }}>
              Provincia *
            </label>
            <input
              type="text"
              name="provincia"
              value={formData.provincia}
              onChange={handleInputChange}
              style={{
                width: '100%',
                padding: '12px',
                border: '2px solid #e2e8f0',
                borderRadius: '8px',
                fontSize: '1rem',
                boxSizing: 'border-box'
              }}
              required
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#4a5568' }}>
              Código Postal
            </label>
            <input
              type="text"
              name="codigoPostal"
              value={formData.codigoPostal}
              onChange={handleInputChange}
              style={{
                width: '100%',
                padding: '12px',
                border: '2px solid #e2e8f0',
                borderRadius: '8px',
                fontSize: '1rem',
                boxSizing: 'border-box'
              }}
            />
          </div>
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#4a5568' }}>
            Referencias adicionales
          </label>
          <textarea
            name="referencias"
            value={formData.referencias}
            onChange={handleInputChange}
            placeholder="Ej: Casa blanca, portón negro, al lado del supermercado..."
            rows="3"
            style={{
              width: '100%',
              padding: '12px',
              border: '2px solid #e2e8f0',
              borderRadius: '8px',
              fontSize: '1rem',
              resize: 'vertical',
              boxSizing: 'border-box'
            }}
          />
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '12px', marginBottom: '20px' }}>
      <h3 style={{ color: '#2d3748', fontSize: '1.4rem', marginBottom: '20px' }}>
        💳 Método de Pago
      </h3>
      
      <div style={{ marginBottom: '25px' }}>
        <div style={{ display: 'flex', gap: '15px', marginBottom: '20px' }}>
          <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
            <input
              type="radio"
              name="metodoPago"
              value="tarjeta"
              checked={formData.metodoPago === 'tarjeta'}
              onChange={handleInputChange}
              style={{ marginRight: '8px' }}
            />
            💳 Tarjeta de Crédito/Débito
          </label>
          <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
            <input
              type="radio"
              name="metodoPago"
              value="transferencia"
              checked={formData.metodoPago === 'transferencia'}
              onChange={handleInputChange}
              style={{ marginRight: '8px' }}
            />
            🏦 Transferencia Bancaria
          </label>
          <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
            <input
              type="radio"
              name="metodoPago"
              value="efectivo"
              checked={formData.metodoPago === 'efectivo'}
              onChange={handleInputChange}
              style={{ marginRight: '8px' }}
            />
            💰 Efectivo (Contra entrega)
          </label>
        </div>
      </div>

      {formData.metodoPago === 'tarjeta' && (
        <div style={{ display: 'grid', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#4a5568' }}>
              Nombre del Titular *
            </label>
            <input
              type="text"
              name="nombreTitular"
              value={formData.nombreTitular}
              onChange={handleInputChange}
              style={{
                width: '100%',
                padding: '12px',
                border: '2px solid #e2e8f0',
                borderRadius: '8px',
                fontSize: '1rem',
                boxSizing: 'border-box'
              }}
              required
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#4a5568' }}>
              Número de Tarjeta *
            </label>
            <input
              type="text"
              name="numeroTarjeta"
              value={formData.numeroTarjeta}
              onChange={handleInputChange}
              placeholder="1234 5678 9012 3456"
              maxLength="19"
              style={{
                width: '100%',
                padding: '12px',
                border: '2px solid #e2e8f0',
                borderRadius: '8px',
                fontSize: '1rem',
                boxSizing: 'border-box'
              }}
              required
            />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#4a5568' }}>
                Fecha de Expiración *
              </label>
              <input
                type="text"
                name="fechaExpiracion"
                value={formData.fechaExpiracion}
                onChange={handleInputChange}
                placeholder="MM/AA"
                maxLength="5"
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '2px solid #e2e8f0',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  boxSizing: 'border-box'
                }}
                required
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#4a5568' }}>
                CVV *
              </label>
              <input
                type="text"
                name="cvv"
                value={formData.cvv}
                onChange={handleInputChange}
                placeholder="123"
                maxLength="4"
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '2px solid #e2e8f0',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  boxSizing: 'border-box'
                }}
                required
              />
            </div>
          </div>
        </div>
      )}

      {formData.metodoPago === 'transferencia' && (
        <div style={{ 
          backgroundColor: '#f7fafc', 
          padding: '20px', 
          borderRadius: '8px',
          border: '1px solid #e2e8f0'
        }}>
          <h4 style={{ color: '#2d3748', marginBottom: '15px' }}>Datos para Transferencia:</h4>
          <p style={{ margin: '5px 0', color: '#4a5568' }}>
            <strong>Banco:</strong> Banco del Ecuador
          </p>
          <p style={{ margin: '5px 0', color: '#4a5568' }}>
            <strong>Cuenta:</strong> 1234-5678-9012-3456
          </p>
          <p style={{ margin: '5px 0', color: '#4a5568' }}>
            <strong>Titular:</strong> TechStore Ecuador S.A.
          </p>
          <p style={{ margin: '5px 0', color: '#4a5568' }}>
            <strong>RUC:</strong> 1790123456001
          </p>
        </div>
      )}

      {formData.metodoPago === 'efectivo' && (
        <div style={{ 
          backgroundColor: '#f0fff4', 
          padding: '20px', 
          borderRadius: '8px',
          border: '1px solid #9ae6b4'
        }}>
          <p style={{ color: '#2d3748', margin: 0 }}>
            💰 <strong>Pago contra entrega:</strong> Podrás pagar en efectivo cuando recibas tu pedido. 
            El repartidor llevará el cambio necesario.
          </p>
        </div>
      )}

      <div style={{ marginTop: '25px' }}>
        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#4a5568' }}>
          Notas especiales para tu pedido
        </label>
        <textarea
          name="notasEspeciales"
          value={formData.notasEspeciales}
          onChange={handleInputChange}
          placeholder="Instrucciones especiales, horarios de entrega, etc..."
          rows="3"
          style={{
            width: '100%',
            padding: '12px',
            border: '2px solid #e2e8f0',
            borderRadius: '8px',
            fontSize: '1rem',
            resize: 'vertical',
            boxSizing: 'border-box'
          }}
        />
      </div>
    </div>
  );

  if (!user || items.length === 0) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        backgroundColor: '#f8fafc',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '20px' }}>⚠️</div>
          <h2 style={{ color: '#2d3748', marginBottom: '10px' }}>
            Acceso no permitido
          </h2>
          <p style={{ color: '#718096' }}>
            Debes tener productos en el carrito para acceder al checkout
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h1 style={{ 
            color: '#2d3748', 
            fontSize: '2.5rem', 
            fontWeight: 'bold',
            marginBottom: '10px'
          }}>
            🚀 Finalizar Compra
          </h1>
          <p style={{ color: '#718096', fontSize: '1.1rem' }}>
            Completa tu pedido de ${getCartTotal().toLocaleString()}
          </p>
        </div>

        {/* Indicador de pasos */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          marginBottom: '40px',
          gap: '20px'
        }}>
          {[1, 2, 3].map((step) => (
            <div key={step} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: currentStep >= step ? '#667eea' : '#e2e8f0',
                color: currentStep >= step ? 'white' : '#a0aec0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                fontSize: '1.1rem'
              }}>
                {step}
              </div>
              <span style={{
                color: currentStep >= step ? '#2d3748' : '#a0aec0',
                fontWeight: currentStep >= step ? 'bold' : 'normal'
              }}>
                {step === 1 && 'Datos Personales'}
                {step === 2 && 'Dirección'}
                {step === 3 && 'Pago'}
              </span>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '30px' }}>
          {/* Formulario */}
          <div style={{ flex: 2 }}>
            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
            {currentStep === 3 && renderStep3()}

            {/* Botones de navegación */}
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              backgroundColor: 'white',
              padding: '20px',
              borderRadius: '12px'
            }}>
              {currentStep > 1 && (
                <button
                  onClick={prevStep}
                  style={{
                    backgroundColor: '#f7fafc',
                    color: '#4a5568',
                    border: '2px solid #e2e8f0',
                    borderRadius: '8px',
                    padding: '12px 24px',
                    fontSize: '1rem',
                    cursor: 'pointer',
                    fontWeight: '500'
                  }}
                >
                  ← Anterior
                </button>
              )}
              
              <div style={{ marginLeft: 'auto' }}>
                {currentStep < 3 ? (
                  <button
                    onClick={nextStep}
                    style={{
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '12px 24px',
                      fontSize: '1rem',
                      cursor: 'pointer',
                      fontWeight: 'bold'
                    }}
                  >
                    Continuar →
                  </button>
                ) : (
                  <button
                    onClick={handleSubmitOrder}
                    disabled={loading}
                    style={{
                      background: loading 
                        ? '#a0aec0' 
                        : 'linear-gradient(135deg, #48bb78 0%, #38a169 100%)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '15px 30px',
                      fontSize: '1.1rem',
                      cursor: loading ? 'not-allowed' : 'pointer',
                      fontWeight: 'bold'
                    }}
                  >
                    {loading ? '⏳ Procesando...' : '✅ Confirmar Pedido'}
                  </button>
                )}
              </div>
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
              top: '20px'
            }}>
              <h3 style={{ 
                color: '#2d3748', 
                fontSize: '1.4rem', 
                fontWeight: 'bold',
                marginBottom: '20px',
                textAlign: 'center'
              }}>
                📋 Tu Pedido
              </h3>

              <div style={{ marginBottom: '20px', maxHeight: '300px', overflowY: 'auto' }}>
                {items.map((item) => (
                  <div key={item.id} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '10px 0',
                    borderBottom: '1px solid #f7fafc'
                  }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ 
                        fontSize: '0.9rem', 
                        fontWeight: 'bold',
                        color: '#2d3748',
                        marginBottom: '2px'
                      }}>
                        {item.nombre}
                      </div>
                      <div style={{ 
                        fontSize: '0.8rem', 
                        color: '#718096' 
                      }}>
                        Cantidad: {item.cantidad}
                      </div>
                    </div>
                    <div style={{ 
                      fontSize: '0.9rem', 
                      fontWeight: 'bold',
                      color: '#667eea'
                    }}>
                      ${(item.precio * item.cantidad).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ 
                borderTop: '2px solid #e2e8f0',
                paddingTop: '15px'
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '10px',
                  fontSize: '1rem',
                  color: '#4a5568'
                }}>
                  <span>Subtotal</span>
                  <span>${getCartTotal().toLocaleString()}</span>
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '15px',
                  fontSize: '1rem',
                  color: '#4a5568'
                }}>
                  <span>Envío</span>
                  <span style={{ color: '#38a169', fontWeight: 'bold' }}>GRATIS</span>
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '1.3rem',
                  fontWeight: 'bold',
                  color: '#2d3748'
                }}>
                  <span>Total</span>
                  <span style={{ color: '#667eea' }}>${getCartTotal().toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
