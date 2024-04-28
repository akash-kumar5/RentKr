import React from "react";
import { useAuth } from "./store/auth";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./index.css";
import Footer from "./components/Footer";
import HeaderGuest from "./components/HeaderGuest";
import HeaderUser from "./components/HeaderUser";
import HeaderAdmin from "./components/HeaderAdmin";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProductPage from "./pages/ProductPage";
import ProductDetail from "./pages/ProductDetails";
import AddItem from "./pages/AddItem";
import AdminHome from "./pages/Admin/AdminHome";
import UserManage from "./pages/Admin/UserManage";
import ProductManage from "./pages/Admin/ProductManage";
import OrderManage from "./pages/Admin/OrderManage";
import CartPage from "./pages/CartPage";
import Cart from "./pages/Cart";
import CategoryPage from "./pages/Category";
import Restricted from "./pages/Restricted";
import CheckoutPage from "./pages/Checkout/Checkout";
import PageNotFound from "./components/PageNotFound";
import Logout from "./pages/Logout";
import CartSummary from "./pages/CartSummary";
import OrderSuccess from "./pages/OrderSuccess";
import OrderPage from "./pages/OrderPage";
import EditProduct from "./pages/Admin/EditProduct";
import OrderDetails from "./pages/Admin/OrderDetail";

function App() {
  const { isAuthenticated, setIsAuthenticated, isAdmin, isLoggedIn } =
    useAuth();

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLogoutSuccess = () => {
    setIsAuthenticated(false);
    // navigate('/')
  };

  return (
    <BrowserRouter>
      {isLoggedIn ? (
        isAdmin ? (
          <HeaderAdmin handleLogoutSuccess={handleLogoutSuccess} />
        ) : (
          <HeaderUser handleLogoutSuccess={handleLogoutSuccess} />
        )
      ) : (
        <HeaderGuest />
      )}

      <Routes>
        <Route
          path="/"
          element={isAdmin ? <Navigate to="/admin" /> : <Home />}
        />
        <Route
          path="/admin"
          element={isAdmin ? <AdminHome /> : <Navigate to="/" />}
        />
        <Route path="/usermanage" element={<UserManage />} />
        <Route path="/editproduct" element={<EditProduct />} />
        <Route path="/productmanage" element={<ProductManage />} />
        <Route path="/ordermanage" element={<OrderManage />} />
        <Route path="/order/:orderId" element={<OrderDetails />} />
        <Route
          path="/login"
          element={<Login handleLoginSuccess={handleLoginSuccess} />}
        />
        <Route path="/register" element={<Register />} />
        <Route path="/products/:productId" element={<ProductDetail />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/additem" element={<AddItem />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/cartpage" element={<CartPage />} />
        <Route path="/cartsummary" element={<CartSummary />} />
        <Route path="/products/category/:category" element={<CategoryPage />} />
        <Route path="/*" element={<PageNotFound />} />
        <Route path="/restricted" element={<Restricted />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/success" element={<OrderSuccess />} />
        <Route path="/order" element={<OrderPage />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
