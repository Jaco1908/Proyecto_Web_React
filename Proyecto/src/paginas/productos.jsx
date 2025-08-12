import React, { useEffect, useState } from 'react';
import '../assets/css/Paginas/Productos/Productos.css';

const API_URL = 'http://localhost:3000/productos';

export default function Productos() {
  const [productos, setProductos] = useState([]);
  const [form, setForm] = useState({ nombre: '', descripcion: '', foto: '', precio: '' });
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);

  // Cargar productos
  useEffect(() => {
    fetch(API_URL, { credentials: 'include' })
      .then(r => r.json())
      .then(data => {
        if (Array.isArray(data)) setProductos(data);
        else setError(data.error || 'No autorizado o error de conexión');
      })
      .catch(() => setError('No autorizado o error de conexión'));
  }, []);

  // Manejar cambios en el formulario
  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Crear o actualizar producto
  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      const method = editId ? 'PUT' : 'POST';
      const url = editId ? `${API_URL}/${editId}` : API_URL;
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(form)
      });
      if (!res.ok) throw new Error('Error al guardar');
      window.location.reload();
    } catch {
      setError('No autorizado o error al guardar');
    }
  };

  // Editar producto
  const handleEdit = prod => {
    setEditId(prod.id);
    setForm({ nombre: prod.nombre, descripcion: prod.descripcion, foto: prod.foto, precio: prod.precio });
    setShowForm(true);
  };

  // Eliminar producto
  const handleDelete = async id => {
    setError('');
    if (!window.confirm('¿Eliminar producto?')) return;
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
        credentials: 'include'
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
    setForm({ nombre: '', descripcion: '', foto: '', precio: '' });
  };

  return (
    <div className="productos-container">
      <div className="productos-header">
        <h2>Productos</h2>
        <button className="productos-btn" onClick={handleShowForm}>Agregar producto</button>
      </div>
      {error && <div className="productos-error">{error}</div>}
      {showForm && (
        <form className="productos-form" onSubmit={handleSubmit}>
          <input name="nombre" placeholder="Nombre" value={form.nombre} onChange={handleChange} required />
          <input name="descripcion" placeholder="Descripción" value={form.descripcion} onChange={handleChange} />
          <input name="foto" placeholder="URL de la foto" value={form.foto} onChange={handleChange} />
          <input name="precio" type="number" step="0.01" placeholder="Precio" value={form.precio} onChange={handleChange} required />
          <button className="productos-btn" type="submit">{editId ? 'Actualizar' : 'Crear'}</button>
          <button type="button" className="productos-btn" style={{ background: '#b91c1c' }} onClick={() => { setShowForm(false); setEditId(null); setForm({ nombre: '', descripcion: '', foto: '', precio: '' }); }}>Cancelar</button>
        </form>
      )}
      {Array.isArray(productos) && (
        <table className="productos-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Foto</th>
              <th>Precio</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map(prod => (
              <tr key={prod.id}>
                <td>{prod.nombre}</td>
                <td>{prod.descripcion}</td>
                <td>{prod.foto && <img src={prod.foto} alt="foto" width={200} />}</td>
                <td>${prod.precio}</td>
                <td>
                  <button className="productos-btn" onClick={() => handleEdit(prod)}>Editar</button>
                  <button className="productos-btn" style={{ background: '#b91c1c' }} onClick={() => handleDelete(prod.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
