// QuickView.js
import React, { useState } from 'react';
import './QuickView.css';

const QuickView = ({ product, onClose, addToCart }) => {
  const [showAddedMessage, setShowAddedMessage] = useState(false);

  const handleAddToCart = () => {
    addToCart(product);
    setShowAddedMessage(true);
    setTimeout(() => {
      setShowAddedMessage(false);
    }, 2000); // Dismiss the message after 2 seconds
  };

  return (
    <div className="quick-view-overlay" onClick={onClose}>
      <div className="quick-view-container" onClick={(e) => e.stopPropagation()}>
        <button className="quick-view-close" onClick={onClose}>&times;</button>
        <img src={product.productImageUrl} alt={product.title} className="quick-view-image" />
        <h2>{product.title}</h2>
        <p className="quick-view-price">€{product.price}</p>
        <p className="quick-view-description">{product.description}</p>
        <button className="add-to-cart-btn" onClick={handleAddToCart}>
          Add to Cart
        </button>
        {showAddedMessage && (
          <div className="added-to-cart-message">
            Successfully added to cart!
          </div>
        )}
      </div>
    </div>
  );
};

export default QuickView;
