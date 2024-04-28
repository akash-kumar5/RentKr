import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [filterStatus, setFilterStatus] = useState('all'); // Default filter status is 'All'

  useEffect(() => {
    fetchOrders();
  }, [filterStatus]); // Refetch orders when filter status changes

  const fetchOrders = async () => {
    try {
      let url = 'http://localhost:5000/api/order/viewall';
      if (filterStatus !== 'all') {
        url += `/${filterStatus}`; // Append filter status to URL if it's not 'All'
      }
      const response = await axios.get(url);
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
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className='text-warning text-center mb-0'>Order Management</h1>
        <div className="dropdown">
          <button className="btn btn-outline-warning dropdown-toggle" type="button" id="statusDropdown" data-bs-toggle="dropdown" aria-expanded="false">
            {filterStatus === 'all' ? 'All Orders' : filterStatus.charAt(0).toUpperCase() + filterStatus.slice(1)} {/* Display selected status */}
          </button>
          <ul className="dropdown-menu" aria-labelledby="statusDropdown">
            <li><button className="dropdown-item" onClick={() => setFilterStatus('pending')}>Pending Orders</button></li>
            <li><button className="dropdown-item" onClick={() => setFilterStatus('confirmed')}>Confirmed Orders</button></li>
            <li><button className="dropdown-item" onClick={() => setFilterStatus('all')}>All Orders</button></li>
          </ul>
        </div>
      </div>
      <div>
        <ul className="list-unstyled">
          {orders.map((order) => {
            if (filterStatus === 'all' || order.status === filterStatus) {
              return (
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
                  <Link to={`/order/${order._id}`} className="text-warning">View Full Order Details</Link>
                  {/* Buttons to change order status */}
                  <div className="d-flex mt-1">
                    {order.status === 'confirmed' ? (
                      <button className="btn btn-warning" onClick={() => handleChangeStatus(order._id, 'pending')}>Pending</button>
                    ) : (
                      <button className="btn btn-success me-2" onClick={() => handleChangeStatus(order._id, 'confirmed')}>Confirm the Order</button>
                    )}
                    <button className="btn btn-outline-danger" onClick={() => handleChangeStatus(order._id, 'cancelled')}>Cancel Order</button>
                    
                  </div>
                </li>
              );
            } else {
              return null; // If filter status doesn't match, don't render the order
            }
          })}
        </ul>
      </div>
    </div>
  );
};

export default OrderManagement;
