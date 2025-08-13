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
      'INSERT INTO usuarios (nombre, email, password, picture) VALUES ($1, $2, $3, $4) RETURNING id, nombre, email, picture',
      [nombre, email, hashed, picture || '/images/user.png']
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

// Ver productos (usuarios autenticados)
app.get('/productos', requireLogin, async (req, res) => {
  const result = await query('SELECT * FROM productos');
  res.json(result.rows);
});
app.post('/productos', requireLogin, requireAdmin, async (req, res) => {
  const { nombre, descripcion, foto, precio } = req.body;
  await query(
    'INSERT INTO productos (nombre, descripcion, foto, precio) VALUES ($1, $2, $3, $4)',
    [nombre, descripcion, foto, precio]
  );
  res.json({ mensaje: 'Producto creado' });
});
app.put('/productos/:id', requireLogin, requireAdmin, async (req, res) => {
  const { nombre, descripcion, foto, precio } = req.body;
  await query(
    'UPDATE productos SET nombre=$1, descripcion=$2, foto=$3, precio=$4 WHERE id=$5',
    [nombre, descripcion, foto, precio, req.params.id]
  );
  res.json({ mensaje: 'Producto actualizado' });
});
app.delete('/productos/:id', requireLogin, requireAdmin, async (req, res) => {
  await query('DELETE FROM productos WHERE id=$1', [req.params.id]);
  res.json({ mensaje: 'Producto eliminado' });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Servidor backend en puerto ${PORT}`));
