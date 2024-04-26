import React from 'react';
import ProductItem from './ProductItem';
import './styles.css';

// Import images
import bikeLightsImage from '../images/BikeLights.jpg';
import bikeLocksImage from '../images/BikeLock.jpg';
import bikeReflectorsImage from '../images/BikeReflectors.jpg'; 
import Navbar from './Navbar';

const Accessories = () => {
  return (
    <div className="home-page-container">
      <Navbar /> {/* Include the Navbar component */}
     
      <div className="product-list">
        <ProductItem
          title="Bike Lights"
          imageUrl={bikeLightsImage}
          linkUrl="/bikelights" // Link to the Bike Lights page
        />
        <ProductItem
          title="Bike Locks"
          imageUrl={bikeLocksImage}
          linkUrl="/bikelocks" // Link to the Bike Locks page
        />
        <ProductItem
          title="Bike Reflectors"
          imageUrl={bikeReflectorsImage}
          linkUrl="/bikereflectors" // Link to the Bike Reflectors page
        />
      
      </div>
    </div>
  );
}

export default Accessories;
