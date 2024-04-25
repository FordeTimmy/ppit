import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import BikeLogo from '../images/BikeLogo.png';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase';
import './AdminLogin.css';

function AdminLogin({ handleAdminLogin }) { // Pass handleAdminLogin as a prop
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (isAdmin) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("Login successful", userCredential);

      // Check if the user has the admin custom claim set.
      userCredential.user.getIdTokenResult()
        .then((idTokenResult) => {
          if (!!idTokenResult.claims.admin && isAdmin) {
            // User is an admin and wants to log in as admin.
            console.log("User is logged in as admin");
            handleAdminLogin(true);
            navigate('/admin-dashboard'); // Redirect to admin dashboard.
          } else if (!isAdmin) {
            // User is not an admin and wants to log in as a regular user.
            console.log("User is logged in as a regular user");
            handleAdminLogin(false);
            navigate('/'); // Redirect to regular user page.
          } else {
            // User is not an admin and tries to log in as admin.
            console.log("User is not authorized as an admin");
            handleAdminLogin(false);
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
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Password:</label>
        <input
          type="password"
          value={password}
          className="input-field"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button onClick={() => handleLogin(true)} className="submit-button">
        Login as Admin
      </button>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
    </div>
  );
  
}

export default AdminLogin;
