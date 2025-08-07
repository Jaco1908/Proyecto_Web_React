import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Layout from './componentes/Layout';
import Home from './Home.jsx';
import Header from './componentes/Header.jsx';
import GoogleAuth from './GoogleAuth.jsx';
import Login from './login.jsx';
import Register from './register.jsx';

function App() {
  const [user, setUser] = useState(null);

  // Recuperar sesión guardada en localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem('googleUser');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        localStorage.removeItem('googleUser'); // Limpia si falla
      }
    }
  }, []);

  // Función para actualizar usuario y localStorage
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
      {/* Header visible siempre */}
      <Header user={user} onLogout={() => handleUserChange(null)} />

      <Routes>
        {/* Ruta protegida para Home */}
        <Route
          path="/"
          element={
            user ? (
              <Layout user={user} onLogout={() => handleUserChange(null)} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        >
          <Route index element={<Home user={user} />} />
        </Route>

        {/* Ruta pública para Login */}
        <Route
          path="/login"
          element={
            user ? (
              <Navigate to="/" replace />
            ) : (
              <Login onUserChange={handleUserChange} user={user} />
            )
          }
        />

        {/* Ruta pública para Register */}
        <Route
          path="/register"
          element={
            user ? (
              <Navigate to="/" replace />
            ) : (
              <Register onUserChange={handleUserChange} user={user} />
            )
          }
        />

        {/* Ruta catch-all: redirige según estado */}
        <Route path="*" element={<Navigate to={user ? "/" : "/login"} replace />} />
      </Routes>
    </Router>
  );
}

export default App;
