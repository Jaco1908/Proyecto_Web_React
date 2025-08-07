import { useState } from 'react';
import { Link } from 'react-router-dom';
import GoogleAuth from './GoogleAuth.jsx'; // Ajusta ruta si es necesario
import './assets/css/auth.css';

function Register({ onUserChange }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();

    const newUser = {
      name,
      email,
      picture: "/images/user.png", // Imagen por defecto
    };

    onUserChange(newUser); // Simula registro exitoso
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleRegister}>
        <h2>Regístrate</h2>

        <input
          type="text"
          placeholder="Nombre completo"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
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
        <button type="submit">Crear cuenta</button>

        <div className="divider">o</div>

        <GoogleAuth onUserChange={onUserChange} />

        <p>¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link></p>
      </form>
    </div>
  );
}

export default Register;
