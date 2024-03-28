import React from "react";

const Cart = ({ cart, removeFromCart }) => {
  console.log(cart);
  return (
    <div>
      <h2>Shopping Cart</h2>
      {cart && cart.length > 0 ? (
        <ul>
          {cart.map((item, index) => (
            <li key={index}>
              {item.name} - ₹{item.price}/day
              <button onClick={() => removeFromCart(index)}>Remove</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>Your cart is empty</p>
      )}
    </div>
  );
};

export default Cart;
