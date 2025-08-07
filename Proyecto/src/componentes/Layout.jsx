import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { googleLogout } from '@react-oauth/google';
import Header from './Header';
import Nav from './Nav';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

function Layout({ user, onLogout }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleLogout = () => {
    googleLogout();  // Cierra sesión en Google
    onLogout();      // Limpia estado global
    navigate('/login');
  };

  return (
    <div className="sticky-wrapper">
      <Header user={user} onLogout={handleLogout} />
      <Nav user={user} />
      <main>
        <Outlet context={{ user }} />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
