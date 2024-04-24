import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './adminLogin.css'; // Rename the CSS file to adminLogin.css
import BikeLogo from '../images/BikeLogo.png';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase';

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
            handleAdminLogin(true);
            navigate('/AdminDashboard'); // Redirect to admin dashboard.
          } else if (!isAdmin) {
            // User is not an admin and wants to log in as a regular user.
            handleAdminLogin(false);
            navigate('/'); // Redirect to regular user page.
          } else {
            // User is not an admin and tries to log in as admin.
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
    <div>
      <div className="logo-container"> {/* Add a div for logo container */}
        <img src={BikeLogo} alt="Bike Logo" className="logo" />
      </div>
      <h2>Login</h2>
      <div>
        <label>Email:</label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)} // Update the email state based on user input
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)} // Update the password state based on user input
        />
      </div>
      <button onClick={() => handleLogin(false)}>Login as User</button>
      <button onClick={() => handleLogin(true)}>Login as Admin</button>
      {errorMessage && <p>{errorMessage}</p>} {/* Display the error message if any */}
    </div>
  );
}

export default AdminLogin;
