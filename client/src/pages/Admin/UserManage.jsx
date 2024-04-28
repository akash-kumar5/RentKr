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
    if (window.confirm('Are you sure you want to remove this user?')){
    try {
      await axios.delete(`http://localhost:5000/api/auth/profile/${userId}`);
      fetchUsers(); // Refresh user list after deletion
    } catch (error) {
      console.error('Error deleting user:', error);
    }
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
    <div className="container-fluid p-4 bg-dark text-light">
      <h2 className='text-warning text-center'>User Management</h2>
      <hr />
      <table className="table table-dark bg-dark">
        <thead className=''>
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
                  <span className="text-warning">Admin</span>
                ) : (
                  <>
                    <button
                      className="btn btn-danger btn-sm me-2"
                      onClick={() => deleteUser(user._id)}
                    >
                      Remove User
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
