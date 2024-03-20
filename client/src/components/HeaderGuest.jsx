// HeaderGuest.js
import React from "react";
import { Link } from "react-router-dom";
import "./Header.css"; // Import custom CSS if needed

const HeaderGuest = () => {
  
  return (
    <header className="bg-dark">
      <nav className="navbar navbar-expand-lg bg-dark">
        <div className="container-fluid bg-dark">
          <Link className="navbar-brand fs-1 ms-5 text-light" to="/">
            <span className="text-warning">Rent</span>Kr
          </Link>
          <div
            className="collapse navbar-collapse bg-dark"
            id="navbarTogglerDemo03"
          >
            <form
            className="d-flex search-bar col-8 bg-dark border-dark"
            role="search"
          >
            <input
              className="form-control search-input"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-warning" type="submit">
              <i className="bi bi-search"></i>
            </button>
          </form>
            <ul className="navbar-nav ms-auto mb-lg-0 d-flex bg-dark">
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
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default HeaderGuest;
