import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../Context/UserContext';
import '../../css/Login.css';
import Navbar from '../Static/Navbar';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { setUser } = useContext(UserContext); // Accede al setUser desde el contexto
  const [success, setSuccess] = useState(null); // Mensaje de éxito
  const [error, setError] = useState(null); // Mensaje de error
  const [loading, setLoading] = useState(false); // Estado para manejar el loading
  const navigate = useNavigate(); // Para redirigir

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {

    setLoading(true);

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
        console.log(data);
        setUser({
          id: data.id_usuarios,
          nombre: data.nombre,
          apellido: data.apellido,
          email: data.email,
          rol: data.rol,
         }); // Guarda la información del usuario en el contexto
        localStorage.setItem('token', data.token); // Guarda el token en localStorage
        setLoading(false); // Detén el loading
        setError(null);
        navigate('/'); // Redirige al inicio después de iniciar sesión
        
      })
      .catch((error) => {
        setLoading(false); // Detén el loading
        setError(error.message);
        setSuccess(null);
        
      });

  };

  if (loading) return <p>Cargando...</p>;

  return (
    <div className="login-container">
      <Navbar />
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
