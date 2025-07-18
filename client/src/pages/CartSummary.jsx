import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const CartSummary = ({ cart, updateCart }) => {
  // Calculate total price and total quantity
  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);

  const removeFromCart = async (productId) => {
    try {
      const userId = localStorage.getItem("userId");
      await axios.delete(`/cart/${userId}/${productId}`);
      // Update the cart after removing the item
      updateCart();
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  return (
    <div className="container-fluid bg-dark text-light p-5">
      <h2 className="ms-5 text-warning">Cart Summary</h2>
      <hr />
      {cart && cart.length > 0 ? (
        <>
          <p>Total Items: {totalQuantity}</p>
          <p>Total Price: ₹{totalPrice.toFixed(2)}</p>
          <ul className="list-unstyled">
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
                  <p>Quantity: {item.quantity}</p>
                  <button
                    className="btn btn-outline-danger"
                    onClick={() => removeFromCart(item.productId._id)}
                  >
                    Remove
                  </button>
                </div>
                <hr />
              </li>
            ))}
          </ul>
          <Link to="/checkout">
            <button className="btn btn-dark">Proceed to Checkout</button>
          </Link>
        </>
      ) : (
        <p>Your cart is empty</p>
      )}
    </div>
  );
};

export default CartSummary;
