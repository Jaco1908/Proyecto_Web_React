import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useProductNotification } from '../context/ProductNotificationContext';
import '../assets/css/plantilla/Nav.css';
import '../assets/css/ProductNotifications.css';

const Nav = ({ user }) => {
  const navigate = useNavigate();
  const { 
    notifications, 
    removeNotification, 
    clearAllNotifications, 
    getProductRoute,
    navigateToProduct 
  } = useProductNotification();

  // Log para debugging
  console.log('📊 Nav component rendered:', {
    notificationCount: notifications?.length || 0,
    notifications: notifications
  });

  // Función para manejar clic en notificación
  const handleNotificationClick = (notification) => {
    console.log('🔗 Navegando al producto:', notification.product.nombre);
    
    // Usar la nueva función navigateToProduct que no elimina la notificación
    navigateToProduct(notification.product, navigate);
    
    // NO eliminar la notificación para que permanezca persistente
    // removeNotification(notification.id); <- COMENTADO para mantener notificaciones
  };

  // Formatear timestamp
  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const diff = Math.floor((now - new Date(timestamp)) / 1000);
    
    if (diff < 60) return 'Hace unos segundos';
    if (diff < 3600) return `Hace ${Math.floor(diff / 60)} min`;
    if (diff < 86400) return `Hace ${Math.floor(diff / 3600)} h`;
    return `Hace ${Math.floor(diff / 86400)} días`;
  };
  const categories = [
    {
      name: "ACCESORIOS",
      link: "/accesorios",
      subcategories: [
        {
          title: "ACCESORIO",
          items: [{name: "MOCHILA", link: "/accesorios/mochila"}]
        },
        {
          title: "AURICULAR",
          items: [
            {name: "AUX", link: "/accesorios/auricular/aux"},
            {name: "BLUETOOTH", link: "/accesorios/auricular/bluetooth"},
            {name: "USB", link: "/accesorios/auricular/usb"}
          ]
        },
        {
          title: "MOTO A BATERÍA",
          items: [{name: "RECARGABLE", link: "/accesorios/moto-recargable"}]
        },
        {
          title: "GRABADORA",
          items: [{name: "EXTERNO", link: "/accesorios/grabadora-externo"}]
        }
      ]
    },
    {
      name: "ALMACENAMIENTO",
      link: "/almacenamiento",
      subcategories: [
        {
          title: "SMARTWATCH",
          items: [{name: "MÓVIL", link: "/almacenamiento/smartwatch-movil"}]
        },
        {
          title: "PARLANTE",
          items: [
            {name: "AUX", link: "/almacenamiento/parlante-aux"},
            {name: "PORTÁTIL", link: "/almacenamiento/parlante-portatil"}
          ]
        }
      ]
    },
    {
      name: "CONECTIVIDAD",
      link: "/conectividad",
      subcategories: [
        {
          title: "MICRÓFONO",
          items: [{name: "USB", link: "/conectividad/microfono-usb"}]
        },
        {
          title: "CÁMARA",
          items: [{name: "USB", link: "/conectividad/camara-usb"}]
        },
        {
          title: "ADAPTADOR",
          items: [
            {name: "HDMI", link: "/conectividad/adaptador-hdmi"},
            {name: "VGA", link: "/conectividad/adaptador-vga"}
          ]
        },
        {
          title: "COMBO",
          items: [{name: "TECLADO", link: "/conectividad/combo-teclado"}]
        }
      ]
    },
    {
      name: "CONSOLA",
      link: "/consola",
      subcategories: [
        {
          title: "STREAMING",
          items: [{name: "CHROMECAST", link: "/consola/chromecast"}]
        },
        {
          title: "PISCINA",
          items: [
            {name: "CIRCULAR", link: "/consola/piscina-circular"},
            {name: "DESMONTABLE", link: "/consola/piscina-desmontable"}
          ]
        }
      ]
    },
    {
      name: "COMPUTACIÓN",
      link: "/computacion",
      subcategories: [
        {
          title: "ENCLOSURE",
          items: [{name: "USB", link: "/computacion/enclosure-usb"}]
        },
        {
          title: "EXTENSOR",
          items: [{name: "HUB", link: "/computacion/extensor-hub"}]
        },
        {
          title: "CANDADO",
          items: [{name: "PORTÁTIL", link: "/computacion/candado-portatil"}]
        },
        {
          title: "MOUSE",
          items: [
            {name: "USB", link: "/computacion/mouse-usb"},
            {name: "WIRELESS", link: "/computacion/mouse-wireless"}
          ]
        }
      ]
    },
    {
      name: "ELECTRODOMÉSTICOS",
      link: "/electrodomesticos",
      subcategories: [
        {
          title: "CABLE",
          items: [{name: "USB", link: "/electrodomesticos/cable-usb"}]
        },
        {
          title: "PANEL",
          items: [{name: "SOLAR", link: "/electrodomesticos/panel-solar"}]
        }
      ]
    },
    {
      name: "MÓVIL",
      link: "/movil",
      subcategories: [
        {
          title: "SOPORTE",
          items: [
            {name: "MONITOR", link: "/movil/soporte-monitor"},
            {name: "TELEVISOR", link: "/movil/soporte-televisor"}
          ]
        },
        {
          title: "CARRO A BATERÍA",
          items: [{name: "RECARGABLE", link: "/movil/carro-recargable"}]
        },
        {
          title: "FOCOS",
          items: [{name: "LED", link: "/movil/focos-led"}]
        },
        {
          title: "TECLADO",
          items: [
            {name: "USB", link: "/movil/teclado-usb"},
            {name: "WIRELESS", link: "/movil/teclado-wireless"}
          ]
        }
      ]
    }
  ];

  return (
    <nav>
      {categories.map((category, index) => (
        <div className={`nav-container ${index >= categories.length - 3 ? 'dropdown-right' : ''}`} key={index}>
          <Link to={category.link} className="has-dropdown">{category.name}</Link>
          <div className="dropdown-menu">
            <div className="dropdown-content">
              {category.subcategories.map((subcat, subIndex) => (
                <div className="dropdown-column" key={subIndex}>
                  <div className="category-title">{subcat.title}</div>
                  {subcat.items.map((item, itemIndex) => (
                    <Link to={item.link} className="dropdown-link" key={itemIndex}>{item.name}</Link>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
      <Link to="/catalogo" className="catalogo">CATÁLOGO</Link>
      
      {/* Notificaciones de productos nuevos - Visible para todos los usuarios */}
      {user && (
        <div className="nav-notifications">
          <span 
            className="catalogo" 
            style={{ 
              cursor: 'pointer', 
              position: 'relative',
              background: notifications.length > 0 ? '#ef4444' : 'transparent',
              color: notifications.length > 0 ? 'white' : 'inherit',
              borderRadius: '4px',
              padding: '8px 12px',
              transition: 'all 0.3s ease',
              fontWeight: notifications.length > 0 ? 'bold' : 'normal'
            }}
          >
            🔔 NUEVOS PRODUCTOS
            {notifications.length > 0 && (
              <span 
                className="notification-indicator"
                style={{
                  position: 'absolute',
                  top: '-8px',
                  right: '-8px',
                  background: '#ff1744',
                  color: 'white',
                  borderRadius: '50%',
                  width: '24px',
                  height: '24px',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  animation: 'pulse 2s infinite',
                  zIndex: 10,
                  boxShadow: '0 2px 8px rgba(255, 23, 68, 0.6)'
                }}
              >
                {notifications.length}
              </span>
            )}
          </span>
          
          <div className="notification-dropdown" style={{
            display: notifications.length > 0 ? 'block' : 'none'
          }}>
            <div className="notification-header">
              <span>
                {user.nombre_rol === 'admin' ? '🎉 Productos Recién Creados' : '✨ Nuevos Productos Disponibles'}
              </span>
              {notifications.length > 0 && user.nombre_rol === 'admin' && (
                <button 
                  className="clear-notifications"
                  onClick={(e) => {
                    e.stopPropagation();
                    clearAllNotifications();
                  }}
                >
                  Limpiar Todo
                </button>
              )}
            </div>
            
            {notifications.length === 0 ? (
              <div className="no-notifications">
                <div style={{ textAlign: 'center', padding: '20px' }}>
                  <div style={{ fontSize: '24px', marginBottom: '8px' }}>📦</div>
                  <div>No hay productos nuevos</div>
                  <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '4px' }}>
                    Los productos que crees aparecerán aquí
                  </div>
                </div>
              </div>
            ) : (
              <div>
                {notifications.map(notification => (
                  <div 
                    key={notification.id} 
                    className="notification-item"
                    style={{
                      padding: '16px',
                      borderBottom: '1px solid #f1f5f9',
                      background: '#fff',
                      position: 'relative'
                    }}
                  >
                    {/* Botón para eliminar notificación individual */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeNotification(notification.id);
                      }}
                      style={{
                        position: 'absolute',
                        top: '8px',
                        right: '8px',
                        background: 'transparent',
                        border: 'none',
                        color: '#94a3b8',
                        fontSize: '16px',
                        cursor: 'pointer',
                        padding: '4px',
                        borderRadius: '4px',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.color = '#ef4444';
                        e.target.style.background = '#fef2f2';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.color = '#94a3b8';
                        e.target.style.background = 'transparent';
                      }}
                      title="Eliminar notificación"
                    >
                      ✕
                    </button>

                    <div 
                      onClick={() => handleNotificationClick(notification)}
                      style={{
                        cursor: 'pointer',
                        transition: 'background-color 0.2s',
                        padding: '4px',
                        borderRadius: '4px',
                        marginRight: '20px'
                      }}
                      onMouseEnter={(e) => e.target.style.background = '#f8fafc'}
                      onMouseLeave={(e) => e.target.style.background = 'transparent'}
                    >
                      <div className="notification-product-name" style={{
                        fontWeight: '600',
                        color: '#1e3a5c',
                        marginBottom: '8px',
                        fontSize: '14px'
                      }}>
                        ✨ {notification.product.nombre}
                      </div>
                    
                    <div style={{ display: 'flex', gap: '12px', marginBottom: '8px' }}>
                      <div style={{
                        background: '#dbeafe',
                        color: '#1d4ed8',
                        padding: '2px 6px',
                        borderRadius: '4px',
                        fontSize: '11px',
                        fontWeight: '500'
                      }}>
                        📂 {notification.category || 'Sin categoría'}
                      </div>
                      {notification.subcategory && (
                        <div style={{
                          background: '#eff6ff',
                          color: '#1e40af',
                          padding: '2px 6px',
                          borderRadius: '4px',
                          fontSize: '11px',
                          fontWeight: '500'
                        }}>
                          📁 {notification.subcategory}
                        </div>
                      )}
                      <div style={{
                        background: '#fef3c7',
                        color: '#92400e',
                        padding: '2px 6px',
                        borderRadius: '4px',
                        fontSize: '11px',
                        fontWeight: '500'
                      }}>
                        🏷️ {notification.brand || 'Sin marca'}
                      </div>
                    </div>
                    
                      <div style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center' 
                      }}>
                        <div style={{ 
                          color: '#059669', 
                          fontWeight: '600',
                          fontSize: '13px'
                        }}>
                          💰 ${notification.product.precio}
                        </div>
                        <div style={{
                          fontSize: '11px',
                          color: '#94a3b8'
                        }}>
                          {formatTimestamp(notification.timestamp)}
                        </div>
                      </div>
                      
                      <button 
                        className="notification-route-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleNotificationClick(notification);
                        }}
                        style={{
                          background: '#3b82f6',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          padding: '6px 12px',
                          fontSize: '11px',
                          cursor: 'pointer',
                          marginTop: '8px',
                          width: '100%',
                          fontWeight: '500'
                        }}
                      >
                        👁️ Ver en Catálogo →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
      
  {/* Solo admin puede ver Administrar productos */}
  {user && user.nombre_rol === 'admin' && <Link to="/admin" className="catalogo">ADMINISTRAR PRODUCTOS</Link>}
  {/* Solo admin puede ver Usuarios */}
  {user && user.nombre_rol === 'admin' && <Link to="/usuarios" className="catalogo">USUARIOS</Link>}
    </nav>
  );
};

export default Nav;