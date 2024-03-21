import React from 'react';
import ProductItem from './ProductItem';
import './styles.css';
import eBikeImage from '../images/E-bike.jpg';
import kidsBikeImage from '../images/Kids-bike.jpg';


const Home = () => {
  return (
    <div className="home-page-container">
     
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
       
      </div>
    </div>
  );
}

export default Home;
