// Cart.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    fetchCartData();
  }, []);

  const fetchCartData = async () => {
    let cartData = [];
    const userId = localStorage.getItem('userId');
    
    if (userId) {
      // Fetch cart from backend if logged in
      try {
        const response = await axios.get(`https://rentkr.onrender.com/api/cart/${userId}`);
        cartData = response.data.items;
      } catch (error) {
        console.error('Error fetching cart data:', error);
      }
    } else {
      // If not logged in, fetch cart from localStorage
      cartData = JSON.parse(localStorage.getItem('cart')) || [];
    }

    setCart(cartData);
    setTotalPrice(cartData.reduce((total, item) => total + item.price * item.quantity, 0));
  };

  const updateCartItemQuantity = async (productId, newQuantity) => {
    const userId = localStorage.getItem('userId');
    
    try {
      if (userId) {
        await axios.put(`https://rentkr.onrender.com/api/cart/update`, { userId, productId, quantity: newQuantity });
      } else {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const itemIndex = cart.findIndex(item => item.productId === productId);
        if (itemIndex !== -1) {
          cart[itemIndex].quantity = newQuantity;
          localStorage.setItem('cart', JSON.stringify(cart));
        }
      }
      fetchCartData();
    } catch (error) {
      console.error('Error updating item quantity:', error);
    }
  };

  const increaseQuantity = (productId) => {
    const itemToUpdate = cart.find(item => item.productId === productId);
    if (itemToUpdate) {
      const newQuantity = itemToUpdate.quantity + 1;
      updateCartItemQuantity(productId, newQuantity);
    }
  };

  const decreaseQuantity = (productId) => {
    const itemToUpdate = cart.find(item => item.productId === productId);
    if (itemToUpdate && itemToUpdate.quantity > 1) {
      const newQuantity = itemToUpdate.quantity - 1;
      updateCartItemQuantity(productId, newQuantity);
    }
  };

  const removeFromCart = async (productId) => {
    const userId = localStorage.getItem('userId');
    
    try {
      if (userId) {
        await axios.delete(`https://rentkr.onrender.com/api/cart/${userId}/${productId}`);
      } else {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart = cart.filter(item => item.productId !== productId);
        localStorage.setItem('cart', JSON.stringify(cart));
      }
      fetchCartData();
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  return (
    <div className='container'>
      {cart.length > 0 ? (
        <>
          <ul className='pt-3'>
            {cart.map((item, index) => (
              <li key={index}>
                {item.productId.name} <br /> ₹{item.price}/day <br /> Quantity: {item.quantity} <br />
                <button className='btn btn-dark text-light me-1' onClick={() => increaseQuantity(item.productId)}>+</button>
                <button className='btn btn-dark text-light me-1' onClick={() => decreaseQuantity(item.productId)}>-</button>
                <button className='btn btn-outline-danger text-light' onClick={() => removeFromCart(item.productId)}>Remove</button>
                <hr />
              </li>
            ))}
          </ul>
          <p className='text-center text-warning'>Total Price: ₹{totalPrice.toFixed(2)}</p>
        </>
      ) : (
        <p>Your cart is empty</p>
      )}
    </div>
  );
};

export default Cart;
