import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const Navbar = ({ isAdmin, cartItemCount }) => {
  return (
    <header className="navbar-header">
      <Link to="/home" className="brand-logo">Roberts & Forde Cycles</Link>
      <nav className="nav-container">
        {/* Centered links for Bikes and Accessories */}
        <ul className="nav-links">
          <li className="nav-item">
            <Link to="/Bikes" className="nav-link">Bikes</Link>
          </li>
          <li className="nav-item">
            <Link to="/accessories" className="nav-link">Accessories</Link>
          </li>
        </ul>

        {/* Right-aligned items for admin, register, and cart */}
        <ul className="nav-links right-items">
          {isAdmin && (
            <li className="nav-item">
              <Link to="/admindashboard" className="nav-link">Admin Dashboard</Link>
            </li>
          )}
          <li className="nav-item">
            <Link to="/admin" className="nav-link">Admin Login</Link>
          </li>
          <li className="nav-item">
            <Link to="/SignUp" className="nav-link">Sign Up</Link>
          </li>
          {/* Cart Button */}
          <li className="nav-item">
            <Link to="/cart" className="nav-link">
            <FontAwesomeIcon icon={faShoppingCart} />
            {cartItemCount > 0 && (
              <span className="cart-count">{cartItemCount}</span>
            )}
          </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
