import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

function GoogleAuth({ onUserChange }) {
  const navigate = useNavigate();

  const handleSuccess = async (credentialResponse) => {
    try {
      console.log('✅ Login de Google exitoso');
      
      const decoded = jwtDecode(credentialResponse.credential);
      console.log('Datos del usuario Google:', decoded);
      
      // Intentar registrar el usuario en el backend
      try {
        const registerResponse = await fetch('http://localhost:3000/api/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            nombre: decoded.name,
            email: decoded.email,
            password: `google_${decoded.sub}`, // Password único basado en Google ID
            picture: decoded.picture,
            rol: 2 // Rol de usuario normal
          })
        });

        const registerData = await registerResponse.json();
        console.log('Respuesta del registro:', registerData);

        let finalUserData;

        if (registerResponse.ok) {
          // Usuario registrado exitosamente
          console.log('✅ Usuario registrado en BD:', registerData);
          finalUserData = registerData;
        } else if (registerResponse.status === 409) {
          // Usuario ya existe, hacer login
          console.log('Usuario ya existe, haciendo login...');
          
          const loginResponse = await fetch('http://localhost:3000/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: decoded.email,
              password: `google_${decoded.sub}`
            })
          });

          if (loginResponse.ok) {
            const loginData = await loginResponse.json();
            console.log('✅ Login exitoso:', loginData);
            finalUserData = loginData;
          } else {
            throw new Error('Error en login de usuario existente');
          }
        } else {
          throw new Error(`Error en registro: ${registerData.message}`);
        }

        // Guardar datos en localStorage
        localStorage.setItem('token', finalUserData.token || credentialResponse.credential);
        localStorage.setItem('user', JSON.stringify(finalUserData));
        
        // Actualizar estado del usuario
        onUserChange(finalUserData);
        
        // Navegar a home
        navigate('/', { replace: true });
        
        console.log('🚀 Usuario logueado y guardado en BD correctamente');

      } catch (backendError) {
        console.error('❌ Error con backend:', backendError);
        
        // Fallback: crear usuario local temporal
        const fallbackUserData = {
          id: decoded.sub,
          nombre: decoded.name,
          email: decoded.email,
          picture: decoded.picture || "/images/user.png",
          token: credentialResponse.credential,
          rol: 2, // Rol usuario por defecto
          isGoogleUser: true
        };

        localStorage.setItem('token', credentialResponse.credential);
        localStorage.setItem('user', JSON.stringify(fallbackUserData));
        onUserChange(fallbackUserData);
        navigate('/', { replace: true });
        
        console.log('⚠️ Usuario guardado localmente (backend no disponible)');
        alert('Logueado correctamente. Nota: Verifica que el servidor backend esté corriendo.');
      }

    } catch (error) {
      console.error('❌ Error procesando login:', error);
      alert('Error al iniciar sesión con Google');
    }
  };

  const handleError = () => {
    console.error('❌ Error en Google login');
    alert('Error al conectar con Google. Usa el login normal mientras tanto.');
  };

  return (
    <div style={{width: '100%', marginBottom: '15px'}}>
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
      <small style={{
        fontSize: '11px',
        color: '#666',
        display: 'block',
        textAlign: 'center',
        marginTop: '5px'
      }}>
        Se registrará automáticamente en la base de datos
      </small>
    </div>
  );
}

export default GoogleAuth;
