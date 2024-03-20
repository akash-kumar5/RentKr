import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";

const Register = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });

  const { storeTokenInLs } = useAuth();

  const handleInput = (e) => {
    console.log(e);
    let name = e.target.name;
    let value = e.target.value;

    setUser({
      ...user,
      [name]: value,
    });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      console.log(user);

      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        const res_data = await response.json();
        storeTokenInLs(res_data.token);
        setUser({
          username: "",
          email: "",
          phone: "",
          password: "",
        });
        navigate("/");
      }
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-dark text-white p-5">
      <div className="registration-form container-fluid flex bg-dark text-white ps-5 pe-5">
        <h1 className="text-center text-warning mb-5">Registration Form</h1>
        <form
          action=""
          className="form-control bg-dark text-warning"
          onSubmit={handleSubmit}
        >
          <div className="p-3 ms-5 me-5 fs-4">
            <label htmlFor="username">Username :</label>
            <input
              className="form-control"
              type="text"
              name="username"
              placeholder="UserName"
              id="username"
              required
              value={user.username}
              onChange={handleInput}
            />
          </div>

          <div className="p-3 ms-5 me-5 fs-4">
            <label htmlFor="email">Email :</label>
            <input
              className="form-control"
              type="email"
              name="email"
              placeholder="Enter your email "
              id="email"
              required
              value={user.email}
              onChange={handleInput}
            />
          </div>

          <div className="p-3 ms-5 me-5 fs-4">
            <label htmlFor="phone">Phone :</label>
            <input
              className="form-control"
              type="number"
              name="phone"
              placeholder="Enter your phone"
              id="phone"
              required
              value={user.phone}
              onChange={handleInput}
            />
          </div>

          <div className="p-3 ms-5 me-5 fs-4">
            <label htmlFor="password">Password :</label>
            <input
              className="form-control"
              type="password"
              name="password"
              placeholder="Enter password :"
              id="password"
              required
              value={user.password}
              onChange={handleInput}
            />
          </div>
          <div className="text-center flex mt-3 mb-4">
            <button
              type="submit"
              className="btn btn-lg margin-auto text-dark btn-warning"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
