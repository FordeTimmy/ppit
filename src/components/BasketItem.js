// BasketItem.js
import React from 'react';

const BasketItem = ({ item }) => {
  return (
    <div className="basket-item">
      <img src={item.image} alt={item.name} className="basket-item-image" />
      <div className="basket-item-details">
        <h3 className="basket-item-name">{item.name}</h3>
        <p className="basket-item-price">{item.price}</p>
      </div>
    </div>
  );
};

export default BasketItem;
