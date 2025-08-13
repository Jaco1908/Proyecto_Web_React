# 📖 DOCUMENTACIÓN TÉCNICA DEL SISTEMA - InnovaSys

## 🏗️ **ARQUITECTURA DEL SISTEMA**

### **Stack Tecnológico**
- **Frontend**: React 18 + Vite + React Router DOM
- **Backend**: Node.js + Express.js
- **Base de Datos**: PostgreSQL
- **Autenticación**: Sesiones con express-session + bcryptjs
- **Estilos**: CSS personalizado con diseño responsivo

---

## 🗂️ **ESTRUCTURA DEL PROYECTO**

```
Proyecto/
├── backend/                    # Servidor Express
│   ├── index.js               # Servidor principal
│   ├── db.js                  # Conexión a PostgreSQL
│   ├── auth.js                # Middleware de autenticación
│   ├── package.json           # Dependencias backend
│   └── usuarios.sql           # Script inicial de BD
├── src/                       # Frontend React
│   ├── App.jsx                # Componente principal
│   ├── main.jsx               # Entry point
│   ├── componentes/           # Componentes reutilizables
│   │   ├── Header.jsx         # Cabecera con perfil usuario
│   │   ├── Nav.jsx            # Navegación principal
│   │   ├── Footer.jsx         # Pie de página
│   │   └── Layout.jsx         # Layout general
│   ├── paginas/               # Páginas del sistema
│   │   ├── productos.jsx      # CRUD productos + catálogo
│   │   └── usuarios.jsx       # Gestión usuarios (admin)
│   ├── assets/css/            # Estilos organizados
│   │   ├── plantilla/         # Estilos componentes
│   │   └── Paginas/           # Estilos por página
│   ├── login.jsx              # Página login
│   ├── register.jsx           # Página registro
│   └── Home.jsx               # Página inicio
├── public/                    # Archivos estáticos
│   └── images/                # Imágenes del sistema
├── package.json               # Dependencias frontend
└── README.md                  # Documentación
```

---

## 🛢️ **BASE DE DATOS - PostgreSQL**

### **Esquema de Tablas**

#### **roles**
```sql
CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL UNIQUE
);

-- Datos iniciales
INSERT INTO roles (nombre) VALUES ('admin'), ('user');
```

