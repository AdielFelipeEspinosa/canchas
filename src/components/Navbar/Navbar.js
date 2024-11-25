import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom'; // Usamos Link para la navegación
import { UserContext } from '../Context/UserContext'; // Asegúrate de importar el contexto
import '../../css/Navbar.css'; // Si tienes estilos en un archivo CSS separado

const Navbar = () => {
  const { user, setUser } = useContext(UserContext); // Accede al estado y setUser del contexto
  
  const handleLogout = () => {
    setUser(null); // Limpia el estado del usuario
    localStorage.removeItem('user'); // Limpia el usuario del localStorage
  };

  const [isOpen, setIsOpen] = useState(false); // Controla si el dropdown está abierto

  const toggleDropdown = () => {
    setIsOpen(!isOpen); // Alterna el estado del dropdown
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">Mi App</Link> {/* Cambia a un enlace que redirija al inicio */}
      </div>
      <div className="nav-links">
        {user ? (
          <>
            <span>Hola, {user.nombre}</span>
            <div className="user-role">
              <span>{user.rol === 'admin' ? 'Admin' : 'Cliente'}</span>
              <div className="dropdown-menu">
                {user.rol === 'admin' ? (
                  <>
                    <Link to="/users">Users</Link>
                    <Link to="/">MiApp</Link>
                    <Link to="/">MiApp</Link>
                  </>
                ) : (
                  <>
                    <Link to="/">MiApp</Link>
                    <Link to="/">MiApp</Link>
                    <Link to="/">MiApp</Link>
                  </>
                )} 
              </div>
            </div>
            <button className="login-button" onClick={handleLogout}>Cerrar Sesión</button>
          </>
        ) : (
          <>
            <Link to="/register">Registrarse</Link>
            <Link to="/login">Iniciar Sesión</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;