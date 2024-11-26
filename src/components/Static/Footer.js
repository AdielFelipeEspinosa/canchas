import React from 'react';
import { Link } from 'react-router-dom';
import '../../css/Footer.css';

const Footer = () => {
  return (
    <footer className="footer full-width">
    <div className="footer-content">
      <div className="footer-section about">
        <h2>Sobre Nosotros</h2>
        <p>Somos la opción ideal para tus reservas. Ofrecemos calidad, rapidez y un excelente servicio al cliente.</p>
      </div>
      <div className="footer-section links">
        <h2>Enlaces Rápidos</h2>
        <ul>
          <li><Link to="#">Inicio</Link></li>
          <li><Link to="#">Reservas</Link></li>
          <li><Link to="#">Servicios</Link></li>
          <li><Link to="#">Contacto</Link></li>
        </ul>
      </div>
      <div className="footer-section contact">
        <h2>Contacto</h2>
        <p>Email: contacto@nuestraempresa.com</p>
        <p>Teléfono: +123 456 7890</p>
        <div className="socials">
          <Link to="/"><i className="fab fa-facebook-f"></i></Link>
          <Link to="/"><i className="fab fa-twitter"></i></Link>
          <Link to="/"><i className="fab fa-instagram"></i></Link>
          <Link to="/"><i className="fab fa-linkedin-in"></i></Link>
        </div>
      </div>
    </div>
    <div className="footer-bottom">
      &copy; 2024 Nuestra Empresa | Todos los derechos reservados.
    </div>
  </footer>
  );
};

export default Footer;