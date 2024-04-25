import React from 'react';
import ProductItem from './ProductItem';
import './styles.css';

// Import images
import kidsBikeImage from '../images/Kids-bike.jpg';
import womensBikeImage from '../images/WomensBike.jpg'; // Import the Women's Bike image
import SaleImage from '../images/Sale.png';
import DiscountImage from '../images/Discount.png';
import bikeLightsImage from '../images/BikeLights.jpg';
import bikeLocksImage from '../images/BikeLock.jpg';
import Navbar from './Navbar';

const Home = () => {
  return (
    <div className="home-page-container">
      <Navbar /> {/* Include the Navbar component */}

   

     
      <div className="product-list">
      <ProductItem
          title="Bike Locks"
          imageUrl={bikeLocksImage}
          linkUrl="/bikelocks" // Link to the Bike Locks page
        />
        <ProductItem
          title="Kids Bikes"
          imageUrl={kidsBikeImage}
          linkUrl="/Kidsbikes" // Link to the Kidsbikes page
        />
        <ProductItem
          title="Bike Lights"
          imageUrl={bikeLightsImage}
          linkUrl="/bikelights" // Link to the Bike Lights page
        />
        <ProductItem
          title="Women's Bikes"
          imageUrl={womensBikeImage}
          linkUrl="/Womensbikes" // Link to the Womensbikes page
        />
        {/* You can continue adding more ProductItem components here for additional bike categories */}
      </div>
    
</div>
  );
}

export default Home;
