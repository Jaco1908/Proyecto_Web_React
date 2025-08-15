-- Script para agregar productos variados a la base de datos
-- Ejecutar este script en tu base de datos MySQL/PostgreSQL
-- Compatible con tu estructura actual de 9 tablas

-- PASO 1: Verificar/Crear tablas adicionales si no existen
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

-- Agregar columnas a productos si no existen
ALTER TABLE productos 
ADD COLUMN IF NOT EXISTS categoria_id INTEGER REFERENCES categorias(id),
ADD COLUMN IF NOT EXISTS marca_id INTEGER REFERENCES marcas(id),
ADD COLUMN IF NOT EXISTS subcategoria_id INTEGER REFERENCES subcategorias(id);

-- PASO 2: Insertar categorías principales
INSERT INTO categorias (nombre, descripcion) VALUES
('accesorios', 'Accesorios y complementos tecnológicos'),
('conectividad', 'Dispositivos de conectividad y comunicación'),
('almacenamiento', 'Dispositivos de almacenamiento y audio'),
('computacion', 'Equipos y periféricos de computación'),
('electrodomesticos', 'Electrodomésticos y dispositivos eléctricos'),
('movil', 'Accesorios y soportes móviles'),
('consola', 'Gaming y entretenimiento')
ON CONFLICT (nombre) DO NOTHING;

-- PASO 3: Insertar marcas
INSERT INTO marcas (nombre) VALUES
('GameMax'), ('SecureBag'), ('ExecStyle'), ('SportTech'),
('SoundMax'), ('GameAudio'), ('FitSound'), ('StudioTech'), ('OfficeTech'),
('StreamPro'), ('GameVoice'), ('ProAudio'), ('WirelessTech'),
('VisionPro'), ('SecureCam'), ('StreamCam'), ('ConferenceTech'),
('ConnectMax'), ('HubTech'), ('VideoLink'), ('DisplayTech'),
('WatchTech'), ('FitWatch'), ('StyleWatch'), ('KidsWatch'),
('SoundSphere'), ('RuggedSound'), ('SmartAudio'), ('VintageSound'),
('GameMouse'), ('ErgoTech'), ('QuietClick'), ('ProTrack'),
('MechTech'), ('CompactKey'), ('ErgoSplit'), ('RGBKeys'),
('FastStorage'), ('BigStorage'), ('SpeedCase'), ('HubMax'),
('SolarTech'), ('SolarPower'), ('WirelessCharge'), ('CableTech'),
('DualMount'), ('MotorMount'), ('CoolTech'), ('SmartLight'),
('Google'), ('Amazon'), ('GameControl'), ('CaptureMax'),
('ChargeMaster'), ('ProjectMax'), ('Print3D'), ('ASUS'), ('ComfortGame'),
('CableMax'), ('PadTech'), ('LaptopStand'), ('CableOrg'), ('PrivacyTech'),
('Apple'), ('Dell'), ('Logitech'), ('Sony'), ('BasicTech'), ('CablePlus'), ('SimpleMount')
ON CONFLICT (nombre) DO NOTHING;

-- PASO 4: Insertar productos con referencias correctas
INSERT INTO productos (nombre, descripcion, precio, foto, categoria_id, marca_id) VALUES
-- ACCESORIOS (categoria_id = 1)
('Mochila Gaming RGB', 'Mochila para gaming con luces LED RGB y compartimento para laptop 17"', 89.99, '/images/Prom/Mochila.jpg', 1, (SELECT id FROM marcas WHERE nombre = 'GameMax')),
('Mochila Antirrobo USB', 'Mochila con puerto USB, candado TSA y compartimento laptop 15.6"', 65.99, '/images/Prom/Mochila.jpg', 1, (SELECT id FROM marcas WHERE nombre = 'SecureBag')),
('Mochila Ejecutiva Premium', 'Mochila de cuero sintético para ejecutivos con múltiples compartimentos', 125.00, '/images/Prom/Mochila.jpg', 1, (SELECT id FROM marcas WHERE nombre = 'ExecStyle')),
('Mochila Deportiva Impermeable', 'Mochila resistente al agua para deportes y actividades al aire libre', 45.50, '/images/Prom/Mochila.jpg', 1, (SELECT id FROM marcas WHERE nombre = 'SportTech')),

