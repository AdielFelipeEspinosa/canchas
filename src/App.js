import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserProvider from './components/Context/UserContext';
import Navbar from './components/Navbar/Navbar';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Index from './components/Pages/Index';

const App = () => {
  return (
    <UserProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </UserProvider>
  );
};

export default App;
