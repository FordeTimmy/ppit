import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import CartItem from './CartItem'; // Import the CartItem component
import './CheckoutPage.css';
import { collection, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

const CheckoutPage = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [cartItems, setCartItems] = useState([]);
  const stripe = useStripe();
  const elements = useElements();
  const location = useLocation();

  useEffect(() => {
    if (location && location.state && location.state.cartItems) {
      setCartItems(location.state.cartItems);
    }

    // Load Stripe when the component mounts
    const fetchStripe = async () => {
      const stripe = await loadStripe('pk_test_51P8hZ8ArTxCCY3JMUnK5UAFHCyRPuzBUkqB3PLpU5ddxsLcX1raWVFdsbCVDSkgSp4rDZ3Q168iJkF3HPLxYYhBs001Vsx7gOH');
      // setStripePromise(() => stripe);
    };

    fetchStripe();
  }, [location]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      console.log('Stripe.js has not loaded yet.');
      return;
    }

    const cardElement = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      console.log('[error]', error);
    } else {
      console.log('[PaymentMethod]', paymentMethod);
      alert('Payment successful!');
      // Here you would handle form submission after successful payment.
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
          // Clear the form fields
          setFullName('');
          setEmail('');
          setAddress('');
          setCity('');
          setPostalCode('');
          // Clear the cart items
          setCartItems([]);
          // Show a confirmation message
          alert('Your order has been placed. You will receive an email shortly.');
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
    }
  };

  const updateQuantity = async (itemId, newQuantity) => {
    setCartItems(currentItems =>
      currentItems.map(item =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
    try {
      const itemRef = doc(db, 'products', itemId);
      await updateDoc(itemRef, { quantity: newQuantity });
      console.log('Quantity updated successfully');
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  const removeFromCart = async (itemId) => {
    setCartItems(currentItems => currentItems.filter(item => item.id !== itemId));
    try {
      const itemRef = doc(db, 'products', itemId);
      await updateDoc(itemRef, { inCart: false });
      console.log('Item removed from cart successfully');
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className='home-page-container'>
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
          <CardElement />
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
                  updateQuantity={updateQuantity}
                  removeFromCart={removeFromCart}
                />
              ))}
            </ul>
            <div className="total-price">Total Price: €{totalPrice.toFixed(2)}</div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default CheckoutPage;