import React, { createContext, useContext, useState } from 'react';

// Create a context for the cart
const CartContext = createContext({
  cartItems: [],
  addToCart: () => {},
  updateQuantity: () => {},
  removeFromCart: () => {},
  checkout: () => {},
  cartItemCount: 0
});

// Create a provider to manage the cart state and provide functions to manipulate it
export const CartProvider = ({ children }) => {
  // State to store cart items
  const [cartItems, setCartItems] = useState([]);

  // Function to add a product to the cart
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const itemExists = prevItems.find((item) => item.id === product.id);
      if (itemExists) {
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  // Function to update the quantity of a product in the cart
  const updateQuantity = (id, quantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, quantity: parseInt(quantity, 10) } : item))
    );
  };

  // Function to remove a product from the cart
  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // Function to handle checkout
  const checkout = () => {
    // Here you would typically handle the checkout process
    console.log('Checking out', cartItems);
    // After checkout, you might want to clear the cart
    setCartItems([]);
  };

  // Calculate the total number of items in the cart
  const cartItemCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  // Provide the cart state and functions through context
  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, updateQuantity, removeFromCart, checkout, cartItemCount }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to consume the cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
