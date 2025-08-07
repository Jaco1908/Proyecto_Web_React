import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { pool } from './db.js';
import bcrypt from 'bcryptjs';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Registro
app.post('/api/register', async (req, res) => {
  const { nombre, email, password, picture } = req.body;
  if (!nombre || !email || !password) return res.status(400).json({ error: 'Faltan datos' });
  try {
    const hashed = await bcrypt.hash(password, 10);
    const result = await pool.query(
      'INSERT INTO usuarios (nombre, email, password, picture) VALUES ($1, $2, $3, $4) RETURNING id, nombre, email, picture',
      [nombre, email, hashed, picture || '/images/user.png']
    );
    res.json(result.rows[0]);
  } catch (e) {
    if (e.code === '23505') return res.status(409).json({ error: 'Email ya registrado' });
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

// Login
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Faltan datos' });
  try {
    const result = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);
    if (!result.rows.length) return res.status(401).json({ error: 'Credenciales inválidas' });
    const user = result.rows[0];
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ error: 'Credenciales inválidas' });
    // No enviar password al frontend
    const { password: _, ...userData } = user;
    res.json(userData);
  } catch {
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Servidor backend en puerto ${PORT}`));
