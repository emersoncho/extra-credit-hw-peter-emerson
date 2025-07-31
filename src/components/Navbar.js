import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; //

const Navbar = () => {
  return (
    <nav className="navbar navbar-dark navbar-expand-lg bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">George Mason University</Link>
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

        <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/survey-results">List All Surveys</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/survey-form">Take Student Survey</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;