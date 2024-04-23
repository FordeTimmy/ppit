import React, { useState, useEffect } from 'react';
import './CheckoutPage.css';
import { useLocation } from 'react-router-dom';
import CartItem from './CartItem'; // Import the CartItem component

const CheckoutPage = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [cartItems, setCartItems] = useState([]);
  
  const location = useLocation();

  useEffect(() => {
    if (location && location.state && location.state.cartItems) {
      setCartItems(location.state.cartItems);
    }
  }, [location]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Order processed:', { fullName, email, address, city, postalCode, cardNumber, expiryDate, cvv, cartItems });
    setFullName('');
    setEmail('');
    setAddress('');
    setCity('');
    setPostalCode('');
    setCardNumber('');
    setExpiryDate('');
    setCvv('');
  };

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="checkout-container">
      <h2 className="checkout-heading">Checkout</h2>
      <div className="checkout-body">
      <form onSubmit={handleSubmit} className="checkout-form">
          <h3>Your Information</h3>
          <input type="text" placeholder="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="text" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} />
          <input type="text" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} />
          <input type="text" placeholder="Postal Code" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} />
          <input type="text" placeholder="Card Number" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} />
          <input type="text" placeholder="Expiry Date" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} />
          <input type="text" placeholder="CVV" value={cvv} onChange={(e) => setCvv(e.target.value)} />
          <button type="submit" className="checkout-button">Place Order</button>
        </form>
        
        <div className="cart-container">
          <div className="cart-summary">
            <h3>My Cart</h3>
            <ul className="cart-items-list">
              {cartItems.map((item, index) => (
                <CartItem
                  key={index}
                  item={item}
                  updateQuantity={() => {}} // Dummy function for consistency
                  removeFromCart={() => {}} // Dummy function for consistency
                />
              ))}
            </ul>
            <div className="total-price">Total Price: €{totalPrice.toFixed(2)}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
