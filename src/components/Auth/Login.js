import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../Context/UserContext';
import '../css/Login.css';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { setUser } = useContext(UserContext); // Accede al setUser desde el contexto
  const [success, setSuccess] = useState(null); // Mensaje de éxito
  const [error, setError] = useState(null); // Mensaje de error
  const navigate = useNavigate(); // Para redirigir

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('https://reservascanhasback.onrender.com/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al iniciar sesión. Verifica tus credenciales.');
        }
        return response.json();
      })
      .then((data) => {
        setUser({ nombre: data.nombre }); // Guarda la información del usuario en el contexto
        localStorage.setItem('token', data.token); // Guarda el token en localStorage
        setSuccess('Inicio de sesión exitoso.');
        setError(null);
        navigate('/'); // Redirige al inicio después de iniciar sesión
      })
      .catch((error) => {
        setError(error.message);
        setSuccess(null);
      });
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Iniciar Sesión</h2>
        {success && <p style={{ color: 'green' }}>{success}</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Correo Electrónico</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="login-button">Ingresar</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
