// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import './styles.css'; // Make sure this is the path to your CSS file

// const Sidebar = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   const toggleSidebar = () => {
//     setIsOpen(!isOpen);
//   };

//   return (
//     <div className={`layout ${isOpen ? 'sidebar-open' : ''}`}>
//       <div className="hamburger-menu" onClick={toggleSidebar}>
//         ☰
//       </div>
//       <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
//         <div className="shop-name">Our Shop</div>
//         <Link to="/cart" className="cart-link">Cart</Link>
//         <ul className="sidebar-links">
//           <li><Link to="/">Home</Link></li>
//           <li><Link to="/contact">Contact Us</Link></li>
//           <li><Link to="/about">About Us</Link></li>
//           <li><Link to="/brands">Brands</Link></li>
//           <li><Link to="/delivery">Delivery Information</Link></li>
//           <li><Link to="/login">Login</Link></li>
//         </ul>
//       </aside>
//       <main className={`home-page-container ${isOpen ? 'content-shift' : ''}`}>
//         {/* Main content goes here */}
//       </main>
//     </div>
//   );
// };

// export default Sidebar;
