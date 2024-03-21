import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Ensure CSS is modularized

const Navbar = ({ toggleSidebar }) => (
  <header className="navbar-header">
    <div className="hamburger-menu" onClick={toggleSidebar}>
      ☰
    </div>
    <div className="top-bar">
      <Link to="/sign-in" className="top-link">Sign In</Link> | 
      <Link to="/register" className="top-link">Register</Link>
    </div>
    <nav className="navbar">
      <Link to="/" className="brand-logo">Roberts & Forde Cycles</Link>
      <ul className="nav-links">
        {/* ... rest of the nav items ... */}
      </ul>
    </nav>
  </header>
);

export default Navbar;