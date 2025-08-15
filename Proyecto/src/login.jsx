import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './assets/css/auth.css';
import GoogleAuth from './componentes/GoogleAuthBD.jsx';

function Login({ onUserChange }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (res.ok) {
        // Guardar usuario en localStorage para control de rol
        localStorage.setItem('user', JSON.stringify(data));
        localStorage.setItem('googleUser', JSON.stringify(data)); // Compatibilidad
        if (onUserChange) onUserChange(data);
        navigate('/');
      } else {
        alert(data.error || 'Error al iniciar sesión');
      }
    } catch {
      alert('Error de conexión');
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleLogin}>
        <h2>Iniciar Sesión</h2>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Entrar</button>
        
        {/* Separador */}
        <div style={{ 
          margin: '20px 0', 
          textAlign: 'center', 
          position: 'relative',
          color: '#666'
        }}>
          <hr style={{ border: 'none', borderTop: '1px solid #ddd' }} />
          <span style={{ 
            position: 'absolute',
            top: '-12px',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: 'white',
            padding: '0 10px'
          }}>
            O
          </span>
        </div>

        <GoogleAuth onUserChange={onUserChange} />

        <p>¿No tienes cuenta? <Link to="/register">Regístrate</Link></p>
      </form>
    </div>
  );
}

export default Login;
