import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [newOrderData, setNewOrderData] = useState({
    productName: '',
    quantity: 0,
  });

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/order');
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewOrderData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/orders', newOrderData);
      console.log('New order created:', response.data);
      setNewOrderData({
        productName: '',
        quantity: 0,
      });
      fetchOrders();
    } catch (error) {
      console.error('Error creating new order:', error);
    }
  };

  return (
    <div className='mb-3 col-10 m-auto'>
      <h1>Order Management</h1>
      <div>
        <h2>Orders</h2>
        <ul>
        {orders.map((order) => (
  <li key={order._id}>
    <p>Date : {order.createdAt}</p>
    <p>Status: {order.status}</p>
    <ul>
      {order.products.map((product) => (
        <li key={product._id}>
          <p>Product: {product._id}</p>
          <p>Quantity: {product.quantity}</p>
        </li>
      ))}
    </ul>
    <p>Price: {order.totalPrice}</p>
  </li>
))}

        </ul>
      </div>
    </div>
  );
};

export default OrderManagement;
