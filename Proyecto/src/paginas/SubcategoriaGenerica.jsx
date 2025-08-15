import React from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import '../assets/css/plantilla/subcategoria.css';

const SubcategoriaGenerica = () => {
  const { categoria, subcategoria, tipo } = useParams();
  const location = useLocation();
  
  // Extraer información de la URL
  const pathSegments = location.pathname.split('/').filter(Boolean);
  const mainCategory = pathSegments[0];
  const subCategory = pathSegments[1];
  
  console.log('Ruta actual:', location.pathname);
  console.log('Categoría principal:', mainCategory);
  console.log('Subcategoría:', subCategory);
  
  // Datos de productos por categoría y subcategoría
  const productosData = {
    // Accesorios
    'moto-recargable': {
      titulo: 'Moto a Batería Recargable',
      descripcion: 'Motos eléctricas recargables para niños',
      categoria: 'accesorios',
      productos: [
        { id: 1, nombre: 'Moto Eléctrica Kids 6V', precio: 199.99, imagen: '/images/Nuevo/router.jpg', marca: 'KidsRide' },
        { id: 2, nombre: 'Moto Deportiva 12V', precio: 299.99, imagen: '/images/Nuevo/router.jpg', marca: 'PowerKids' },
        { id: 3, nombre: 'Moto Racing Pro', precio: 399.99, imagen: '/images/Nuevo/router.jpg', marca: 'SpeedMax' }
      ]
    },
    'grabadora-externo': {
      titulo: 'Grabadora Externa',
      descripcion: 'Grabadoras externas de audio y video',
      categoria: 'accesorios',
      productos: [
        { id: 1, nombre: 'Grabadora Digital HD', precio: 89.99, imagen: '/images/Masvendidos/Micro.jpg', marca: 'TechRecord' },
        { id: 2, nombre: 'Grabadora 4K Pro', precio: 149.99, imagen: '/images/Masvendidos/Micro.jpg', marca: 'UltraRec' },
        { id: 3, nombre: 'Grabadora Compacta', precio: 59.99, imagen: '/images/Masvendidos/Micro.jpg', marca: 'MiniRec' }
      ]
    },
    
    // Almacenamiento
    'smartwatch-movil': {
      titulo: 'Smartwatch Móvil',
      descripcion: 'Relojes inteligentes con conectividad móvil',
      categoria: 'almacenamiento',
      productos: [
        { id: 1, nombre: 'Smartwatch Pro 4G', precio: 299.99, imagen: '/images/Masvendidos/smartwatch.jpg' },
        { id: 2, nombre: 'Smartwatch Sport GPS', precio: 199.99, imagen: '/images/Masvendidos/smartwatch.jpg' }
      ]
    },
    'parlante-aux': {
      titulo: 'Parlante AUX',
      descripcion: 'Parlantes con conexión auxiliar',
      categoria: 'almacenamiento',
      productos: [
        { id: 1, nombre: 'Parlante AUX Premium', precio: 79.99, imagen: '/images/Destacado/Audio.jpg' },
        { id: 2, nombre: 'Parlante AUX Compact', precio: 49.99, imagen: '/images/Destacado/Audio.jpg' }
      ]
    },
    'parlante-portatil': {
      titulo: 'Parlante Portátil',
      descripcion: 'Parlantes portátiles inalámbricos',
      categoria: 'almacenamiento',
      productos: [
        { id: 1, nombre: 'Parlante Bluetooth Portátil', precio: 89.99, imagen: '/images/Destacado/Audio.jpg' },
        { id: 2, nombre: 'Parlante Mini Portátil', precio: 39.99, imagen: '/images/Destacado/Audio.jpg' }
      ]
    },

    // Conectividad
    'microfono-usb': {
      titulo: 'Micrófono USB',
      descripcion: 'Micrófonos USB profesionales',
      categoria: 'conectividad',
      productos: [
        { id: 1, nombre: 'Micrófono USB Studio', precio: 129.99, imagen: '/images/Masvendidos/Micro.jpg' },
        { id: 2, nombre: 'Micrófono USB Gaming', precio: 79.99, imagen: '/images/Masvendidos/Micro.jpg' }
      ]
    },
    'camara-usb': {
      titulo: 'Cámara USB',
      descripcion: 'Cámaras USB para videoconferencias',
      categoria: 'conectividad',
      productos: [
        { id: 1, nombre: 'Cámara USB 4K', precio: 199.99, imagen: '/images/Destacado/Camara ip.jpg' },
        { id: 2, nombre: 'Cámara USB HD', precio: 89.99, imagen: '/images/Destacado/Camara ip.jpg' }
      ]
    },
    'adaptador-hdmi': {
      titulo: 'Adaptador HDMI',
      descripcion: 'Adaptadores HDMI de alta calidad',
      categoria: 'conectividad',
      productos: [
        { id: 1, nombre: 'Adaptador HDMI 4K', precio: 29.99, imagen: '/images/Masvendidos/Adaptador.jpg' },
        { id: 2, nombre: 'Adaptador HDMI Ultra HD', precio: 39.99, imagen: '/images/Masvendidos/Adaptador.jpg' }
      ]
    },
    'adaptador-vga': {
      titulo: 'Adaptador VGA',
      descripcion: 'Adaptadores VGA compatibles',
      categoria: 'conectividad',
      productos: [
        { id: 1, nombre: 'Adaptador VGA Premium', precio: 19.99, imagen: '/images/Masvendidos/Adaptador.jpg' },
        { id: 2, nombre: 'Adaptador VGA Pro', precio: 24.99, imagen: '/images/Masvendidos/Adaptador.jpg' }
      ]
    },
    'combo-teclado': {
      titulo: 'Combo Teclado',
      descripcion: 'Combos de teclado y mouse',
      categoria: 'conectividad',
      productos: [
        { id: 1, nombre: 'Combo Inalámbrico', precio: 59.99, imagen: '/images/Masvendidos/Teclado.jpg' },
        { id: 2, nombre: 'Combo Gaming RGB', precio: 89.99, imagen: '/images/Masvendidos/Teclado.jpg' }
      ]
    },

    // Consola
    'chromecast': {
      titulo: 'Chromecast',
      descripcion: 'Dispositivos Chromecast para streaming',
      categoria: 'consola',
      productos: [
        { id: 1, nombre: 'Chromecast 4K', precio: 49.99, imagen: '/images/Destacado/Streaming.jpg' },
        { id: 2, nombre: 'Chromecast Ultra', precio: 69.99, imagen: '/images/Destacado/Streaming.jpg' }
      ]
    },
    'piscina-circular': {
      titulo: 'Piscina Circular',
      descripcion: 'Piscinas circulares desmontables',
      categoria: 'consola',
      productos: [
        { id: 1, nombre: 'Piscina Circular 3m', precio: 199.99, imagen: '/images/Nuevo/router.jpg' },
        { id: 2, nombre: 'Piscina Circular 4m', precio: 299.99, imagen: '/images/Nuevo/router.jpg' }
      ]
    },
    'piscina-desmontable': {
      titulo: 'Piscina Desmontable',
      descripcion: 'Piscinas desmontables fáciles de instalar',
      categoria: 'consola',
      productos: [
        { id: 1, nombre: 'Piscina Desmontable Familiar', precio: 249.99, imagen: '/images/Nuevo/router.jpg' },
        { id: 2, nombre: 'Piscina Desmontable Pro', precio: 349.99, imagen: '/images/Nuevo/router.jpg' }
      ]
    },

    // Computación
    'enclosure-usb': {
      titulo: 'Enclosure USB',
      descripcion: 'Enclosures USB para discos duros',
      categoria: 'computacion',
      productos: [
        { id: 1, nombre: 'Enclosure 2.5" USB 3.0', precio: 19.99, imagen: '/images/Nuevo/discoext.jpg' },
        { id: 2, nombre: 'Enclosure 3.5" USB-C', precio: 29.99, imagen: '/images/Nuevo/discoext.jpg' }
      ]
    },
    'extensor-hub': {
      titulo: 'Hub USB',
      descripcion: 'Hubs USB extensores de puertos',
      categoria: 'computacion',
      productos: [
        { id: 1, nombre: 'Hub USB 4 Puertos', precio: 24.99, imagen: '/images/Masvendidos/Router.jpg' },
        { id: 2, nombre: 'Hub USB-C 7 Puertos', precio: 39.99, imagen: '/images/Masvendidos/Router.jpg' }
      ]
    },
    'candado-portatil': {
      titulo: 'Candado Portátil',
      descripcion: 'Candados de seguridad para laptops',
      categoria: 'computacion',
      productos: [
        { id: 1, nombre: 'Candado Cable Seguridad', precio: 19.99, imagen: '/images/Nuevo/candado.jpg' },
        { id: 2, nombre: 'Candado Biométrico', precio: 49.99, imagen: '/images/Nuevo/candado.jpg' }
      ]
    },
    'mouse-usb': {
      titulo: 'Mouse USB',
      descripcion: 'Mouses con conexión USB',
      categoria: 'computacion',
      productos: [
        { id: 1, nombre: 'Mouse Óptico USB', precio: 14.99, imagen: '/images/Masvendidos/Mouse.jpeg' },
        { id: 2, nombre: 'Mouse Gaming USB', precio: 39.99, imagen: '/images/Masvendidos/Mouse2.jpg' }
      ]
    },
    'mouse-wireless': {
      titulo: 'Mouse Inalámbrico',
      descripcion: 'Mouses inalámbricos',
      categoria: 'computacion',
      productos: [
        { id: 1, nombre: 'Mouse Inalámbrico Basic', precio: 24.99, imagen: '/images/Masvendidos/Mouse4.jpg' },
        { id: 2, nombre: 'Mouse Gaming Wireless', precio: 59.99, imagen: '/images/Masvendidos/Mouse5.jpg' }
      ]
    },

    // Electrodomésticos
    'cable-usb': {
      titulo: 'Cable USB',
      descripcion: 'Cables USB de alta calidad',
      categoria: 'electrodomesticos',
      productos: [
        { id: 1, nombre: 'Cable USB-C 2m', precio: 12.99, imagen: '/images/Masvendidos/Router.jpg' },
        { id: 2, nombre: 'Cable USB-A a Lightning', precio: 19.99, imagen: '/images/Masvendidos/Router.jpg' }
      ]
    },
    'panel-solar': {
      titulo: 'Panel Solar',
      descripcion: 'Paneles solares portátiles',
      categoria: 'electrodomesticos',
      productos: [
        { id: 1, nombre: 'Panel Solar Portátil 20W', precio: 89.99, imagen: '/images/Prom/powerbank.jpg' },
        { id: 2, nombre: 'Panel Solar Plegable 50W', precio: 149.99, imagen: '/images/Prom/powerbank.jpg' }
      ]
    },

    // Móvil
    'soporte-monitor': {
      titulo: 'Soporte Monitor',
      descripcion: 'Soportes para monitores',
      categoria: 'movil',
      productos: [
        { id: 1, nombre: 'Soporte Monitor Ajustable', precio: 49.99, imagen: '/images/Destacado/monitor.jpeg' },
        { id: 2, nombre: 'Soporte Monitor Dual', precio: 79.99, imagen: '/images/Destacado/MonitorAsus.jpg' }
      ]
    },
    'soporte-televisor': {
      titulo: 'Soporte Televisor',
      descripcion: 'Soportes de pared para televisores',
      categoria: 'movil',
      productos: [
        { id: 1, nombre: 'Soporte TV 32-55"', precio: 39.99, imagen: '/images/Prom/TelevisorLG.jpg' },
        { id: 2, nombre: 'Soporte TV Articulado', precio: 69.99, imagen: '/images/Prom/TelevisorLG.jpg' }
      ]
    },
    'carro-recargable': {
      titulo: 'Carro Recargable',
      descripcion: 'Carros eléctricos recargables para niños',
      categoria: 'movil',
      productos: [
        { id: 1, nombre: 'Carro Eléctrico BMW', precio: 399.99, imagen: '/images/Nuevo/router.jpg' },
        { id: 2, nombre: 'Carro Deportivo 12V', precio: 499.99, imagen: '/images/Nuevo/router.jpg' }
      ]
    },
    'focos-led': {
      titulo: 'Focos LED',
      descripcion: 'Focos LED inteligentes y eficientes',
      categoria: 'movil',
      productos: [
        { id: 1, nombre: 'Foco LED Smart WiFi', precio: 24.99, imagen: '/images/Nuevo/router.jpg' },
        { id: 2, nombre: 'Foco LED RGB', precio: 34.99, imagen: '/images/Nuevo/router.jpg' }
      ]
    },
    'teclado-usb': {
      titulo: 'Teclado USB',
      descripcion: 'Teclados con conexión USB',
      categoria: 'movil',
      productos: [
        { id: 1, nombre: 'Teclado Mecánico USB', precio: 79.99, imagen: '/images/Masvendidos/Teclado.jpg' },
        { id: 2, nombre: 'Teclado Membrana USB', precio: 29.99, imagen: '/images/Masvendidos/Teclado.jpg' }
      ]
    },
    'teclado-wireless': {
      titulo: 'Teclado Inalámbrico',
      descripcion: 'Teclados inalámbricos',
      categoria: 'movil',
      productos: [
        { id: 1, nombre: 'Teclado Inalámbrico Compact', precio: 49.99, imagen: '/images/Masvendidos/Teclado.jpg' },
        { id: 2, nombre: 'Teclado Gaming Wireless', precio: 99.99, imagen: '/images/Masvendidos/Teclado.jpg' }
      ]
    }
  };

  // Obtener la clave correcta para los productos
  const productKey = tipo ? `${subcategoria}-${tipo}` : subcategoria || subCategory;
  const datosProducto = productosData[productKey];

  if (!datosProducto) {
    return (
      <div className="subcategoria-container">
        <div className="breadcrumb">
          <Link to="/">Inicio</Link> &gt; 
          <Link to={`/${mainCategory}`}>{mainCategory}</Link> &gt; 
          <span>Categoría no encontrada</span>
        </div>
        <div className="subcategoria-header">
          <h1>Categoría en Desarrollo</h1>
          <p>Esta subcategoría está en desarrollo. Pronto tendremos productos disponibles.</p>
        </div>
        
        <div className="categoria-desarrollo">
          <div className="desarrollo-info">
            <h3>¿Qué puedes hacer mientras tanto?</h3>
            <ul>
              <li>Explora nuestras otras categorías disponibles</li>
              <li>Suscríbete a nuestro newsletter para recibir actualizaciones</li>
              <li>Visita nuestro <Link to="/catalogo">catálogo completo</Link></li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  const categoryName = datosProducto.categoria || mainCategory;

  return (
    <div className="subcategoria-container">
      <div className="breadcrumb">
        <Link to="/">Inicio</Link> &gt; 
        <Link to={`/${categoryName}`}>{categoryName}</Link> &gt; 
        <span>{datosProducto.titulo}</span>
      </div>
      
      <div className="subcategoria-header">
        <h1>{datosProducto.titulo}</h1>
        <p>{datosProducto.descripcion}</p>
      </div>

      <div className="filtros-container">
        <div className="productos-lista">
          <div className="productos-header">
            <h2>{datosProducto.titulo} ({datosProducto.productos.length} productos)</h2>
            <select className="ordenar">
              <option>Ordenar por precio</option>
              <option>Menor a mayor precio</option>
              <option>Mayor a menor precio</option>
              <option>Más populares</option>
              <option>Más recientes</option>
              <option>Alfabético A-Z</option>
            </select>
          </div>

          <div className="productos-grid">
            {datosProducto.productos.map(producto => (
              <div key={producto.id} className="producto-card">
                <div className="producto-imagen">
                  <img src={producto.imagen} alt={producto.nombre} />
                  <div className="producto-overlay">
                    <button className="btn-vista-rapida">Vista Rápida</button>
                  </div>
                </div>
                <div className="producto-info">
                  <h3>{producto.nombre}</h3>
                  <p className="producto-descripcion">Producto de alta calidad con garantía incluida</p>
                  {producto.marca && (
                    <p className="producto-marca">Marca: {producto.marca}</p>
                  )}
                  <div className="producto-precio">${producto.precio}</div>
                  <div className="producto-acciones">
                    <button className="btn-agregar-carrito">Agregar al Carrito</button>
                    <button className="btn-favoritos">♡</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {datosProducto.productos.length === 0 && (
            <div className="sin-resultados">
              <h3>No se encontraron productos</h3>
              <p>Esta subcategoría no tiene productos disponibles en este momento.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubcategoriaGenerica;
