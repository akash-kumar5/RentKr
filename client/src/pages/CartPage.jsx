import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const CartPage = () => {
  const [cart, setCart] = useState(() => {
    // Initialize cart from local storage or an empty array if no data is stored
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  const removeFromCart = (index) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  return (
    <div>
      <h2>Shopping Cart</h2>
      {cart.length > 0 ? (
        <>
          <ul>
            {cart.map((item, index) => (
              <li key={index}>
                {item.name} - ₹{item.price}/day
                <button onClick={() => removeFromCart(index)}>Remove</button>
                {/* Add remove button or any other functionality */}
              </li>
            ))}
          </ul>
          <Link to="/checkout" className="btn btn-primary">
            Proceed to Checkout
          </Link>
        </>
      ) : (
        <p>Your cart is empty</p>
      )}
    </div>
  );
};

export default CartPage;
