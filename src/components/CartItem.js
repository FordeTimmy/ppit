import React from 'react';

const CartItem = ({ item, updateQuantity, removeFromCart }) => {
  return (
    <div className="cart-item">
      <img src={item.productImageUrl} alt={item.title} />
      <h3>{item.title}</h3>
      <p>€{item.price}</p>
      <input
        type="number"
        value={item.quantity}
        onChange={(e) => updateQuantity(item.id, e.target.value)}
      />
      <button onClick={() => removeFromCart(item.id)}>X</button>
    </div>
  );
};

export default CartItem;
