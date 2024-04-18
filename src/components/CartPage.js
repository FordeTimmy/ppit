import React from 'react';
import { useCart } from './CartContext';
import CartItem from './CartItem';  // This would be a component for individual cart items.
import { db } from '../firebase';

const CartPage = () => {
  const { cartItems, updateQuantity, removeFromCart, checkout } = useCart();

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div>
      <h2>Cart</h2>
      {cartItems.map(item => (
        <CartItem
          key={item.id}
          item={item}
          updateQuantity={updateQuantity}
          removeFromCart={removeFromCart}
        />
      ))}
      <div>Total Price: €{totalPrice.toFixed(2)}</div>
      <button onClick={checkout}>Checkout</button>
    </div>
  );
};

export default CartPage;
