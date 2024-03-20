import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div>
      <div>
        <div className="row bg-dark text-light sticky-bottom m-auto p-5 pb-0">
          <div className="col-lg-4 col-md-6 mb-4">
            <h3 className="footer-title">
              <span>
                Quick <strong>Links</strong>
              </span>
            </h3>
            <hr className="line" />
            <ul className="list-unstyled text-light mt-3 fs-5">
              <li>
                <Link
                  to="/src/Folder/RegisterDonor.js"
                  className="text-decoration-none text-light"
                >
                  {" "}
                </Link>
              </li>
              <li>
                <Link
                  to="/src/Folder/BloodBank.js"
                  className="text-decoration-none text-light"
                >
                  Find Rental Items
                </Link>
              </li>
              <li>
                <Link
                  to="/src/Folder/PostRequest.js"
                  className="text-decoration-none text-light"
                  title="Click to Locate"
                >
                  Post Item for Rent
                </Link>
              </li>
              <li>
                <Link
                  to="/src/Folder/About.js"
                  className="text-decoration-none text-light"
                >
                  About RentKr
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-lg-4 col-md-6 mb-4">
            <h3 className="">
              <span>
                Get <strong>Engaged</strong>
              </span>
            </h3>
            <hr className="line" />
            <ul className="list-unstyled mt-3 fs-5">
              <li>
                <Link
                  to="/src/Folder/DonorLogin.js"
                  className="text-decoration-none text-light"
                >
                  As a Campus Ambassador
                </Link>
              </li>
              <li>
                <Link
                  to="/src/Folder/OrganizeDrive.js"
                  className="text-decoration-none text-light"
                >
                  Job Seeker
                </Link>
              </li>
              {/* <li><Link to="/src/Folder/"  className="text-decoration-none text-light">Donate to BBMS</Link></li>  */}
            </ul>
          </div>

          <div className="col-lg-4 col-md-6 mb-4">
            <h3>
              <span>Get in touch</span>
            </h3>
            <hr className="line" />
            <div className="mt-3 m-0">
              <strong className="text-warning">
                RentKr : Your Local Rental Platform
              </strong>{" "}
              <br />
              <strong>Ph.no:</strong> 011-69699696, 011-23731778
              <br />
              <strong>Email:</strong> rentkr09@gmail.com <br />
              <br />
              <div className="row social-menu mt-0 p-0">
                <p>
                  {" "}
                  <Link to="">
                    <i className="bi bi-facebook mt-0 col-4 fs-1 me-4 m-0"></i>
                  </Link>
                  <Link to="">
                    <i className="bi bi-twitter col-3 fs-1 me-4"></i>
                  </Link>
                  <Link to="">
                    <i className="bi bi-instagram col-3 fs-1 me-4"></i>
                  </Link>
                  <Link to="">
                    <i className="bi bi-linkedin col-3 fs-1 me-4"></i>
                  </Link>
                </p>
              </div>
            </div>
          </div>
          <div className="footer text-center text-light mt-2">
            {/* <p>
              © Copyright 2022<span id="demo"></span>{" "}
              <span className="brand">RentKr. </span> All Rights Reserved.
            </p> */}
            <p>Made with 💖 by Niku cutie</p>
          </div>
        </div>
      </div>
    </div>
  );
}
