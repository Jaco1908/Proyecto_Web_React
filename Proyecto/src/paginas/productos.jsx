import React, { useEffect, useState } from 'react';
import { fetchWithAuth } from '../utils/fetchWithAuth';
import { useProductNotification } from '../context/ProductNotificationContext';
import '../assets/css/Paginas/Productos/Productos.css';
import '../assets/css/SesionExpirada.css';

const API_URL = 'http://localhost:3000/productos';

export default function AdministrarProductos() {
  const { addProductNotification } = useProductNotification();
  
  // Log para verificar que el hook está funcionando
  console.log('🔌 ProductosAdmin - useProductNotification hook:', {
    addProductNotification: typeof addProductNotification,
    available: !!addProductNotification
  });
  
  const [productos, setProductos] = useState([]);
  const [form, setForm] = useState({ nombre: '', descripcion: '', foto: '', precio: '', categoria_id: '', subcategoria_id: '', marca_id: '' });
  const [categorias, setCategorias] = useState([]);
  const [subcategorias, setSubcategorias] = useState([]);
  const [marcas, setMarcas] = useState([]);
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState('');
  const [filterCategoria, setFilterCategoria] = useState('');
  const [filterMarca, setFilterMarca] = useState('');
  const [sortBy, setSortBy] = useState('nombre');
  const [sortDir, setSortDir] = useState('asc');
  const [page, setPage] = useState(1);
  const [perPage] = useState(6);
  const [showDetail, setShowDetail] = useState(false);
  const [detailProd, setDetailProd] = useState(null);

  // Leer usuario de localStorage
  let user = null;
  try {
    user = JSON.parse(localStorage.getItem('user'));
  } catch {}

  // Cargar productos, categorías, marcas al montar
  useEffect(() => {
    setLoading(true);
    
    // Suprimir errores menores de extensiones del navegador
    const originalError = console.error;
    console.error = (...args) => {
      if (
        args[0]?.includes?.('runtime.lastError') || 
        args[0]?.includes?.('React DevTools') ||
        args[0]?.includes?.('Browsing Topics API')
      ) {
        return;
      }
      originalError.apply(console, args);
    };

    Promise.all([
      fetchWithAuth(API_URL).then(r => r.json()),
      fetchWithAuth('http://localhost:3000/categorias').then(r => r.json()),
      fetchWithAuth('http://localhost:3000/marcas').then(r => r.json())
    ])
    .then(([productosData, categoriasData, marcasData]) => {
      // Procesar productos
      if (Array.isArray(productosData)) {
        setProductos(productosData);
        console.log('✅ Productos cargados exitosamente:', productosData.length, 'productos');
      } else if (productosData?.error?.toLowerCase().includes('no autorizado')) {
        setProductos([]);
        console.log('⚠️ Usuario no autorizado para ver productos');
      } else {
        setProductos([]);
        console.error('❌ Error en datos de productos:', productosData);
      }

      // Procesar categorías
      if (Array.isArray(categoriasData)) {
        setCategorias(categoriasData);
        console.log('✅ Categorías cargadas:', categoriasData.length);
      } else {
        setCategorias([]);
        console.log('⚠️ No se pudieron cargar las categorías');
      }

      // Procesar marcas
      if (Array.isArray(marcasData)) {
        setMarcas(marcasData);
        console.log('✅ Marcas cargadas:', marcasData.length);
      } else {
        setMarcas([]);
        console.log('⚠️ No se pudieron cargar las marcas');
      }

      setError('');
      setLoading(false);
    })
    .catch((err) => {
      console.error('❌ Error cargando datos:', err);
      setError('Error de conexión con el servidor. Verifique su conexión.');
      setProductos([]);
      setCategorias([]);
      setMarcas([]);
      setLoading(false);
    });
  }, []);

  // Cargar subcategorías cuando cambia la categoría seleccionada
  useEffect(() => {
    if (form.categoria_id) {
      fetchWithAuth(`http://localhost:3000/subcategorias?categoria_id=${form.categoria_id}`)
        .then(r => r.json())
        .then(data => {
          if (Array.isArray(data)) {
            setSubcategorias(data);
            console.log('✅ Subcategorías cargadas para categoría:', form.categoria_id, '- Total:', data.length);
          } else {
            setSubcategorias([]);
            console.log('⚠️ No se encontraron subcategorías para la categoría:', form.categoria_id);
          }
        })
        .catch((err) => {
          setSubcategorias([]);
          console.error('❌ Error cargando subcategorías:', err);
        });
    } else {
      setSubcategorias([]);
      setForm(f => ({ ...f, subcategoria_id: '' }));
    }
  }, [form.categoria_id]);

  // Manejar cambios en el formulario
  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
    // Si cambia la categoría, limpiar subcategoría
    if (name === 'categoria_id') {
      setForm(f => ({ ...f, subcategoria_id: '' }));
    }
  };

  // Crear o actualizar producto
  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    console.log('🚀 Enviando producto:', {
      method: editId ? 'PUT' : 'POST',
      url: editId ? `${API_URL}/${editId}` : API_URL,
      form
    });
    try {
      const method = editId ? 'PUT' : 'POST';
      const url = editId ? `${API_URL}/${editId}` : API_URL;
      // Solo enviar los campos relevantes
      const body = {
        nombre: form.nombre,
        descripcion: form.descripcion,
        foto: form.foto,
        precio: form.precio,
        categoria_id: form.categoria_id || null,
        subcategoria_id: form.subcategoria_id || null,
        marca_id: form.marca_id || null
      };
      const res = await fetchWithAuth(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      if (!res.ok) {
        const errorData = await res.text();
        console.error('❌ Error response:', errorData);
        throw new Error('Error al guardar');
      }
      const result = await res.json();
      console.log('✅ Respuesta del servidor completa:', result);
      if (!editId) {
        let productoCompleto;
        if (result && result.product) {
          productoCompleto = result.product;
        } else {
          productoCompleto = {
            id: result.id || Date.now(),
            nombre: form.nombre,
            descripcion: form.descripcion,
            foto: form.foto,
            precio: form.precio,
            categoria_id: form.categoria_id,
            subcategoria_id: form.subcategoria_id,
            marca_id: form.marca_id,
            categoria_nombre: categorias.find(c => c.id == form.categoria_id)?.nombre || 'Sin categoría',
            subcategoria_nombre: subcategorias.find(s => s.id == form.subcategoria_id)?.nombre || '',
            marca_nombre: marcas.find(m => m.id == form.marca_id)?.nombre || 'Sin marca'
          };
        }
        // Agregar notificación y producto al estado local
        addProductNotification(productoCompleto);
        setProductos(prev => [productoCompleto, ...prev]);
        // Notificación visual temporal
        const ubicacion = [
          productoCompleto.categoria_nombre,
          productoCompleto.subcategoria_nombre,
          productoCompleto.marca_nombre
        ].filter(Boolean).join(' → ');
        const notification = document.createElement('div');
        notification.innerHTML = `
          <div style="
            position: fixed;
            top: 20px;
            right: 20px;
            background: #10b981;
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.15);
            z-index: 10000;
            max-width: 300px;
          ">
            <strong>✅ Producto creado!</strong><br>
            <small>Ubicado en: ${ubicacion}</small><br>
            <small>Verifica el navbar para más detalles</small>
          </div>
        `;
        document.body.appendChild(notification);
        setTimeout(() => {
          if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
          }
        }, 5000);
        // Limpiar formulario
        setForm({ nombre: '', descripcion: '', foto: '', precio: '', categoria_id: '', subcategoria_id: '', marca_id: '' });
        setShowForm(false);
        setEditId(null);
      }
    } catch (error) {
      console.error('❌ Error completo:', error);
      setError('No autorizado o error al guardar. Revisa la consola para más detalles.');
    }
  };

  // Editar producto
  const handleEdit = prod => {
    setEditId(prod.id);
    setForm({
      nombre: prod.nombre || '',
      descripcion: prod.descripcion || '',
      foto: prod.foto || '',
      precio: prod.precio || '',
      categoria_id: prod.categoria_id || '',
      subcategoria_id: prod.subcategoria_id || '',
      marca_id: prod.marca_id || ''
    });
    setShowForm(true);
  };

  // Eliminar producto
  const handleDelete = async id => {
    setError('');
    if (!window.confirm('¿Eliminar producto?')) return;
    try {
      const res = await fetchWithAuth(`${API_URL}/${id}`, {
        method: 'DELETE'
      });
      if (!res.ok) throw new Error('Error al eliminar');
      window.location.reload();
    } catch {
      setError('No autorizado o error al eliminar');
    }
  };

  const handleShowForm = () => {
    setShowForm(true);
    setEditId(null);
  setForm({ nombre: '', descripcion: '', foto: '', precio: '', categoria_id: '', subcategoria_id: '', marca_id: '' });
  };

  // Si es admin, mostrar CRUD. Si no, mostrar catálogo tipo tarjetas
  const isAdmin = user && user.nombre_rol === 'admin';

  // --- FILTRADO, ORDEN Y PAGINACIÓN ---
  let filtered = productos.filter(p =>
    (!search || p.nombre.toLowerCase().includes(search.toLowerCase())) &&
    (!filterCategoria || String(p.categoria_id) === filterCategoria) &&
    (!filterMarca || String(p.marca_id) === filterMarca)
  );
  filtered = filtered.sort((a, b) => {
    let vA = a[sortBy], vB = b[sortBy];
    if (typeof vA === 'string') vA = vA.toLowerCase();
    if (typeof vB === 'string') vB = vB.toLowerCase();
    if (vA < vB) return sortDir === 'asc' ? -1 : 1;
    if (vA > vB) return sortDir === 'asc' ? 1 : -1;
    return 0;
  });
  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  // --- RENDER ---
  return (
    <div className="productos-container">
      <div className="productos-header">
        <h2>Administrar productos</h2>
        {isAdmin && <button className="productos-btn" onClick={handleShowForm}>Agregar producto</button>}
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
          <div>🔄 Cargando datos...</div>
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
                onClick={() => window.location.reload()} 
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

      {!loading && (
        <>
          {/* FILTROS Y BÚSQUEDA */}
      <div className="filters-container">
        <input 
          className="search-input"
          placeholder="🔍 Buscar productos..." 
          value={search} 
          onChange={e => { setSearch(e.target.value); setPage(1); }} 
        />
        <select 
          className="filter-select"
          value={filterCategoria} 
          onChange={e => { setFilterCategoria(e.target.value); setPage(1); }}
        >
          <option value="">📂 Todas las categorías</option>
          {categorias.map(cat => <option key={cat.id} value={cat.id}>{cat.nombre}</option>)}
        </select>
        <select 
          className="filter-select"
          value={filterMarca} 
          onChange={e => { setFilterMarca(e.target.value); setPage(1); }}
        >
          <option value="">🏷️ Todas las marcas</option>
          {marcas.map(m => <option key={m.id} value={m.id}>{m.nombre}</option>)}
        </select>
        <button 
          className="clear-btn" 
          onClick={() => { setSearch(''); setFilterCategoria(''); setFilterMarca(''); setPage(1); }}
          title="Limpiar filtros"
        >
          🧹 Limpiar
        </button>
        <button 
          className="refresh-btn" 
          onClick={() => window.location.reload()}
          title="Refrescar datos"
        >
          🔄 Refrescar
        </button>
      </div>
      
      {/* FORMULARIO */}
      {isAdmin && showForm && (
        <form className="productos-form" onSubmit={handleSubmit} style={{ display: 'grid', gap: 10 }}>
          <input name="nombre" placeholder="Nombre" value={form.nombre} onChange={handleChange} required />
          <input name="descripcion" placeholder="Descripción" value={form.descripcion} onChange={handleChange} />
          <input name="foto" placeholder="URL de la foto" value={form.foto} onChange={handleChange} />
          <input name="precio" type="number" step="0.01" placeholder="Precio" value={form.precio} onChange={handleChange} required />
          <select name="categoria_id" value={form.categoria_id} onChange={handleChange} required>
            <option value="">Selecciona categoría</option>
            {categorias.map(cat => <option key={cat.id} value={cat.id}>{cat.nombre}</option>)}
          </select>
          <select name="subcategoria_id" value={form.subcategoria_id} onChange={handleChange} disabled={!form.categoria_id || subcategorias.length === 0}>
            <option value="">{form.categoria_id ? 'Selecciona subcategoría' : 'Primero selecciona categoría'}</option>
            {subcategorias.map(sub => <option key={sub.id} value={sub.id}>{sub.nombre}</option>)}
          </select>
          <select name="marca_id" value={form.marca_id} onChange={handleChange} required>
            <option value="">Selecciona marca</option>
            {marcas.map(marca => <option key={marca.id} value={marca.id}>{marca.nombre}</option>)}
          </select>
          <div style={{ display: 'flex', gap: 10 }}>
            <button className="productos-btn" type="submit">{editId ? 'Actualizar' : 'Crear'}</button>
            <button type="button" className="productos-btn" style={{ background: '#b91c1c' }} onClick={() => { setShowForm(false); setEditId(null); setForm({ nombre: '', descripcion: '', foto: '', precio: '', categoria_id: '', subcategoria_id: '', marca_id: '' }); }}>Cancelar</button>
          </div>
        </form>
      )}
      {/* TABLA PRODUCTOS ADMIN */}
      {isAdmin && Array.isArray(productos) && (
        <div className="table-container">
          <table className="productos-table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Foto</th>
                <th>Precio</th>
                <th>Categoría</th>
                <th>Subcategoría</th>
                <th>Marca</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map(prod => (
                <tr key={prod.id}>
                  <td style={{ fontWeight: '600', color: '#1e3a5c' }}>{prod.nombre}</td>
                  <td style={{ fontSize: '0.9rem', color: '#64748b' }}>
                    {prod.descripcion && prod.descripcion.length > 50 ? `${prod.descripcion.substring(0, 50)}...` : prod.descripcion || 'Sin descripción'}
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    {prod.foto && <img src={prod.foto} alt="foto" style={{ maxWidth: '50px', height: '40px', objectFit: 'cover', borderRadius: '6px', boxShadow: '0 2px 8px rgba(30,58,92,0.15)' }} />}
                  </td>
                  <td style={{ fontWeight: '600', color: '#059669', fontSize: '1rem' }}>${prod.precio}</td>
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
                      {categorias.find(c => c.id === prod.categoria_id)?.nombre || 'Sin categoría'}
                    </span>
                  </td>
                  <td>
                    <span style={{ 
                      background: '#eff6ff', 
                      color: '#1e40af', 
                      fontWeight: '500', 
                      borderRadius: '4px', 
                      padding: '4px 8px', 
                      display: 'inline-block', 
                      fontSize: '0.85rem',
                      border: '1px solid #dbeafe'
                    }}>
                      {subcategorias.find(s => s.id === prod.subcategoria_id)?.nombre || 'Sin subcategoría'}
                    </span>
                  </td>
                  <td>
                    <span style={{ 
                      background: '#fef3c7', 
                      color: '#92400e', 
                      fontWeight: '500', 
                      borderRadius: '4px', 
                      padding: '4px 8px', 
                      display: 'inline-block', 
                      fontSize: '0.85rem',
                      border: '1px solid #fed7aa'
                    }}>
                      {marcas.find(m => m.id === prod.marca_id)?.nombre || 'Sin marca'}
                    </span>
                  </td>
                  <td style={{ textAlign: 'center', padding: '8px' }}>
                    <button 
                      onClick={() => handleEdit(prod)} 
                      title="Editar producto"
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
                      onClick={() => handleDelete(prod.id)} 
                      title="Eliminar producto"
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
                    <button 
                      onClick={() => { setDetailProd(prod); setShowDetail(true); }} 
                      title="Ver detalles"
                      style={{
                        background: '#3b82f6',
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
                      onMouseEnter={(e) => e.target.style.background = '#2563eb'}
                      onMouseLeave={(e) => e.target.style.background = '#3b82f6'}
                    >
                      👁️ Ver
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {/* PAGINACIÓN */}
          <div style={{ display: 'flex', gap: 8, justifyContent: 'center', margin: '24px 0 16px 0', padding: '16px 0', borderTop: '1px solid #e2e8f0' }}>
            <button className="productos-btn" disabled={page === 1} onClick={() => setPage(page - 1)} style={{ opacity: page === 1 ? 0.5 : 1 }}>
              ← Anterior
            </button>
            <span style={{ 
              alignSelf: 'center', 
              background: '#f8fafc', 
              padding: '8px 16px', 
              borderRadius: '6px', 
              color: '#475569',
              fontWeight: '500',
              border: '1px solid #e2e8f0'
            }}>
              Página {page} de {totalPages || 1}
            </span>
            <button className="productos-btn" disabled={page === totalPages || totalPages === 0} onClick={() => setPage(page + 1)} style={{ opacity: (page === totalPages || totalPages === 0) ? 0.5 : 1 }}>
              Siguiente →
            </button>
          </div>
        </div>
      )}
      
      {/* MODAL DE DETALLES */}
      {showDetail && detailProd && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(30,58,92,0.25)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => setShowDetail(false)}>
          <div style={{ background: '#fff', borderRadius: 12, padding: 32, minWidth: 320, maxWidth: 420, boxShadow: '0 4px 24px rgba(30,58,92,0.18)', position: 'relative' }} onClick={e => e.stopPropagation()}>
            <button style={{ position: 'absolute', top: 10, right: 10, background: '#b91c1c', color: '#fff', border: 'none', borderRadius: 6, padding: '4px 10px', cursor: 'pointer' }} onClick={() => setShowDetail(false)}>X</button>
            <h2 style={{ color: '#1e3a5c', marginBottom: 10 }}>{detailProd.nombre}</h2>
            {detailProd.foto && <img src={detailProd.foto} alt="foto" style={{ width: '100%', borderRadius: 8, marginBottom: 12 }} />}
            <div style={{ marginBottom: 8 }}><b>Descripción:</b> {detailProd.descripcion || 'Sin descripción'}</div>
            <div style={{ marginBottom: 8 }}><b>Precio:</b> ${detailProd.precio}</div>
            <div style={{ marginBottom: 8 }}><b>Categoría:</b> {categorias.find(c => c.id === detailProd.categoria_id)?.nombre || ''}</div>
            <div style={{ marginBottom: 8 }}><b>Subcategoría:</b> {subcategorias.find(s => s.id === detailProd.subcategoria_id)?.nombre || ''}</div>
            <div style={{ marginBottom: 8 }}><b>Marca:</b> {marcas.find(m => m.id === detailProd.marca_id)?.nombre || ''}</div>
            <div style={{ marginBottom: 8 }}><b>ID:</b> {detailProd.id}</div>
          </div>
        </div>
      )}
      {/* VISTA USUARIO NORMAL */}
      {!isAdmin && Array.isArray(productos) && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', justifyContent: 'center', marginTop: 24 }}>
          {productos.map(prod => (
            <div key={prod.id} style={{ width: 260, background: '#f5f8fa', borderRadius: 10, boxShadow: '0 1px 6px rgba(30,58,92,0.10)', padding: 16, textAlign: 'center' }}>
              {prod.foto && <img src={prod.foto} alt="foto" style={{ width: '100%', height: 160, objectFit: 'cover', borderRadius: 8, marginBottom: 10 }} />}
              <h3 style={{ color: '#1e3a5c', margin: '10px 0 4px 0' }}>{prod.nombre}</h3>
              <div style={{ color: '#444', fontSize: 15, marginBottom: 8 }}>{prod.descripcion}</div>
              <div style={{ color: '#1e3a5c', fontWeight: 600, fontSize: 18 }}>${prod.precio}</div>
            </div>
          ))}
        </div>
      )}
        </>
      )}
    </div>
  );
}
