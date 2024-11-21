import React, { useEffect, useState } from 'react';

const Users = () => {
  const [users, setUsers] = useState([]); // Estado para guardar los usuarios
  const [error, setError] = useState(null); // Estado para manejar errores
  const [loading, setLoading] = useState(true); // Estado para manejar el loading

  useEffect(() => {
    // Llama al backend en la nueva URL pública
    fetch('https://reservascanhasback.onrender.com/users/')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al obtener los usuarios');
        }
        return response.json(); // Convierte la respuesta en JSON
      })
      .then((data) => {
        setUsers(data); // Actualiza el estado con los usuarios
        setLoading(false); // Detén el loading
      })
      .catch((error) => {
        setError(error.message); // Captura errores
        setLoading(false); // Detén el loading en caso de error
      });
  }, []);

  if (loading) return <p>Cargando usuarios...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Lista de Usuarios</h1>
      <table border="1" style={{ width: '100%', textAlign: 'left' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Email</th>
            <th>Rol</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.nombre}</td>
              <td>{user.apellido}</td>
              <td>{user.email}</td>
              <td>{user.rol}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
