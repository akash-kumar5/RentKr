import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../store/auth';
import Restricted from '../Restricted';

const AdminHome = () => {
  const { isAdmin } = useAuth();
  const navigate = useNavigate();

  // Check if user is not an admin and redirect immediately
  if (!isAdmin) {
    navigate('/');
    return <Restricted />; // Return null to prevent rendering anything
  }

  return (
    <div className="container-fluid bg-dark text-light p-4">
      <h1 className="text-warning text-center">Admin Dashboard</h1>
      <div className="row mt-4">

        <div className="col-md-4 mb-5">
          <div className="card bg-warning h-80 d-flex justify-content-center align-items-center p-3">
            <div className="card-body">
              <h5 className="card-title text-dark">User Management</h5>
              <p className="card-text text-dark">Manage users, roles, and permissions.</p>
              <NavLink to="/usermanage" className="btn btn-dark">Go to User Management</NavLink>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-5">
          <div className="card bg-warning h-80 d-flex justify-content-center align-items-center p-3">
            <div className="card-body">
              <h5 className="card-title text-dark">Product Management</h5>
              <p className="card-text text-dark">Add, edit, and delete products.</p>
              <NavLink to="/productmanage" className="btn btn-dark">Go to Product Management</NavLink>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-5">
          <div className="card bg-warning h-90 d-flex justify-content-center align-items-center p-3">
            <div className="card-body">
              <h5 className="card-title text-dark">Order Management</h5>
              <p className="card-text text-dark">View and manage orders and shipments.</p>
              <NavLink to="/ordermanage" className="btn btn-dark">Go to Order Management</NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
