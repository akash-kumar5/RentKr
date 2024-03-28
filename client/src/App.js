import React, { useState } from "react";
import { useAuth } from "./store/auth";
import { BrowserRouter, Navigate, Route, Routes, useNavigate } from "react-router-dom";
import "./index.css";
import Footer from "./components/Footer";
import HeaderGuest from "./components/HeaderGuest";
import HeaderUser from "./components/HeaderUser";
import HeaderAdmin from "./components/HeaderAdmin";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import ProductPage from "./pages/ProductPage";
import ProductDetail from "./pages/ProductDetails";
import AddItem from "./pages/AddItem";
// import Dino from './components/Dino/Dino';
import AdminHome from "./pages/Admin/AdminHome";
import UserManage from "./pages/Admin/UserManage";
import ProductManage from "./pages/Admin/ProductManage";
import OrderManage from "./pages/Admin/OrderManage";
import CartPage from "./pages/CartPage";
import Cart from "./pages/Cart";
import CategoryPage from "./pages/Category";

function App() {
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const { isAdmin , setIsAdmin} = useAuth();
  // const navigate = useNavigate();

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLogoutSuccess = () => {
    setIsAuthenticated(false);
    setIsAdmin(false);
    // navigate('/')
  };
  return (
    <BrowserRouter>
      {isAuthenticated ? (
        isAdmin ? (
          <HeaderAdmin handleLogoutSuccess={handleLogoutSuccess} />
        ) : (
          <HeaderUser handleLogoutSuccess={handleLogoutSuccess} />
        )
      ) : (
        <HeaderGuest />
      )}

      <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/admin" element={<AdminHome />} />
        <Route path="/usermanage" element={<UserManage />} />
        <Route path="/productmanage" element={<ProductManage />} />
        <Route path="/ordermanage" element={<OrderManage />} />
        <Route
          path="/login"
          element={<Login handleLoginSuccess={handleLoginSuccess} />}
        />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/products/:productId" element={<ProductDetail />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/additem" element={<AddItem />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/cartpage" element={<CartPage />} />
        <Route path="/products/category/:category" element={<CategoryPage />} />
        {/* <Route path='/*' element={<Dino />} /> */}
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
