import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';


import Header from './componentes/Header.jsx';
import Nav from './componentes/Nav.jsx';
import Footer from './componentes/Footer.jsx';
import Home from './Home.jsx';
import Login from './login.jsx';
import Register from './register.jsx';
import Productos from './paginas/productos.jsx';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('googleUser');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch {
        localStorage.removeItem('googleUser');
      }
    }
  }, []);

  const handleUserChange = (userData) => {
    setUser(userData);
    if (userData) {
      localStorage.setItem('googleUser', JSON.stringify(userData));
    } else {
      localStorage.removeItem('googleUser');
    }
  };

  return (
    <Router>
      <Header user={user} onLogout={() => handleUserChange(null)} />
      <Nav />


      <Routes>
        <Route path="/" element={<Home user={user} />} />
        <Route path="/login" element={<Login onUserChange={handleUserChange} />} />
        <Route path="/register" element={<Register onUserChange={handleUserChange} />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="*" element={<Home user={user} />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
