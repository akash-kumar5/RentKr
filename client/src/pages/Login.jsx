import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import GoogleLgn from "../components/GoogleLgn";

const Login = () => {
  const navigate = useNavigate();
  const { storeTokenInLs, setAdmin, setIsAuthenticated } = useAuth();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
  
      if (response.ok) {
        const res_data = await response.json();
        console.log("resdata",res_data);
        storeTokenInLs(res_data.token);

        setUser({
          email: "",
          password: "",
        });
        
        setIsAuthenticated(true); // Set user as authenticated
        setAdmin(res_data.isAdmin); // Set isAdmin based on response
        console.log("isadmin",res_data.isAdmin)
        
        navigate('/');
        alert("Login Successful");
        window.location.reload();
      } else {
        const errorData = await response.json();
        setError(errorData.message);
        setIsAuthenticated(false); // Set user as not authenticated
        setAdmin(false); // Reset isAdmin state
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("An error occurred while logging in. Please try again later.");
      setIsAuthenticated(false); // Set user as not authenticated
      setAdmin(false); // Reset isAdmin state
    }
  };
  

  return (
    <div>
      <h2 className="bg-dark text-warning pb-3 text-center m-0 pt-2 border-bottom">Login</h2>
      
      <div className="bg-dark text-warning p-5 pb-0 m-0">
        <form onSubmit={handleSubmit} className="p-3">
          {error && <div className="alert alert-danger">{error}</div>}
          <div className="form-group">
            <label htmlFor="email" className="text-warning">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="form-control"
              placeholder="Enter your email"
              value={user.email}
              onChange={handleInput}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="text-warning">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="form-control"
              placeholder="Enter your password"
              value={user.password}
              onChange={handleInput}
              required
            />
          </div>
          <div className="text-center mt-4">
            <button
              type="submit"
              className="btn btn-lg btn-dark btn-outline-warning"
            >
              Login
            </button>
          </div>
          <h5 className="text-center p-1 mt-3">or sign up with :</h5>
          <GoogleLgn />
        </form>
      </div>
    </div>
  );
};

export default Login;
