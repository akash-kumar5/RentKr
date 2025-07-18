import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";

const OrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`https://rentkr.onrender.com/api/order/view/${userId}`);
        setOrders(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching orders:', error);
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userId]);

  return (
    <div className='container-fluid text-light bg-dark'>
      <h2 className='text-warning text-center'>Orders</h2>
      <hr />
      {loading ? (
        <div>Loading...</div>
      ) : orders.length === 0 ? (
        <div className='text-warning text-center p-5'> No orders found. <br /> <Link to="/products" className='text-decoration-none fs-3 text-warning'>Checkout Our Rental Products <i className='bi bi-arrow-right '></i></Link></div>
      ) : (
        <div>
          {orders.map((order) => (
            <div key={order._id}>
              <h3>Order ID: {order._id}</h3>
              <p>Delivery Method: {order.deliveryMethod}</p>
              <p>Payment Method: {order.paymentMethod}</p>
              <p>Total Price: ₹{order.totalPrice}</p>
              <p>Status: {order.status}</p>

              <p>Products:</p>
              <ul>
                {order.products.map((product) => (
                  <li key={product._id}>
                    {product.quantity} x {product.name} - ₹{product.price}
                  </li>
                ))}
              </ul>
              <p>Ordered At: {new Date(order.createdAt).toLocaleString()}</p>
              <hr />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderPage;
