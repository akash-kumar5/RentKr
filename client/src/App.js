import React, { useState } from 'react';
import { useAuth } from './store/auth';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from './components/Footer';
// import HeaderAdmin from './components/HeaderAdmin';
import HeaderGuest from './components/HeaderGuest';
import HeaderUser from './components/HeaderUser';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import ProductPage from './pages/ProductPage';
import ProductDetail from './pages/ProductDetails';
import AddItem from './pages/AddItem';

function App() {
  const {isAuthenticated, setIsAuthenticated} = useAuth();
  // const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLoginSuccess = () => {
    console.log("logiinnn")
    setIsAuthenticated(true);
  };

  const handleLogoutSuccess = () => {
    setIsAuthenticated(false);
  };
  return (
    <BrowserRouter>
      {isAuthenticated ? (
        <HeaderUser handleLogoutSuccess={handleLogoutSuccess} />
      ) : (
        <HeaderGuest />
      )}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login handleLoginSuccess={handleLoginSuccess} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/products/:productId" element={<ProductDetail />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/additem" element={<AddItem />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
