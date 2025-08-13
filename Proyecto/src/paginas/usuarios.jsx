import React, { useEffect, useState } from 'react';
import '../assets/css/Paginas/Usuarios/Usuarios.css';

const API_URL = 'http://localhost:3000/usuarios';

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [form, setForm] = useState({ nombre: '', email: '', password: '', picture: '' });
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);

  // Leer usuario de localStorage
  let user = null;
  try {
    user = JSON.parse(localStorage.getItem('user'));
  } catch {}

  // Solo admin puede acceder
  const isAdmin = user && user.nombre_rol === 'admin';

  if (!isAdmin) {
    return (
      <div className="usuarios-container">
        <div className="usuarios-error">Solo el administrador puede acceder a esta sección</div>
      </div>
    );
  }

  // Cargar usuarios
  useEffect(() => {
    fetch(API_URL, { credentials: 'include' })
      .then(r => r.json())
      .then(data => {
        if (Array.isArray(data)) {
          setUsuarios(data);
          setError('');
        } else {
          setError(data.error || 'Error de conexión');
        }
      })
      .catch(() => setError('Error de conexión'));
  }, []);

  // Manejar cambios en el formulario
  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Crear admin
  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch(`${API_URL}/admin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(form)
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Error al crear admin');
      }
      window.location.reload();
    } catch (err) {
      setError(err.message);
    }
  };

  // Cambiar rol de usuario
  const handleRoleChange = async (userId, newRoleId) => {
    setError('');
    try {
      const res = await fetch(`${API_URL}/${userId}/rol`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ role_id: newRoleId })
      });
      if (!res.ok) throw new Error('Error al cambiar rol');
      window.location.reload();
    } catch {
      setError('Error al cambiar rol');
    }
  };

  const handleShowForm = () => {
    setShowForm(true);
    setForm({ nombre: '', email: '', password: '', picture: '' });
  };

  return (
    <div className="usuarios-container">
      <div className="usuarios-header">
        <h2>Gestión de Usuarios</h2>
        <button className="usuarios-btn" onClick={handleShowForm}>Crear Admin</button>
      </div>
      {error && <div className="usuarios-error">{error}</div>}
      {showForm && (
        <form className="usuarios-form" onSubmit={handleSubmit}>
          <input name="nombre" placeholder="Nombre" value={form.nombre} onChange={handleChange} required />
          <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
          <input name="password" type="password" placeholder="Contraseña" value={form.password} onChange={handleChange} required />
          <input name="picture" placeholder="URL de la foto (opcional)" value={form.picture} onChange={handleChange} />
          <button className="usuarios-btn" type="submit">Crear Admin</button>
          <button type="button" className="usuarios-btn" style={{ background: '#b91c1c' }} onClick={() => setShowForm(false)}>Cancelar</button>
        </form>
      )}
      {Array.isArray(usuarios) && (
        <table className="usuarios-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Email</th>
              <th>Foto</th>
              <th>Rol Actual</th>
              <th>Cambiar Rol</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map(usuario => (
              <tr key={usuario.id}>
                <td>{usuario.nombre}</td>
                <td>{usuario.email}</td>
                <td>
                  {usuario.picture && (
                    <img src={usuario.picture} alt="foto" width={40} height={40} style={{ borderRadius: '50%', objectFit: 'cover' }} />
                  )}
                </td>
                <td>
                  <span className={`rol-badge ${usuario.nombre_rol}`}>
                    {usuario.nombre_rol === 'admin' ? 'Administrador' : 'Usuario Normal'}
                  </span>
                </td>
                <td>
                  {usuario.id !== user.id && (
                    <div className="role-buttons">
                      <button 
                        className={`role-btn ${usuario.role_id === 1 ? 'active' : ''}`}
                        onClick={() => handleRoleChange(usuario.id, 1)}
                        disabled={usuario.role_id === 1}
                      >
                        Admin
                      </button>
                      <button 
                        className={`role-btn ${usuario.role_id === 2 ? 'active' : ''}`}
                        onClick={() => handleRoleChange(usuario.id, 2)}
                        disabled={usuario.role_id === 2}
                      >
                        Usuario
                      </button>
                    </div>
                  )}
                  {usuario.id === user.id && <span style={{ color: '#6c757d', fontSize: '0.8rem' }}>Tú mismo</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
