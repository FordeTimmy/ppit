import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    // logic to add product to cart
  };

  const updateQuantity = (productId, quantity) => {
    // logic to update product quantity
  };

  const removeFromCart = (productId) => {
    // logic to remove product from cart
  };

  const checkout = () => {
    // logic for checkout
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, updateQuantity, removeFromCart, checkout }}>
      {children}
    </CartContext.Provider>
  );
};