-- Auriculares
('Auriculares Bluetooth Premium', 'Auriculares inalámbricos con cancelación de ruido activa', 199.99, '/images/Masvendidos/auidifonos.jpg', 1, (SELECT id FROM marcas WHERE nombre = 'SoundMax')),
('Auriculares Gaming 7.1', 'Auriculares gaming con sonido surround 7.1 y micrófono RGB', 159.00, '/images/Masvendidos/auricular.jpg', 1, (SELECT id FROM marcas WHERE nombre = 'GameAudio')),
('Auriculares Deportivos Bluetooth', 'Auriculares resistentes al sudor IPX7 para deportes', 79.99, '/images/Masvendidos/auidifonos.jpg', 1, (SELECT id FROM marcas WHERE nombre = 'FitSound')),
('Auriculares Studio Pro', 'Auriculares profesionales para estudio de grabación', 299.99, '/images/Masvendidos/auricular.jpg', 1, (SELECT id FROM marcas WHERE nombre = 'StudioTech')),
('Auriculares USB Oficina', 'Auriculares USB con micrófono para videoconferencias', 49.99, '/images/Masvendidos/auidifonos.jpg', 1, (SELECT id FROM marcas WHERE nombre = 'OfficeTech')),

-- CONECTIVIDAD (categoria_id = 2)
-- Micrófonos
('Micrófono USB Streaming', 'Micrófono condensador USB para streaming y podcasting', 129.99, '/images/Masvendidos/Micro.jpg', 2, (SELECT id FROM marcas WHERE nombre = 'StreamPro')),
('Micrófono Gaming RGB', 'Micrófono con iluminación RGB y brazo articulado', 89.99, '/images/Masvendidos/Micro.jpg', 2, (SELECT id FROM marcas WHERE nombre = 'GameVoice')),
('Micrófono Profesional XLR', 'Micrófono dinámico profesional con conexión XLR', 199.99, '/images/Masvendidos/Micro.jpg', 2, (SELECT id FROM marcas WHERE nombre = 'ProAudio')),
('Micrófono Lavalier Inalámbrico', 'Micrófono de solapa inalámbrico para presentaciones', 159.00, '/images/Masvendidos/Micro.jpg', 2, (SELECT id FROM marcas WHERE nombre = 'WirelessTech')),

-- Cámaras
('Cámara Web 4K Ultra HD', 'Cámara web con resolución 4K y enfoque automático', 199.99, '/images/Destacado/Camara ip.jpg', 2, (SELECT id FROM marcas WHERE nombre = 'VisionPro')),
('Cámara IP Seguridad WiFi', 'Cámara IP con visión nocturna y detección de movimiento', 149.99, '/images/Destacado/Camara ip.jpg', 2, (SELECT id FROM marcas WHERE nombre = 'SecureCam')),
('Cámara Streaming Full HD', 'Cámara especial para streaming con luz de anillo integrada', 119.99, '/images/Destacado/Camara ip.jpg', 2, (SELECT id FROM marcas WHERE nombre = 'StreamCam')),
('Cámara Conferencia 360°', 'Cámara con vista panorámica 360° para salas de conferencia', 399.99, '/images/Destacado/Camara ip.jpg', 2, (SELECT id FROM marcas WHERE nombre = 'ConferenceTech')),

-- Adaptadores
('Adaptador USB-C a HDMI 4K', 'Adaptador USB-C a HDMI con soporte 4K@60Hz', 34.99, '/images/Masvendidos/Adaptador.jpg', 2, (SELECT id FROM marcas WHERE nombre = 'ConnectMax')),
('Adaptador Multipuerto USB-C', 'Hub USB-C con HDMI, USB 3.0 y carga PD', 69.99, '/images/Masvendidos/Adaptador.jpg', 2, (SELECT id FROM marcas WHERE nombre = 'HubTech')),
('Adaptador VGA a HDMI', 'Convertidor VGA a HDMI con audio integrado', 24.99, '/images/Masvendidos/Adaptador.jpg', 2, (SELECT id FROM marcas WHERE nombre = 'VideoLink')),
('Adaptador DisplayPort 4K', 'Adaptador DisplayPort a HDMI con soporte 4K', 29.99, '/images/Masvendidos/Adaptador.jpg', 2, (SELECT id FROM marcas WHERE nombre = 'DisplayTech')),

