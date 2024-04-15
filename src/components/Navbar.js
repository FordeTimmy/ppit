// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ isAdmin }) => {
  return (
    <header className="navbar-header">
      <Link to="/home" className="brand-logo">Roberts & Forde Cycles</Link>
      <div className="nav-container">
        <ul className="nav-links">
          <li className="nav-item">
            <Link to="/bikes" className="nav-link">Bikes</Link>
          </li>
          <li className="nav-item">
            <Link to="/accessories" className="nav-link">Accessories</Link>
          </li>
          {/* Display Admin Dashboard link only for admins */}
          {isAdmin && (
            <li className="nav-item">
              <Link to="/admindashboard" className="nav-link">Admin Dashboard</Link>
            </li>
          )}
        </ul>
        <ul className="nav-links register-items">
          <li className="nav-item">
            <Link to="/admin" className="nav-link">Admin Login</Link>
          </li>
          <li className="nav-item">
            <Link to="/register" className="nav-link">Register</Link>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
