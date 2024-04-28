import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const CartPage = () => {
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const fTotalPrice = totalPrice.toFixed(2);

  useEffect(() => {
    fetchCartData();
  }, []);

  const fetchCartData = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const response = await axios.get(
        `http://localhost:5000/api/cart/${userId}`
      );
      setCart(response.data.items);
      setTotalPrice(response.data.totalAmount);
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  };

  const updateCartItemQuantity = async (productId, newQuantity) => {
    try {
      const userId = localStorage.getItem("userId");
      await axios.put(`http://localhost:5000/api/cart/update`, {
        userId,
        productId,
        quantity: newQuantity,
      });
      // After updating the quantity, fetch updated cart data
      fetchCartData();
    } catch (error) {
      console.error("Error updating item quantity:", error);
    }
  };

  const increaseQuantity = (productId) => {
    const itemToUpdate = cart.find((item) => item.productId._id === productId);
    if (itemToUpdate) {
      const newQuantity = itemToUpdate.quantity + 1;
      updateCartItemQuantity(productId, newQuantity);
    }
  };

  const decreaseQuantity = (productId) => {
    const itemToUpdate = cart.find((item) => item.productId._id === productId);
    if (itemToUpdate && itemToUpdate.quantity > 1) {
      const newQuantity = itemToUpdate.quantity - 1;
      updateCartItemQuantity(productId, newQuantity);
    }
  };

  const removeItemFromCart = async (productId) => {
    try {
      const userId = localStorage.getItem("userId");
      await axios.delete(
        `http://localhost:5000/api/cart/${userId}/${productId}`
      );
      // After successful deletion, fetch updated cart data
      fetchCartData();
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  return (
    <div className="container-fluid bg-dark text-light p-5">
      <h1 className="ms-5 text-warning">Shopping Cart</h1>
      <hr />
      {cart.length > 0 ? (
        <div className="row justify-content-center">
          <div className="col-md-8">
            <ul className="list-unstyled p-5">
              {cart.map((item, index) => (
                <li key={index} className="media mb-4">
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
                      <p className="text-light me-2 fs-4 mb-0">
                        {item.quantity}
                      </p>
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
                <p className="card-text">₹{fTotalPrice}</p>
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
