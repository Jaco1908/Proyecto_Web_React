# 🚀 GUÍA DE INSTALACIÓN RÁPIDA - InnovaSys

## ⚡ **INSTALACIÓN EN 5 MINUTOS**

### 📋 **REQUISITOS PREVIOS**
- **Node.js** v18+ ([Descargar aquí](https://nodejs.org/))
- **PostgreSQL** v12+ ([Descargar aquí](https://www.postgresql.org/download/))
- **Git** ([Descargar aquí](https://git-scm.com/))

---

## 🛠️ **PASO 1: CLONAR PROYECTO**

```bash
git clone <URL_DEL_REPOSITORIO>
cd Proyecto_Web_React/Proyecto
```

---

## 🗄️ **PASO 2: CONFIGURAR BASE DE DATOS**

### **2.1 Crear base de datos**
```sql
-- Conectar a PostgreSQL como superusuario
CREATE DATABASE innovasys_db;
```

### **2.2 Ejecutar script SQL**
```bash
# Ejecutar el archivo usuarios.sql en la base de datos
psql -d innovasys_db -f backend/usuarios.sql
```

**O manualmente:**
```sql
-- Crear tablas
CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    picture VARCHAR(255) DEFAULT '/images/user.png',
    role_id INTEGER REFERENCES roles(id) DEFAULT 2,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE productos (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    foto VARCHAR(255),
    precio DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insertar roles iniciales
INSERT INTO roles (nombre) VALUES ('admin'), ('user');
```

---

## 🔧 **PASO 3: CONFIGURAR VARIABLES DE ENTORNO**

### **3.1 Crear archivo .env en carpeta backend**
```bash
cd backend
```

Crear archivo `.env`:
```env
DATABASE_URL=postgresql://tu_usuario:tu_password@localhost:5432/innovasys_db
PORT=3000
```

**⚠️ Reemplazar:**
- `tu_usuario`: Tu usuario de PostgreSQL
- `tu_password`: Tu contraseña de PostgreSQL

---

## 📦 **PASO 4: INSTALAR DEPENDENCIAS**

### **4.1 Backend**
```bash
cd backend
npm install
```

### **4.2 Frontend**
```bash
cd ..
npm install
```

---

## 🚀 **PASO 5: EJECUTAR PROYECTO**

### **Opción A: Terminales Separadas (Recomendado)**

**Terminal 1 - Backend:**
```bash
cd backend
node index.js
```
✅ Debe mostrar: `Servidor backend en puerto 3000`

**Terminal 2 - Frontend:**
```bash
npm run dev
```
✅ Debe mostrar: `Local: http://localhost:5173/`

### **Opción B: Un Solo Comando**
```bash
# Si tienes concurrently instalado
npm run dev:full
```

---

## 🎯 **PASO 6: VERIFICAR INSTALACIÓN**

### **6.1 Abrir navegador**
```
http://localhost:5173/
```

### **6.2 Crear primer admin**
1. Ir a **Regístrate**
2. Crear cuenta (será usuario normal)
3. En la base de datos, cambiar manualmente el primer usuario a admin:

```sql
UPDATE usuarios SET role_id = 1 WHERE id = 1;
```

### **6.3 Probar funcionalidades**
- ✅ Login/Logout
- ✅ Registro de usuarios
- ✅ Vista productos (usuario normal = tarjetas)
- ✅ CRUD productos (admin = tabla)
- ✅ Gestión usuarios (solo admin)

---

## 🔍 **SOLUCIÓN DE PROBLEMAS COMUNES**

### **Error: ECONNREFUSED**
```bash
# Verificar que PostgreSQL está corriendo
sudo service postgresql start  # Linux
brew services start postgresql # macOS
```

### **Error: role does not exist**
```sql
-- Crear usuario PostgreSQL
CREATE USER tu_usuario WITH PASSWORD 'tu_password';
GRANT ALL PRIVILEGES ON DATABASE innovasys_db TO tu_usuario;
```

### **Error: Port 3000 already in use**
```bash
# Matar procesos en puerto 3000
sudo lsof -ti:3000 | xargs sudo kill -9  # macOS/Linux
taskkill /F /IM node.exe                 # Windows
```

### **Error: Cannot find module**
```bash
# Limpiar e instalar de nuevo
rm -rf node_modules package-lock.json
npm install
```

### **Error: 500 Internal Server Error en registro**
- ✅ Verificar que la tabla `usuarios` tiene columna `role_id`
- ✅ Verificar conexión a base de datos
- ✅ Revisar logs del backend en la terminal

---

## 📁 **ESTRUCTURA DE ARCHIVOS DESPUÉS DE INSTALACIÓN**

```
Proyecto/
├── backend/
│   ├── node_modules/          ✅ Instalado
│   ├── .env                   ✅ Creado por ti
│   ├── package.json
│   └── ...
├── node_modules/              ✅ Instalado  
├── .env (opcional)
├── package.json
└── ...
```

---

## 👥 **USUARIOS DE PRUEBA**

Después de la instalación, tendrás:
- **Usuario Admin**: El primero que registres y cambies manualmente a admin
- **Usuarios Normales**: Todos los que se registren después

---

## 🆘 **AYUDA RÁPIDA**

### **Comandos Útiles**
```bash
# Ver logs del backend
cd backend && node index.js

# Reiniciar todo
npm run dev

# Ver estado de la base de datos
psql -d innovasys_db -c "SELECT * FROM usuarios;"
```

### **URLs Importantes**
- **Frontend**: http://localhost:5173/
- **Backend API**: http://localhost:3000/
- **Productos**: http://localhost:5173/productos
- **Usuarios**: http://localhost:5173/usuarios (solo admin)

---

## ✅ **CHECKLIST DE VERIFICACIÓN**

- [ ] Node.js instalado
- [ ] PostgreSQL instalado y corriendo
- [ ] Base de datos creada
- [ ] Tablas creadas
- [ ] Archivo .env configurado
- [ ] Dependencias instaladas (backend + frontend)
- [ ] Backend corriendo en puerto 3000
- [ ] Frontend corriendo en puerto 5173
- [ ] Primer usuario admin creado
- [ ] Login/logout funcionando
- [ ] CRUD productos funcionando

---

*🎉 ¡Listo! Tu sistema InnovaSys está funcionando correctamente*

### **💡 SIGUIENTES PASOS**
- Personalizar estilos en `/src/assets/css/`
- Agregar productos de prueba
- Crear más usuarios admin si es necesario
- Revisar la documentación técnica completa

---

*¿Problemas? Revisa la DOCUMENTACION_TECNICA.md para más detalles*
