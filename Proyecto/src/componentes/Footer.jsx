import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/plantilla/Footer.css';
function Footer() {
  return (
    <footer>
      <div className="footer-container">
        <div className="footer-section logo-section">
          <img src="/images/Logo2.png" alt="Logo de InnovaSys" className="footer-logo" />
          <p className="footer-description">
            InnovaSys es una tienda de productos electrónicos que lleva 12 años trabajando en el sector mayorista.
          </p>
        </div>

        <div className="footer-section location-section">
          <h3 className="footer-title">📍 Ubicación</h3>
          <div className="location-info">
            <p className="location-name"><strong>Sede Quito</strong></p>
            <p className="location-address">Av. Gral. Rumiñahui S/N, Sangolquí 171103</p>
            <p className="location-phone">📞 (04) 373-2131</p>
          </div>
        </div>

        <div className="footer-section social-section">
          <h3 className="footer-title">Redes Sociales</h3>
          <div className="social-icons">
            <a href="#" className="social-link"><img src="/images/Redes/facebook.png" alt="Facebook" /></a>
            <a href="#" className="social-link"><img src="/images/Redes/instagram.png" alt="Instagram" /></a>
            <a href="#" className="social-link"><img src="/images/Redes/whatsapp.png" alt="WhatsApp" /></a>
          </div>
        </div>
      </div>
      <div className="footer-copyright">
        <p>&copy; {new Date().getFullYear()} InnovaSys - Todos los derechos reservados</p>
      </div>
    </footer>
  )
}

export default Footer