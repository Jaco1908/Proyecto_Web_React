import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/plantilla/Nav.css';

const Nav = () => {
  const categories = [
    {
      name: "ACCESORIOS",
      link: "/accesorios",
      subcategories: [
        {
          title: "ACCESORIO",
          items: [{name: "MOCHILA", link: "/accesorios/mochila"}]
        },
        {
          title: "AURICULAR",
          items: [
            {name: "AUX", link: "/accesorios/auricular/aux"},
            {name: "BLUETOOTH", link: "/accesorios/auricular/bluetooth"},
            {name: "USB", link: "/accesorios/auricular/usb"}
          ]
        },
        {
          title: "MOTO A BATERÍA",
          items: [{name: "RECARGABLE", link: "/accesorios/moto-recargable"}]
        },
        {
          title: "GRABADORA",
          items: [{name: "EXTERNO", link: "/accesorios/grabadora-externo"}]
        }
      ]
    },
    {
      name: "ALMACENAMIENTO",
      link: "/almacenamiento",
      subcategories: [
        {
          title: "SMARTWATCH",
          items: [{name: "MÓVIL", link: "/almacenamiento/smartwatch-movil"}]
        },
        {
          title: "PARLANTE",
          items: [
            {name: "AUX", link: "/almacenamiento/parlante-aux"},
            {name: "PORTÁTIL", link: "/almacenamiento/parlante-portatil"}
          ]
        }
      ]
    },
    {
      name: "CONECTIVIDAD",
      link: "/conectividad",
      subcategories: [
        {
          title: "MICRÓFONO",
          items: [{name: "USB", link: "/conectividad/microfono-usb"}]
        },
        {
          title: "CÁMARA",
          items: [{name: "USB", link: "/conectividad/camara-usb"}]
        },
        {
          title: "ADAPTADOR",
          items: [
            {name: "HDMI", link: "/conectividad/adaptador-hdmi"},
            {name: "VGA", link: "/conectividad/adaptador-vga"}
          ]
        },
        {
          title: "COMBO",
          items: [{name: "TECLADO", link: "/conectividad/combo-teclado"}]
        }
      ]
    },
    {
      name: "CONSOLA",
      link: "/consola",
      subcategories: [
        {
          title: "STREAMING",
          items: [{name: "CHROMECAST", link: "/consola/chromecast"}]
        },
        {
          title: "PISCINA",
          items: [
            {name: "CIRCULAR", link: "/consola/piscina-circular"},
            {name: "DESMONTABLE", link: "/consola/piscina-desmontable"}
          ]
        }
      ]
    },
    {
      name: "COMPUTACIÓN",
      link: "/computacion",
      subcategories: [
        {
          title: "ENCLOSURE",
          items: [{name: "USB", link: "/computacion/enclosure-usb"}]
        },
        {
          title: "EXTENSOR",
          items: [{name: "HUB", link: "/computacion/extensor-hub"}]
        },
        {
          title: "CANDADO",
          items: [{name: "PORTÁTIL", link: "/computacion/candado-portatil"}]
        },
        {
          title: "MOUSE",
          items: [
            {name: "USB", link: "/computacion/mouse-usb"},
            {name: "WIRELESS", link: "/computacion/mouse-wireless"}
          ]
        }
      ]
    },
    {
      name: "ELECTRODOMÉSTICOS",
      link: "/electrodomesticos",
      subcategories: [
        {
          title: "CABLE",
          items: [{name: "USB", link: "/electrodomesticos/cable-usb"}]
        },
        {
          title: "PANEL",
          items: [{name: "SOLAR", link: "/electrodomesticos/panel-solar"}]
        }
      ]
    },
    {
      name: "MÓVIL",
      link: "/movil",
      subcategories: [
        {
          title: "SOPORTE",
          items: [
            {name: "MONITOR", link: "/movil/soporte-monitor"},
            {name: "TELEVISOR", link: "/movil/soporte-televisor"}
          ]
        },
        {
          title: "CARRO A BATERÍA",
          items: [{name: "RECARGABLE", link: "/movil/carro-recargable"}]
        },
        {
          title: "FOCOS",
          items: [{name: "LED", link: "/movil/focos-led"}]
        },
        {
          title: "TECLADO",
          items: [
            {name: "USB", link: "/movil/teclado-usb"},
            {name: "WIRELESS", link: "/movil/teclado-wireless"}
          ]
        }
      ]
    }
  ];

  // Leer usuario de localStorage
  let user = null;
  try {
    user = JSON.parse(localStorage.getItem('user'));
  } catch {}

  return (
    <nav>
      {categories.map((category, index) => (
        <div className={`nav-container ${index >= categories.length - 3 ? 'dropdown-right' : ''}`} key={index}>
          <Link to={category.link} className="has-dropdown">{category.name}</Link>
          <div className="dropdown-menu">
            <div className="dropdown-content">
              {category.subcategories.map((subcat, subIndex) => (
                <div className="dropdown-column" key={subIndex}>
                  <div className="category-title">{subcat.title}</div>
                  {subcat.items.map((item, itemIndex) => (
                    <Link to={item.link} className="dropdown-link" key={itemIndex}>{item.name}</Link>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
      <Link to="/catalogo" className="catalogo">CATÁLOGO</Link>
      {/* Solo usuarios autenticados pueden ver Productos */}
      {user && <Link to="/productos" className="catalogo">PRODUCTOS</Link>}
    </nav>
  );
};

export default Nav;