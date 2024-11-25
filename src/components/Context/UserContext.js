import React, { createContext, useState, useEffect } from 'react';

// Crear el contexto
export const UserContext = createContext();

// Crear el componente proveedor
const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Recuperar usuario desde localStorage si existe
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  
  // Guardar el usuario en localStorage cuando cambia
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Exportar el UserProvider como default
export default UserProvider;