-- ALMACENAMIENTO (categoria_id = 3)
-- Smartwatches
('Smartwatch Pro GPS', 'Reloj inteligente con GPS, monitor cardíaco y NFC', 299.99, '/images/Masvendidos/smartwatch.jpg', 3, (SELECT id FROM marcas WHERE nombre = 'WatchTech')),
('Smartwatch Deportivo', 'Reloj deportivo con 50+ modos de ejercicio y resistencia al agua', 199.99, '/images/Masvendidos/smartwatch.jpg', 3, (SELECT id FROM marcas WHERE nombre = 'FitWatch')),
('Smartwatch Elegante', 'Reloj inteligente elegante con pantalla AMOLED', 249.99, '/images/Masvendidos/smartwatch.jpg', 3, (SELECT id FROM marcas WHERE nombre = 'StyleWatch')),
('Smartwatch Infantil', 'Reloj inteligente para niños con GPS y llamadas', 129.99, '/images/Masvendidos/smartwatch.jpg', 3, (SELECT id FROM marcas WHERE nombre = 'KidsWatch')),

-- Parlantes
('Parlante Bluetooth 360°', 'Parlante inalámbrico con sonido omnidireccional', 159.99, '/images/Destacado/Audio.jpg', 3, (SELECT id FROM marcas WHERE nombre = 'SoundSphere')),
('Parlante Portátil Resistente', 'Parlante Bluetooth resistente al agua IPX7', 89.99, '/images/Destacado/Audio.jpg', 3, (SELECT id FROM marcas WHERE nombre = 'RuggedSound')),
('Barra de Sonido Smart', 'Barra de sonido inteligente con Alexa integrada', 299.99, '/images/Destacado/Audio.jpg', 3, (SELECT id FROM marcas WHERE nombre = 'SmartAudio')),
('Parlante Vintage Bluetooth', 'Parlante con diseño retro y conexión moderna', 119.99, '/images/Destacado/Audio.jpg', 3, (SELECT id FROM marcas WHERE nombre = 'VintageSound')),

-- COMPUTACIÓN (categoria_id = 4)
-- Mouse
('Mouse Gaming RGB 12000 DPI', 'Mouse gaming con 12 botones programables y RGB', 79.99, '/images/Masvendidos/Mouse.jpeg', 4, (SELECT id FROM marcas WHERE nombre = 'GameMouse')),
('Mouse Ergonómico Vertical', 'Mouse ergonómico para reducir tensión en la muñeca', 59.99, '/images/Masvendidos/Mouse2.jpg', 4, (SELECT id FROM marcas WHERE nombre = 'ErgoTech')),
('Mouse Inalámbrico Silent', 'Mouse silencioso ideal para oficinas', 34.99, '/images/Masvendidos/Mouse4.jpg', 4, (SELECT id FROM marcas WHERE nombre = 'QuietClick')),
('Mouse Trackball Profesional', 'Mouse trackball para diseñadores y profesionales', 89.99, '/images/Masvendidos/Mouse5.jpg', 4, (SELECT id FROM marcas WHERE nombre = 'ProTrack')),

-- Teclados
('Teclado Mecánico Gaming', 'Teclado mecánico con switches Cherry MX y RGB', 149.99, '/images/Masvendidos/Teclado.jpg', 4, (SELECT id FROM marcas WHERE nombre = 'MechTech')),
('Teclado Inalámbrico Compacto', 'Teclado compacto 60% ideal para espacios pequeños', 89.99, '/images/Masvendidos/Teclado.jpg', 4, (SELECT id FROM marcas WHERE nombre = 'CompactKey')),
('Teclado Ergonómico Split', 'Teclado dividido para mayor comodidad ergonómica', 199.99, '/images/Masvendidos/Teclado.jpg', 4, (SELECT id FROM marcas WHERE nombre = 'ErgoSplit')),
('Teclado RGB Membrana', 'Teclado de membrana con retroiluminación RGB', 69.99, '/images/Masvendidos/Teclado.jpg', 4, (SELECT id FROM marcas WHERE nombre = 'RGBKeys')),

