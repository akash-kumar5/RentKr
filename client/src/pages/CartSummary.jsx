import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const CartSummary = ({ cart, updateCart }) => {
  // Calculate total price and total quantity
  const totalPrice = cart.reduce((total, item) => total + item.price, 0);
  const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);

  const removeFromCart = async (productId) => {
    try {
      await axios.delete(`http://localhost:5000/api/cart/${productId}`);
      // Update the cart after removing the item
      updateCart();
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  return (
    <div>
      <h2>Cart Summary</h2>
      <p>Total Items: {totalQuantity}</p>
      <p>Total Price: ₹{totalPrice}</p>
      <ul>
        {cart.map((item, index) => (
          <li key={index}>
            {item.name} - Quantity: {item.quantity}{" "}
            <button  onClick={() => removeFromCart(item._id)}>Remove</button>
          </li>
        ))}
      </ul>
      <Link to="/checkout">
        <button>Checkout</button>
      </Link>
    </div>
  );
};

export default CartSummary;
