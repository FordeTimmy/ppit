import React from 'react';
import ProductItem from './ProductItem';
import './styles.css';
import eBikeImage from '../images/E-bike.jpg';
import kidsBikeImage from '../images/Kids-bike.jpg';
import Sidebar from './Sidebar'; 
import Navbar from './Navbar'; // Import the Navbar component

const HomePage = () => {
  return (
    <div className="home-page-container">
      <Navbar /> {/* Include the Navbar component */}
      <Sidebar />
      <div className="product-list">
        <ProductItem
          title="Electric Bikes"
          imageUrl={eBikeImage}
          linkUrl="/electric-bikes"
        />
        <ProductItem
          title="Kids Bikes"
          imageUrl={kidsBikeImage}
          linkUrl="/kids-bikes"
        />
        {/* Additional ProductItem components for more products */}
      </div>
    </div>
  );
}

export default HomePage;
