import React, { useState, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import '../assets/css/Accesorios.css';
import { useCart } from '../context/CartContext';
import { useToast } from '../componentes/ToastNotification';

const Accesorios = () => {
  const { categoria } = useParams();
  const navigate = useNavigate();
  const { addToCart, isInCart, getItemQuantity } = useCart();
  const { success, warning } = useToast();
  
  // Estados para filtros
  const [filtroMarca, setFiltroMarca] = useState('');
  const [filtroCategoria, setFiltroCategoria] = useState('');
  const [filtroPrecioMin, setFiltroPrecioMin] = useState('');
  const [filtroPrecioMax, setFiltroPrecioMax] = useState('');
  const [ordenarPor, setOrdenarPor] = useState('nombre');
  const [busqueda, setBusqueda] = useState('');
  
  // Datos de productos de accesorios (expandido)
  const productos = [
    { id: 1, nombre: 'Mochila Gaming RGB LED', precio: 89.99, imagen: '/images/Prom/Mochila.jpg', marca: 'GameMax', categoria: 'mochila', descripcion: 'Mochila gaming con luces LED RGB' },
    { id: 2, nombre: 'Mochila Antirrobo USB Premium', precio: 65.99, imagen: '/images/Prom/Mochila.jpg', marca: 'SecureBag', categoria: 'mochila', descripcion: 'Mochila con puerto USB y seguridad antirrobo' },
    { id: 3, nombre: 'Auriculares Bluetooth Premium', precio: 199.99, imagen: '/images/Masvendidos/auidifonos.jpg', marca: 'SoundMax', categoria: 'auricular', descripcion: 'Auriculares inalámbricos de alta fidelidad' },
    { id: 4, nombre: 'Auriculares Gaming 7.1 Surround', precio: 159.00, imagen: '/images/Masvendidos/auricular.jpg', marca: 'GameAudio', categoria: 'auricular', descripcion: 'Auriculares gaming con sonido envolvente' },
    { id: 5, nombre: 'Impresora Zebra ZT220 Térmica', precio: 299.99, imagen: '/images/Destacado/impresora.jpeg', marca: 'Zebra', categoria: 'impresora', descripcion: 'Impresora térmica industrial' },
    { id: 6, nombre: 'Router TP-Link Archer C7 AC1750', precio: 89.99, imagen: '/images/Masvendidos/Router.jpg', marca: 'TPLINK', categoria: 'router', descripcion: 'Router WiFi dual band AC1750' },
    { id: 7, nombre: 'Mouse Gaming Speedmind RGB', precio: 45.99, imagen: '/images/Masvendidos/Mouse.jpeg', marca: 'Speedmind', categoria: 'mouse', descripcion: 'Mouse gaming con iluminación RGB' },
    { id: 8, nombre: 'Auriculares Bluetooth Xiaomi', precio: 39.99, imagen: '/images/Masvendidos/auidifonos.jpg', marca: 'Xiaomi', categoria: 'auricular', descripcion: 'Auriculares inalámbricos económicos' },
    { id: 9, nombre: 'Teclado Mecánico Genius KB-125', precio: 19.99, imagen: '/images/Masvendidos/Teclado.jpg', marca: 'Genius', categoria: 'teclado', descripcion: 'Teclado mecánico para oficina' },
    { id: 10, nombre: 'Impresora Epson L3250 Multifunción', precio: 199.99, imagen: '/images/Destacado/Impresora1.jpg', marca: 'Epson', categoria: 'impresora', descripcion: 'Impresora multifunción con tanque de tinta' },
    { id: 11, nombre: 'PowerBank 20000mAh Fast Charge', precio: 35.99, imagen: '/images/Prom/powerbank.jpg', marca: 'Anker', categoria: 'powerbank', descripcion: 'Batería portátil de carga rápida' },
    { id: 12, nombre: 'Webcam HD 1080p Logitech', precio: 79.99, imagen: '/images/Nuevo/camaraezvi.jpg', marca: 'Logitech', categoria: 'camara', descripcion: 'Webcam HD para streaming y videoconferencias' },
    { id: 13, nombre: 'Hub USB-C 7 en 1', precio: 49.99, imagen: '/images/Nuevo/router.jpg', marca: 'Anker', categoria: 'hub', descripcion: 'Hub USB-C con múltiples puertos' },
    { id: 14, nombre: 'Mouse Logitech MX Master 3', precio: 129.99, imagen: '/images/Masvendidos/Mouse2.jpg', marca: 'Logitech', categoria: 'mouse', descripcion: 'Mouse ergonómico para productividad' },
    { id: 15, nombre: 'Teclado Gaming RGB Mecánico', precio: 89.99, imagen: '/images/Masvendidos/Teclado.jpg', marca: 'Corsair', categoria: 'teclado', descripcion: 'Teclado mecánico gaming con RGB' }
  ];

  // Obtener listas únicas para filtros
  const marcasUnicas = [...new Set(productos.map(p => p.marca))].sort();
  const categoriasUnicas = [...new Set(productos.map(p => p.categoria))].sort();
  const precioMin = Math.min(...productos.map(p => p.precio));
  const precioMax = Math.max(...productos.map(p => p.precio));

  // Lógica de filtrado
  const productosFiltrados = useMemo(() => {
    let resultado = productos.filter(producto => {
      // Filtro por búsqueda
      const coincideBusqueda = busqueda === '' || 
        producto.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
        producto.descripcion.toLowerCase().includes(busqueda.toLowerCase());
      
      // Filtro por marca
      const coincideMarca = filtroMarca === '' || producto.marca === filtroMarca;
      
      // Filtro por categoría
      const coincideCategoria = filtroCategoria === '' || producto.categoria === filtroCategoria;
      
      // Filtro por precio
      const precio = parseFloat(producto.precio);
      const coincidePrecioMin = filtroPrecioMin === '' || precio >= parseFloat(filtroPrecioMin);
      const coincidePrecioMax = filtroPrecioMax === '' || precio <= parseFloat(filtroPrecioMax);
      
      return coincideBusqueda && coincideMarca && coincideCategoria && coincidePrecioMin && coincidePrecioMax;
    });

    // Ordenamiento
    resultado.sort((a, b) => {
      switch (ordenarPor) {
        case 'precio-asc':
          return a.precio - b.precio;
        case 'precio-desc':
          return b.precio - a.precio;
        case 'marca':
          return a.marca.localeCompare(b.marca);
        case 'nombre':
        default:
          return a.nombre.localeCompare(b.nombre);
      }
    });

    return resultado;
  }, [productos, busqueda, filtroMarca, filtroCategoria, filtroPrecioMin, filtroPrecioMax, ordenarPor]);

  // Función para limpiar filtros
  const limpiarFiltros = () => {
    setFiltroMarca('');
    setFiltroCategoria('');
    setFiltroPrecioMin('');
    setFiltroPrecioMax('');
    setBusqueda('');
    setOrdenarPor('nombre');
  };

  // Función para verificar si el usuario está logueado
  const isUserLoggedIn = () => {
    const user = localStorage.getItem('user');
    return user !== null;
  };

  // Función para manejar agregar al carrito
  const handleAddToCart = (producto) => {
    if (!isUserLoggedIn()) {
      // Si no está logueado, mostrar notificación y redirigir al login
      warning('⚠️ Debes iniciar sesión para agregar productos al carrito', 4000);
      setTimeout(() => {
        navigate('/login');
      }, 1500);
      return;
    }

    // Si está logueado, agregar al carrito
    addToCart(producto, 1);
    
    // Mostrar notificación de éxito
    success(`🛒 ${producto.nombre} agregado al carrito`, 3000);
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h1 style={{ 
            color: '#2d3748', 
            fontSize: '2.5rem', 
            fontWeight: 'bold',
            marginBottom: '10px'
          }}>
            🎧 Accesorios Tecnológicos
          </h1>
          <p style={{ 
            color: '#718096', 
            fontSize: '1.1rem' 
          }}>
            Encuentra los mejores accesorios para tus dispositivos
          </p>
        </div>

        <div style={{ display: 'flex', gap: '20px' }}>
          {/* Panel de filtros */}
          <div style={{
            width: '320px',
            backgroundColor: 'white',
            border: '1px solid #e2e8f0',
            borderRadius: '12px',
            padding: '20px',
            height: 'fit-content',
            position: 'sticky',
            top: '20px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.07)'
          }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between',
              marginBottom: '20px',
              paddingBottom: '15px',
              borderBottom: '2px solid #e2e8f0'
            }}>
              <h3 style={{ 
                color: '#2d3748', 
                fontSize: '1.2rem', 
                fontWeight: 'bold',
                margin: 0
              }}>
                🔍 Filtros
              </h3>
              <button
                onClick={limpiarFiltros}
                style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '6px 12px',
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontWeight: '500'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-1px)';
                  e.target.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = 'none';
                }}
              >
                Limpiar
              </button>
            </div>

            {/* Búsqueda */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ 
                display: 'block', 
                fontWeight: 'bold', 
                color: '#4a5568',
                marginBottom: '8px',
                fontSize: '0.95rem'
              }}>
                🔎 Buscar productos
              </label>
              <input
                type="text"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                placeholder="Nombre, descripción..."
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '2px solid #e2e8f0',
                  borderRadius: '8px',
                  fontSize: '0.95rem',
                  transition: 'all 0.3s ease',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#667eea';
                  e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e2e8f0';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>

            {/* Ordenar por */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ 
                display: 'block', 
                fontWeight: 'bold', 
                color: '#4a5568',
                marginBottom: '8px',
                fontSize: '0.95rem'
              }}>
                📊 Ordenar por
              </label>
              <select
                value={ordenarPor}
                onChange={(e) => setOrdenarPor(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '2px solid #e2e8f0',
                  borderRadius: '8px',
                  fontSize: '0.95rem',
                  backgroundColor: 'white',
                  cursor: 'pointer',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              >
                <option value="nombre">Nombre A-Z</option>
                <option value="precio-asc">Precio menor a mayor</option>
                <option value="precio-desc">Precio mayor a menor</option>
                <option value="marca">Marca A-Z</option>
              </select>
            </div>

            {/* Rango de precios */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ 
                display: 'block', 
                fontWeight: 'bold', 
                color: '#4a5568',
                marginBottom: '8px',
                fontSize: '0.95rem'
              }}>
                💰 Rango de precios
              </label>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <input
                  type="number"
                  value={filtroPrecioMin}
                  onChange={(e) => setFiltroPrecioMin(e.target.value)}
                  placeholder={`Min $${precioMin}`}
                  min={precioMin}
                  max={precioMax}
                  style={{
                    flex: 1,
                    padding: '8px 10px',
                    border: '2px solid #e2e8f0',
                    borderRadius: '6px',
                    fontSize: '0.9rem',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
                <span style={{ color: '#718096', fontWeight: 'bold' }}>-</span>
                <input
                  type="number"
                  value={filtroPrecioMax}
                  onChange={(e) => setFiltroPrecioMax(e.target.value)}
                  placeholder={`Max $${precioMax}`}
                  min={precioMin}
                  max={precioMax}
                  style={{
                    flex: 1,
                    padding: '8px 10px',
                    border: '2px solid #e2e8f0',
                    borderRadius: '6px',
                    fontSize: '0.9rem',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
            </div>

            {/* Filtro por marca */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ 
                display: 'block', 
                fontWeight: 'bold', 
                color: '#4a5568',
                marginBottom: '8px',
                fontSize: '0.95rem'
              }}>
                🏷️ Marcas
              </label>
              <select
                value={filtroMarca}
                onChange={(e) => setFiltroMarca(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '2px solid #e2e8f0',
                  borderRadius: '8px',
                  fontSize: '0.95rem',
                  backgroundColor: 'white',
                  cursor: 'pointer',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              >
                <option value="">Todas las marcas</option>
                {marcasUnicas.map(marca => (
                  <option key={marca} value={marca}>{marca}</option>
                ))}
              </select>
            </div>

            {/* Filtro por categoría */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ 
                display: 'block', 
                fontWeight: 'bold', 
                color: '#4a5568',
                marginBottom: '8px',
                fontSize: '0.95rem'
              }}>
                📂 Categorías
              </label>
              <select
                value={filtroCategoria}
                onChange={(e) => setFiltroCategoria(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '2px solid #e2e8f0',
                  borderRadius: '8px',
                  fontSize: '0.95rem',
                  backgroundColor: 'white',
                  cursor: 'pointer',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              >
                <option value="">Todas las categorías</option>
                {categoriasUnicas.map(categoria => (
                  <option key={categoria} value={categoria}>{categoria}</option>
                ))}
              </select>
            </div>

            {/* Resumen de filtros */}
            <div style={{ 
              backgroundColor: '#f7fafc', 
              padding: '15px', 
              borderRadius: '8px',
              border: '1px solid #e2e8f0'
            }}>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                fontSize: '0.9rem',
                color: '#4a5568',
                fontWeight: 'bold'
              }}>
                <span>📊 Productos encontrados:</span>
                <span style={{ 
                  color: '#667eea',
                  fontSize: '1.1rem',
                  fontWeight: 'bold'
                }}>
                  {productosFiltrados.length}
                </span>
              </div>
            </div>
          </div>

          {/* Grid de productos */}
          <div style={{ flex: 1 }}>
            {productosFiltrados.length === 0 ? (
              <div style={{
                backgroundColor: 'white',
                border: '1px solid #e2e8f0',
                borderRadius: '12px',
                padding: '40px',
                textAlign: 'center',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.07)'
              }}>
                <div style={{ fontSize: '4rem', marginBottom: '20px' }}>🔍</div>
                <h3 style={{ color: '#4a5568', fontSize: '1.5rem', marginBottom: '10px' }}>
                  No se encontraron productos
                </h3>
                <p style={{ color: '#718096', fontSize: '1rem' }}>
                  Intenta ajustar los filtros para encontrar lo que buscas
                </p>
                <button
                  onClick={limpiarFiltros}
                  style={{
                    marginTop: '20px',
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
                  Limpiar filtros
                </button>
              </div>
            ) : (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '20px'
              }}>
                {productosFiltrados.map(producto => (
                  <div key={producto.id} style={{
                    backgroundColor: 'white',
                    border: '1px solid #e2e8f0',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.07)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-8px)';
                    e.currentTarget.style.boxShadow = '0 12px 28px rgba(0, 0, 0, 0.15)';
                    e.currentTarget.style.borderColor = '#667eea';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.07)';
                    e.currentTarget.style.borderColor = '#e2e8f0';
                  }}>
                    <img
                      src={producto.imagen}
                      alt={producto.nombre}
                      style={{
                        width: '100%',
                        height: '200px',
                        objectFit: 'cover',
                        borderBottom: '1px solid #e2e8f0'
                      }}
                    />
                    <div style={{ padding: '20px' }}>
                      <div style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        marginBottom: '10px'
                      }}>
                        <h3 style={{
                          color: '#2d3748',
                          fontSize: '1.1rem',
                          fontWeight: 'bold',
                          margin: 0,
                          flex: 1,
                          lineHeight: '1.3'
                        }}>
                          {producto.nombre}
                        </h3>
                      </div>
                      
                      <div style={{ 
                        display: 'flex', 
                        gap: '8px', 
                        marginBottom: '12px',
                        flexWrap: 'wrap'
                      }}>
                        <span style={{
                          backgroundColor: '#e6fffa',
                          color: '#0d9488',
                          padding: '4px 8px',
                          borderRadius: '6px',
                          fontSize: '0.8rem',
                          fontWeight: 'bold',
                          border: '1px solid #a7f3d0'
                        }}>
                          {producto.marca}
                        </span>
                        <span style={{
                          backgroundColor: '#fef7e0',
                          color: '#d69e2e',
                          padding: '4px 8px',
                          borderRadius: '6px',
                          fontSize: '0.8rem',
                          fontWeight: 'bold',
                          border: '1px solid #fbd38d'
                        }}>
                          {producto.categoria}
                        </span>
                      </div>

                      <p style={{
                        color: '#718096',
                        fontSize: '0.9rem',
                        lineHeight: '1.4',
                        marginBottom: '15px'
                      }}>
                        {producto.descripcion}
                      </p>

                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}>
                        <span style={{
                          color: '#667eea',
                          fontSize: '1.5rem',
                          fontWeight: 'bold'
                        }}>
                          ${producto.precio.toLocaleString()}
                        </span>
                        
                        {isInCart(producto.id) ? (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <span style={{
                              backgroundColor: '#e6fffa',
                              color: '#0d9488',
                              padding: '6px 12px',
                              borderRadius: '6px',
                              fontSize: '0.9rem',
                              fontWeight: 'bold'
                            }}>
                              ✓ En carrito ({getItemQuantity(producto.id)})
                            </span>
                            <button
                              onClick={() => handleAddToCart(producto)}
                              style={{
                                backgroundColor: '#667eea',
                                color: 'white',
                                border: 'none',
                                borderRadius: '6px',
                                padding: '8px 12px',
                                fontSize: '0.8rem',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                fontWeight: 'bold'
                              }}
                            >
                              + Más
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => handleAddToCart(producto)}
                            style={{
                              background: 'linear-gradient(135deg, #48bb78 0%, #38a169 100%)',
                              color: 'white',
                              border: 'none',
                              borderRadius: '8px',
                              padding: '10px 16px',
                              fontSize: '0.9rem',
                              cursor: 'pointer',
                              transition: 'all 0.3s ease',
                              fontWeight: 'bold'
                            }}
                            onMouseEnter={(e) => {
                              e.target.style.transform = 'scale(1.05)';
                            }}
                            onMouseLeave={(e) => {
                              e.target.style.transform = 'scale(1)';
                            }}
                          >
                            🛒 Agregar al carrito
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accesorios;