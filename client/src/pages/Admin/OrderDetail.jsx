import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const OrderDetails = () => {
  const { orderId } = useParams();
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
    <div className="container-fluid bg-dark text-light p-5">
      <h2 className="text-center text-warning">Order Details</h2>
      <hr className="text-warning" />
      <p><strong>Order ID:</strong> {order._id}</p>
      <p><strong>Date:</strong> {order.createdAt}</p>
      <p className='text-warning'><strong>Status:</strong> {order.status}</p>
      <hr />
      <div>
        <p className="mb-0 text-warning fs-4"><strong>Delivery Details:</strong></p>
        <ul className="list-unstyled ps-4">
          <li><strong>Name:</strong> {order.deliveryDetails.firstName} {order.deliveryDetails.lastName}</li>
          <li><strong>Phone:</strong> {order.deliveryDetails.phone}</li>
          <li><strong>Address:</strong> {order.deliveryDetails.address}, {order.deliveryDetails.city}, {order.deliveryDetails.state} {order.deliveryDetails.postalCode}</li>
        </ul>
      </div>
      <p><strong>Delivery Method:</strong> {order.deliveryMethod}</p>
      <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
      <div>
        <hr />
        <p className="mb-0 fs-4 text-warning"><strong>Products:</strong></p>
        <ul className="list-unstyled ps-4">
          {order.products.map(product => (
            <li key={product._id}>
              <p><strong>Product ID:</strong> {product.productId}</p>
              <p><strong>Quantity:</strong> {product.quantity}</p>
              <p><strong>Price:</strong> ₹{product.price}</p>
            </li>
          ))}
        </ul>
      </div>
      <p className='text-warning'><strong>Total Price:</strong> ₹{order.totalPrice}</p>
    </div>
  );
};

export default OrderDetails;
