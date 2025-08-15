import React, { useState } from 'react';
import ProductosAdmin from './productos.jsx';
import CategoriasAdmin from './CategoriasAdmin.jsx';
import SubcategoriasAdmin from './SubcategoriasAdmin.jsx';
import MarcasAdmin from './MarcasAdmin.jsx';
import DebugCategorias from '../componentes/DebugCategorias.jsx';
import NotificationDebug from '../componentes/NotificationDebug.jsx';

const tabs = [
  { key: 'productos', label: 'Productos' },
  { key: 'categorias', label: 'Categorías' },
  { key: 'subcategorias', label: 'Subcategorías' },
  { key: 'marcas', label: 'Marcas' },
];

export default function PanelAdmin() {
  const [tab, setTab] = useState('productos');

  return (
    <div style={{ display: 'flex', minHeight: '80vh', background: '#f3f6fa' }}>
      {/* Barra lateral */}
      <aside style={{ width: 220, background: '#1e3a5c', color: '#fff', padding: '32px 0', display: 'flex', flexDirection: 'column', gap: 18 }}>
        <h2 style={{ textAlign: 'center', marginBottom: 32, fontWeight: 700, fontSize: 22 }}>Panel Admin</h2>
        {tabs.map(t => (
          <button key={t.key} onClick={() => setTab(t.key)} style={{
            background: tab === t.key ? '#2563eb' : 'transparent',
            color: '#fff',
            border: 'none',
            borderRadius: 6,
            padding: '12px 18px',
            fontSize: 16,
            fontWeight: tab === t.key ? 700 : 500,
            cursor: 'pointer',
            margin: '0 16px',
            transition: 'background 0.2s',
          }}>{t.label}</button>
        ))}
      </aside>
      {/* Contenido */}
      <main style={{ flex: 1, padding: '36px 24px' }}>
        {/* Debug components - temporales */}
        <NotificationDebug />
        <DebugCategorias />
        
        {tab === 'productos' && <ProductosAdmin />}
        {tab === 'categorias' && <CategoriasAdmin />}
        {tab === 'subcategorias' && <SubcategoriasAdmin />}
        {tab === 'marcas' && <MarcasAdmin />}
      </main>
    </div>
  );
}
