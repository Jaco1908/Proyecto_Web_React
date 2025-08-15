import React, { useEffect, useState } from 'react';
import { fetchWithAuth } from '../utils/fetchWithAuth';
import '../assets/css/Paginas/Productos/Productos.css';
import '../assets/css/SesionExpirada.css';

export default function MarcasAdmin() {
  const [marcas, setMarcas] = useState([]);
  const [form, setForm] = useState({ nombre: '', logo: '' });
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchMarcas = async () => {
    setLoading(true);
    try {
      const response = await fetchWithAuth('http://localhost:3000/marcas');
      const data = await response.json();
      if (Array.isArray(data)) {
        setMarcas(data);
        console.log('✅ Marcas cargadas:', data.length);
        setError('');
      } else {
        setMarcas([]);
        setError('No se pudieron cargar las marcas');
      }
    } catch (err) {
      setMarcas([]);
      setError('Error de conexión con el servidor');
      console.error('❌ Error cargando marcas:', err);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchMarcas();
  }, []);

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault(); setError(''); setSuccess('');
    try {
      const method = editId ? 'PUT' : 'POST';
      const url = editId ? `http://localhost:3000/marcas/${editId}` : 'http://localhost:3000/marcas';
      const res = await fetchWithAuth(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Error');
      setSuccess(data.mensaje || 'Guardado');
      setForm({ nombre: '', logo: '' });
      setEditId(null);
      fetchMarcas();
    } catch (e) { setError(e.message); }
  };

  const handleEdit = marca => {
    setEditId(marca.id);
    setForm({ nombre: marca.nombre, logo: marca.logo || '' });
  };

  const handleDelete = async id => {
    setError(''); setSuccess('');
    if (!window.confirm('¿Eliminar esta marca? Los productos asociados quedarán sin marca.')) return;
    try {
  const res = await fetchWithAuth(`http://localhost:3000/marcas/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Error');
      setSuccess(data.mensaje);
      fetchMarcas();
    } catch (e) { setError(e.message); }
  };

  return (
    <div className="productos-container">
      <div className="productos-header">
        <h2>🏷️ Administrar Marcas</h2>
        <button className="productos-btn" onClick={() => { setEditId(null); setForm({ nombre: '', logo: '' }); setError(''); setSuccess(''); }}>
          ➕ Nueva Marca
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
          <div>🔄 Cargando marcas...</div>
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
                onClick={fetchMarcas} 
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
              placeholder="🏷️ Nombre de la marca" 
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
              name="logo" 
              placeholder="🖼️ URL del logo (opcional)" 
              value={form.logo} 
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
                  setForm({ nombre: '', logo: '' }); 
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
                  <th>🖼️ Logo</th>
                  <th>🔧 Acciones</th>
                </tr>
              </thead>
              <tbody>
                {marcas.map(marca => (
                  <tr key={marca.id}>
                    <td style={{ fontWeight: '600', color: '#1e3a5c' }}>
                      {marca.nombre}
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      {marca.logo ? (
                        <img 
                          src={marca.logo} 
                          alt="logo" 
                          style={{ 
                            maxWidth: '50px', 
                            height: '40px', 
                            objectFit: 'contain', 
                            borderRadius: '6px', 
                            boxShadow: '0 2px 8px rgba(30,58,92,0.15)' 
                          }} 
                        />
                      ) : (
                        <span style={{ color: '#64748b', fontSize: '0.9rem' }}>Sin logo</span>
                      )}
                    </td>
                    <td style={{ textAlign: 'center', padding: '8px' }}>
                      <button 
                        onClick={() => handleEdit(marca)} 
                        title="Editar marca"
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
                        onClick={() => handleDelete(marca.id)} 
                        title="Eliminar marca"
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
