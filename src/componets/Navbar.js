import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';

const Navbar = () => {
  return (
    <header className="navbar-header">
      <div className="top-bar">
        <Link to="/sign-in" className="top-link">Sign In</Link> | 
        <Link to="/register" className="top-link">Register</Link>
      </div>
      <nav className="navbar">
        <Link to="/" className="brand-logo">Roberts & Forde Cycles</Link>
        <ul className="nav-links">
          <li className="nav-item">
            <Link to="/bikes" className="nav-link">Bikes</Link>
            {/* Dropdown content could go here if needed */}
          </li>
          <li className="nav-item">
            <Link to="/accessories" className="nav-link">Accessories</Link>
            {/* Dropdown content could go here if needed */}
          </li>
          {/* More nav items here */}
           <li className="nav-item">
            <Link to="/contact" className="nav-link">Contact Us</Link>
          </li>
          {/* ... additional links and dropdowns as needed */}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;