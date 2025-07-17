import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
      const response = await fetch("https://rentkr.onrender.com/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
  
      if (response.ok) {
        const res_data = await response.json();
        console.log("resdata", res_data);
        storeTokenInLs(res_data.token);

        setUser({
          email: "",
          password: "",
        });
        
        setIsAuthenticated(true); // Set user as authenticated
        setAdmin(res_data.isAdmin); // Set isAdmin based on response
        console.log("isadmin", res_data.isAdmin)
        
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
    <div className="container-fluid bg-dark text-light">
              <h2 className="text-warning text-center mb-4 pt-2">Login</h2>
<hr />
      <div className="row justify-content-center">
        <div className="col-lg-7 col-md-8 col-sm-10">
          <div className="card bg-dark text-warning">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
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
                    className="btn btn-lg btn-dark btn-outline-warning mb-3"
                  >
                    Login
                  </button><br />
                  <Link to="/register" className="text-decoration-none text-warning">New User? Register Now.</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
