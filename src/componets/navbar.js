// Navbar.js

import React from 'react';
import './styles.css';

const Navbar = () => {
  return (
    <nav>
      <ul className="navbar">
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
          <button>Login</button>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
