import { GoogleOAuthProvider, GoogleLogin, googleLogout } from '@react-oauth/google';
import { Button, Typography, Box, Avatar } from '@mui/material';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

// ✅ Corrige la firma del componente para recibir props como objeto
const GoogleAuth = ({ onUserChange }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Verificar si ya hay un usuario logueado
  useEffect(() => {
    const savedUser = localStorage.getItem('user') || localStorage.getItem('googleUser');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch {
        localStorage.removeItem('user');
        localStorage.removeItem('googleUser');
      }
    }
  }, []);

  const handleSuccess = async (credentialResponse) => {
    console.log('Google login success:', credentialResponse);
    const userInfo = jwtDecode(credentialResponse.credential);
    console.log('User info:', userInfo);
    
    setUser(userInfo);

    // Enviar datos a backend para guardar/actualizar usuario
    try {
      const res = await fetch('http://localhost:3000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: userInfo.name,
          email: userInfo.email,
          password: userInfo.sub, // Usar sub como password única (no se usará para login manual)
          picture: userInfo.picture
        })
      });
      const data = await res.json();
      
      if (res.ok) {
        // Usuario registrado exitosamente
        console.log('User registered:', data);
        // Guardar en ambos lugares para compatibilidad
        localStorage.setItem('user', JSON.stringify(data));
        localStorage.setItem('googleUser', JSON.stringify(data));
        if (onUserChange) onUserChange(data);
        // Redirigir al home
        navigate('/');
      } else if (res.status === 409) { 
        // Usuario ya existe, intentar login
        console.log('User exists, trying login...');
        const loginRes = await fetch('http://localhost:3000/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: userInfo.email, password: userInfo.sub })
        });
        const loginData = await loginRes.json();
        
        if (loginRes.ok) {
          console.log('User logged in:', loginData);
          // Guardar en ambos lugares para compatibilidad
          localStorage.setItem('user', JSON.stringify(loginData));
          localStorage.setItem('googleUser', JSON.stringify(loginData));
          if (onUserChange) onUserChange(loginData);
          // Redirigir al home
          navigate('/');
        } else {
          console.error('Login error:', loginData);
          alert('Error al iniciar sesión con Google');
        }
      } else {
        console.error('Registration error:', data);
        alert(data.error || 'Error con Google Auth');
      }
    } catch (error) {
      console.error('Network error:', error);
      alert('Error de conexión con el backend');
    }
  };

  const handleError = () => {
    console.log('Login Failed');
  };

  const handleLogout = () => {
    googleLogout();
    setUser(null);
    if (onUserChange) {
      onUserChange(null); // También avisa que se cerró sesión
    }
  };

  return (
    <GoogleOAuthProvider clientId="141507994341-b9ui76hmevjib897dm05b777i6clnqo9.apps.googleusercontent.com">
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
        {user ? (
          <>
            <Avatar src={user.picture} alt={user.name} sx={{ width: 56, height: 56 }} />
            <Typography variant="h6">Bienvenido, {user.name}</Typography>
            <Typography variant="body1">Email: {user.email}</Typography>
            <Button variant="contained" color="error" onClick={handleLogout}>
              Cerrar sesión
            </Button>
          </>
        ) : (
          <GoogleLogin
            onSuccess={handleSuccess}
            onError={handleError}
            useOneTap
          />
        )}
      </Box>
    </GoogleOAuthProvider>
  );
};

export default GoogleAuth;
