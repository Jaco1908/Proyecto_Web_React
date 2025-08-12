import { GoogleOAuthProvider, GoogleLogin, googleLogout } from '@react-oauth/google';
import { Button, Typography, Box, Avatar } from '@mui/material';
import { useState } from 'react';
import { jwtDecode } from 'jwt-decode';

// ✅ Corrige la firma del componente para recibir props como objeto
const GoogleAuth = ({ onUserChange }) => {
  const [user, setUser] = useState(null);

  const handleSuccess = async (credentialResponse) => {
    console.log(credentialResponse);
    const userInfo = jwtDecode(credentialResponse.credential);
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
        if (onUserChange) onUserChange(data);
      } else if (res.status === 409) { // Usuario ya existe
        // Intentar login para obtener datos
        const loginRes = await fetch('http://localhost:3000/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: userInfo.email, password: userInfo.sub })
        });
        const loginData = await loginRes.json();
        if (loginRes.ok && onUserChange) onUserChange(loginData);
      } else {
        alert(data.error || 'Error con Google Auth');
      }
    } catch {
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
