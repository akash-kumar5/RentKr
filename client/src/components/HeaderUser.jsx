//HeaderUser.jsx
import React from "react";
import { NavLink, Link } from "react-router-dom";
import SearchBar from "./SearchBar";

const HeaderUser = ({ handleLogoutSuccess }) => {
  return (
    <header className="bg-dark">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand fs-1 ms-3 ms-lg-5 text-light" to="/">
            <span className="text-warning">Rent</span>Kr
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo03"
            aria-controls="navbarTogglerDemo03"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse bg-dark"
            id="navbarTogglerDemo03"
          >
            <SearchBar />
            <ul className="navbar-nav ms-auto mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link text-light" to="/cartpage">
                  <i className="bi bi-cart2"></i>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link text-light" to="/products">
                  Products
                </NavLink>
              </li>

              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle text-light"
                  to="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Account
                </Link>
                <ul
                  className="dropdown-menu bg-dark"
                  aria-labelledby="navbarDropdown"
                >
                  <li className="bg-dark">
                    <NavLink
                      className="dropdown-item text-warning nav-link"
                      to="/profile"
                    >
                      My Profile
                    </NavLink>
                    <hr className="dropdown-divider border-bottom" />
                  </li>
                  <li className="bg-dark">
                    <NavLink
                      className="dropdown-item text-warning nav-link"
                      to="/order"
                    >
                      My Orders
                    </NavLink>
                    <hr className="dropdown-divider border-bottom" />
                  </li>
                  <li>
                    <button
                      className="dropdown-item nav-link"
                      onClick={handleLogoutSuccess}
                    >
                      <Link
                        to="/logout"
                        className="text-warning text-decoration-none"
                      >
                        Logout
                      </Link>
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
