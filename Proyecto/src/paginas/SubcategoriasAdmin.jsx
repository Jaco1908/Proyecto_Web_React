import React, { useEffect, useState } from 'react';
import { fetchWithAuth } from '../utils/fetchWithAuth';
import '../assets/css/Paginas/Productos/Productos.css';
import '../assets/css/SesionExpirada.css';

export default function SubcategoriasAdmin() {
  const [subcategorias, setSubcategorias] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [form, setForm] = useState({ nombre: '', descripcion: '', categoria_id: '' });
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchAll = async () => {
    setLoading(true);
    try {
      const [subcategoriasRes, categoriasRes] = await Promise.all([
        fetchWithAuth('http://localhost:3000/subcategorias'),
        fetchWithAuth('http://localhost:3000/categorias')
      ]);
      
      const subcategoriasData = await subcategoriasRes.json();
      const categoriasData = await categoriasRes.json();
      
      if (Array.isArray(subcategoriasData)) {
        setSubcategorias(subcategoriasData);
        console.log('✅ Subcategorías cargadas:', subcategoriasData.length);
      } else {
        setSubcategorias([]);
      }
      
      if (Array.isArray(categoriasData)) {
        setCategorias(categoriasData);
        console.log('✅ Categorías cargadas:', categoriasData.length);
      } else {
        setCategorias([]);
      }
      
      setError('');
    } catch (err) {
      setSubcategorias([]);
      setCategorias([]);
      setError('Error de conexión con el servidor');
      console.error('❌ Error cargando datos:', err);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchAll();
  }, []);

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault(); setError(''); setSuccess('');
    try {
      const method = editId ? 'PUT' : 'POST';
      const url = editId ? `http://localhost:3000/subcategorias/${editId}` : 'http://localhost:3000/subcategorias';
      const res = await fetchWithAuth(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Error');
      setSuccess(data.mensaje || 'Guardado');
      setForm({ nombre: '', descripcion: '', categoria_id: '' });
      setEditId(null);
      fetchAll();
    } catch (e) { setError(e.message); }
  };

  const handleEdit = sub => {
    setEditId(sub.id);
    setForm({ nombre: sub.nombre, descripcion: sub.descripcion || '', categoria_id: sub.categoria_id });
  };

  const handleDelete = async id => {
    setError(''); setSuccess('');
    if (!window.confirm('¿Eliminar esta subcategoría? Los productos asociados quedarán sin subcategoría.')) return;
    try {
  const res = await fetchWithAuth(`http://localhost:3000/subcategorias/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Error');
      setSuccess(data.mensaje);
      fetchAll();
    } catch (e) { setError(e.message); }
  };

  return (
    <div className="productos-container">
      <div className="productos-header">
        <h2>🏷️ Administrar Subcategorías</h2>
        <button className="productos-btn" onClick={() => { setEditId(null); setForm({ nombre: '', descripcion: '', categoria_id: '' }); setError(''); setSuccess(''); }}>
          ➕ Nueva Subcategoría
        </button>
      </div>

      {/* LOADING INDICATOR */}
      {loading && (
        <div style={{ 
          textAlign: 'center', 
          padding: '40px', 
          color: '#64748b',
          fontSize: '1.1rem'
        }}>
          <div style={{ 
            display: 'inline-block',
            width: '40px',
            height: '40px',
            border: '4px solid #e2e8f0',
            borderTop: '4px solid #3b82f6',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            marginBottom: '16px'
          }}></div>
          <div>🔄 Cargando subcategorías...</div>
        </div>
      )}

      {/* ERROR DISPLAY */}
      {error && !loading && (
        <div style={{
          background: '#fef2f2',
          border: '1px solid #fecaca',
          borderRadius: '8px',
          padding: '16px',
          marginBottom: '20px',
          color: '#b91c1c',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <span style={{ fontSize: '1.5rem' }}>⚠️</span>
          <div>
            <strong>Error:</strong> {error}
            <div style={{ marginTop: '8px' }}>
              <button 
                onClick={fetchAll} 
                style={{
                  background: '#dc2626',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  padding: '6px 12px',
                  cursor: 'pointer',
                  fontSize: '0.9rem'
                }}
              >
                🔄 Reintentar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SUCCESS DISPLAY */}
      {success && (
        <div style={{
          background: '#f0f9ff',
          border: '1px solid #bfdbfe',
          borderRadius: '8px',
          padding: '16px',
          marginBottom: '20px',
          color: '#1d4ed8',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <span style={{ fontSize: '1.5rem' }}>✅</span>
          <div><strong>Éxito:</strong> {success}</div>
        </div>
      )}

      {!loading && (
        <>
          {/* FORMULARIO */}
          <form className="productos-form" onSubmit={handleSubmit} style={{ display: 'grid', gap: 12, gridTemplateColumns: '1fr 1fr 1fr auto auto', alignItems: 'center' }}>
            <input 
              name="nombre" 
              placeholder="🏷️ Nombre de la subcategoría" 
              value={form.nombre} 
              onChange={handleChange} 
              required 
              style={{
                padding: '10px 12px',
                border: '2px solid #e2e8f0',
                borderRadius: '6px',
                fontSize: '0.95rem'
              }}
            />
            <input 
              name="descripcion" 
              placeholder="📄 Descripción (opcional)" 
              value={form.descripcion} 
              onChange={handleChange}
              style={{
                padding: '10px 12px',
                border: '2px solid #e2e8f0',
                borderRadius: '6px',
                fontSize: '0.95rem'
              }}
            />
            <select 
              name="categoria_id" 
              value={form.categoria_id} 
              onChange={handleChange} 
              required
              style={{
                padding: '10px 12px',
                border: '2px solid #e2e8f0',
                borderRadius: '6px',
                fontSize: '0.95rem',
                background: 'white'
              }}
            >
              <option value="">📂 Selecciona categoría</option>
              {categorias.map(cat => <option key={cat.id} value={cat.id}>{cat.nombre}</option>)}
            </select>
            <button 
              type="submit"
              style={{
                background: editId ? '#f59e0b' : '#10b981',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                padding: '10px 16px',
                fontSize: '0.9rem',
                cursor: 'pointer',
                fontWeight: '500'
              }}
            >
              {editId ? '✏️ Actualizar' : '➕ Crear'}
            </button>
            {editId && (
              <button 
                type="button" 
                onClick={() => { 
                  setEditId(null); 
                  setForm({ nombre: '', descripcion: '', categoria_id: '' }); 
                  setError(''); 
                  setSuccess(''); 
                }}
                style={{
                  background: '#6b7280',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '10px 16px',
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  fontWeight: '500'
                }}
              >
                ❌ Cancelar
              </button>
            )}
          </form>

          {/* TABLA */}
          <div className="table-container">
            <table className="productos-table">
              <thead>
                <tr>
                  <th>🏷️ Nombre</th>
                  <th>📄 Descripción</th>
                  <th>📂 Categoría</th>
                  <th>🔧 Acciones</th>
                </tr>
              </thead>
              <tbody>
                {subcategorias.map(sub => (
                  <tr key={sub.id}>
                    <td style={{ fontWeight: '600', color: '#1e3a5c' }}>
                      {sub.nombre}
                    </td>
                    <td style={{ fontSize: '0.9rem', color: '#64748b' }}>
                      {sub.descripcion || 'Sin descripción'}
                    </td>
                    <td>
                      <span style={{ 
                        background: '#dbeafe', 
                        color: '#1d4ed8', 
                        fontWeight: '500', 
                        borderRadius: '4px', 
                        padding: '4px 8px', 
                        display: 'inline-block', 
                        fontSize: '0.85rem',
                        border: '1px solid #bfdbfe'
                      }}>
                        {categorias.find(c => c.id === sub.categoria_id)?.nombre || 'Sin categoría'}
                      </span>
                    </td>
                    <td style={{ textAlign: 'center', padding: '8px' }}>
                      <button 
                        onClick={() => handleEdit(sub)} 
                        title="Editar subcategoría"
                        style={{
                          background: '#10b981',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          padding: '6px 10px',
                          fontSize: '0.8rem',
                          cursor: 'pointer',
                          margin: '2px',
                          fontWeight: '500',
                          transition: 'all 0.2s ease'
                        }}
                        onMouseEnter={(e) => e.target.style.background = '#059669'}
                        onMouseLeave={(e) => e.target.style.background = '#10b981'}
                      >
                        ✏️ Editar
                      </button>
                      <button 
                        onClick={() => handleDelete(sub.id)} 
                        title="Eliminar subcategoría"
                        style={{
                          background: '#ef4444',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          padding: '6px 10px',
                          fontSize: '0.8rem',
                          cursor: 'pointer',
                          margin: '2px',
                          fontWeight: '500',
                          transition: 'all 0.2s ease'
                        }}
                        onMouseEnter={(e) => e.target.style.background = '#dc2626'}
                        onMouseLeave={(e) => e.target.style.background = '#ef4444'}
                      >
                        🗑️ Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
