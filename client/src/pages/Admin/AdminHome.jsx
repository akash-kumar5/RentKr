import React, {Link} from 'react';
import { NavLink } from 'react-router-dom';

const AdminHome = () => {
  return (
    <div className="container mt-4">
      <h1>Welcome to Admin Dashboard</h1>
      <div className="row mt-4">
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">User Management</h5>
              <p className="card-text">Manage users, roles, and permissions.</p>
              <NavLink to={'/usermanage'} className="btn btn-primary">Go to User Management</NavLink>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Product Management</h5>
              <p className="card-text">Add, edit, and delete products.</p>
              <NavLink to={'/productmanage'} className="btn btn-primary">Go to Product Management</NavLink>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Order Management</h5>
              <p className="card-text">View and manage orders and shipments.</p>
              <NavLink to={'/ordermanage'} className="btn btn-primary">Go to Order Management</NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
