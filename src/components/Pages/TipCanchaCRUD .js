import React, { useState, useEffect } from 'react';
import Navbar from '../Static/Navbar';

const TipCanchaCRUD = () => {
  const [tipCanchas, setTipCanchas] = useState([]);
  const [currentTipCancha, setCurrentTipCancha] = useState({
    id: '',
    nombre: '',
    descripcion: '',
  });

  const API_URL = 'https://reservascanhasback.onrender.com/tipCancha';

  // Obtener todas las tipCanchas
  const fetchTipCanchas = async () => {
    try {
      const response = await fetch(`${API_URL}/`);
      const data = await response.json();
      setTipCanchas(data);
    } catch (error) {
      console.error('Error fetching tipCanchas:', error);
    }
  };

  // Crear nueva tipCancha
  const createTipCancha = async () => {
    try {
      const response = await fetch(`${API_URL}/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(currentTipCancha),
      });
      if (response.ok) {
        fetchTipCanchas(); // Refrescar la lista
        resetForm();
      }
    } catch (error) {
      console.error('Error creating tipCancha:', error);
    }
  };

  // Actualizar tipCancha
  const updateTipCancha = async (id) => {
    try {
      const response = await fetch(`${API_URL}/update/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(currentTipCancha),
      });
      if (response.ok) {
        fetchTipCanchas();
        resetForm();
      }
    } catch (error) {
      console.error('Error updating tipCancha:', error);
    }
  };

  // Eliminar tipCancha
  const deleteTipCancha = async (id) => {
    try {
      const response = await fetch(`${API_URL}/delete/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        fetchTipCanchas();
      }
    } catch (error) {
      console.error('Error deleting tipCancha:', error);
    }
  };

  // Resetear formulario
  const resetForm = () => {
    setCurrentTipCancha({
      id: '',
      nombre: '',
      descripcion: '',
    });
  };

  // Precargar datos en el formulario para actualizar
  const prefillForm = (tipCancha) => {
    setCurrentTipCancha(tipCancha);
  };

  useEffect(() => {
    fetchTipCanchas();
  }, []);

  return (
    <div>
      <Navbar />

      <h1>CRUD de Tipos de Cancha</h1>

      {/* Lista de Tipos de Cancha */}
      <ul>
        {tipCanchas.map((tipCancha) => (
          <li key={tipCancha.id}>
            {tipCancha.nombre} - {tipCancha.descripcion}
            <button onClick={() => deleteTipCancha(tipCancha.id)}>Eliminar</button>
            <button onClick={() => prefillForm(tipCancha)}>Actualizar</button>
          </li>
        ))}
      </ul>

      {/* Formulario para crear/actualizar */}
      <div>
        <h2>{currentTipCancha.id ? 'Actualizar Tipo de Cancha' : 'Crear Tipo de Cancha'}</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            currentTipCancha.id ? updateTipCancha(currentTipCancha.id) : createTipCancha();
          }}
        >
          <input
            type="text"
            placeholder="Nombre"
            value={currentTipCancha.nombre}
            onChange={(e) => setCurrentTipCancha({ ...currentTipCancha, nombre: e.target.value })}
            required
          />
          <textarea
            placeholder="Descripción"
            value={currentTipCancha.descripcion}
            onChange={(e) => setCurrentTipCancha({ ...currentTipCancha, descripcion: e.target.value })}
            required
          />
          <button type="submit">{currentTipCancha.id ? 'Actualizar' : 'Crear'}</button>
          {currentTipCancha.id && <button onClick={resetForm}>Cancelar</button>}
        </form>
      </div>
    </div>
  );
};

export default TipCanchaCRUD;
