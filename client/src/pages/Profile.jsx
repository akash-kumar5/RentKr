import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../store/auth';

const Profile = () => {
  const {user} = useAuth();
  const [profileData, setProfileData] = useState(null);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    name: '',
    address: '',
    gender: '',
    firstName: '',
    lastName: '',
    city: '',
    postalcode: '',
    state: '',
    country: ''
  });

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      setFormData({
        email:  user.email,
        phone: user.phone,
        firstName: user.firstName,
        lastName: user.lastName,
        address: user.address,
        gender: user.gender,
        city: user.city,
        postalcode: user.postalCode,
        state: user.state,
        country: user.country
      });
    } catch (error) {
      console.error('Error fetching profile data:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put('https://rentkr.onrender.com/api/auth/profile', formData);
      setProfileData(user);
      console.log('Profile updated successfully:', user);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  if (!formData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container-fluid bg-dark text-light p-5">
      <h2 className='text-warning text-center'>Profile Details </h2>
      <hr />
      <form onSubmit={handleSubmit}>
      <div className="row">
          <div className="col-md-6">
            <label>First Name:</label>
            <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} className="form-control bg-dark text-light" />
          </div>
          <div className="col-md-6">
            <label>Last Name:</label>
            <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} className="form-control bg-dark text-light" />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 col-sm-12">
            <label>Full Name:</label>
            <input type="text" name="name" value={formData.firstName + formData.lastName} className="form-control bg-dark text-light " disabled/>
          </div>
          <div className="col-md-6">
            <label>Email:</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} className="form-control bg-dark text-light" disabled />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <label>Phone:</label>
            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="form-control bg-dark text-light" />
          </div>
          <div className="col-md-6">
            <label>Gender:</label>
            <select name="gender" value={formData.gender} onChange={handleChange} className="form-control bg-dark text-light">
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>
        
        <div className="row">
          <div className="col-md-12">
            <label>Full Address:</label>
            <input type="text" name="address" value={formData.address} onChange={handleChange} className="form-control bg-dark text-light" />
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <label>City:</label>
            <input type="text" name="city" value={formData.city} onChange={handleChange} className="form-control bg-dark text-light" />
          </div>
          <div className="col-md-4">
            <label>Postal Code:</label>
            <input type="number" name="postalcode" value={formData.postalcode} onChange={handleChange} className="form-control bg-dark text-light" />
          </div>
          <div className="col-md-4">
            <label>State:</label>
            <input type="text" name="state" value={formData.state} onChange={handleChange} className="form-control bg-dark text-light" />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <label>Country:</label>
            <input type="text" name="country" value={formData.country} onChange={handleChange} className="form-control bg-dark text-light" />
          </div>
        </div>
        <button type="submit" className="btn btn-outline-warning mt-3">Update Profile</button>
      </form>
    </div>
  );
};

export default Profile;