-- Discos y Almacenamiento
('SSD Externo 1TB USB-C', 'Disco sólido externo de alta velocidad', 199.99, '/images/Nuevo/discoext.jpg', 4, (SELECT id FROM marcas WHERE nombre = 'FastStorage')),
('HDD Externo 4TB', 'Disco duro externo de alta capacidad', 129.99, '/images/Nuevo/discoext.jpg', 4, (SELECT id FROM marcas WHERE nombre = 'BigStorage')),
('Enclosure NVMe USB 3.2', 'Carcasa para SSD NVMe con USB 3.2 Gen2', 49.99, '/images/Nuevo/discoext.jpg', 4, (SELECT id FROM marcas WHERE nombre = 'SpeedCase')),
('Hub USB 3.0 7 Puertos', 'Hub USB con 7 puertos y fuente de alimentación', 39.99, '/images/Masvendidos/Router.jpg', 4, (SELECT id FROM marcas WHERE nombre = 'HubMax')),

-- ELECTRODOMÉSTICOS (categoria_id = 5)
('Panel Solar Plegable 100W', 'Panel solar portátil plegable para camping', 299.99, '/images/Prom/powerbank.jpg', 5, (SELECT id FROM marcas WHERE nombre = 'SolarTech')),
('Powerbank Solar 25000mAh', 'Batería externa solar con carga inalámbrica', 89.99, '/images/Prom/powerbank.jpg', 5, (SELECT id FROM marcas WHERE nombre = 'SolarPower')),
('Cargador Inalámbrico Rápido', 'Base de carga inalámbrica 15W con ventilación', 49.99, '/images/Prom/powerbank.jpg', 5, (SELECT id FROM marcas WHERE nombre = 'WirelessCharge')),
('Cable USB-C 3.1 Gen2', 'Cable USB-C de alta velocidad 3.1 Gen2', 19.99, '/images/Masvendidos/Router.jpg', 5, (SELECT id FROM marcas WHERE nombre = 'CableTech')),

-- MÓVIL (categoria_id = 6)
('Soporte Monitor Dual', 'Soporte para dos monitores con ajuste completo', 149.99, '/images/Destacado/monitor.jpeg', 6, (SELECT id FROM marcas WHERE nombre = 'DualMount')),
('Soporte TV Motorizado', 'Soporte de pared motorizado para TV 43-75"', 399.99, '/images/Prom/TelevisorLG.jpg', 6, (SELECT id FROM marcas WHERE nombre = 'MotorMount')),
('Base Refrigeración Laptop', 'Base con ventiladores para enfriar laptops gaming', 59.99, '/images/Nuevo/casecooler.jpg', 6, (SELECT id FROM marcas WHERE nombre = 'CoolTech')),
('Foco LED Smart WiFi RGB', 'Bombilla inteligente RGB controlable por app', 29.99, '/images/Nuevo/router.jpg', 6, (SELECT id FROM marcas WHERE nombre = 'SmartLight')),

-- CONSOLA Y ENTRETENIMIENTO (categoria_id = 7)
('Chromecast Ultra 4K', 'Dispositivo de streaming 4K con HDR', 69.99, '/images/Destacado/Streaming.jpg', 7, (SELECT id FROM marcas WHERE nombre = 'Google')),
('Fire TV Stick 4K Max', 'Reproductor de streaming 4K con Alexa', 54.99, '/images/Destacado/Streaming.jpg', 7, (SELECT id FROM marcas WHERE nombre = 'Amazon')),
('Control Gaming Inalámbrico', 'Control para PC y consola con vibración HD', 79.99, '/images/Nuevo/play.jpg', 7, (SELECT id FROM marcas WHERE nombre = 'GameControl')),
('Capturadora HDMI 4K', 'Tarjeta capturadora para streaming y grabación', 199.99, '/images/Destacado/Streaming.jpg', 7, (SELECT id FROM marcas WHERE nombre = 'CaptureMax')),

-- Productos Premium y Especializados
('Estación de Carga Multiple', 'Base de carga para múltiples dispositivos Apple', 149.99, '/images/Prom/powerbank.jpg', 5, (SELECT id FROM marcas WHERE nombre = 'ChargeMaster')),
('Proyector Portátil 4K', 'Mini proyector 4K con Android integrado', 599.99, '/images/Destacado/Proyector.jpeg', 5, (SELECT id FROM marcas WHERE nombre = 'ProjectMax')),
('Impresora 3D Compacta', 'Impresora 3D para principiantes y aficionados', 399.99, '/images/Destacado/impresora.jpeg', 4, (SELECT id FROM marcas WHERE nombre = 'Print3D')),
('Monitor Gaming 144Hz', 'Monitor curvo gaming 27" 144Hz QHD', 449.99, '/images/Destacado/MonitorAsus.jpg', 4, (SELECT id FROM marcas WHERE nombre = 'ASUS')),
('Silla Gaming Ergonómica', 'Silla gaming con soporte lumbar y reposabrazos 4D', 299.99, '/images/Destacado/Silla.jpg', 6, (SELECT id FROM marcas WHERE nombre = 'ComfortGame')),

