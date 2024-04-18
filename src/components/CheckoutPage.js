import React, { useState } from 'react';
import './CheckoutPage.css';

const CheckoutPage = () => {
  // State variables to store user information and cart items
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [cartItems, setCartItems] = useState([]);

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Process the order or perform validation here
    console.log('Order processed:', { fullName, email, address, city, postalCode, cardNumber, expiryDate, cvv, cartItems });
    // Optionally, you can reset the form fields after submission
    setFullName('');
    setEmail('');
    setAddress('');
    setCity('');
    setPostalCode('');
    setCardNumber('');
    setExpiryDate('');
    setCvv('');
    setCartItems([]);
  };

  return (
    <div className="checkout-container">
      <h2 className="checkout-heading">Checkout</h2>
      <div className="cart-area">
        <h3>My Cart</h3>
        {/* Display cart items here */}
        <ul>
          {cartItems.map((item, index) => (
            <li key={index}>{item.name} - ${item.price}</li>
          ))}
        </ul>
      </div>
      <form onSubmit={handleSubmit} className="checkout-form">
        <div className="form-group">
          <label htmlFor="fullName" className="form-label">Full Name:</label>
          <input type="text" id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} className="form-input" required />
        </div>
        <div className="form-group">
          <label htmlFor="email" className="form-label">Email:</label>
          <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-input" required />
        </div>
        <div className="form-group">
          <label htmlFor="address" className="form-label">Address:</label>
          <input type="text" id="address" value={address} onChange={(e) => setAddress(e.target.value)} className="form-input" required />
        </div>
        <div className="form-group">
          <label htmlFor="city" className="form-label">City:</label>
          <input type="text" id="city" value={city} onChange={(e) => setCity(e.target.value)} className="form-input" required />
        </div>
        <div className="form-group">
          <label htmlFor="postalCode" className="form-label">Postal Code:</label>
          <input type="text" id="postalCode" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} className="form-input" required />
        </div>
        <div className="form-group">
          <label htmlFor="cardNumber" className="form-label">Card Number:</label>
          <input type="text" id="cardNumber" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} className="form-input" required />
        </div>
        <div className="form-group">
          <label htmlFor="expiryDate" className="form-label">Expiry Date:</label>
          <input type="text" id="expiryDate" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} className="form-input" required />
        </div>
        <div className="form-group">
          <label htmlFor="cvv" className="form-label">CVV:</label>
          <input type="text" id="cvv" value={cvv} onChange={(e) => setCvv(e.target.value)} className="form-input" required />
        </div>
        <button type="submit" className="checkout-button">Place Order</button>
      </form>
    </div>
  );
};

export default CheckoutPage;
