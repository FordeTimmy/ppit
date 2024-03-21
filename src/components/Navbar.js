import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './styles.css'; 

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <header className={`navbar-header ${isOpen ? 'header-shift' : ''}`}>
        <div className="hamburger-menu" onClick={toggleSidebar}>
          ☰ 
        </div>
        <Link to="/" className="brand-logo">Roberts & Forde Cycles</Link>
        <ul className="nav-links">
          <li className="nav-item">
            <Link to="/bikes" className="nav-link">Bikes</Link>
          </li>
          <li className="nav-item">
            <Link to="/accessories" className="nav-link">Accessories</Link>
          </li>
          {/* ... other links ... */}
          <li className="nav-item">
            <Link to="/sign-in" className="nav-link">Sign In</Link>
          </li>
          <li className="nav-item">
            <Link to="/register" className="nav-link">Register</Link>
          </li>
        </ul>
      </header>
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
       
        <ul className="sidebar-links">
          <li><Link to="/home">Home</Link></li>
          {/* ... other sidebar links ... */}
        </ul>
      </aside>
     
    </>
  );
};

export default Navbar;