-- Productos más económicos
('Cable HDMI 2.1 Ultra HD', 'Cable HDMI 2.1 certificado 8K@60Hz', 24.99, '/images/Masvendidos/Router.jpg', 2, (SELECT id FROM marcas WHERE nombre = 'CableMax')),
('Mousepad Gaming XL', 'Alfombrilla gaming extra grande con bordes cosidos', 19.99, '/images/Masvendidos/Mouse.jpeg', 4, (SELECT id FROM marcas WHERE nombre = 'PadTech')),
('Soporte Laptop Ajustable', 'Soporte ergonómico ajustable para laptop', 39.99, '/images/Destacado/computadorLev.jpg', 6, (SELECT id FROM marcas WHERE nombre = 'LaptopStand')),
('Organizador Cables', 'Kit organizador de cables para escritorio', 14.99, '/images/Masvendidos/Router.jpg', 2, (SELECT id FROM marcas WHERE nombre = 'CableOrg')),
('Webcam Cover Slider', 'Cubierta deslizante para cámara web - Pack 6', 9.99, '/images/Destacado/Camara ip.jpg', 2, (SELECT id FROM marcas WHERE nombre = 'PrivacyTech'));

-- Insertar productos adicionales con diferentes rangos de precios
INSERT INTO productos (nombre, descripcion, precio, foto, categoria_id, marca_id) VALUES
-- Productos de gama alta
('MacBook Pro Stand', 'Soporte premium de aluminio para MacBook Pro', 199.99, '/images/Destacado/computadorLev.jpg', 6, (SELECT id FROM marcas WHERE nombre = 'Apple')),
('Monitor 4K HDR 32"', 'Monitor profesional 4K HDR para edición', 899.99, '/images/Destacado/monitor.jpeg', 4, (SELECT id FROM marcas WHERE nombre = 'Dell')),
('Teclado Inalámbrico Premium', 'Teclado inalámbrico con teclas de tijera', 179.99, '/images/Masvendidos/Teclado.jpg', 4, (SELECT id FROM marcas WHERE nombre = 'Logitech')),

-- Productos de gama media
('Cámara Web Full HD 60fps', 'Cámara web con grabación a 60fps', 99.99, '/images/Destacado/Camara ip.jpg', 2, (SELECT id FROM marcas WHERE nombre = 'Logitech')),
('Auriculares Noise Cancelling', 'Auriculares con cancelación de ruido híbrida', 249.99, '/images/Masvendidos/auidifonos.jpg', 1, (SELECT id FROM marcas WHERE nombre = 'Sony')),
('Router WiFi 6 Gaming', 'Router gaming con WiFi 6 y QoS adaptativo', 299.99, '/images/Masvendidos/Router.jpg', 2, (SELECT id FROM marcas WHERE nombre = 'ASUS')),

-- Productos económicos
('Mouse Pad Básico', 'Alfombrilla básica para mouse', 7.99, '/images/Masvendidos/Mouse.jpeg', 4, (SELECT id FROM marcas WHERE nombre = 'BasicTech')),
('Cable USB-A a USB-C', 'Cable de carga USB-A a USB-C 1m', 12.99, '/images/Masvendidos/Router.jpg', 5, (SELECT id FROM marcas WHERE nombre = 'CablePlus')),
('Soporte Básico Monitor', 'Soporte fijo básico para monitor', 24.99, '/images/Destacado/monitor.jpeg', 6, (SELECT id FROM marcas WHERE nombre = 'SimpleMount'));

-- PASO 5: Verificar la inserción y mostrar estadísticas
SELECT 
    c.nombre as categoria, 
    COUNT(p.id) as cantidad_productos,
    MIN(p.precio) as precio_minimo,
    MAX(p.precio) as precio_maximo,
    ROUND(AVG(p.precio), 2) as precio_promedio
FROM categorias c 
LEFT JOIN productos p ON c.id = p.categoria_id 
GROUP BY c.id, c.nombre
ORDER BY cantidad_productos DESC;

SELECT 'Script ejecutado correctamente! Se insertaron más de 70 productos con categorías y marcas.' as resultado;
