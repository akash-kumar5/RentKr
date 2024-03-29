import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../store/auth";
import { useNavigate } from "react-router-dom";
import Restricted from "./Restricted";

const Profile = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    name: "",
    address: "",
    gender: "",
  });

  if (!isAuthenticated) {
    navigate('/');
    return <Restricted />; // Return null to prevent rendering anything
  }

  const fetchUserData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/auth/profile/${userId}"
      );
      const userData = response.data;
      setFormData({
        username: userData.username,
        email: userData.email,
        phone: userData.phone,
        name: userData.name || "",
        address: userData.address || "",
        gender: userData.gender || "",
      });
    } catch (error) {
      console.error("Error fetching user data:", error);
      // Handle error fetching user data
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send updated user data to backend
      const response = await axios.put(
        "http://localhost:5000/api/auth/profile",
        formData
      );
      console.log("Updated user data:", response.data);
      // Optionally, display a success message or perform other actions
    } catch (error) {
      console.error("Error updating profile:", error);
      // Optionally, display an error message or handle the error in another way
    }
  };

  return (
    <div className="form-control bg-dark text-warning">
      <h2 className="text-center">Profile</h2>
      <form onSubmit={handleSubmit} className="container-fluid flex">
        <label>
          Username:
          <input
            className="form-control ms-3 border-0 bg-dark text-warning"
            type="text"
            name="username"
            value={formData.username}
            readOnly
          />
        </label>
        <br />
        <label>
          Email:
          <input
            className=" form-control ms-3 border-0 bg-dark text-warning"
            type="email"
            name="email"
            value={formData.email}
            readOnly
          />
        </label>
        <br />
        <label>
          Phone:
          <input
            className=" form-control ms-3 border-0 bg-dark text-warning"
            type="text"
            name="phone"
            value={formData.phone}
            readOnly
          />
        </label>
        <br />
        <label>
          Name:
          <input
            className=" form-control ms-3 border-0 bg-dark text-warning"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Address:
          <input
            className=" form-control ms-3 border-0 bg-dark text-warning"
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Gender:
          <select name="gender" value={formData.gender} onChange={handleChange} className="form-control ms-3 border-0 bg-dark text-warning">
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </label>
        <br />
        {/* Add more fields as needed */}
        <div className="text-center">
        <button type="submit" className="btn btn-outline-warning btn-lg ">
          Save Changes
        </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
