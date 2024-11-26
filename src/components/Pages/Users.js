import React, { useState, useEffect } from 'react';
import Navbar from '../Static/Navbar';

const UsersCRUD = () => {
  const [loading, setLoading] = useState(true); // Estado para manejar el loading

  const [users, setUsers] = useState([]);

  const API_URL = 'https://reservascanhasback.onrender.com/users';

  // Obtener todos los usuarios
  const fetchUsers = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setUsers(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  // Eliminar un usuario
  const deleteUser = async (id) => {
    try {
      const response = await fetch(`${API_URL}/userDelete/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setUsers(users.filter((user) => user.id !== id)); // Actualizar la lista localmente
      }
      setLoading(false);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) return <p>Cargando...</p>;

  return (
    <div>
      <Navbar />
      <h1>Lista de Usuarios</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.nombre} {user.apellido} - {user.email} - {user.rol}
            <button onClick={() => deleteUser(user.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsersCRUD;
