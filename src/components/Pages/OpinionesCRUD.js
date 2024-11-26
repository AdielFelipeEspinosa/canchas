import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../Context/UserContext'; // Contexto de usuario
import Navbar from '../Static/Navbar';

const OpinionesCRUD = () => {
  const [opiniones, setOpiniones] = useState([]);
  const [currentOpinion, setCurrentOpinion] = useState({
    id: '',
    puntuacion: '',
    comentario: '',
    usuarioId: '',  // Este valor lo llenaremos automáticamente con el contexto
    canchaId: '', // El ID de la cancha no debe ser editable
  });

  const [canchas, setCanchas] = useState([]);
  const [usuarios, setUsuarios] = useState([]); // Lista de usuarios
  const { user } = useContext(UserContext); // Obtener el usuario autenticado
  const API_URL = 'https://reservascanhasback.onrender.com/opiniones';
  
  // Obtener todas las canchas
  const fetchCanchas = async () => {
    try {
      const response = await fetch('https://reservascanhasback.onrender.com/canchas');
      const data = await response.json();
      setCanchas(data);
    } catch (error) {
      console.error('Error fetching canchas:', error);
    }
  };

  // Obtener todos los usuarios
  const fetchUsuarios = async () => {
    try {
      const response = await fetch('https://reservascanhasback.onrender.com/users');
      const data = await response.json();
      setUsuarios(data); // Guardamos todos los usuarios en el estado
    } catch (error) {
      console.error('Error fetching usuarios:', error);
    }
  };

  // Obtener opiniones por cancha
  const fetchOpiniones = async (canchaId) => {
    try {
      if (!canchaId) return;
      const response = await fetch(`${API_URL}/get/${canchaId}`);
      const data = await response.json();
      setOpiniones(data);
    } catch (error) {
      console.error('Error fetching opiniones:', error);
    }
  };

  // Crear nueva opinión
  const createOpinion = async () => {
    if (!currentOpinion.puntuacion || !currentOpinion.comentario || !currentOpinion.canchaId) {
      alert("Todos los campos son requeridos.");
      return;
    }

    const newOpinion = {
      ...currentOpinion,
      usuarioId: user.id, // Automáticamente asigna el ID del usuario
    };

    try {
      const response = await fetch(`${API_URL}/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newOpinion),
      });
      if (response.ok) {
        fetchOpiniones(currentOpinion.canchaId); // Refrescar las opiniones de la cancha seleccionada
        resetForm();
      }
    } catch (error) {
      console.error('Error creating opinion:', error);
    }
  };

  // Editar opinión (solo puntuación y comentario)
  const editOpinion = async () => {
    if (!currentOpinion.puntuacion || !currentOpinion.comentario) {
      alert("Todos los campos son requeridos.");
      return;
    }

    // Creamos el objeto de actualización, pero no modificamos el usuarioId ni el canchaId
    const updatedOpinion = {
      ...currentOpinion,
      usuarioId: user.id,  // Siempre es el usuario autenticado
    };

    try {
      const response = await fetch(`${API_URL}/update/${currentOpinion.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedOpinion),
      });
      if (response.ok) {
        fetchOpiniones(currentOpinion.canchaId); // Refrescar las opiniones de la cancha seleccionada
        resetForm();
      }
    } catch (error) {
      console.error('Error updating opinion:', error);
    }
  };

  // Eliminar opinión
  const deleteOpinion = async (id) => {
    try {
      const response = await fetch(`${API_URL}/delete/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        const updatedOpiniones = opiniones.filter((opinion) => opinion.id !== id);
        setOpiniones(updatedOpiniones);
      }
    } catch (error) {
      console.error('Error deleting opinion:', error);
    }
  };

  // Resetear formulario
  const resetForm = () => {
    setCurrentOpinion({
      id: '',
      puntuacion: '',
      comentario: '',
      usuarioId: '',
      canchaId: '',
    });
  };

  // Obtener nombre del usuario por su ID
  const getUsuarioNombre = (usuarioId) => {
    const usuario = usuarios.find(user => user.id === usuarioId);
    return usuario ? usuario.nombre : 'Desconocido'; // Si no se encuentra el usuario, mostrar "Desconocido"
  };

  useEffect(() => {
    fetchCanchas();
    fetchUsuarios(); // Traemos todos los usuarios al cargar el componente
  }, []);

  return (
    <div>
      <Navbar />

      <h1>CRUD de Opiniones</h1>

      {/* Selección de Cancha para ver las Opiniones */}
      <div>
        <h2>Selecciona una Cancha</h2>
        <select
          value={currentOpinion.canchaId}
          onChange={(e) => {
            setCurrentOpinion({ ...currentOpinion, canchaId: e.target.value });
            fetchOpiniones(e.target.value); // Cargar opiniones cuando se seleccione una cancha
          }}
        >
          <option value="">Seleccionar Cancha</option>
          {canchas.map((cancha) => (
            <option key={cancha.id} value={cancha.id}>
              {cancha.nombre}
            </option>
          ))}
        </select>
      </div>

      {/* Lista de Opiniones */}
      <ul>
        {opiniones.map((opinion) => (
          <li key={opinion.id}>
            <p>{opinion.comentario}</p>
            <p>Puntuación: {opinion.puntuacion}</p>
            <p>Usuario: {getUsuarioNombre(opinion.usuarioId)}</p> {/* Mostrar nombre del usuario */}
            <button onClick={() => {
              setCurrentOpinion(opinion); // Cargar la opinión en el formulario de edición
            }}>
              Editar
            </button>
            <button onClick={() => deleteOpinion(opinion.id)}>
              Eliminar
            </button>
          </li>
        ))}
      </ul>

      {/* Formulario para crear o editar una opinión */}
      <div>
        <h2>{currentOpinion.id ? 'Editar Opinión' : 'Crear Opinión'}</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (currentOpinion.id) {
              editOpinion(); // Si tiene un ID, editar
            } else {
              createOpinion(); // Si no tiene un ID, crear
            }
          }}
        >
          <input
            type="number"
            placeholder="Puntuación (1-5)"
            value={currentOpinion.puntuacion}
            onChange={(e) => setCurrentOpinion({ ...currentOpinion, puntuacion: e.target.value })}
          />
          <textarea
            placeholder="Comentario"
            value={currentOpinion.comentario}
            onChange={(e) => setCurrentOpinion({ ...currentOpinion, comentario: e.target.value })}
          />

          <div>
            <p><strong>Cancha seleccionada: </strong>{canchas.find(c => c.id === currentOpinion.canchaId)?.nombre || 'Selecciona una cancha'}</p>
          </div>

          {/* El campo canchaId es solo lectura al editar */}
          <button type="submit">{currentOpinion.id ? 'Actualizar Opinión' : 'Crear Opinión'}</button>
          {/* Botón para cancelar la edición */}
          {currentOpinion.id && (
            <button
              type="button"
              onClick={() => resetForm()} // Resetear formulario y volver a la creación de opinión
            >
              Cancelar
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default OpinionesCRUD;
