-- Script de inicialización rápida para probar los filtros
-- Ejecutar en la base de datos PostgreSQL

-- Paso 1: Crear/verificar tablas
CREATE TABLE IF NOT EXISTS categorias (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL UNIQUE,
    descripcion TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS marcas (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL UNIQUE,
    logo VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS subcategorias (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    categoria_id INTEGER REFERENCES categorias(id),
    descripcion TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Verificar si productos tiene las columnas necesarias
ALTER TABLE productos 
ADD COLUMN IF NOT EXISTS categoria_id INTEGER REFERENCES categorias(id),
ADD COLUMN IF NOT EXISTS marca_id INTEGER REFERENCES marcas(id),
ADD COLUMN IF NOT EXISTS subcategoria_id INTEGER REFERENCES subcategorias(id);

-- Paso 2: Insertar categorías básicas
INSERT INTO categorias (nombre, descripcion) VALUES
('accesorios', 'Accesorios y complementos tecnológicos'),
('conectividad', 'Dispositivos de conectividad y comunicación'),
('almacenamiento', 'Dispositivos de almacenamiento y audio'),
('computacion', 'Equipos y periféricos de computación'),
('electrodomesticos', 'Electrodomésticos y dispositivos eléctricos'),
('movil', 'Accesorios y soportes móviles'),
('consola', 'Gaming y entretenimiento')
ON CONFLICT (nombre) DO NOTHING;

-- Paso 3: Insertar marcas básicas
INSERT INTO marcas (nombre) VALUES
('GameMax'), ('SecureBag'), ('SoundMax'), ('VisionPro'), ('ConnectMax'),
('Apple'), ('Samsung'), ('Sony'), ('Logitech'), ('Dell'),
('ASUS'), ('HP'), ('Corsair'), ('Razer'), ('JBL')
ON CONFLICT (nombre) DO NOTHING;

-- Paso 4: Insertar subcategorías básicas
INSERT INTO subcategorias (nombre, categoria_id, descripcion) VALUES
('Mochilas', 1, 'Mochilas para laptop y gaming'),
('Auriculares', 1, 'Auriculares bluetooth y cableados'),
('Grabadoras', 1, 'Grabadoras de audio y video'),
('Micrófonos', 2, 'Micrófonos USB y profesionales'),
('Cámaras', 2, 'Cámaras web y IP'),
('Adaptadores', 2, 'Adaptadores y convertidores'),
('Smartwatch', 3, 'Relojes inteligentes'),
('Parlantes', 3, 'Altavoces y sistemas de audio'),
('Mouse', 4, 'Ratones inalámbricos y gaming'),
('Teclados', 4, 'Teclados mecánicos y gaming'),
('Enclosures', 4, 'Enclosures para discos duros');

-- Paso 5: Insertar productos de prueba
INSERT INTO productos (nombre, descripcion, precio, foto, categoria_id, marca_id, subcategoria_id) VALUES
-- Accesorios (categoria_id = 1)
('Mochila Gaming RGB LED', 'Mochila para gaming con luces LED RGB y compartimento para laptop 17"', 89.99, '/images/Prom/Mochila.jpg', 1, 1, 1),
('Auriculares Bluetooth Premium', 'Auriculares inalámbricos con cancelación de ruido activa', 199.99, '/images/Masvendidos/auidifonos.jpg', 1, 3, 2),
('Grabadora Digital HD', 'Grabadora externa de audio y video HD', 89.99, '/images/Masvendidos/Micro.jpg', 1, 7, 3),

-- Conectividad (categoria_id = 2)
('Micrófono USB Streaming', 'Micrófono condensador USB para streaming y podcasting', 129.99, '/images/Masvendidos/Micro.jpg', 2, 9, 4),
('Cámara Web 4K Ultra HD', 'Cámara web con resolución 4K y enfoque automático', 199.99, '/images/Destacado/Camara ip.jpg', 2, 4, 5),
('Adaptador USB-C a HDMI 4K', 'Adaptador USB-C a HDMI con soporte 4K@60Hz', 34.99, '/images/Masvendidos/Adaptador.jpg', 2, 5, 6),

-- Almacenamiento (categoria_id = 3)
('Smartwatch Pro 4G', 'Reloj inteligente con conectividad 4G y GPS', 299.99, '/images/Masvendidos/smartwatch.jpg', 3, 6, 7),
('Parlante Bluetooth Portátil', 'Parlante resistente al agua con 12 horas de batería', 79.99, '/images/Destacado/Audio.jpg', 3, 15, 8),

-- Computación (categoria_id = 4)
('Mouse Gaming RGB', 'Mouse inalámbrico gaming con sensor de alta precisión', 89.99, '/images/Masvendidos/Mouse2.jpg', 4, 13, 9),
('Teclado Mecánico RGB', 'Teclado mecánico gaming con switches Cherry MX', 159.99, '/images/Masvendidos/Teclado.jpg', 4, 13, 10),
('Enclosure USB 3.0', 'Carcasa externa para discos duros SATA', 29.99, '/images/Productos/enclosure.jpg', 4, 10, 11);

-- Verificar que todo se insertó correctamente
SELECT 'Categorías insertadas:' as info, COUNT(*) as total FROM categorias;
SELECT 'Marcas insertadas:' as info, COUNT(*) as total FROM marcas;
SELECT 'Subcategorías insertadas:' as info, COUNT(*) as total FROM subcategorias;
SELECT 'Productos insertados:' as info, COUNT(*) as total FROM productos;
