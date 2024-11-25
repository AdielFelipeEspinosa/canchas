import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserProvider from "./components/Context/UserContext";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Index from "./components/Pages/Index";
import Users from "./components/Users";
import ProtectedRoute from "./components/ProtectedRoute.js"; // Espacio corregido

const App = () => {
  return (
    <UserProvider>
      <Router>
        <Routes>
          {/* Rutas públicas */}
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Rutas protegidas */}
          <Route
            path="/users"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <Users />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </UserProvider>
  );
};

export default App;
