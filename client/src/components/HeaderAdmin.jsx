import React from "react";
import { Link } from "react-router-dom";
import "./Header.css"; // Import custom CSS if needed

const HeaderAdmin = ({ handleLogoutSuccess }) => {
  return (
    <header className="bg-dark">
      <nav className="navbar navbar-expand-lg bg-dark">
        <div className="container-fluid bg-dark">
          <Link className="navbar-brand fs-1 ms-5 text-light" to="/admin">
            <span className="text-warning">Rent</span>Kr Admin Dashboard
          </Link>
          <div
            className="collapse navbar-collapse bg-dark"
            id="navbarTogglerDemo03"
          >
            <ul className="navbar-nav ms-auto mb-lg-0 d-flex bg-dark text-light">
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle text-light"
                  to="#"
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
                    <Link to={'/logout'}>
                    <button className="dropdown-item" onClick={handleLogoutSuccess}>
                      Logout
                    </button>
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-light" to="/admin">
                  Admin Panel
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default HeaderAdmin;
