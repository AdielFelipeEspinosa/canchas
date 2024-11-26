import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/Register.css';
import Navbar from '../Static/Navbar';
import { UserContext } from '../Context/UserContext';

const EditProfile = () => {
  const { user } = useContext(UserContext);
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  // Declara los hooks antes de cualquier condicional
  const [formData, setFormData] = useState({
    email: user?.email || '',
    nombre: user?.nombre || '',
    apellido: user?.apellido || '',
  });
  const [success, setSuccess] = useState(null); // Mensaje de éxito
  const [error, setError] = useState(null); // Mensaje de error
  const [loading, setLoading] = useState(false); // Estado para manejar el loading

  // Actualizar el estado del formulario si los datos del usuario cambian
  useEffect(() => {
    if (user) {
      setFormData({
        email: user.email,
        nombre: user.nombre,
        apellido: user.apellido,
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    fetch(`https://reservascanhasback.onrender.com/users/edit/${user.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al actualizar el usuario');
        }
        return response.json();
      })
      .then(() => {
        setLoading(false); // Detén el loading
        navigate('/');
        setError(null);
        // Actualiza los datos del usuario en el contexto y en el localStorage
      setUser({
        ...user, // Conserva el resto de los datos actuales del usuario
        ...formData, // Actualiza los campos modificados
      });

      // Actualiza el localStorage con los nuevos datos del usuario
      localStorage.setItem('user', JSON.stringify({
        ...user,
        ...formData,
      }));

      })
      .catch((error) => {
        setLoading(false); // Detén el loading
        setError('Hubo un problema al actualizar el perfil');
        setSuccess(null);
        console.error(error);
      });
  };

  // Manejar los retornos condicionales después de declarar los hooks

  if (loading) {
    return <p>Cargando...</p>;
  }

  return (
    <div className="register-container">
      <Navbar />
      <div className="register-box">
        <h2>Actualizar Usuario</h2>
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
          <button type="submit" className="register-button">Actualizar</button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
