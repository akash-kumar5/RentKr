//HeaderGuest.jsx
import React from "react";
import { NavLink, Link } from "react-router-dom";
import "./Header.css"; // Import custom CSS if needed
import SearchBar from "./SearchBar";

const HeaderGuest = () => {
  return (
    <header className="bg-dark">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand fs-1 ms-3 ms-lg-5 text-light" to="/">
            <span className="text-warning">Rent</span>Kr
          </Link>
          <SearchBar />
          <ul className="navbar-nav ms-auto mb-lg-0">
            <li className="nav-item">
              <Link to="/cartpage" className="nav-link">
                <span className="bi bi-cart2 text-light"></span>
              </Link>
            </li>
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
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav ms-auto mb-lg-0">
              <li className="nav-item">
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default HeaderGuest;
