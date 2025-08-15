import React, { useEffect, useState } from 'react';
import { fetchWithAuth } from '../utils/fetchWithAuth';
import '../assets/css/Paginas/Productos/Productos.css';
import '../assets/css/SesionExpirada.css';

export default function CategoriasAdmin() {
  const [categorias, setCategorias] = useState([]);
  const [form, setForm] = useState({ nombre: '', descripcion: '' });
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchCategorias = async () => {
    setLoading(true);
    try {
      const response = await fetchWithAuth('http://localhost:3000/categorias');
      const data = await response.json();
      if (Array.isArray(data)) {
        setCategorias(data);
        console.log('✅ Categorías cargadas:', data.length);
        setError('');
      } else {
        setCategorias([]);
        setError('No se pudieron cargar las categorías');
      }
    } catch (err) {
      setCategorias([]);
      setError('Error de conexión con el servidor');
      console.error('❌ Error cargando categorías:', err);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchCategorias();
  }, []);

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault(); setError(''); setSuccess('');
    try {
      const method = editId ? 'PUT' : 'POST';
      const url = editId ? `http://localhost:3000/categorias/${editId}` : 'http://localhost:3000/categorias';
      const res = await fetchWithAuth(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Error');
      setSuccess(data.mensaje || 'Guardado');
      setForm({ nombre: '', descripcion: '' });
      setEditId(null);
      fetchCategorias();
    } catch (e) { setError(e.message); }
  };

  const handleEdit = cat => {
    setEditId(cat.id);
    setForm({ nombre: cat.nombre, descripcion: cat.descripcion || '' });
  };

  const handleDelete = async id => {
    setError(''); setSuccess('');
    if (!window.confirm('¿Eliminar esta categoría? Se eliminarán todas sus subcategorías.')) return;
    try {
  const res = await fetchWithAuth(`http://localhost:3000/categorias/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Error');
      setSuccess(data.mensaje);
      fetchCategorias();
    } catch (e) { setError(e.message); }
  };

  return (
    <div className="productos-container">
      <div className="productos-header">
        <h2>📂 Administrar Categorías</h2>
        <button className="productos-btn" onClick={() => { setEditId(null); setForm({ nombre: '', descripcion: '' }); setError(''); setSuccess(''); }}>
          ➕ Nueva Categoría
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
          <div>🔄 Cargando categorías...</div>
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
                onClick={fetchCategorias} 
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
          <form className="productos-form" onSubmit={handleSubmit} style={{ display: 'grid', gap: 12, gridTemplateColumns: '1fr 1fr auto auto', alignItems: 'center' }}>
            <input 
              name="nombre" 
              placeholder="📝 Nombre de la categoría" 
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
                  setForm({ nombre: '', descripcion: '' }); 
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
                  <th>📂 Nombre</th>
                  <th>📄 Descripción</th>
                  <th>🔧 Acciones</th>
                </tr>
              </thead>
              <tbody>
                {categorias.map(cat => (
                  <tr key={cat.id}>
                    <td style={{ fontWeight: '600', color: '#1e3a5c' }}>
                      {cat.nombre}
                    </td>
                    <td style={{ fontSize: '0.9rem', color: '#64748b' }}>
                      {cat.descripcion || 'Sin descripción'}
                    </td>
                    <td style={{ textAlign: 'center', padding: '8px' }}>
                      <button 
                        onClick={() => handleEdit(cat)} 
                        title="Editar categoría"
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
                        onClick={() => handleDelete(cat.id)} 
                        title="Eliminar categoría"
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
