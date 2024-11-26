import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserProvider from "./components/Context/UserContext";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Index from "./components/Pages/Index";
import Users from "./components/Pages/Users.js";
import ProtectedRoute from "./components/Context/ProtectedRoute.js";
import CanchasCrud from "./components/Pages/CanchasCRUD.js";
import EditProfile from "./components/Pages/EditProfile.js";

const App = () => {
  // Definición de rutas protegidas
  const protectedRoutes = [
    { path: "/users", element: <Users />, allowedRoles: ["admin"] },
    { path: "/canchas", element: <CanchasCrud />, allowedRoles: ["admin"] },
    { path: "/editProfile", element: <EditProfile />, allowedRoles: ["admin","cliente"] },
  ];

  return (
    <UserProvider>
      <Router>
        <Routes>
          {/* Rutas públicas */}
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Rutas protegidas dinámicas */}
          {protectedRoutes.map(({ path, element, allowedRoles }) => (
            <Route
              key={path}
              path={path}
              element={
                <ProtectedRoute allowedRoles={allowedRoles}>
                  {element}
                </ProtectedRoute>
              }
            />
          ))}
        </Routes>
      </Router>
    </UserProvider>
  );
};

export default App;
