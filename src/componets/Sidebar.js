import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './styles.css'; // Make sure to update your styles to include the sidebar

const Sidebar = () => {
  // State to manage whether the sidebar is open or closed
  const [isOpen, setIsOpen] = useState(false);

  // Function to toggle the sidebar's visibility
  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      <div className="hamburger-menu" onClick={toggleSidebar}>
        ☰ {/* This can be replaced with an icon */}
      </div>
      {isOpen && (
        <aside className="sidebar">
          <div className="shop-name">Our Shop</div>
          <Link to="/cart" className="cart-link">
            Cart {/* This can be replaced with an icon */}
          </Link>
          <ul className="sidebar-links">
            <li><a href="#">Home</a></li>
            <li><a href="#">Contact Us</a></li>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Brands</a></li>
            <li><a href="#">Delivery Information</a></li>
            <li><Link to="/login">Login</Link></li>
          </ul>
        </aside>
      )}
    </>
  );
}

export default Sidebar;
