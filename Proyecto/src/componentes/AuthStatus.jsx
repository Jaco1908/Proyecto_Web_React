import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AuthStatus({ user, onUserChange }) {
  const [isChecking, setIsChecking] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Verificar estado de autenticación al cargar
    const checkAuthStatus = () => {
      try {
        // Verificar localStorage
        const storedUser = localStorage.getItem('user');
        const storedGoogleUser = localStorage.getItem('googleUser');
        const token = localStorage.getItem('token');
        const googleToken = localStorage.getItem('googleToken');

        console.log('🔍 Verificando estado de autenticación...');
        console.log('📦 User en localStorage:', storedUser);
        console.log('📦 GoogleUser en localStorage:', storedGoogleUser);
        console.log('🔑 Token:', token ? 'Existe' : 'No existe');
        console.log('🔑 GoogleToken:', googleToken ? 'Existe' : 'No existe');

        // Si hay un usuario en estado pero no en localStorage, limpiar
        if (user && !storedUser && !storedGoogleUser) {
          console.log('⚠️ Usuario en estado pero no en localStorage. Limpiando...');
          onUserChange(null);
          setIsChecking(false);
          return;
        }

        // Si hay usuario en localStorage pero no en estado, restaurar
        if (!user && (storedUser || storedGoogleUser)) {
          const userData = storedUser ? JSON.parse(storedUser) : JSON.parse(storedGoogleUser);
          console.log('🔄 Restaurando usuario desde localStorage:', userData);
          onUserChange(userData);
        }

        setIsChecking(false);
      } catch (error) {
        console.error('❌ Error verificando estado de auth:', error);
        setIsChecking(false);
      }
    };

    checkAuthStatus();
  }, [user, onUserChange]);

  // Verificar token expirado cada 5 minutos
  useEffect(() => {
    const checkTokenExpiry = () => {
      const token = localStorage.getItem('token');
      const googleToken = localStorage.getItem('googleToken');
      
      if (!token && !googleToken && user) {
        console.log('⚠️ Token expirado. Cerrando sesión...');
        onUserChange(null);
        navigate('/login');
      }
    };

    const interval = setInterval(checkTokenExpiry, 5 * 60 * 1000); // 5 minutos

    return () => clearInterval(interval);
  }, [user, onUserChange, navigate]);

  if (isChecking) {
    return (
      <div style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        background: 'rgba(255,255,255,0.9)',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        zIndex: 9999,
        fontSize: '14px',
        color: '#666'
      }}>
        🔍 Verificando autenticación...
      </div>
    );
  }

  return null; // No renderiza nada una vez que termina la verificación
}

export default AuthStatus;
