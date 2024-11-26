import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../Context/UserContext";
import Navbar from "../Static/Navbar";

const UserReservas = () => {
  const { user } = useContext(UserContext);
  const [reservas, setReservas] = useState([]);
  const [canchas, setCanchas] = useState([]);
  const [newReserva, setNewReserva] = useState({
    diaSemana: "",
    horaInicio: "",
    horaFin: "",
    canchaId: "",
  });
  const [error, setError] = useState(null); // Para manejar los errores

  // Función para manejar los errores
  const handleError = (error) => {
    const errorMessage = error.message || "Ocurrió un error, intenta nuevamente.";
    setError(errorMessage); // Actualizamos el estado con el mensaje de error
  };

  // Función para obtener las reservas del usuario
  const fetchReservas = async () => {
    try {
      const response = await fetch(
        `https://reservascanhasback.onrender.com/reservas/miReserva/${user.id}`,
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al obtener las reservas.");
      }
      const data = await response.json();
      setReservas(data);
      setError(null); // Limpiar cualquier error anterior
    } catch (error) {
      handleError(error);
    }
  };

  // Función para obtener todas las canchas
  const fetchCanchas = async () => {
    try {
      const response = await fetch("https://reservascanhasback.onrender.com/canchas");
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al obtener las canchas.");
      }
      const data = await response.json();
      setCanchas(data);
      setError(null); // Limpiar cualquier error anterior
    } catch (error) {
      handleError(error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchReservas();
      fetchCanchas();
    }
  }, [user]); // Cambia el estado solo cuando 'user' cambie

  // Función para formatear la hora en formato de 12 horas (ejemplo: 2:00 pm)
  const formatTime = (time) => {
    const date = new Date(`1970-01-01T${time}:00`);
    return date.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  };

  // Función para calcular el monto del pago
  const calculateMonto = (horaInicio, horaFin, precioHoraPor) => {
    // Convierte las horas a objetos Date con formato 24h
    const [startHours, startMinutes] = horaInicio.split(':');
    const [endHours, endMinutes] = horaFin.split(':');
    
    // Asumiendo que las horas están en formato de 24 horas
    const startDate = new Date();
    startDate.setHours(parseInt(startHours), parseInt(startMinutes), 0);
  
    const endDate = new Date();
    endDate.setHours(parseInt(endHours), parseInt(endMinutes), 0);
  
    // Calcula la diferencia en horas
    const hours = (endDate - startDate) / (1000 * 60 * 60); // Convertir a horas
  
    if (hours < 0) {
      alert("La hora de fin debe ser posterior a la hora de inicio.");
      return NaN; // Si la hora de fin es antes que la de inicio, retorna NaN
    }
  
    return hours * precioHoraPor;
  };

  // Función para crear el pago
  const createPago = async (usuarioCanchaId, monto) => {
    try {
      const pagoData = {
        usuarioCanchaId,
        monto,
        fecha: new Date().toISOString(),
        estado: "Pagado",
      };
  
      const pagoResponse = await fetch("https://reservascanhasback.onrender.com/pago/pagos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pagoData),
      });
  
      if (!pagoResponse.ok) {
        const errorData = await pagoResponse.json();
        throw new Error(errorData.message || "Error al crear el pago.");
      }
  
      const pago = await pagoResponse.json();
      console.log("Pago creado:", pago);  // Asegúrate de revisar el contenido del pago
      return pago.pago.id; // Retorna correctamente el ID
    } catch (error) {
      handleError(error);
    }
  };
  

  // Función para crear una nueva reserva
  const createReserva = async () => {
    try {
      const canchaSeleccionada = canchas.find((cancha) => cancha.id === newReserva.canchaId);
  
      if (!canchaSeleccionada) {
        alert("Debes seleccionar una cancha válida.");
        return;
      }
  
      // Formatear las horas en el formato adecuado
      const horaInicioFormateada = formatTime(newReserva.horaInicio);
      const horaFinFormateada = formatTime(newReserva.horaFin);
  
      // Calcular monto del pago
      const monto = calculateMonto(horaInicioFormateada, horaFinFormateada, canchaSeleccionada.precioPorHora);
      console.log(monto);
      
      // Crear la reserva con pago null
      const reservaData = {
        ...newReserva,
        horaInicio: horaInicioFormateada,
        horaFin: horaFinFormateada,
        usuarioId: user.id,
      };
  
      const reservaResponse = await fetch("https://reservascanhasback.onrender.com/reservas/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reservaData),
      });
  
      if (!reservaResponse.ok) {
        const errorData = await reservaResponse.json();
        throw new Error(errorData.message || "Error al crear la reserva.");
      }
  
      const reserva = await reservaResponse.json(); // Obtener la reserva creada
      const reservaId = reserva.reserva.id;
  
      // Crear el pago
      const pagoId = await createPago(reservaId, monto); // Asegúrate de obtener el pago ID correctamente
      console.log("Pago ID:", pagoId);
  
      // Actualizar la reserva con el pagoId
      const updatedReservaData = {
        ...reserva,
        pagoId: pagoId,
      };
  
      const updateReservaResponse = await fetch(
        `https://reservascanhasback.onrender.com/reservas/update/${reservaId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedReservaData),
        }
      );
  
      if (!updateReservaResponse.ok) {
        const errorData = await updateReservaResponse.json();
        throw new Error(errorData.message || "Error al actualizar la reserva con el pago.");
      }
  
      fetchReservas(); // Refrescar la lista
      setNewReserva({
        diaSemana: "",
        horaInicio: "",
        horaFin: "",
        canchaId: "",
      });
      alert("Reserva y pago creados correctamente.");
    } catch (error) {
      handleError(error);
    }
  };
  
  

  // Función para eliminar una reserva
  const deleteReserva = async (reservaId) => {
    try {
      const response = await fetch(
        `https://reservascanhasback.onrender.com/reservas/delete/${reservaId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        fetchReservas(); // Refrescar la lista
        alert("Reserva eliminada correctamente.");
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al eliminar la reserva.");
      }
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <div>
        <Navbar />
      <h2>Mis Reservas</h2>
      {error && <p style={{ color: "red" }}>Error: {error}</p>} {/* Mostrar el mensaje de error */}
      <ul>
        {reservas.map((reserva) => (
          <li key={reserva.id}>
            <p>Fecha: {new Date(reserva.diaSemana).toLocaleDateString()}</p>
            <p>
              Hora: {new Date(reserva.horaInicio).toLocaleTimeString()} -{" "}
              {new Date(reserva.horaFin).toLocaleTimeString()}
            </p>
            <p>Estado: {reserva.estado}</p>
            <button onClick={() => deleteReserva(reserva.id)}>Eliminar</button>
          </li>
        ))}
      </ul>

      <h3>Crear Nueva Reserva</h3>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createReserva();
        }}
      >
        <label>
          Día:
          <input
            type="date"
            value={newReserva.diaSemana}
            onChange={(e) => setNewReserva({ ...newReserva, diaSemana: e.target.value })}
            required
          />
        </label>
        <label>
          Hora de inicio:
          <input
            type="time"
            value={newReserva.horaInicio}
            onChange={(e) => setNewReserva({ ...newReserva, horaInicio: e.target.value })}
            required
          />
        </label>
        <label>
          Hora de fin:
          <input
            type="time"
            value={newReserva.horaFin}
            onChange={(e) => setNewReserva({ ...newReserva, horaFin: e.target.value })}
            required
          />
        </label>
        <label>
          Cancha:
          <select
            value={newReserva.canchaId}
            onChange={(e) => setNewReserva({ ...newReserva, canchaId: e.target.value })}
            required
          >
            <option value="">Selecciona una cancha</option>
            {canchas.map((cancha) => (
              <option key={cancha.id} value={cancha.id}>
                {cancha.nombre}
              </option>
            ))}
          </select>
        </label>
        <button type="submit">Crear Reserva</button>
      </form>
    </div>
  );
};

export default UserReservas;
