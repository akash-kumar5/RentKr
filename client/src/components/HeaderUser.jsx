import React from "react";
import { NavLink, Link } from "react-router-dom";
import "./Header.css"; // Import custom CSS if needed

const HeaderUser = ({ handleLogoutSuccess }) => {
  return (
    <header className="bg-dark">
      <nav className="navbar navbar-expand-lg bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand fs-1 ms-5 text-light" to="/">
            <span className="text-warning">Rent</span>Kr
          </Link>
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
          <div
            className="collapse navbar-collapse justify-content-end bg-dark"
            id="navbarTogglerDemo03"
          >
            <ul className="navbar-nav ms-auto mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link text-light" to={"/cartpage"}>
                  <i className="bi bi-cart2"></i> Cart
                </NavLink>
              </li>
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle text-light"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  My Account
                </Link>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <Link className="dropdown-item" to="/profile">
                      Profile
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <button className="dropdown-item" onClick={handleLogoutSuccess}>
                      Logout
                    </button>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default HeaderUser;
