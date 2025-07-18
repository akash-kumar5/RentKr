import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";

const Register = () => {
  const [user, setUser] = useState({
    email: "",
    phone: "",
    password: "",
  });
  const [error, setError] = useState("");

  const { storeTokenInLs } = useAuth();
  const navigate = useNavigate();

  const handleInput = (e) => {
    const { name, value } = e.target;

    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      console.log(user);

      // Perform password validation
      if (user.password !== user.confirmPassword) {
        console.log("Passwords do not match");
        return; // Exit early if passwords don't match
      }

      const response = await fetch("/auth/register", {
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
          email: "",
          phone: "",
          password: "",
        });
        navigate("/");
        alert(res_data.msg); // Alert registration success message
        window.location.reload();
      } else {
        const errorData = await response.json();
        setError(errorData.extra)
        alert(errorData.msg); // Alert registration error message
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="bg-dark text-white p-1">
      <div className="bg-dark text-white ps-5 pe-5">
        <h1 className="text-center text-warning pt-2">Registration Form</h1>
        <hr />
        <div className="row justify-content-center">
          <div className="col-lg-7">
          <form
          action=""
          className="card  bg-dark text-warning"
          onSubmit={handleSubmit}
        >
          {error && <div className="alert alert-danger">{error}</div>}
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

          <div className="p-3 ms-5 me-5 fs-4">
            <label htmlFor="confirmPassword">Confirm Password :</label>
            <input
              className="form-control"
              type="password"
              name="confirmPassword"
              placeholder="Confirm password :"
              id="confirmPassword"
              required
              onChange={handleInput}
            />
          </div>

          <div className="text-center flex mt-3 mb-4">
            <button
              type="submit"
              className="btn btn-lg margin-auto text-dark btn-warning mb-2"
            >
              Register
            </button><br />
            <Link to="/login" className="text-warning text-decoration-none">Already a User? Login Now.</Link>
          </div>

        </form>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Register;
