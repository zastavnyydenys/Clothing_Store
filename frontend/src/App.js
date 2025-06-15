import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import ProductDetails from './components/ProductDetails';
import Header from './components/Header';
import Footer from './components/Footer';
import MainContent from './components/MainContent';
import Register from './components/Register';
import ProductsPage from './components/ProductsPage';
import AddProduct from './components/AddProduct';
import Login from './components/Login';
import Chat from './components/Chat'; // добавили

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header user={user} onLogout={handleLogout} />
        <main style={{ flexGrow: 1 }}>
          <Routes>
            <Route path="/" element={<MainContent />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/add-product" element={<AddProduct />} />
            <Route path="/chat" element={<Chat roomName="main" />} /> {/* чат */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
