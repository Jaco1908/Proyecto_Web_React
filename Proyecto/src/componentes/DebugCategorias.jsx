import React from 'react';
import { useCategorias } from '../hooks/useCategorias';

const DebugCategorias = () => {
  const { categorias, loading, error } = useCategorias();

  if (loading) return <div>⏳ Cargando categorías...</div>;
  
  if (error) return (
    <div style={{
      background: '#fee2e2',
      border: '1px solid #fecaca',
      padding: '10px',
      borderRadius: '5px',
      color: '#b91c1c',
      margin: '10px 0'
    }}>
      ❌ Error: {error}
    </div>
  );

  return (
    <div style={{
      background: '#f0fff4',
      border: '1px solid #9ae6b4',
      padding: '15px',
      borderRadius: '8px',
      margin: '10px 0'
    }}>
      <h4 style={{ margin: '0 0 10px 0', color: '#065f46' }}>
        🔍 Debug: Categorías de la BD
      </h4>
      <div style={{ fontSize: '14px', color: '#064e3b' }}>
        <strong>Total categorías:</strong> {categorias.length}
        <br />
        <strong>Categorías encontradas:</strong>
        <ul style={{ margin: '10px 0', paddingLeft: '20px' }}>
          {categorias.map(cat => (
            <li key={cat.id}>
              ID: {cat.id} - Nombre: "{cat.nombre}" - Descripción: {cat.descripcion || 'Sin descripción'}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DebugCategorias;
