import React from 'react';
import { Link, useParams } from 'react-router-dom';
import '../../assets/css/plantilla/subcategoria.css';

const AuricularesGenerico = () => {
  const { tipo } = useParams();
  
  const productos = {
    aux: [
      {
        id: 1,
        nombre: "Auriculares AUX Premium",
        precio: 29.99,
        imagen: "/images/Masvendidos/auidifonos.jpg",
        descripcion: "Auriculares con cable AUX de alta calidad"
      },
      {
        id: 2,
        nombre: "Auriculares AUX Gaming",
        precio: 39.99,
        imagen: "/images/Masvendidos/auricular.jpg",
        descripcion: "Auriculares gaming con micrófono incorporado"
      }
    ],
    bluetooth: [
      {
        id: 3,
        nombre: "Auriculares Bluetooth Pro",
        precio: 89.99,
        imagen: "/images/Masvendidos/auidifonos.jpg",
        descripcion: "Auriculares inalámbricos con cancelación de ruido"
      },
      {
        id: 4,
        nombre: "Auriculares Bluetooth Sport",
        precio: 59.99,
        imagen: "/images/Masvendidos/auricular.jpg",
        descripcion: "Auriculares deportivos resistentes al agua"
      }
    ],
    usb: [
      {
        id: 5,
        nombre: "Auriculares USB Gaming",
        precio: 79.99,
        imagen: "/images/Masvendidos/auidifonos.jpg",
        descripcion: "Auriculares USB con sonido surround 7.1"
      },
      {
        id: 6,
        nombre: "Auriculares USB Oficina",
        precio: 45.99,
        imagen: "/images/Masvendidos/auricular.jpg",
        descripcion: "Auriculares USB ideales para videoconferencias"
      }
    ]
  };

  const productosActuales = productos[tipo] || [];
  const tipoNombre = tipo === 'aux' ? 'AUX' : tipo === 'bluetooth' ? 'Bluetooth' : 'USB';

  return (
    <div className="subcategoria-container">
      <div className="breadcrumb">
        <Link to="/">Inicio</Link> &gt; 
        <Link to="/accesorios">Accesorios</Link> &gt; 
        <span>Auriculares {tipoNombre}</span>
      </div>
      
      <div className="subcategoria-header">
        <h1>Auriculares {tipoNombre}</h1>
        <p>Auriculares de alta calidad con conexión {tipoNombre}.</p>
      </div>

      <div className="filtros-container">
        <div className="filtros">
          <h3>Filtros</h3>
          <div className="filtro-grupo">
            <h4>Precio</h4>
            <label><input type="checkbox" /> $0 - $50</label>
            <label><input type="checkbox" /> $50 - $100</label>
            <label><input type="checkbox" /> $100+</label>
          </div>
          <div className="filtro-grupo">
            <h4>Marca</h4>
            <label><input type="checkbox" /> Sony</label>
            <label><input type="checkbox" /> JBL</label>
            <label><input type="checkbox" /> Xiaomi</label>
          </div>
        </div>

        <div className="productos-lista">
          <div className="productos-header">
            <h2>Auriculares {tipoNombre} Disponibles ({productosActuales.length})</h2>
            <select className="ordenar">
              <option>Ordenar por precio</option>
              <option>Menor a mayor precio</option>
              <option>Mayor a menor precio</option>
              <option>Más populares</option>
            </select>
          </div>

          <div className="productos-grid">
            {productosActuales.map(producto => (
              <div key={producto.id} className="producto-card">
                <div className="producto-imagen">
                  <img src={producto.imagen} alt={producto.nombre} />
                  <div className="producto-overlay">
                    <button className="btn-vista-rapida">Vista Rápida</button>
                  </div>
                </div>
                <div className="producto-info">
                  <h3>{producto.nombre}</h3>
                  <p className="producto-descripcion">{producto.descripcion}</p>
                  <div className="producto-precio">${producto.precio}</div>
                  <div className="producto-acciones">
                    <button className="btn-agregar-carrito">Agregar al Carrito</button>
                    <button className="btn-favoritos">♡</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuricularesGenerico;
