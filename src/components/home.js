import React from 'react';
import ProductItem from './ProductItem';
import './styles.css';

// Import images
import eBikeImage from '../images/E-bike.jpg';
import kidsBikeImage from '../images/Kids-bike.jpg';
import mountainBikeImage from '../images/MountainBike.jpg'; // Ensure this image is in your images directory
import womensBikeImage from '../images/WomensBike.jpg'; // Import the Women's Bike image
import Navbar from './Navbar';

const Home = () => {
  return (
    <div className="home-page-container">
      <Navbar /> {/* Include the Navbar component */}
     
      <div className="product-list">
        <ProductItem
          title="Electric Bikes"
          imageUrl={eBikeImage}
          linkUrl="/Electricbikes" // Link to the Electricbikes page
        />
        <ProductItem
          title="Kids Bikes"
          imageUrl={kidsBikeImage}
          linkUrl="/Kidsbikes" // Link to the Kidsbikes page
        />
        <ProductItem
          title="Mountain Bikes"
          imageUrl={mountainBikeImage}
          linkUrl="/MountainBikes" // Link to the Mountainbikes page
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
