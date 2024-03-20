// ProductItem.js
import React from 'react';
import { Link } from 'react-router-dom';

const ProductItem = ({ title, imageUrl, linkUrl }) => {
  return (
    <div className="product-item">
      <img src={imageUrl} alt={title} className="product-image" />
      <div className="product-info">
        <h2>{title}</h2>
        <Link to={linkUrl} className="btn shop-now">SHOP NOW</Link>
      </div>
    </div>
  );
}

export default ProductItem;
