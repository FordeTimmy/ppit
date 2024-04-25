import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const Navbar = ({ isAdmin, handleLogout }) => {
  const handleLogoutClick = () => {
    handleLogout();
  };

  return (
    <header className="navbar-header">
      <Link to="/home" className="brand-logo">Roberts & Forde Cycles</Link>
      <nav className="nav-container">
        <ul className="nav-links">
          <li className="nav-item">
            <Link to="/Bikes" className="nav-link">Bikes</Link>
          </li>
          <li className="nav-item">
            <Link to="/accessories" className="nav-link">Accessories</Link>
          </li>
        </ul>
        <ul className="nav-links right-items">
          {isAdmin && (
            <li className="nav-item">
              <Link to="/admin-dashboard" className="nav-link">Admin Dashboard</Link>
            </li>
          )}
          {isAdmin ? (
            <li className="nav-item">
              <button onClick={handleLogoutClick} className="nav-link">Logout</button>
            </li>
          ) : (
            <>
              <li className="nav-item">
                <Link to="/admin" className="nav-link">Admin Login</Link>
              </li>
              
            </>
          )}
          <li className="nav-item">
            <Link to="/cart" className="nav-link">
              <FontAwesomeIcon icon={faShoppingCart} />
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
