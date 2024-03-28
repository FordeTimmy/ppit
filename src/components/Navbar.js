// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <header className="navbar-header">
      <Link to="/" className="brand-logo">Roberts & Forde Cycles</Link>
      <div className="nav-container">
        <ul className="nav-links">
          <li className="nav-item">
            <Link to="/bikes" className="nav-link">Bikes</Link>
          </li>
          <li className="nav-item">
            <Link to="/accessories" className="nav-link">Accessories</Link>
          </li>
        </ul>
        <ul className="nav-links register-items">
          <li className="nav-item">
            <Link to="/" className="nav-link">Sign In</Link>
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
