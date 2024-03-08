import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './styles.css';

const Navbar = () => {
  return (
    <nav>
      <ul className="navbar">
        <li className="dropdown">
          <a href="#" className="dropbtn">Menu</a>
          <div className="dropdown-content">
            <a href="#">Home</a>
            <a href="#">Contact Us</a>
            <a href="#">About Us</a>
            <a href="#">Brands</a>
            <a href="#">Delivery Information</a>
          </div>
        </li>
        <li className="search-bar">
          <input type="text" placeholder="Search for items" />
          <button type="submit">Search</button>
        </li>
        <li className="category">
          <a href="#">Bikes</a>
        </li>
        <li className="category">
          <a href="#">Kids Bikes</a>
        </li>
        <li className="category">
          <a href="#">Accessories</a>
        </li>
        <li className="category">
          <a href="#">Clothing</a>
        </li>
        <li className="login-button">
          <Link to="/login">Login</Link> {/* Link to the login page */}
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
