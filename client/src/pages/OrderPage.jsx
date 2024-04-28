import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem("userId")

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/order/view/${userId}`);
        console.log(response);
        setOrders(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching orders:', error);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className='container text-light'>
      <h2>Orders</h2>
      {loading ? (
        <div>Loading...</div>
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
