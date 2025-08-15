import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import session from 'express-session';
import { requireLogin, requireAdmin } from './auth.js';
import { query } from './db.js';

dotenv.config();

const app = express();
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(session({
  secret: 'secreto123',
  resave: false,
  saveUninitialized: true,
  cookie: {
    sameSite: 'lax', // importante para cross-origin con credenciales
    secure: false    // true solo si usas https
  }
}));



// Registro
app.post('/api/register', async (req, res) => {
  const { nombre, email, password, picture } = req.body;
  if (!nombre || !email || !password) return res.status(400).json({ error: 'Faltan datos' });
  try {
    const hashed = await bcrypt.hash(password, 10);
    const result = await query(
      'INSERT INTO usuarios (nombre, email, password, picture, role_id) VALUES ($1, $2, $3, $4, $5) RETURNING id, nombre, email, picture',
      [nombre, email, hashed, picture || '/images/user.png', 2] // rol 2 = usuario normal
    );
    res.json(result.rows[0]);
  } catch (e) {
    console.log('Error en /api/register:', e);
    if (e.code === '23505') return res.status(409).json({ error: 'Email ya registrado' });
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

// Login único: devuelve nombre_rol y guarda usuario en sesión
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Faltan datos' });
  try {
    const result = await query(
      `SELECT u.*, r.nombre as nombre_rol
       FROM usuarios u
       JOIN roles r ON u.role_id = r.id
       WHERE u.email = $1`, [email]
    );
    if (!result.rows.length) return res.status(401).json({ error: 'Credenciales inválidas' });
    const user = result.rows[0];
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ error: 'Credenciales inválidas' });
    // No enviar password al frontend
    const { password: _, ...userData } = user;
    req.session.user = userData;
    res.json(userData);
  } catch {
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

// Logout
app.post('/logout', (req, res) => {
  req.session.destroy();
  res.json({ mensaje: 'Sesión cerrada' });
});

// Ver productos (usuarios autenticados) con información completa
app.get('/productos', requireLogin, async (req, res) => {
  try {
    const result = await query(`
      SELECT 
        p.*,
        c.nombre as categoria_nombre,
        s.nombre as subcategoria_nombre,
        m.nombre as marca_nombre
      FROM productos p
      LEFT JOIN categorias c ON p.categoria_id = c.id
      LEFT JOIN subcategorias s ON p.subcategoria_id = s.id  
      LEFT JOIN marcas m ON p.marca_id = m.id
      ORDER BY p.id DESC
    `);
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener productos:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

app.post('/productos', requireLogin, requireAdmin, async (req, res) => {
  const { nombre, descripcion, foto, precio, categoria_id, subcategoria_id, marca_id } = req.body;
  console.log('🚀 Creando producto:', {
    nombre,
    descripcion: descripcion?.substring(0, 50) + '...',
    foto: foto?.substring(0, 50) + '...',
    precio,
    categoria_id,
    subcategoria_id,
    marca_id
  });
  
  try {
    const result = await query(
      `INSERT INTO productos (nombre, descripcion, foto, precio, categoria_id, subcategoria_id, marca_id)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id`,
      [nombre, descripcion, foto, precio, categoria_id, subcategoria_id, marca_id]
    );
    
    console.log('✅ Producto creado con ID:', result.rows[0].id);
    
    // Obtener información completa del producto para la notificación
    const productWithInfo = await query(`
      SELECT 
        p.*,
        c.nombre as categoria_nombre,
        s.nombre as subcategoria_nombre,
        m.nombre as marca_nombre
      FROM productos p
      LEFT JOIN categorias c ON p.categoria_id = c.id
      LEFT JOIN subcategorias s ON p.subcategoria_id = s.id  
      LEFT JOIN marcas m ON p.marca_id = m.id
      WHERE p.id = $1
    `, [result.rows[0].id]);
    
    console.log('📋 Información completa del producto:', productWithInfo.rows[0]);
    
    res.json({ 
      mensaje: 'Producto creado',
      id: result.rows[0].id,
      product: productWithInfo.rows[0] // Enviamos la información completa
    });
  } catch (error) {
    console.error('❌ Error al crear producto:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
});
app.put('/productos/:id', requireLogin, requireAdmin, async (req, res) => {
  const { nombre, descripcion, foto, precio, categoria_id, subcategoria_id, marca_id } = req.body;
  await query(
    `UPDATE productos SET nombre=$1, descripcion=$2, foto=$3, precio=$4, categoria_id=$5, subcategoria_id=$6, marca_id=$7 WHERE id=$8`,
    [nombre, descripcion, foto, precio, categoria_id, subcategoria_id, marca_id, req.params.id]
  );
  res.json({ mensaje: 'Producto actualizado' });
});
app.delete('/productos/:id', requireLogin, requireAdmin, async (req, res) => {
  await query('DELETE FROM productos WHERE id=$1', [req.params.id]);
  res.json({ mensaje: 'Producto eliminado' });
});

// Gestión de usuarios (solo admin)
app.get('/usuarios', requireLogin, requireAdmin, async (req, res) => {
  const result = await query(`
    SELECT u.id, u.nombre, u.email, u.picture, u.role_id, r.nombre as nombre_rol
    FROM usuarios u
    JOIN roles r ON u.role_id = r.id
    ORDER BY u.id
  `);
  res.json(result.rows);
});

app.put('/usuarios/:id/rol', requireLogin, requireAdmin, async (req, res) => {
  const { role_id } = req.body;
  if (!role_id || (role_id !== 1 && role_id !== 2)) {
    return res.status(400).json({ error: 'role_id debe ser 1 (admin) o 2 (user)' });
  }
  await query('UPDATE usuarios SET role_id=$1 WHERE id=$2', [role_id, req.params.id]);
  res.json({ mensaje: 'Rol actualizado' });
});

app.post('/usuarios/admin', requireLogin, requireAdmin, async (req, res) => {
  const { nombre, email, password, picture } = req.body;
  if (!nombre || !email || !password) return res.status(400).json({ error: 'Faltan datos' });
  try {
    const hashed = await bcrypt.hash(password, 10);
    const result = await query(
      'INSERT INTO usuarios (nombre, email, password, picture, role_id) VALUES ($1, $2, $3, $4, $5) RETURNING id, nombre, email, picture',
      [nombre, email, hashed, picture || '/images/user.png', 1] // rol 1 = admin
    );
    res.json(result.rows[0]);
  } catch (e) {
    console.log('Error en /usuarios/admin:', e);
    if (e.code === '23505') return res.status(409).json({ error: 'Email ya registrado' });
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor backend en puerto ${PORT}`));


// ENDPOINTS PARA CATEGORÍAS, SUBCATEGORÍAS Y MARCAS

// Endpoint público para categorías (para el navbar)
app.get('/categorias/public', async (req, res) => {
  try {
    const result = await query('SELECT * FROM categorias ORDER BY nombre');
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener categorías públicas:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

// CRUD CATEGORÍAS (requiere admin)
app.get('/categorias', requireLogin, requireAdmin, async (req, res) => {
  try {
    const result = await query('SELECT * FROM categorias ORDER BY nombre');
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener categorías:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
});
app.post('/categorias', requireLogin, requireAdmin, async (req, res) => {
  const { nombre, descripcion } = req.body;
  if (!nombre) return res.status(400).json({ error: 'El nombre es obligatorio' });
  try {
    await query('INSERT INTO categorias (nombre, descripcion) VALUES ($1, $2)', [nombre, descripcion || null]);
    res.json({ mensaje: 'Categoría creada' });
  } catch (e) {
    if (e.code === '23505') return res.status(409).json({ error: 'Ya existe una categoría con ese nombre' });
    res.status(500).json({ error: 'Error al crear categoría' });
  }
});
app.put('/categorias/:id', requireLogin, requireAdmin, async (req, res) => {
  const { nombre, descripcion } = req.body;
  if (!nombre) return res.status(400).json({ error: 'El nombre es obligatorio' });
  try {
    await query('UPDATE categorias SET nombre=$1, descripcion=$2 WHERE id=$3', [nombre, descripcion || null, req.params.id]);
    res.json({ mensaje: 'Categoría actualizada' });
  } catch (e) {
    if (e.code === '23505') return res.status(409).json({ error: 'Ya existe una categoría con ese nombre' });
    res.status(500).json({ error: 'Error al actualizar categoría' });
  }
});
app.delete('/categorias/:id', requireLogin, requireAdmin, async (req, res) => {
  // Verificar subcategorías asociadas
  const subcats = await query('SELECT id FROM subcategorias WHERE categoria_id=$1', [req.params.id]);
  if (subcats.rows.length > 0) {
    // Eliminar subcategorías asociadas
    await query('DELETE FROM subcategorias WHERE categoria_id=$1', [req.params.id]);
  }
  await query('DELETE FROM categorias WHERE id=$1', [req.params.id]);
  res.json({ mensaje: `Categoría y ${subcats.rows.length} subcategorías eliminadas` });
});


// Endpoint público para subcategorías (para el navbar y notificaciones)
app.get('/subcategorias/public', async (req, res) => {
  try {
    const { categoria_id } = req.query;
    let sql = 'SELECT * FROM subcategorias';
    let params = [];
    if (categoria_id) {
      sql += ' WHERE categoria_id = $1';
      params = [categoria_id];
    }
    sql += ' ORDER BY nombre';
    const result = await query(sql, params);
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener subcategorías públicas:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

// CRUD SUBCATEGORÍAS (requiere admin)
app.get('/subcategorias', requireLogin, requireAdmin, async (req, res) => {
  try {
    const { categoria_id } = req.query;
    let sql = 'SELECT * FROM subcategorias';
    let params = [];
    if (categoria_id) {
      sql += ' WHERE categoria_id = $1';
      params = [categoria_id];
    }
    sql += ' ORDER BY nombre';
    const result = await query(sql, params);
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener subcategorías:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
});
app.post('/subcategorias', requireLogin, requireAdmin, async (req, res) => {
  const { nombre, descripcion, categoria_id } = req.body;
  if (!nombre || !categoria_id) return res.status(400).json({ error: 'Nombre y categoría son obligatorios' });
  try {
    await query('INSERT INTO subcategorias (nombre, descripcion, categoria_id) VALUES ($1, $2, $3)', [nombre, descripcion || null, categoria_id]);
    res.json({ mensaje: 'Subcategoría creada' });
  } catch (e) {
    res.status(500).json({ error: 'Error al crear subcategoría' });
  }
});
app.put('/subcategorias/:id', requireLogin, requireAdmin, async (req, res) => {
  const { nombre, descripcion, categoria_id } = req.body;
  if (!nombre || !categoria_id) return res.status(400).json({ error: 'Nombre y categoría son obligatorios' });
  try {
    await query('UPDATE subcategorias SET nombre=$1, descripcion=$2, categoria_id=$3 WHERE id=$4', [nombre, descripcion || null, categoria_id, req.params.id]);
    res.json({ mensaje: 'Subcategoría actualizada' });
  } catch (e) {
    res.status(500).json({ error: 'Error al actualizar subcategoría' });
  }
});
app.delete('/subcategorias/:id', requireLogin, requireAdmin, async (req, res) => {
  // Verificar productos asociados
  const prods = await query('SELECT id FROM productos WHERE subcategoria_id=$1', [req.params.id]);
  if (prods.rows.length > 0) {
    // Quitar subcategoria_id de productos asociados
    await query('UPDATE productos SET subcategoria_id=NULL WHERE subcategoria_id=$1', [req.params.id]);
  }
  await query('DELETE FROM subcategorias WHERE id=$1', [req.params.id]);
  res.json({ mensaje: `Subcategoría eliminada. ${prods.rows.length} productos quedaron sin subcategoría.` });
});


// CRUD MARCAS
app.get('/marcas', requireLogin, requireAdmin, async (req, res) => {
  const result = await query('SELECT * FROM marcas ORDER BY nombre');
  res.json(result.rows);
});
app.post('/marcas', requireLogin, requireAdmin, async (req, res) => {
  const { nombre, logo } = req.body;
  if (!nombre) return res.status(400).json({ error: 'El nombre es obligatorio' });
  try {
    await query('INSERT INTO marcas (nombre, logo) VALUES ($1, $2)', [nombre, logo || null]);
    res.json({ mensaje: 'Marca creada' });
  } catch (e) {
    if (e.code === '23505') return res.status(409).json({ error: 'Ya existe una marca con ese nombre' });
    res.status(500).json({ error: 'Error al crear marca' });
  }
});
app.put('/marcas/:id', requireLogin, requireAdmin, async (req, res) => {
  const { nombre, logo } = req.body;
  if (!nombre) return res.status(400).json({ error: 'El nombre es obligatorio' });
  try {
    await query('UPDATE marcas SET nombre=$1, logo=$2 WHERE id=$3', [nombre, logo || null, req.params.id]);
    res.json({ mensaje: 'Marca actualizada' });
  } catch (e) {
    if (e.code === '23505') return res.status(409).json({ error: 'Ya existe una marca con ese nombre' });
    res.status(500).json({ error: 'Error al actualizar marca' });
  }
});
app.delete('/marcas/:id', requireLogin, requireAdmin, async (req, res) => {
  // Verificar productos asociados
  const prods = await query('SELECT id FROM productos WHERE marca_id=$1', [req.params.id]);
  if (prods.rows.length > 0) {
    // Quitar marca_id de productos asociados
    await query('UPDATE productos SET marca_id=NULL WHERE marca_id=$1', [req.params.id]);
  }
  await query('DELETE FROM marcas WHERE id=$1', [req.params.id]);
  res.json({ mensaje: `Marca eliminada. ${prods.rows.length} productos quedaron sin marca.` });
});
