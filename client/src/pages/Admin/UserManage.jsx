import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserManage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/auth/profiles');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const deleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:5000/api/auth/profile/${userId}`);
      fetchUsers(); // Refresh user list after deletion
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const makeAdmin = async (userId) => {
    if (window.confirm('Are you sure you want to make this user an admin?')) {
      try {
        // Make API call to make user an admin
        await axios.put(`http://localhost:5000/api/auth/profile/${userId}/admin`);
        fetchUsers(); // Refresh user list after updating user role
      } catch (error) {
        console.error('Error making user an admin:', error);
      }
    }
  };

  return (
    <div className="container mt-4">
      <h2>User Management</h2>
      <table className="table table-striped mt-4">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user._id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                {user.isAdmin ? (
                  <span className="text-success">Admin</span>
                ) : (
                  <>
                    <button
                      className="btn btn-danger btn-sm me-2"
                      onClick={() => deleteUser(user._id)}
                    >
                      Delete
                    </button>
                    <button
                      className="btn btn-success btn-sm"
                      onClick={() => makeAdmin(user._id)}
                    >
                      Make Admin
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManage;
