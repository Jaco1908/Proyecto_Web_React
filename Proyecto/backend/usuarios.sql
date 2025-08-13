-- Script de inicialización de la base de datos InnovaSys
-- Ejecutar este archivo después de crear la base de datos

-- Crear tabla de roles
CREATE TABLE IF NOT EXISTS roles (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear tabla de usuarios
CREATE TABLE IF NOT EXISTS usuarios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    picture VARCHAR(255) DEFAULT '/images/user.png',
    role_id INTEGER REFERENCES roles(id) DEFAULT 2,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear tabla de productos
CREATE TABLE IF NOT EXISTS productos (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    foto VARCHAR(255),
    precio DECIMAL(10,2) NOT NULL CHECK (precio >= 0),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insertar roles por defecto
INSERT INTO roles (nombre) VALUES ('admin'), ('user') 
ON CONFLICT (nombre) DO NOTHING;

-- Crear índices para mejorar performance
CREATE INDEX IF NOT EXISTS idx_usuarios_email ON usuarios(email);
CREATE INDEX IF NOT EXISTS idx_usuarios_role_id ON usuarios(role_id);
CREATE INDEX IF NOT EXISTS idx_productos_nombre ON productos(nombre);

-- Comentarios para documentación
COMMENT ON TABLE roles IS 'Tabla que almacena los roles del sistema (admin, user)';
COMMENT ON TABLE usuarios IS 'Tabla que almacena la información de los usuarios registrados';
COMMENT ON TABLE productos IS 'Tabla que almacena los productos del catálogo';

COMMENT ON COLUMN usuarios.role_id IS 'Referencia al rol del usuario (1=admin, 2=user)';
COMMENT ON COLUMN productos.precio IS 'Precio del producto, debe ser mayor o igual a 0';

-- Mostrar mensaje de confirmación
SELECT 'Base de datos InnovaSys inicializada correctamente!' as mensaje;
