import React from 'react';
import { useCart } from './CartContext';
import CartItem from './CartItem';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const { cartItems, updateQuantity, removeFromCart, checkout } = useCart();
  const navigate = useNavigate();
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleCheckout = () => {
    checkout();
    navigate('/checkout', { state: { cartItems } }); // Pass cart items as state
  };

  return (
    <div className='home-page-container'>
    <div>
      <h2>Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          {cartItems.map(item => (
            <CartItem
              key={item.id}
              item={item}
              updateQuantity={updateQuantity}
              removeFromCart={removeFromCart}
            />
          ))}
          <div>Total Price: €{totalPrice.toFixed(2)}</div>
          <button onClick={handleCheckout}>Checkout</button>
        </>
      )}
    </div>
    </div>
  );
};

export default CartPage;
