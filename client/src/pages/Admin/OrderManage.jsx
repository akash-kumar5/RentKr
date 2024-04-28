import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/order/viewall');
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const handleChangeStatus = async (orderId, newStatus) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/order/${orderId}/status`, { status: newStatus });
      if (response.status === 200) {
        // Update the status of the order in the local state
        const updatedOrders = orders.map(order => {
          if (order._id === orderId) {
            return { ...order, status: newStatus };
          }
          return order;
        });
        setOrders(updatedOrders);
      }
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  return (
    <div className='container-fluid p-5 bg-dark text-light'>
      <h1 className='text-warning text-center mb-4'>Order Management</h1>
      <div>
        <ul className="list-unstyled">
          {orders.map((order) => (
            <li key={order._id} className="mb-4">
              <hr />
              <p className="mb-2 fs-4 text-warning"><strong>Order-Id :</strong> {order._id}</p>
              <p className="mb-2"><strong>Date:</strong> {order.createdAt}</p>
              <p className="mb-2"><strong>Status:</strong> {order.status}</p>
              <ul className="list-unstyled">
                {order.products.map((product) => (
                  <li key={product._id}>
                    <p className="mb-1"><strong>Product:</strong> {product._id}</p>
                    <p className="mb-1"><strong>Quantity:</strong> {product.quantity}</p>
                  </li>
                ))}
              </ul>
              <p className="mb-2"><strong>Price:</strong> {order.totalPrice}</p>
              {/* Buttons to change order status */}
              <div className="d-flex">
                {order.status === 'confirmed' ? (
                  <button className="btn btn-warning me-2" onClick={() => handleChangeStatus(order._id, 'pending')}>Pending</button>
                ) : (
                  <button className="btn btn-success me-2" onClick={() => handleChangeStatus(order._id, 'confirmed')}>Confirm</button>
                )}
                <button className="btn btn-danger" onClick={() => handleChangeStatus(order._id, 'cancelled')}>Cancel</button>
                <Link to={`/order/${order._id}`} className="btn btn-primary">View Full Order</Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default OrderManagement;