#### **usuarios**
```sql
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    picture VARCHAR(255) DEFAULT '/images/user.png',
    role_id INTEGER REFERENCES roles(id) DEFAULT 2,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### **productos**
```sql
CREATE TABLE productos (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    foto VARCHAR(255),
    precio DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 🔐 **SISTEMA DE AUTENTICACIÓN**

### **Flujo de Autenticación**
1. **Registro**: Usuario se registra → rol automático = 2 (user)
2. **Login**: Validación credenciales → creación sesión + localStorage
3. **Sesión**: Express-session + cookies para persistencia
4. **Autorización**: Middleware verifican login/admin

### **Middleware de Seguridad**
```javascript
// auth.js
export const requireLogin = (req, res, next) => {
    if (!req.session.user) {
        return res.status(401).json({ error: 'Login requerido' });
    }
    next();
};

export const requireAdmin = (req, res, next) => {
    if (req.session.user?.nombre_rol !== 'admin') {
        return res.status(403).json({ error: 'Solo admin' });
    }
    next();
};
```

---

## 🎛️ **API ENDPOINTS**

### **Autenticación**
| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| POST | `/api/register` | Registrar usuario | No |
| POST | `/api/login` | Iniciar sesión | No |
| POST | `/logout` | Cerrar sesión | Sí |

### **Productos**
| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| GET | `/productos` | Ver productos | Login |
| POST | `/productos` | Crear producto | Admin |
| PUT | `/productos/:id` | Editar producto | Admin |
| DELETE | `/productos/:id` | Eliminar producto | Admin |

### **Usuarios (Admin)**
| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| GET | `/usuarios` | Listar usuarios | Admin |
| PUT | `/usuarios/:id/rol` | Cambiar rol | Admin |
| POST | `/usuarios/admin` | Crear admin | Admin |

---

## 🎨 **SISTEMA DE ROLES Y PERMISOS**

### **Roles Definidos**
- **Admin (id: 1)**: Acceso total al sistema
- **User (id: 2)**: Acceso limitado de solo lectura

### **Permisos por Rol**

#### **Usuario Normal (user)**
- ✅ Ver catálogo de productos (modo tarjetas)
- ✅ Acceder a navegación básica
- ❌ CRUD de productos
- ❌ Gestión de usuarios

#### **Administrador (admin)**
- ✅ Todo lo del usuario normal
- ✅ CRUD completo de productos
- ✅ Gestión de usuarios
- ✅ Crear nuevos admins
- ✅ Cambiar roles de usuarios

---

## 🧩 **COMPONENTES PRINCIPALES**

### **Header.jsx**
- **Función**: Cabecera del sistema
- **Características**:
  - Logo y título de la empresa
  - Perfil de usuario logueado
  - Botones login/register para visitantes
  - Muestra nombre y rol del usuario
  - Botón cerrar sesión

### **Nav.jsx**
- **Función**: Navegación principal
- **Lógica Condicional**:
  - Catálogo: Visible para todos
  - Productos: Solo usuarios autenticados
  - Usuarios: Solo administradores

### **productos.jsx**
- **Dual Mode**: Cambia según rol del usuario
  - **Admin**: Vista tabla CRUD completa
  - **User**: Vista catálogo tipo tarjetas
- **Funciones Admin**: Crear, editar, eliminar productos

### **usuarios.jsx**
- **Acceso**: Exclusivo para administradores
- **Funciones**:
  - Listar todos los usuarios
  - Crear usuarios admin
  - Cambiar roles (admin ↔ user)
  - Protección: No auto-modificación de rol

---

## 🛡️ **SEGURIDAD IMPLEMENTADA**

### **Frontend**
- Validación de roles en componentes
- Ocultación de UI según permisos
- Verificación de sesión en localStorage
- Redirecciones automáticas

### **Backend**
- Middleware de autenticación
- Validación de roles en endpoints
- Hashing de contraseñas (bcryptjs)
- Sesiones seguras con cookies
- Validación de datos de entrada

### **Base de Datos**
- Claves foráneas para integridad
- Constraints de unicidad
- Valores por defecto seguros

---

## 🔄 **FLUJO DE DATOS**

### **Registro de Usuario**
```
Frontend → POST /api/register → Backend
           ↓
    Validar datos → Hash password → 
           ↓
    Insert DB (role_id=2) → Response
           ↓
    Frontend redirect → Login
```

### **Autenticación**
```
Frontend → POST /api/login → Backend
           ↓
    Validar credenciales → Crear sesión →
           ↓
    Response con usuario+rol → Frontend
           ↓
    localStorage + UI update
```

### **Operaciones CRUD**
```
Frontend → API Request + credentials
           ↓
    Middleware auth → Middleware role →
           ↓
    DB Operation → Response → Frontend Update
```

---

## 🎯 **CARACTERÍSTICAS DESTACADAS**

### **Responsive Design**
- Adaptable a desktop, tablet y móvil
- Media queries en todos los componentes
- UI optimizada para diferentes pantallas

### **UX/UI**
- Gradientes y sombras modernas
- Animaciones suaves con CSS transitions
- Feedback visual en todas las acciones
- Diseño coherente en todo el sistema

### **Gestión de Estado**
- useState para estado local
- localStorage para persistencia
- Sesiones server-side para seguridad
- Recargas automáticas tras operaciones

### **Manejo de Errores**
- Validación en frontend y backend
- Mensajes de error claros
- Fallbacks para fallos de conexión
- Logging de errores en servidor

---

## 🔧 **CONFIGURACIÓN TÉCNICA**

### **Variables de Entorno**
```env
DATABASE_URL=postgresql://username:password@localhost:5432/dbname
PORT=3000
SESSION_SECRET=tu_secreto_aqui
```

### **CORS y Sesiones**
```javascript
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(session({
  secret: 'secreto123',
  resave: false,
  saveUninitialized: true,
  cookie: {
    sameSite: 'lax',
    secure: false  // true en producción HTTPS
  }
}));
```

---

## 📊 **MÉTRICAS DEL PROYECTO**

- **Archivos**: ~15 archivos principales
- **Componentes React**: 8 componentes
- **Endpoints API**: 9 rutas
- **Tablas BD**: 3 tablas
- **Roles**: 2 niveles de usuario
- **Páginas**: 5 páginas principales

---

## 🚀 **ESCALABILIDAD**

### **Preparado para**
- Más roles de usuario
- Módulos adicionales
- Integración con APIs externas
- Sistema de notificaciones
- Auditoría de acciones
- Caché de datos

### **Arquitectura Modular**
- Componentes reutilizables
- Middleware extensible
- Esquema de BD normalizado
- Separación clara de responsabilidades

---

*Desarrollado con ❤️ para InnovaSys - Sistema de gestión empresarial*
