// src/components/Header.js
import React, { useState } from "react";
import { Link } from "react-router-dom"; // If using React Router
import "./Header.css"; // Import custom CSS if needed
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

const Header = ({ isAuthenticated, handleLogoutSuccess }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to handle form submission, e.g., perform search
    console.log('Search submitted:', searchQuery);
  };
  return (
    <header className="bg-dark">
      <nav className="navbar navbar-expand-lg bg-dark">
        <div className="container-fluid bg-dark">
          <button
            className="navbar-toggler bg-warning"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo03"
            aria-controls="navbarTogglerDemo03"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <Link className="navbar-brand fs-1 ms-5 text-light" to="/">
            <span className="text-warning">Rent</span>Kr
          </Link>

          {/* search bar */}
          <form
            className="d-flex search-bar col-8 bg-dark border-dark"
            role="search"
            onSubmit={handleSubmit}
          >
            <input
              className="form-control search-input"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={searchQuery}
              onChange={handleChange}
            />
            <button className="btn btn-warning" type="submit">
              <i className="bi bi-search"></i>
            </button>
          </form>
          <div
            className="collapse navbar-collapse bg-dark"
            id="navbarTogglerDemo03"
          >
            <ul className="navbar-nav ms-auto mb-lg-0 d-flex bg-dark">
              {isAuthenticated ? (
                // If user is authenticated, display user menu
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle text-light"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    My Account
                  </a>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  >
                    <li>
                      <Link
                        className="dropdown-item"
                        to="/src/components/Profile.jsx"
                      >
                        Profile
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/orders">
                        Orders
                      </Link>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <button
                        className="dropdown-item"
                        onClick={handleLogoutSuccess}
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </li>
              ) : (
                // If user is not authenticated, display login and signup links
                <>
                  <li className="nav-item">
                    <Link className="nav-link text-light" to="/login">
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link text-light" to="/register">
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
