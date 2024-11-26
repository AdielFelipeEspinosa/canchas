import React from 'react';
import Navbar from '../Static/Navbar.js'; // Importar el componente Navbar
import '../../css/Index.css'; // Asegúrate de tener los estilos
import { Link } from 'react-router-dom';
import Footer from '../Static/Footer.js';

const Index = () => {

  return (
    <div>
      <Navbar />
      {/* Agregar un espaciador para compensar el espacio del Navbar fijo */}
      <div className="spacer"></div>

      <div className="index-container">        
        <div className="cancha-container">
          <div className="cancha-card">
            <img src="img/Futbol.jpg" alt="Imagen de la Cancha 1" />
            <div className="cancha-info">
              <h3>Futbol</h3>
              <Link to="/canchas"><button>Reservar</button></Link>
            </div>
          </div>

          <div className="cancha-card">
            <img src="img/baloncesto.jpg" alt="Imagen de la Cancha 2" />
            <div className="cancha-info">
              <h3>Baloncesto</h3>
              <button>Reservar</button>
            </div>
          </div>

          <div className="cancha-card">
            <img src="img/natacion.jpg" alt="Imagen de la Cancha 3" />
            <div className="cancha-info">
              <h3>Natación</h3>
              <button>Reservar</button>
            </div>
          </div>

          <div className="cancha-card">
            <img src="img/voleibol.webp" alt="Imagen de la Cancha 1" />
            <div className="cancha-info">
              <h3>Voleibol</h3>
              <button>Reservar</button>
            </div>
          </div>

          <div className="cancha-card">
            <img src="img/tennis.webp" alt="Imagen de la Cancha 2" />
            <div className="cancha-info">
              <h3>Tennis</h3>
              <button>Reservar</button>
            </div>
          </div>
        </div>

        <div className="highlight-box">
          <h2>¿Por qué reservar con nosotros?</h2>
          <ul>
            <li><span>Fácil y rápido:</span> Reserva en solo 3 simples pasos.</li>
            <li><span>Las mejores instalaciones:</span> Nuestras canchas están en excelente estado y siempre listas.</li>
            <li><span>Precios competitivos:</span> Ofrecemos la mejor relación calidad-precio en el mercado.</li>
            <li><span>Soporte dedicado:</span> Estamos aquí para ayudarte en cualquier momento.</li>
          </ul>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Index;
