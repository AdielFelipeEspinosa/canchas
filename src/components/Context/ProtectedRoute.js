import React from "react";
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "./UserContext.js"; // Contexto donde tienes la información del usuario

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useContext(UserContext);

  // Verifica si el usuario está autenticado y tiene el rol permitido
  if (!user || !allowedRoles.includes(user.rol)) {
    return <Navigate to="/" replace />; // Redirige a la página de inicio si no tiene acceso
  }

  return children; // Renderiza el contenido si cumple con las condiciones
};

export default ProtectedRoute;
