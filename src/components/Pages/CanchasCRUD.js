import React, { useState, useEffect } from 'react';
import Navbar from '../Static/Navbar';

const CanchasCRUD = () => {
  const [canchas, setCanchas] = useState([]);
  const [tiposCancha, setTiposCancha] = useState([]);
  const [currentCancha, setCurrentCancha] = useState({
    id: '',
    nombre: '',
    ubicacion: '',
    capacidad: '',
    precioPorHora: '',
    tipoCanchaId: '',
  });

  const API_CANCHAS = 'https://reservascanhasback.onrender.com/canchas';
  const API_TIPOS_CANCHA = 'https://reservascanhasback.onrender.com/tipCancha';

  // Obtener todas las canchas
  const fetchCanchas = async () => {
    try {
      const response = await fetch(API_CANCHAS);
      const data = await response.json();
      setCanchas(data);
    } catch (error) {
      console.error('Error fetching canchas:', error);
    }
  };

  // Obtener todos los tipos de cancha
  const fetchTiposCancha = async () => {
    try {
      const response = await fetch(API_TIPOS_CANCHA);
      const data = await response.json();
      setTiposCancha(data);
    } catch (error) {
      console.error('Error fetching tipos de cancha:', error);
    }
  };

  // Crear nueva cancha
  const createCancha = async () => {
    try {
      const response = await fetch(`${API_CANCHAS}/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(currentCancha),
      });
      if (response.ok) {
        fetchCanchas(); // Refrescar la lista
        resetForm();
      }
    } catch (error) {
      console.error('Error creating cancha:', error);
    }
  };

  // Actualizar cancha
  const updateCancha = async (id) => {
    try {
      const response = await fetch(`${API_CANCHAS}/update/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(currentCancha),
      });
      if (response.ok) {
        fetchCanchas();
        resetForm();
      }
    } catch (error) {
      console.error('Error updating cancha:', error);
    }
  };

  // Eliminar cancha
  const deleteCancha = async (id) => {
    try {
      const response = await fetch(`${API_CANCHAS}/delete/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        fetchCanchas();
      }
    } catch (error) {
      console.error('Error deleting cancha:', error);
    }
  };

  // Resetear formulario
  const resetForm = () => {
    setCurrentCancha({
      id: '',
      nombre: '',
      ubicacion: '',
      capacidad: '',
      precioPorHora: '',
      tipoCanchaId: '',
    });
  };

  // Precargar datos en el formulario para actualizar
  const prefillForm = (cancha) => {
    setCurrentCancha(cancha);
  };

  useEffect(() => {
    fetchCanchas();
    fetchTiposCancha();
  }, []);

  return (
    <div>
      <Navbar />

      <h1>CRUD de Canchas</h1>

      {/* Lista de Canchas */}
      <ul>
        {canchas.map((cancha) => {
          // Encontrar el tipo de cancha correspondiente al ID
          const tipoCancha = tiposCancha.find((tipo) => tipo.id === cancha.tipoCanchaId);

          return (
            <li key={cancha.id}>
              {cancha.nombre} - {cancha.ubicacion} - {cancha.capacidad} personas - ${cancha.precioPorHora}/hora 
              - Tipo: {tipoCancha ? tipoCancha.nombre : 'Tipo desconocido'}
              <button onClick={() => deleteCancha(cancha.id)}>Eliminar</button>
              <button onClick={() => prefillForm(cancha)}>Actualizar</button>
            </li>
          );
        })}
      </ul>

      {/* Formulario para crear/actualizar */}
      <div>
        <h2>{currentCancha.id ? 'Actualizar Cancha' : 'Crear Cancha'}</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            currentCancha.id ? updateCancha(currentCancha.id) : createCancha();
          }}
        >
          <input
            type="text"
            placeholder="Nombre"
            value={currentCancha.nombre}
            onChange={(e) => setCurrentCancha({ ...currentCancha, nombre: e.target.value })}
          />
          <input
            type="text"
            placeholder="Ubicación"
            value={currentCancha.ubicacion}
            onChange={(e) => setCurrentCancha({ ...currentCancha, ubicacion: e.target.value })}
          />
          <input
            type="number"
            placeholder="Capacidad"
            value={currentCancha.capacidad}
            onChange={(e) => setCurrentCancha({ ...currentCancha, capacidad: e.target.value })}
          />
          <input
            type="number"
            placeholder="Precio por hora"
            value={currentCancha.precioPorHora}
            onChange={(e) => setCurrentCancha({ ...currentCancha, precioPorHora: e.target.value })}
          />
          <select
            value={currentCancha.tipoCanchaId}
            onChange={(e) => setCurrentCancha({ ...currentCancha, tipoCanchaId: e.target.value })}
          >
            <option value="">Seleccione un tipo de cancha</option>
            {tiposCancha.map((tipo) => (
              <option key={tipo.id} value={tipo.id}>
                {tipo.nombre}
              </option>
            ))}
          </select>
          <button type="submit">{currentCancha.id ? 'Actualizar' : 'Crear'}</button>
          {currentCancha.id && <button onClick={resetForm}>Cancelar</button>}
        </form>
      </div>
    </div>
  );
};

export default CanchasCRUD;
