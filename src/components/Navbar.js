import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

const Navbar = () => {
  return (
    <>
      <header className="navbar-header">
        <Link to="/home" className="brand-logo">Roberts & Forde Cycles</Link>
        <div className="nav-container"> {/* Wrapper for nav links and register items */}
          <ul className="nav-links">
            {/* Your other nav items here */}
            <li className="nav-item">
              <Link to="/bikes" className="nav-link">Bikes</Link>
            </li>
            <li className="nav-item">
              <Link to="/accessories" className="nav-link">Accessories</Link>
            </li>
          </ul>
          <ul className="nav-links register-items"> {/* Separate container for register items */}
            <li className="nav-item">
              <Link to="/" className="nav-link">Sign In</Link>
            </li>
            <li className="nav-item">
              <Link to="/register" className="nav-link">Register</Link>
            </li>
          </ul>
        </div>
      </header>
    </>
  );
};

export default Navbar;
