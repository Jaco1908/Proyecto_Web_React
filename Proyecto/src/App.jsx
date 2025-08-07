import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Layout from './componentes/Layout';
import Home from './Home.jsx';
import GoogleAuth from './GoogleAuth.jsx';

function App() {
  const [user, setUser] = useState(null);

  // Recuperar sesión guardada (localStorage)
  useEffect(() => {
    const savedUser = localStorage.getItem('googleUser');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        localStorage.removeItem('googleUser'); // Si falla, limpiar
      }
    }
  }, []);

  // Manejar login/logout
  const handleUserChange = (userData) => {
    setUser(userData);
    if (userData) {
      localStorage.setItem('googleUser', JSON.stringify(userData));
    } else {
      localStorage.removeItem('googleUser');
    }
  };

  return (
    <Router>
      <Routes>
        {/* Ruta protegida: Home */}
        <Route
          path="/"
          element={
            user ? (
              <Layout 
                user={user} 
                onLogout={() => handleUserChange(null)} // ✅ Ahora Layout tiene onLogout
              />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        >
          <Route index element={<Home user={user} />} />
        </Route>

        {/* Ruta pública: Login */}
        <Route
          path="/login"
          element={
            user ? (
              <Navigate to="/" replace />
            ) : (
              <div style={loginContainerStyle}>
                <h1>Inicia sesión con Google</h1>
                <p>Para acceder a todas las funcionalidades</p>
                <GoogleAuth onUserChange={handleUserChange} />
              </div>
            )
          }
        />

        {/* Ruta catch-all */}
        <Route path="*" element={<Navigate to={user ? "/" : "/login"} replace />} />
      </Routes>
    </Router>
  );
}

// Estilos del contenedor de login
const loginContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
  padding: '2rem',
  textAlign: 'center'
};

export default App;
