import React from 'react';
import ProductItem from './ProductItem';
import './styles.css';

// Import images
import eBikeImage from '../images/E-bike.jpg';
import kidsBikeImage from '../images/Kids-bike.jpg';
import mountainBikeImage from '../images/MountainBike.jpg';
import womensBikeImage from '../images/WomensBike.jpg';

const Bikes = () => {
  return (
    <div className="home-page-container">
      <div className="product-list">
        <ProductItem
          title="Electric Bikes"
          imageUrl={eBikeImage}
          linkUrl="/Electricbikes" // Adjust if needed to link directly to a product or purchase page
        />
        <ProductItem
          title="Kids Bikes"
          imageUrl={kidsBikeImage}
          linkUrl="/Kidsbikes"
        />
        <ProductItem
          title="Mountain Bikes"
          imageUrl={mountainBikeImage}
          linkUrl="/MountainBikes"
        />
        <ProductItem
          title="Women's Bikes"
          imageUrl={womensBikeImage}
          linkUrl="/Womensbikes"
        />
      </div>
    </div>
  );
}

export default Bikes;
