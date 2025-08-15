import React from 'react';

const ProductosList = ({ productos }) => {
  if (!productos || productos.length === 0) {
    return <div>No hay productos para mostrar.</div>;
  }
  return (
    <div className="productos-grid">
      {productos.map(producto => (
        <div key={producto.id} className="producto-card">
          <img src={producto.foto || '/images/Productos/default.png'} alt={producto.nombre} style={{ width: '100%', height: '120px', objectFit: 'cover', borderRadius: '6px', marginBottom: '0.5rem' }} />
          <h4>{producto.nombre}</h4>
          <p><strong>Precio:</strong> ${producto.precio}</p>
          <p><strong>Categoría:</strong> {producto.categoria_nombre}</p>
          {producto.subcategoria_nombre && <p><strong>Subcategoría:</strong> {producto.subcategoria_nombre}</p>}
          <p><strong>Marca:</strong> {producto.marca_nombre}</p>
          {producto.descripcion && <p>{producto.descripcion.substring(0, 80)}{producto.descripcion.length > 80 ? '...' : ''}</p>}
        </div>
      ))}
    </div>
  );
};

export default ProductosList;
