CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    picture VARCHAR(255) DEFAULT '/images/user.png'
);


-- Tabla de roles
CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL UNIQUE
);

-- Tabla de productos
CREATE TABLE productos (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    foto VARCHAR(255),
    precio NUMERIC(10,2) NOT NULL
);

-- Agregar columna role_id a usuarios
ALTER TABLE usuarios
ADD COLUMN role_id INTEGER REFERENCES roles(id);

-- Insertar roles
INSERT INTO roles (nombre) VALUES ('admin'), ('usuario');

-- Insertar dos usuarios por defecto
INSERT INTO usuarios (nombre, email, password, role_id) VALUES
('Admin', 'admin@email.com', 'admin123', 1),
('Usuario', 'usuario@email.com', 'usuario123', 2);