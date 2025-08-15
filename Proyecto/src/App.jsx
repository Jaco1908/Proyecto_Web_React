import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';

import Header from './componentes/Header.jsx';
import Nav from './componentes/Nav.jsx';
import Footer from './componentes/Footer.jsx';
import Home from './Home.jsx';
import Login from './login.jsx';
import Register from './register.jsx';
import AdministrarProductos from './paginas/productos.jsx';
import PanelAdmin from './paginas/PanelAdmin.jsx';
import Usuarios from './paginas/usuarios.jsx';

// Páginas principales de categorías
import Accesorios from './paginas/accesorios.jsx';
import Almacenamiento from './paginas/almacenamiento.jsx';
import Conectividad from './paginas/conectividad.jsx';
import Consola from './paginas/consola.jsx';
import Computacion from './paginas/computacion.jsx';
import Electrodomesticos from './paginas/electrodomesticos.jsx';
import Movil from './paginas/movil.jsx';
import Catalogo from './paginas/catalogo.jsx';

// Páginas de subcategorías
import Mochila from './paginas/subcategorias/Mochila.jsx';
import AuricularesGenerico from './paginas/subcategorias/AuricularesGenerico.jsx';
import SubcategoriaGenerica from './paginas/SubcategoriaGenerica.jsx';

// Carrito de compras
import Carrito from './paginas/Carrito.jsx';
import Checkout from './paginas/Checkout.jsx';
import CheckoutConfirmacion from './paginas/CheckoutConfirmacion.jsx';
import { CartProvider } from './context/CartContext.jsx';
import { useToast } from './componentes/ToastNotification.jsx';

function App() {
  const [user, setUser] = useState(null);
  const { ToastContainer } = useToast();

  useEffect(() => {
    // Buscar usuario en localStorage (compatibilidad con Google)
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch {
        localStorage.removeItem('user');
      }
    }
  }, []);

  const handleUserChange = (userData) => {
    setUser(userData);
    if (userData) {
      localStorage.setItem('user', JSON.stringify(userData));
    } else {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    }
  };

  return (
    <GoogleOAuthProvider clientId="141507994341-b9ui76hmevjib897dm05b777i6clnqo9.apps.googleusercontent.com">
      <CartProvider>
        <Router>
          <Header user={user} onLogout={() => handleUserChange(null)} />
          <Nav />

        <Routes>
          <Route path="/" element={<Home user={user} />} />
          <Route path="/login" element={<Login onUserChange={handleUserChange} />} />
          <Route path="/register" element={<Register onUserChange={handleUserChange} />} />
          <Route path="/admin" element={<PanelAdmin />} />
          <Route path="/usuarios" element={<Usuarios />} />
          
          {/* Rutas del carrito de compras */}
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/checkout/confirmacion" element={<CheckoutConfirmacion />} />
          
          {/* Rutas principales de categorías */}
          <Route path="/accesorios" element={<Accesorios />} />
          <Route path="/almacenamiento" element={<Almacenamiento />} />
          <Route path="/conectividad" element={<Conectividad />} />
          <Route path="/consola" element={<Consola />} />
          <Route path="/computacion" element={<Computacion />} />
          <Route path="/electrodomesticos" element={<Electrodomesticos />} />
          <Route path="/movil" element={<Movil />} />
          <Route path="/catalogo" element={<Catalogo />} />
          
          {/* Rutas específicas para subcategorías de accesorios */}
          <Route path="/accesorios/mochila" element={<Mochila />} />
          <Route path="/accesorios/auricular/:tipo" element={<AuricularesGenerico />} />
          <Route path="/accesorios/filtro/:marca" element={<SubcategoriaGenerica />} />
          <Route path="/accesorios/:subcategoria" element={<SubcategoriaGenerica />} />
          
          {/* Rutas para subcategorías de almacenamiento */}
          <Route path="/almacenamiento/:subcategoria" element={<SubcategoriaGenerica />} />
          
          {/* Rutas para subcategorías de conectividad */}
          <Route path="/conectividad/:subcategoria" element={<SubcategoriaGenerica />} />
          <Route path="/conectividad/adaptador-:tipo" element={<SubcategoriaGenerica />} />
          
          {/* Rutas para subcategorías de consola */}
          <Route path="/consola/:subcategoria" element={<SubcategoriaGenerica />} />
          <Route path="/consola/piscina-:tipo" element={<SubcategoriaGenerica />} />
          
          {/* Rutas para subcategorías de computación */}
          <Route path="/computacion/:subcategoria" element={<SubcategoriaGenerica />} />
          <Route path="/computacion/mouse-:tipo" element={<SubcategoriaGenerica />} />
          
          {/* Rutas para subcategorías de electrodomésticos */}
          <Route path="/electrodomesticos/:subcategoria" element={<SubcategoriaGenerica />} />
          
          {/* Rutas para subcategorías de móvil */}
          <Route path="/movil/:subcategoria" element={<SubcategoriaGenerica />} />
          <Route path="/movil/soporte-:tipo" element={<SubcategoriaGenerica />} />
          <Route path="/movil/teclado-:tipo" element={<SubcategoriaGenerica />} />
          
          <Route path="*" element={<Home user={user} />} />
        </Routes>

        <Footer />
        
        {/* Contenedor de notificaciones */}
        <ToastContainer />
      </Router>
    </CartProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
