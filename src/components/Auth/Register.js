import React, { useState } from 'react';
import '../css/Register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    nombre: '',
    apellido: '',
  });

  const [success, setSuccess] = useState(null); // Mensaje de éxito
  const [error, setError] = useState(null); // Mensaje de error

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
      .then(() => {
        setSuccess('Usuario registrado con éxito');
        setError(null);
        setFormData({ email: '', password: '', nombre: '', apellido: '' }); // Limpia el formulario
      })
      .catch((error) => {
        setError(error.message);
        setSuccess(null);
      });
  };

  return (
    <div className="register-container">
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
      </div>
    </div>
  );
};

export default Register;
