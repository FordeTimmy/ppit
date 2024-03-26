import React from 'react';
import ProductItem from './ProductItem';
import './styles.css';

import eBikeImage from '../images/E-bike.jpg';
import kidsBikeImage from '../images/Kids-bike.jpg';
import Navbar from './navbar'; // Import the Navbar component

const Home = () => {
  return (
    <div className="home-page-container">
      <Navbar /> {/* Include the Navbar component */}
     
      <div className="product-list">
        <ProductItem
          title="Electric Bikes"
          imageUrl={eBikeImage}
          // Link to Electricbikes page
          linkUrl="/Electricbikes"
        />
        <ProductItem
          title="Kids Bikes"
          imageUrl={kidsBikeImage}
          // Link to Kidsbikes page
          linkUrl="/Kidsbikes"
        />
        {/* Additional ProductItem components for more product
        tests */}
        
      </div>
    </div>
  );
}

export default Home;
