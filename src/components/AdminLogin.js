import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import BikeLogo from '../images/BikeLogo.png';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase';
import './AdminLogin.css';

function AdminLogin({ handleAdminLogin }) {
  const [email, setEmail] = useState(''); // State for email input
  const [password, setPassword] = useState(''); // State for password input
  const [errorMessage, setErrorMessage] = useState(''); // State for error message
  const navigate = useNavigate(); // Hook for navigation

  // Function to handle login
  const handleLogin = async (isAdmin) => {
    try {
      // Sign in with email and password using Firebase authentication
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("Login successful", userCredential);

      // Check if the user has the admin custom claim set
      userCredential.user.getIdTokenResult().then((idTokenResult) => {
        if (!!idTokenResult.claims.admin && isAdmin) {
          // User is an admin and wants to log in as admin
          console.log("User is logged in as admin");
          handleAdminLogin(true); // Invoke handleAdminLogin with true
          navigate('/admin-dashboard'); // Redirect to admin dashboard
        } else if (!isAdmin) {
          // User is not an admin and wants to log in as a regular user
          console.log("User is logged in as a regular user");
          handleAdminLogin(false); // Invoke handleAdminLogin with false
          navigate('/'); // Redirect to regular user page
        } else {
          // User is not an admin and tries to log in as admin
          console.log("User is not authorized as an admin");
          handleAdminLogin(false); // Invoke handleAdminLogin with false
          setErrorMessage('You are not authorized as an admin.');
        }
      });
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage('Invalid email or password.');
    }
  };
  
  return (
    <div className='home-page-container'>
      <div className="login-container">
        <div className="logo-container">
          <img src={BikeLogo} alt="Bike Logo" className="logo" />
        </div>
        <h2 className="login-heading">Login</h2>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="text"
            value={email}
            className="input-field"
            onChange={(e) => setEmail(e.target.value)} // Update email state on change
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            className="input-field"
            onChange={(e) => setPassword(e.target.value)} // Update password state on change
          />
        </div>
        <button onClick={() => handleLogin(true)} className="submit-button">
          Login as Admin
        </button>
        {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Display error message if exists */}
      </div>
    </div>
  );
}

export default AdminLogin;
