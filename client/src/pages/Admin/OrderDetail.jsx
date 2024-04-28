// OrderDetails.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const OrderDetails = () => {
  const { orderId } = useParams();
  console.log("orderId",orderId);
  const [order, setOrder] = useState(null);

  useEffect(() => {
    fetchOrderDetails();
  }, []);

  const fetchOrderDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/order/${orderId}`);
      setOrder(response.data);
    } catch (error) {
      console.error('Error fetching order details:', error);
    }
  };

  if (!order) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <h2>Order Details</h2>
      <p><strong>Order ID:</strong> {order._id}</p>
      <p><strong>Date:</strong> {order.createdAt}</p>
      <p><strong>Status:</strong> {order.status}</p>
      <p><strong>Delivery Details:</strong></p>
      <ul>
        <li><strong>Name:</strong> {order.deliveryDetails.firstName} {order.deliveryDetails.lastName}</li>
        <li><strong>Phone:</strong> {order.deliveryDetails.phone}</li>
        <li><strong>Address:</strong> {order.deliveryDetails.address}, {order.deliveryDetails.city}, {order.deliveryDetails.state} {order.deliveryDetails.postalCode}</li>
      </ul>
      <p><strong>Delivery Method:</strong> {order.deliveryMethod}</p>
      <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
      <p><strong>Products:</strong></p>
      <ul>
        {order.products.map(product => (
          <li key={product._id}>
            <p><strong>Product ID:</strong> {product.productId}</p>
            <p><strong>Quantity:</strong> {product.quantity}</p>
            <p><strong>Price:</strong> ${product.price}</p>
          </li>
        ))}
      </ul>
      <p><strong>Total Price:</strong> ${order.totalPrice}</p>
    </div>
  );
};

export default OrderDetails;
