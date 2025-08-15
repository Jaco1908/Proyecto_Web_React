import React from 'react';
import { Link } from 'react-router-dom';
import '../../assets/css/plantilla/subcategoria.css';

const Mochila = () => {
  const productos = [
    {
      id: 1,
      nombre: "Mochila Laptop 15.6",
      precio: 45.99,
      imagen: "/images/Prom/Mochila.jpg",
      descripcion: "Mochila resistente para laptops de hasta 15.6 pulgadas"
    },
    {
      id: 2,
      nombre: "Mochila Gaming RGB",
      precio: 89.99,
      imagen: "/images/Prom/Mochila.jpg",
      descripcion: "Mochila con iluminación LED para gamers"
    },
    {
      id: 3,
      nombre: "Mochila Antirrobo",
      precio: 65.99,
      imagen: "/images/Prom/Mochila.jpg",
      descripcion: "Mochila con candado y puerto USB integrado"
    }
  ];

  return (
    <div className="subcategoria-container">
      <div className="breadcrumb">
        <Link to="/">Inicio</Link> &gt; 
        <Link to="/accesorios">Accesorios</Link> &gt; 
        <span>Mochila</span>
      </div>
      
      <div className="subcategoria-header">
        <h1>Mochilas</h1>
        <p>Encuentra la mochila perfecta para proteger y transportar tus dispositivos.</p>
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
            <h4>Tamaño</h4>
            <label><input type="checkbox" /> 13"</label>
            <label><input type="checkbox" /> 15.6"</label>
            <label><input type="checkbox" /> 17"</label>
          </div>
        </div>

        <div className="productos-lista">
          <div className="productos-header">
            <h2>Mochilas Disponibles ({productos.length})</h2>
            <select className="ordenar">
              <option>Ordenar por precio</option>
              <option>Menor a mayor precio</option>
              <option>Mayor a menor precio</option>
              <option>Más populares</option>
            </select>
          </div>

          <div className="productos-grid">
            {productos.map(producto => (
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

export default Mochila;
