import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const CartPage = () => {
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchCartData();
  }, []);

  const fetchCartData = async () => {
    try {
      setLoading(true);
      setError("");
      const userId = localStorage.getItem("userId");
      const response = await axios.get(`/cart/${userId}`);

      if (response && response.data) {
        setCart(response.data.items || []);
        setTotalPrice(response.data.totalAmount || 0);
      } else {
        const cartData = JSON.parse(localStorage.getItem("cartItems")) || {};
        setCart(cartData.items || []);
        setTotalPrice(cartData.totalAmount || 0);
      }
    } catch (err) {
      console.error("Error fetching cart data:", err);
      setError("Failed to load cart.");
    } finally {
      setLoading(false);
    }
  };

  const updateCartItemQuantity = async (productId, newQuantity) => {
    const userId = localStorage.getItem("userId");
    try {
      // Optimistic UI update
      setCart(prevCart =>
        prevCart.map(item =>
          item.productId._id === productId
            ? { ...item, quantity: newQuantity }
            : item
        )
      );

      await axios.put("/cart/update", {
        userId,
        productId,
        quantity: newQuantity,
      });

      fetchCartData(); // to sync price
    } catch (error) {
      console.error("Error updating item quantity:", error);
    }
  };

  const increaseQuantity = (productId) => {
    const item = cart.find(item => item.productId._id === productId);
    if (item) updateCartItemQuantity(productId, item.quantity + 1);
  };

  const decreaseQuantity = (productId) => {
    const item = cart.find(item => item.productId._id === productId);
    if (item && item.quantity > 1) {
      updateCartItemQuantity(productId, item.quantity - 1);
    }
  };

  const removeItemFromCart = async (productId) => {
    const userId = localStorage.getItem("userId");
    try {
      await axios.delete(`/cart/${userId}/${productId}`);
      setCart(prevCart => prevCart.filter(item => item.productId._id !== productId));
      fetchCartData(); // refresh total price
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  if (loading) return <p className="text-center mt-5">Loading...</p>;
  if (error) return <p className="text-center text-danger mt-5">{error}</p>;

  return (
    <div className="container-fluid bg-dark text-light p-5">
      <h1 className="ms-5 text-warning">Shopping Cart</h1>
      <hr />
      {cart.length > 0 ? (
        <div className="row justify-content-center">
          <div className="col-md-8">
            <ul className="list-unstyled p-5">
              {cart.map((item) => (
                <li key={item.productId._id} className="media mb-4">
                  <img
                    src={item.productId.imageUrl}
                    alt={item.productId.name}
                    className="mr-3 img-fluid"
                    width="240rem"
                  />
                  <div className="media-body">
                    <h5 className="mt-0 mb-1">{item.productId.name}</h5>
                    <p>₹{item.price}/day</p>
                    <div className="d-flex align-items-center">
                      <p className="me-2 mb-0">Quantity:</p>
                      <button
                        className="btn btn-dark text-warning me-2 fs-3"
                        onClick={() => decreaseQuantity(item.productId._id)}
                      >
                        -
                      </button>
                      <p className="text-light me-2 fs-4 mb-0">{item.quantity}</p>
                      <button
                        className="btn btn-dark text-warning me-2 fs-3"
                        onClick={() => increaseQuantity(item.productId._id)}
                      >
                        +
                      </button>
                      <button
                        className="btn btn-outline-warning"
                        onClick={() => removeItemFromCart(item.productId._id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  <hr />
                </li>
              ))}
            </ul>
          </div>
          <div className="col-md-4">
            <div className="card bg-warning text-dark">
              <div className="card-body">
                <h5 className="card-title">Total Price</h5>
                <p className="card-text">₹{totalPrice.toFixed(2)}</p>
                <Link to="/checkout" className="btn btn-dark">
                  Proceed to Checkout
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-center">Your cart is empty</p>
      )}
    </div>
  );
};

export default CartPage;
