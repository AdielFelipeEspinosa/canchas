import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/Register.css';
import Navbar from '../Static/Navbar';

const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    nombre: '',
    apellido: '',
  });

  const [success, setSuccess] = useState(null); // Mensaje de éxito
  const [error, setError] = useState(null); // Mensaje de error
  const [loading, setLoading] = useState(false); // Estado para manejar el loading
  const navigate = useNavigate(); // Para redirigir

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Realiza la solicitud POST al backend
    fetch('https://reservascanhasback.onrender.com/users/userRegister', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al registrar el usuario');
        }
        return response.json();
      })
      //Inicio existoso
      .then(() => {
        setLoading(false); // Detén el loading
        setError(null);
        navigate('/login');
      })

      //Erro
      .catch((error) => {
        setLoading(false); // Detén el loading
        setSuccess(null);
      });
  };

  if (loading) return <p>Cargando...</p>;

  return (
    <div className="register-container">
      <Navbar />
      <div className="register-box">
        <h2>Registrar Usuario</h2>
        {success && <p className="success">{success}</p>}
        {error && <p className="error">{error}</p>}
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
          <div className="input-group">
            <label htmlFor="nombre">Nombre</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="apellido">Apellido</label>
            <input
              type="text"
              id="apellido"
              name="apellido"
              value={formData.apellido}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="register-button">Registrar</button>
        </form>
        <div className="login-link">
          ¿Ya tienes una cuenta? <a href="/login">Inicia Sesión</a>
        </div>
      </div>
    </div>
  );
};

export default Register;
