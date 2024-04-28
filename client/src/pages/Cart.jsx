import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const fTotalPrice = totalPrice.toFixed(2);


  useEffect(() => {
    fetchCartData();
  }, []);

  const fetchCartData = async () => {
    try {
      const userId = localStorage.getItem('userId');
      const response = await axios.get(`http://localhost:5000/api/cart/${userId}`);
      setCart(response.data.items);
      console.log("",response)
      setTotalPrice(response.data.totalAmount);
    } catch (error) {
      console.error('Error fetching cart data:', error);
    }
  };

  const updateCartItemQuantity = async (productId, newQuantity) => {
    try {
      const userId = localStorage.getItem('userId');
      console.log("userid",userId,"prid:", productId,"quant", newQuantity);
      await axios.put(`http://localhost:5000/api/cart/update`, {
        userId,
        productId,
        quantity: newQuantity
      });
      console.log("update :",productId, newQuantity);
      // After updating the quantity, fetch updated cart data
      fetchCartData();
    } catch (error) {
      console.error('Error updating item quantity:', error);
    }
  };

  const increaseQuantity = (productId) => {
    console.log("increasding");
    const itemToUpdate = cart.find(item => item.productId._id === productId);
    if (itemToUpdate) {
      const newQuantity = itemToUpdate.quantity + 1;
      updateCartItemQuantity(productId, newQuantity);
    }
  };

  const decreaseQuantity = (productId) => {
    console.log("decreasing");

    const itemToUpdate = cart.find(item => item.productId._id === productId);
    
    console.log(itemToUpdate);
    if (itemToUpdate && itemToUpdate.quantity > 1) {
      const newQuantity = itemToUpdate.quantity - 1;
      console.log(productId, newQuantity);
      updateCartItemQuantity(productId, newQuantity);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const userId = localStorage.getItem('userId');
      await axios.delete(`http://localhost:5000/api/cart/${userId}/${productId}`);
      // After removing the item, fetch updated cart data
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
                <button className='btn btn-secondary text-light' onClick={() => increaseQuantity(item.productId._id)}>+</button>
                <button className='btn btn-secondary text-light' onClick={() => decreaseQuantity(item.productId._id)}>-</button>
                <button className='btn btn-secondary text-light' onClick={() => removeFromCart(item.productId._id)}>Remove</button>
                <hr />
              </li>
            ))}
          </ul>
          <p className='text-center text-warning'>Total Price: ₹{fTotalPrice}</p>
        </>
      ) : (
        <p>Your cart is empty</p>
      )}
    </div>
  );
};

export default Cart;
