// HeaderGuest.js
import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import "./Header.css"; // Import custom CSS if needed
import SearchBar from "./SearchBar";

const HeaderGuest = () => {
  const [searchQuery , setSearchQuery] = useState('')
  const handleChange = (event) => {
    setSearchQuery(event.target.value);
  }
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    // Perform search action with the searchQuery
    console.log("Search query:", searchQuery);
    
  }
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
            <SearchBar />
            <ul className="navbar-nav ms-auto mb-lg-0 d-flex bg-dark">
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
          </div>
        </div>
      </nav>
    </header>
  );
};

export default HeaderGuest;
