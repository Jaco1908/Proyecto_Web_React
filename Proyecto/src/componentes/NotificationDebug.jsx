import React from 'react';
import { useProductNotification } from '../context/ProductNotificationContext';

const NotificationDebug = () => {
  const { 
    notifications, 
    newProducts,
    addProductNotification,
    clearAllNotifications
  } = useProductNotification();

  // Función para agregar una notificación de prueba
  const addTestNotification = () => {
    const testProduct = {
      id: Date.now(),
      nombre: `Producto Prueba ${new Date().getSeconds()}`,
      precio: '99.99',
      categoria_nombre: 'COMPUTACIÓN',
      subcategoria_nombre: 'MOUSE',
      marca_nombre: 'Logitech'
    };
    
    console.log('🧪 Agregando producto de prueba:', testProduct);
    addProductNotification(testProduct);
  };

  return (
    <div style={{
      background: '#f0f9ff',
      border: '2px solid #0ea5e9',
      borderRadius: '12px',
      padding: '20px',
      margin: '20px 0',
      position: 'relative'
    }}>
      <h3 style={{ 
        margin: '0 0 15px 0', 
        color: '#0c4a6e',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
      }}>
        🔍 Debug - Estado de Notificaciones
      </h3>
      
      <div style={{ display: 'grid', gap: '15px', gridTemplateColumns: '1fr 1fr' }}>
        <div>
          <h4 style={{ margin: '0 0 8px 0', color: '#0369a1' }}>
            📬 Notificaciones Activas: {notifications.length}
          </h4>
          <div style={{
            background: '#e0f2fe',
            padding: '10px',
            borderRadius: '6px',
            maxHeight: '150px',
            overflowY: 'auto'
          }}>
            {notifications.length === 0 ? (
              <div style={{ color: '#64748b', fontStyle: 'italic' }}>
                No hay notificaciones
              </div>
            ) : (
              notifications.map(notif => (
                <div key={notif.id} style={{
                  background: 'white',
                  padding: '8px',
                  marginBottom: '6px',
                  borderRadius: '4px',
                  fontSize: '12px'
                }}>
                  <strong>{notif.product.nombre}</strong><br/>
                  📂 {notif.category} | 🏷️ {notif.brand}<br/>
                  ⏰ {new Date(notif.timestamp).toLocaleTimeString()}
                </div>
              ))
            )}
          </div>
        </div>

        <div>
          <h4 style={{ margin: '0 0 8px 0', color: '#0369a1' }}>
            ⚡ Productos Nuevos: {newProducts.length}
          </h4>
          <div style={{
            background: '#e0f2fe',
            padding: '10px',
            borderRadius: '6px',
            maxHeight: '150px',
            overflowY: 'auto'
          }}>
            {newProducts.length === 0 ? (
              <div style={{ color: '#64748b', fontStyle: 'italic' }}>
                No hay productos nuevos
              </div>
            ) : (
              newProducts.map(product => (
                <div key={product.id} style={{
                  background: 'white',
                  padding: '8px',
                  marginBottom: '6px',
                  borderRadius: '4px',
                  fontSize: '12px'
                }}>
                  <strong>{product.nombre}</strong><br/>
                  💰 ${product.precio}
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <div style={{ 
        display: 'flex', 
        gap: '10px', 
        marginTop: '15px',
        justifyContent: 'center'
      }}>
        <button
          onClick={addTestNotification}
          style={{
            background: '#10b981',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            padding: '8px 16px',
            cursor: 'pointer',
            fontSize: '12px',
            fontWeight: '500'
          }}
        >
          🧪 Agregar Notificación de Prueba
        </button>
        
        <button
          onClick={clearAllNotifications}
          style={{
            background: '#ef4444',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            padding: '8px 16px',
            cursor: 'pointer',
            fontSize: '12px',
            fontWeight: '500'
          }}
        >
          🗑️ Limpiar Todo
        </button>
      </div>

      <div style={{
        marginTop: '15px',
        fontSize: '11px',
        color: '#64748b',
        textAlign: 'center'
      }}>
        Este componente es temporal para debugging. Se actualizará en tiempo real.
      </div>
    </div>
  );
};

export default NotificationDebug;
