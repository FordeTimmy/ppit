import React, { useState, useEffect } from 'react';
import './CheckoutPage.css';
import { useLocation } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
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
  const [stripePromise, setStripePromise] = useState(null); // Initialize stripePromise state
  
  const location = useLocation();

  useEffect(() => {
    if (location && location.state && location.state.cartItems) {
      setCartItems(location.state.cartItems);
    }
    
    // Load Stripe when the component mounts
    const fetchStripe = async () => {
      const stripe = await loadStripe('pk_test_51P8hZ8ArTxCCY3JMUnK5UAFHCyRPuzBUkqB3PLpU5ddxsLcX1raWVFdsbCVDSkgSp4rDZ3Q168iJkF3HPLxYYhBs001Vsx7gOH');
      setStripePromise(() => stripe);
    };
    
    fetchStripe();

  }, [location]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create an object with order details
    const orderDetails = {
      fullName,
      email,
      address,
      city,
      postalCode,
      cartItems
    };

    try {
      // Make a POST request to the backend to place the order and send email notification
      const response = await fetch('http://localhost:3000/place-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderDetails)
      });

      // Check if the request was successful
      if (response.ok) {
        // Order placed successfully
        console.log('Order placed successfully');
        // Redirect or show a success message to the user
      } else {
        // Handle error response
        console.error('Error placing order:', response.statusText);
        // Display an error message to the user
      }
    } catch (error) {
      // Handle network errors
      console.error('Error placing order:', error.message);
      // Display an error message to the user
    }
  };

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="checkout-container">
      <h2 className="checkout-heading">Checkout</h2>
      <div className="checkout-body">
        <form onSubmit={handleSubmit} className="checkout-form">
          <h3>Your Information</h3>
          <input type="text" placeholder="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type="text" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} required />
          <input type="text" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} required />
          <input type="text" placeholder="Postal Code" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} required />
          <input type="text" placeholder="Card Number" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} required />
          <input type="text" placeholder="Expiry Date" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} required />
          <input type="text" placeholder="CVV" value={cvv} onChange={(e) => setCvv(e.target.value)} required />
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
