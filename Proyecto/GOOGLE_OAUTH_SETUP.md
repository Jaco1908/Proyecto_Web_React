# 🔑 Configuración de Google OAuth

## Estado Actual
❌ **Google Auth DESHABILITADO temporalmente**
- El Client ID actual no es válido
- Necesitas configurar un proyecto en Google Cloud Console

## Pasos para Configurar Google OAuth

### 1. Crear Proyecto en Google Cloud Console
1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un nuevo proyecto o selecciona uno existente
3. Habilita la **Google+ API** y **Google Identity Services**

### 2. Configurar OAuth 2.0
1. Ve a **APIs y servicios** > **Credenciales**
2. Clic en **+ CREAR CREDENCIALES** > **ID de cliente de OAuth 2.0**
3. Selecciona **Aplicación web**
4. Configura:
   - **Orígenes autorizados de JavaScript**: `http://localhost:5173`, `http://localhost:3000`
   - **URI de redirección autorizados**: `http://localhost:5173`, `http://localhost:3000`

### 3. Obtener Client ID
1. Copia el **Client ID** generado
2. Reemplaza `YOUR_GOOGLE_CLIENT_ID` en `App.jsx` línea 67:
   ```jsx
   <GoogleOAuthProvider clientId="TU_CLIENT_ID_AQUI">
   ```

### 4. Rehabilitar Google Auth
En `src/login.jsx` y `src/register.jsx`, reemplaza el botón deshabilitado con:
```jsx
<GoogleAuth onUserChange={onUserChange} />
```

### 5. Verificar Componente GoogleAuth
El archivo `src/GoogleAuth.jsx` está listo para usar una vez tengas el Client ID válido.

## 🚀 Una vez configurado:
- Los usuarios podrán iniciar sesión con Google
- Los datos se sincronizarán con el backend
- El sistema de carrito funcionará con ambas formas de autenticación

## 📝 Notas Importantes:
- El proyecto funciona perfectamente con login/registro manual
- Google Auth es una funcionalidad adicional opcional
- Todos los demás sistemas (carrito, checkout, productos) están completamente funcionales

---
**Prioridad**: Baja - El sistema funciona completamente sin Google Auth
