// backend/auth.js
export function requireLogin(req, res, next) {
  if (!req.session || !req.session.user) {
    return res.status(401).json({ error: 'No autenticado' });
  }
  req.user = req.session.user;
  next();
}

export function requireAdmin(req, res, next) {
  if (req.user && req.user.nombre_rol === 'admin') {
    return next();
  }
  return res.status(403).json({ error: 'Solo el administrador puede hacer esto' });
}