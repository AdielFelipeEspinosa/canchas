import React from 'react';
import Navbar from '../Navbar/Navbar.js'; // Importar el componente Navbar
import '../../css/Index.css'; // Asegúrate de tener los estilos
import { Link } from 'react-router-dom';

const Index = () => {
  
  return (
    <div className="index-container">
      <Navbar /> {/* Usar el componente Navbar */}

      <div className="container steps">
        <h2>Deja de dar vueltas y reserva en solo 3 pasos</h2>
        <div className="steps-wrapper">
          <div className="step">
            <img src="img/ic-icon-date.9daa43cc.png" alt="Icono de fecha" />
            <p>Selecciona fecha y hora</p>
          </div>
          <div className="step">
            <img src="img/ic-icon-field.eb539c6e.png" alt="Icono de cancha" />
            <p>Elige la cancha que prefieras</p>
          </div>
          <div className="step">
            <img src="img/ic-icon-pay.07503527.png" alt="Icono de pago" />
            <p>Realiza el pago en línea</p>
          </div>
        </div>
      </div>

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
  );
};

export default Index;
