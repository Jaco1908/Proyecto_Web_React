import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

function GoogleAuth({ onUserChange }) {
  const navigate = useNavigate();

  const handleSuccess = async (credentialResponse) => {
    try {
      console.log('✅ Google login exitoso');
      
      const decoded = jwtDecode(credentialResponse.credential);
      console.log('🔍 Token decodificado:', decoded);
      
      const userData = {
        id: decoded.sub,
        nombre: decoded.name,
        email: decoded.email,
        picture: decoded.picture || "/images/user.png",
        token: credentialResponse.credential,
        isGoogleUser: true
      };

      console.log('👤 Datos del usuario Google:', userData);

      // Intentar registrar/login en el backend
      try {
        const res = await fetch('http://localhost:3000/api/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            nombre: decoded.name,
            email: decoded.email,
            password: decoded.sub, // Usar sub como password única
            picture: decoded.picture
          })
        });
        
        const data = await res.json();
        
        if (res.ok || res.status === 409) { // 409 = usuario ya existe
          console.log('✅ Usuario procesado en backend');
          
          // Guardar tokens y datos
          localStorage.setItem('googleToken', credentialResponse.credential);
          localStorage.setItem('token', credentialResponse.credential);
          
          // Actualizar estado del usuario
          onUserChange(userData);
          
          console.log('🚀 Navegando a home...');
          navigate('/', { replace: true });
          
        } else {
          console.error('❌ Error en backend:', data);
          alert('Error al procesar el usuario en el servidor');
        }
      } catch (backendError) {
        console.log('⚠️ Backend no disponible, continuando con datos locales');
        
        // Guardar tokens y datos localmente
        localStorage.setItem('googleToken', credentialResponse.credential);
        localStorage.setItem('token', credentialResponse.credential);
        
        // Actualizar estado del usuario
        onUserChange(userData);
        navigate('/', { replace: true });
      }

    } catch (error) {
      console.error('❌ Error procesando login de Google:', error);
      alert('Error al procesar login de Google');
    }
  };

  const handleError = () => {
    console.error('❌ Error en Google login');
    alert('Error al iniciar sesión con Google');
  };

  return (
    <div className="google-auth-container" style={{width: '100%', marginBottom: '15px'}}>
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={handleError}
        useOneTap={false}
        auto_select={false}
        theme="outline"
        size="large"
        width="100%"
        text="signin_with"
        shape="rectangular"
        logo_alignment="left"
      />
    </div>
  );
}

export default GoogleAuth;
