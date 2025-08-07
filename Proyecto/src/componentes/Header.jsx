import { Link } from 'react-router-dom'; // Asegúrate de importar Link si lo usas
import '../assets/css/plantilla/header.css';

function Header({ user, onLogout }) {
  return (
    <header>
      <div className="header-left">
        <img src="/images/Logo.png" alt="Logo de InnovaSys" />
      </div>
      <div className="header-center">
        <h1>INNOVASYS</h1>
      </div>
      <div className="header-right">
        {user ? (
          <div className="user-profile">
            <img
              src={user.picture || "/images/user.png"}
              alt="Usuario"
              className="user-avatar"
            />
            <div className="user-info">
              <span className="user-name">{user.name}</span>
              <button className="logout-btn" onClick={onLogout}>Cerrar sesión</button>
            </div>
          </div>
        ) : (
          <>
            <Link to="/login" className="login-btn">
              <img src="/images/user.png" alt="Usuario" />
              <span>Iniciar Sesión</span>
            </Link>
            <Link to="/register" className="login-btn">
              <img src="/images/user.png" alt="Usuario" />
              <span>Regístrate</span>
            </Link>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
