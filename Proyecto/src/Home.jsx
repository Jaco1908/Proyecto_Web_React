import React from 'react';
import { Link } from 'react-router-dom';
import NewProductsSection from './componentes/NewProductsSection.jsx';
import './assets/css/index.css';

const Home = () => {
  return (
    <main>
      {/* ===================== CARRUSEL HERO ===================== */}
      <div className="hero-carousel">
        <input type="radio" name="hero-slide" id="hero-slide1" defaultChecked />
        <input type="radio" name="hero-slide" id="hero-slide2" />
        <input type="radio" name="hero-slide" id="hero-slide3" />

        <div className="hero-slides">
          <div className="hero-slide slide-1">
            <div className="hero-content">
              <h2>Tecnología de Vanguardia</h2>
              <p>Descubre los últimos gadgets electrónicos</p>
              <div className="hero-buttons">
                <Link to="#ofertas" className="btn btn-primary">Ver Ofertas</Link>
                <Link to="#productos" className="btn btn-secondary">Todos los Productos</Link>
              </div>
            </div>
          </div>

          <div className="hero-slide slide-2">
            <div className="hero-content">
              <h2>Equipo Gaming Profesional</h2>
              <p>Lo mejor para jugadores exigentes</p>
              <div className="hero-buttons">
                <Link to="#gaming" className="btn btn-primary">Catálogo Gaming</Link>
                <Link to="#especificaciones" className="btn btn-secondary">Especificaciones</Link>
              </div>
            </div>
          </div>

          <div className="hero-slide slide-3">
            <div className="hero-content">
              <h2>Smart Home Solutions</h2>
              <p>Automatiza tu hogar con nuestra tecnología</p>
              <div className="hero-buttons">
                <Link to="#smart-home" className="btn btn-primary">Ver Soluciones</Link>
                <Link to="#demo" className="btn btn-secondary">Solicitar Demo</Link>
              </div>
            </div>
          </div>
        </div>

        <div className="hero-controls">
          <label htmlFor="hero-slide3" className="hero-prev">‹</label>
          <label htmlFor="hero-slide2" className="hero-prev">‹</label>
          <label htmlFor="hero-slide1" className="hero-prev">‹</label>

          <label htmlFor="hero-slide2" className="hero-next">›</label>
          <label htmlFor="hero-slide3" className="hero-next">›</label>
        </div>

        <div className="hero-indicators">
          <label htmlFor="hero-slide1" className="hero-indicator"></label>
          <label htmlFor="hero-slide2" className="hero-indicator"></label>
          <label htmlFor="hero-slide3" className="hero-indicator"></label>
        </div>
      </div>

      {/* ===================== SECCIÓN NUEVO STOCK ===================== */}
      <NewProductsSection />

      {/* ===================== SECCIÓN DE PRODUCTOS ===================== */}
      <section className="seccion-productos">
        <input type="radio" name="categoria" id="destacado-radio" defaultChecked className="hidden-radio" />
        <input type="radio" name="categoria" id="promocion-radio" className="hidden-radio" />
        <input type="radio" name="categoria" id="nuevo-radio" className="hidden-radio" />

        <div className="botones-categorias">
          <label htmlFor="destacado-radio" className="categoria-btn">DESTACADO</label>
          <label htmlFor="promocion-radio" className="categoria-btn">PROMOCIÓN</label>
          <label htmlFor="nuevo-radio" className="categoria-btn">NUEVO</label>
        </div>

        {/* ----------- DESTACADOS ----------- */}
        <div className="carrusel-productos" id="destacado-carrusel">
          <div className="carousel-container">
            <div className="carousel">
              <input type="radio" name="destacado-slide" id="destacado-slide1" defaultChecked />
              <input type="radio" name="destacado-slide" id="destacado-slide2" />

              <div className="carousel-content">
                {/* Slide 1 */}
                <div className="slide">
                  <div className="producto">
                    <img src="/images/Destacado/Proyector.jpeg" alt="Proyector Epson" />
                    <h4>PROYECTOR EPSON PORTÁTIL EPIQ V15IBHS FLEX 3LCD WXGA 3000 LÚMENES</h4>
                    <p><Link to="/producto/1">Haga clic para ver el precio</Link></p>
                    <Link to="/producto/1" className="boton-detalle">Ver detalles</Link>
                  </div>
                  <div className="producto">
                    <img src="/images/Destacado/Audio.jpg" alt="Audio Xiaomi" />
                    <h4>AUDIO XIAOMI/REDMI BUDS 6 PLAY ANUL. RUIDO /36 H.</h4>
                    <p><Link to="/producto/2">Haga clic para ver el precio</Link></p>
                    <Link to="/producto/2" className="boton-detalle">Ver detalles</Link>
                  </div>
                  <div className="producto">
                    <img src="/images/Destacado/computadorLev.jpg" alt="Computador Lenovo" />
                    <h4>COMPUTADOR/LENOVO PORTATIL IDEAPAD SLIM 3 15IAH8</h4>
                    <p><Link to="/producto/3">Haga clic para ver el precio</Link></p>
                    <Link to="/producto/3" className="boton-detalle">Ver detalles</Link>
                  </div>
                  <div className="producto">
                    <img src="/images/Destacado/Cabezal.jpg" alt="Cabezal HP" />
                    <h4>CABEZAL HPINC 3YP86A NEGRO/TRICOLOR GT INK TANK 5810</h4>
                    <p><Link to="/producto/4">Haga clic para ver el precio</Link></p>
                    <Link to="/producto/4" className="boton-detalle">Ver detalles</Link>
                  </div>
                </div>

                {/* Slide 2 */}
                <div className="slide">
                  <div className="producto">
                    <img src="/images/Destacado/MonitorAsus.jpg" alt="Monitor Asus" />
                    <h4>MONITOR ASUS/VA259HGA EYE CARE GAMING 24.5 PULG PLANO / IPS</h4>
                    <p><Link to="/producto/5">Haga clic para ver el precio</Link></p>
                    <Link to="/producto/5" className="boton-detalle">Ver detalles</Link>
                  </div>
                  <div className="producto">
                    <img src="/images/Destacado/Impresora1.jpg" alt="Impresora Epson" />
                    <h4>IMPRESORA EPSON L5590 MULTIFUNCION/WIFI/ETHERNET/INALAMBRICA</h4>
                    <p><Link to="/producto/6">Haga clic para ver el precio</Link></p>
                    <Link to="/producto/6" className="boton-detalle">Ver detalles</Link>
                  </div>
                  <div className="producto">
                    <img src="/images/Destacado/Silla.jpg" alt="Silla Apex" />
                    <h4>SILLA APEX/GAMER-CON REPOSAPIES MULTIFUNCION NEGRO/ROJO</h4>
                    <p><Link to="/producto/7">Haga clic para ver el precio</Link></p>
                    <Link to="/producto/7" className="boton-detalle">Ver detalles</Link>
                  </div>
                  <div className="producto">
                    <img src="/images/Destacado/Camara ip.jpg" alt="Cámara IP" />
                    <h4>CAMARA IP TP-LINK TAPO C310 EXTERIOR/3 MP/VISION NOCTURNA/</h4>
                    <p><Link to="/producto/8">Haga clic para ver el precio</Link></p>
                    <Link to="/producto/8" className="boton-detalle">Ver detalles</Link>
                  </div>
                </div>
              </div>

              <label htmlFor="destacado-slide1" className="arrow arrow-left">‹</label>
              <label htmlFor="destacado-slide2" className="arrow arrow-right">›</label>

              <div className="indicators">
                <label htmlFor="destacado-slide1" className="indicator"></label>
                <label htmlFor="destacado-slide2" className="indicator"></label>
              </div>
            </div>
          </div>
        </div>

        {/* ----------- PROMOCIONES ----------- */}
        <div className="carrusel-productos" id="promocion-carrusel">
          <div className="carousel-container">
            <div className="carousel">
              <input type="radio" name="promocion-slide" id="promocion-slide1" defaultChecked />
              <input type="radio" name="promocion-slide" id="promocion-slide2" />

              <div className="carousel-content">
                {/* Slide 1 */}
                <div className="slide">
                  <div className="producto">
                    <img src="/images/Prom/camara.jpg" alt="Cámara EZVIZ" />
                    <h4>CAMARA EZVIZ EB8 4G 2K BIDIRECIONAL PANORAMICA</h4>
                    <p className="precio-promo">$39.99 <span className="precio-original">$59.99</span></p>
                    <Link to="/producto/9" className="boton-detalle">Ver detalles</Link>
                  </div>
                  <div className="producto">
                    <img src="/images/Prom/Mochila.jpg" alt="Mochila Speedmind" />
                    <h4>MOCHILA SPEEDMIND SMMOL04 HASTA 15.6 COLOR GRIS</h4>
                    <p className="precio-promo">$19.99 <span className="precio-original">$29.99</span></p>
                    <Link to="/producto/10" className="boton-detalle">Ver detalles</Link>
                  </div>
                  <div className="producto">
                    <img src="/images/Prom/impresoraepson.jpg" alt="Impresora Epson" />
                    <h4>IMPRESORA EPSON TM-T20III-01 USB+SERIAL/CONTADOR</h4>
                    <p className="precio-promo">$49.99 <span className="precio-original">$79.99</span></p>
                    <Link to="/producto/11" className="boton-detalle">Ver detalles</Link>
                  </div>
                  <div className="producto">
                    <img src="/images/Prom/Mouses.jpg" alt="Mouse Pad" />
                    <h4>MOUSE PAD SPEEDMIND MPG01NE COLOR NEGRO</h4>
                    <p className="precio-promo">$29.99 <span className="precio-original">$49.99</span></p>
                    <Link to="/producto/12" className="boton-detalle">Ver detalles</Link>
                  </div>
                </div>

                {/* Slide 2 */}
                <div className="slide">
                  <div className="producto">
                    <img src="/images/Prom/TelevisorLG.jpg" alt="Televisor LG" />
                    <h4>TELEVISOR LG 86UT8050PSB 86 PULGADAS SMARTTV 4K UHD</h4>
                    <p className="precio-promo">$59.99 <span className="precio-original">$89.99</span></p>
                    <Link to="/producto/13" className="boton-detalle">Ver detalles</Link>
                  </div>
                  <div className="producto">
                    <img src="/images/Prom/impresoraid.jpg" alt="Impresora Zebra" />
                    <h4>IMPRESORA ID ZEBRA ZC300 DUAL SIDED, USB Y RED</h4>
                    <p className="precio-promo">$69.99 <span className="precio-original">$99.99</span></p>
                    <Link to="/producto/14" className="boton-detalle">Ver detalles</Link>
                  </div>
                  <div className="producto">
                    <img src="/images/Prom/camaraezvi.jpg" alt="Cámara EZVIZ" />
                    <h4>CAMARA EZVIZ EB5 4K BAT. 10400MAH INTEGRA PANEL SOLAR EXT. WIFI 6</h4>
                    <p className="precio-promo">$34.99 <span className="precio-original">$49.99</span></p>
                    <Link to="/producto/15" className="boton-detalle">Ver detalles</Link>
                  </div>
                  <div className="producto">
                    <img src="/images/Prom/powerbank.jpg" alt="Power Bank" />
                    <h4>POWER BANK ARGOMTECH C12 12000MAH COLOR BLANCO</h4>
                    <p className="precio-promo">$14.99 <span className="precio-original">$24.99</span></p>
                    <Link to="/producto/16" className="boton-detalle">Ver detalles</Link>
                  </div>
                </div>
              </div>

              <label htmlFor="promocion-slide1" className="arrow arrow-left">‹</label>
              <label htmlFor="promocion-slide2" className="arrow arrow-right">›</label>

              <div className="indicators">
                <label htmlFor="promocion-slide1" className="indicator"></label>
                <label htmlFor="promocion-slide2" className="indicator"></label>
              </div>
            </div>
          </div>
        </div>

        {/* ----------- NUEVOS ----------- */}
        <div className="carrusel-productos" id="nuevo-carrusel">
          <div className="carousel-container">
            <div className="carousel">
              <input type="radio" name="nuevo-slide" id="nuevo-slide1" defaultChecked />
              <input type="radio" name="nuevo-slide" id="nuevo-slide2" />

              <div className="carousel-content">
                {/* Slide 1 */}
                <div className="slide">
                  <div className="producto">
                    <img src="/images/Nuevo/candado.jpg" alt="Candado Agiler" />
                    <h4>CAMDADO AGILER AGI-4007 COMBINACION 4 DIGITOS</h4>
                    <p><Link to="/producto/17">Haga clic para ver el precio</Link></p>
                    <Link to="/producto/17" className="boton-detalle">Ver detalles</Link>
                  </div>
                  <div className="producto">
                    <img src="/images/Nuevo/casecooler.jpg" alt="Case Cooler Master" />
                    <h4>CASE COOLER MASTER/ELITE 301 EATX WHITE</h4>
                    <p><Link to="/producto/18">Haga clic para ver el precio</Link></p>
                    <Link to="/producto/18" className="boton-detalle">Ver detalles</Link>
                  </div>
                  <div className="producto">
                    <img src="/images/Nuevo/celularinfinix.jpg" alt="Celular Infinix" />
                    <h4>CELULAR INFINIX/HOT 50 PRO 8GB RAM</h4>
                    <p><Link to="/producto/19">Haga clic para ver el precio</Link></p>
                    <Link to="/producto/19" className="boton-detalle">Ver detalles</Link>
                  </div>
                  <div className="producto">
                    <img src="/images/Nuevo/celulartecno.jpg" alt="Celular Tecno" />
                    <h4>CELULAR/TECNO/SPARK CAMON 40 PRO 8GM RAM</h4>
                    <p><Link to="/producto/20">Haga clic para ver el precio</Link></p>
                    <Link to="/producto/20" className="boton-detalle">Ver detalles</Link>
                  </div>
                </div>

                {/* Slide 2 */}
                <div className="slide">
                  <div className="producto">
                    <img src="/images/Nuevo/discoext.jpg" alt="Disco Externo" />
                    <h4>DISCO EXTERNO ADAT HD710P 5TB NEGRO USB 3.1 IP68</h4>
                    <p><Link to="/producto/21">Haga clic para ver el precio</Link></p>
                    <Link to="/producto/21" className="boton-detalle">Ver detalles</Link>
                  </div>
                  <div className="producto">
                    <img src="/images/Nuevo/Ezvizcamara.jpg" alt="Proyector 4K" />
                    <h4>PROYECTOR 4K UHD 3000 LUMENES ANDROID TV</h4>
                    <p><Link to="/producto/22">Haga clic para ver el precio</Link></p>
                    <Link to="/producto/22" className="boton-detalle">Ver detalles</Link>
                  </div>
                  <div className="producto">
                    <img src="/images/Nuevo/play.jpg" alt="Consola Play" />
                    <h4>CONSOLA DE JUEGO SSONY DISCO SLIM STANDARD</h4>
                    <p><Link to="/producto/23">Haga clic para ver el precio</Link></p>
                    <Link to="/producto/23" className="boton-detalle">Ver detalles</Link>
                  </div>
                  <div className="producto">
                    <img src="/images/Nuevo/router.jpg" alt="Router TP-Link" />
                    <h4>ROUTER TPLINK/DECO BE25-OUTDOOR WIFI7</h4>
                    <p><Link to="/producto/24">Haga clic para ver el precio</Link></p>
                    <Link to="/producto/24" className="boton-detalle">Ver detalles</Link>
                  </div>
                </div>
              </div>

              <label htmlFor="nuevo-slide1" className="arrow arrow-left">‹</label>
              <label htmlFor="nuevo-slide2" className="arrow arrow-right">›</label>

              <div className="indicators">
                <label htmlFor="nuevo-slide1" className="indicator"></label>
                <label htmlFor="nuevo-slide2" className="indicator"></label>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== MÁS VENDIDOS ===================== */}
      <div className="carousel-container">
        <div className="carousel-header">
          <h3>MÁS VENDIDOS</h3>
          <Link to="/productos" className="view-all">VER TODOS LOS PRODUCTOS</Link>
        </div>
        
        <div className="carousel">
          <input type="radio" name="carousel" id="slide1" defaultChecked />
          <input type="radio" name="carousel" id="slide2" />
          <input type="radio" name="carousel" id="slide3" />

          <div className="carousel-content">
            {/* Slide 1 */}
            <div className="slide">
              <div className="product">
                <img src="/images/Masvendidos/Mouse.jpeg" alt="Mouse Logitech" />
                <h4>MOUSE LOGITECH M170 WIRELESS NEGRO</h4>
                <button className="price-text">Haga clic para ver el precio</button>
                <button className="add-to-cart">Añadir al carrito</button>
              </div>
              <div className="product">
                <img src="/images/Masvendidos/Mouse2.jpg" alt="Mouse Genius" />
                <h4>MOUSE GENIUS DX-110 PS2 BLACK OPTICO</h4>
                <p className="price-text">Haga clic para ver el precio</p>
                <button className="add-to-cart">Añadir al carrito</button>
              </div>
              <div className="product">
                <img src="/images/Masvendidos/Teclado.jpg" alt="Teclado Genius" />
                <h4>TECLADO GENIUS SMART KB-100 USB NEGRO</h4>
                <p className="price-text">Haga clic para ver el precio</p>
                <button className="add-to-cart">Añadir al carrito</button>
              </div>
              <div className="product">
                <img src="/images/Masvendidos/mouse 3.jpg" alt="Mouse Genius" />
                <h4>MOUSE GENIUS DX-120 USB BLACK OPTICO</h4>
                <p className="price-text">Haga clic para ver el precio</p>
                <button className="add-to-cart">Añadir al carrito</button>
              </div>
            </div>

            {/* Slide 2 */}
            <div className="slide">
              <div className="product">
                <img src="/images/Masvendidos/Adaptador.jpg" alt="Adaptador TP-Link" />
                <h4>ADAPTADOR DE RED TP-LINK TL-WN823N N300/MINI USB INALAMBRICO</h4>
                <p className="price-text">Haga clic para ver el precio</p>
                <button className="add-to-cart">Añadir al carrito</button>
              </div>
              <div className="product">
                <img src="/images/Masvendidos/Router.jpg" alt="Router TP-Link" />
                <h4>ROUTER TP-LINK TL-WR840N N300, 2 ANT., 4 PUERTOS FE</h4>
                <p className="price-text">Haga clic para ver el precio</p>
                <button className="add-to-cart">Añadir al carrito</button>
              </div>
              <div className="product">
                <img src="/images/Masvendidos/Micro.jpg" alt="Micro SD Kingston" />
                <h4>MICRO SDHC KINGSTON 64GB CON ADAPTADOR/CANVAS SELECT PLUS 100R CL10 UHS-I</h4>
                <p className="price-text">Haga clic para ver el precio</p>
                <button className="add-to-cart">Añadir al carrito</button>
              </div>
              <div className="product">
                <img src="/images/Masvendidos/Mouse4.jpg" alt="Mouse Genius" />
                <h4>MOUSE GENIUS NX-7000 WIRELESS NEGRO / BLUEEYE / RF 2.4GHZ / PILA AA / WIN Y MAC</h4>
                <p className="price-text">Haga clic para ver el precio</p>
                <button className="add-to-cart">Añadir al carrito</button>
              </div>
            </div>

            {/* Slide 3 */}
            <div className="slide">
              <div className="product">
                <img src="/images/Masvendidos/smartwatch.jpg" alt="Smartwatch Mibro" />
                <h4>SMARTWATCH MIBRO A2 NEGRO /BT 5.0 LLAMADAS /BAT. 350MAH /1.39 PANTALLA /2ATM</h4>
                <p className="price-text">Haga clic para ver el precio</p>
                <button className="add-to-cart">Añadir al carrito</button>
              </div>
              <div className="product">
                <img src="/images/Masvendidos/auricular.jpg" alt="Auricular Genius" />
                <h4>AURICULAR WIRELESS GENIUS HS-M920BT IN-EAR / BT 5.0 / ESTUCHE DE CARGA</h4>
                <p className="price-text">Haga clic para ver el precio</p>
                <button className="add-to-cart">Añadir al carrito</button>
              </div>
              <div className="product">
                <img src="/images/Masvendidos/Mouse5.jpg" alt="Mouse Genius" />
                <h4>MOUSE GENIUS NX-7009 WIRELESS AZUL / BLUEEYE / RF 2.4GHZ / PILA AA / WIN Y MAC</h4>
                <p className="price-text">Haga clic para ver el precio</p>
                <button className="add-to-cart">Añadir al carrito</button>
              </div>
              <div className="product">
                <img src="/images/Masvendidos/auidifonos.jpg" alt="Audio Xiaomi" />
                <h4>AUDIO XIAOMI/REDMI BUDS 6 PLAY ANUL. RUIDO /36 H. /BT 5.4 /IPX4 /COLOR AZUL</h4>
                <p className="price-text">Haga clic para ver el precio</p>
                <button className="add-to-cart">Añadir al carrito</button>
              </div>
            </div>
          </div>

          {/* Controles de navegación */}
          <div className="navigation-arrows">
            <label htmlFor="slide1" className="arrow arrow-left arrow-to-1">‹</label>
            <label htmlFor="slide2" className="arrow arrow-left arrow-to-2">‹</label>
            <label htmlFor="slide3" className="arrow arrow-left arrow-to-3">‹</label>
          </div>

          <div className="navigation-arrows-right">
            <label htmlFor="slide2" className="arrow arrow-right arrow-to-2">›</label>
            <label htmlFor="slide3" className="arrow arrow-right arrow-to-3">›</label>
          </div>

          <div className="indicators">
            <label htmlFor="slide1" className="indicator"></label>
            <label htmlFor="slide2" className="indicator"></label>
            <label htmlFor="slide3" className="indicator"></label>
          </div>
        </div>
      </div>

      {/* ===================== MARCAS ===================== */}
      <div className="carousel-container">
        <div className="carousel-header">
          <h3>MARCAS</h3>
        </div>
        
        <div className="carousel">
          <input type="radio" name="brand-carousel" id="brand-slide1" defaultChecked />
          <input type="radio" name="brand-carousel" id="brand-slide2" />

          <div className="carousel-content">
            {/* Slide 1 */}
            <div className="slide">
              <div className="marca">
                <Link to="/marcas/dell">
                  <img src="/images/Marcas/dell.png" alt="Dell" />
                </Link>
              </div>
              <div className="marca">
                <Link to="/marcas/gigabyte">
                  <img src="/images/Marcas/gigabyte.png" alt="Gigabyte" />
                </Link>
              </div>
              <div className="marca">
                <Link to="/marcas/infinix">
                  <img src="/images/Marcas/infinix.png" alt="Infinix" />
                </Link>
              </div>
              <div className="marca">
                <Link to="/marcas/microsoft">
                  <img src="/images/Marcas/microsoft.png" alt="Microsoft" />
                </Link>
              </div>
              <div className="marca">
                <Link to="/marcas/zebra">
                  <img src="/images/Marcas/zebra.png" alt="Zebra" />
                </Link>
              </div>
            </div>

            {/* Slide 2 */}
            <div className="slide">
              <div className="marca">
                <Link to="/marcas/ecoflow">
                  <img src="/images/Marcas/ecoflow.png" alt="Ecoflow" />
                </Link>
              </div>
              <div className="marca">
                <Link to="/marcas/cpd">
                  <img src="/images/Marcas/CPD.png" alt="CPD" />
                </Link>
              </div>
              <div className="marca">
                <Link to="/marcas/asus">
                  <img src="/images/Marcas/Asus.png" alt="Asus" />
                </Link>
              </div>
              <div className="marca">
                <Link to="/marcas/kaspersky">
                  <img src="/images/Marcas/Kaspersky.png" alt="Kaspersky" />
                </Link>
              </div>
            </div>
          </div>

          {/* Controles de navegación */}
          <div className="navigation-arrows">
            <label htmlFor="brand-slide1" className="arrow arrow-left arrow-to-1">‹</label>
            <label htmlFor="brand-slide2" className="arrow arrow-left arrow-to-2">‹</label>
          </div>

          <div className="navigation-arrows-right">
            <label htmlFor="brand-slide2" className="arrow arrow-right arrow-to-2">›</label>
          </div>

          <div className="indicators">
            <label htmlFor="brand-slide1" className="indicator"></label>
            <label htmlFor="brand-slide2" className="indicator"></label>
          </div>
        </div>
      </div>

      {/* ===================== SECCIÓN INFORMATIVA ===================== */}
      <section className="informativo">
        <h2>Servicio técnico especializado</h2>
        <p>Mantenimiento y reparación de equipos electrónicos por profesionales certificados</p>
        <Link to="/servicio-tecnico" className="btn-servicio">Solicitar servicio</Link>
      </section>
    </main>
  );
};

export default Home;