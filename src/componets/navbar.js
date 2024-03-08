// Navbar.js

import React from 'react';

const Navbar = () => {
  return (
    <nav>
      <ul className="navbar">
        <li><a href="#">Home</a></li>
        <li><a href="#">About Us</a></li>
        <li className="dropdown">
          <a href="#">Create</a>
          <div className="dropdown-content">
            <a href="#">Page 1</a>
            <a href="#">Page 2</a>
            {/* Add more dropdown items as needed */}
          </div>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
