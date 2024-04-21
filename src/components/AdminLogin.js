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

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("Login successful", userCredential);
  
      // Check if the user has the admin custom claim set.
      userCredential.user.getIdTokenResult()
        .then((idTokenResult) => {
          if (!!idTokenResult.claims.admin) {
            // User is an admin.
            handleAdminLogin(true);
            navigate('/admindashboard'); // Redirect to admin dashboard.
          } else {
            // User is not an admin.
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
      <button onClick={handleLogin}>Login</button> {/* Call handleLogin when the "Login" button is clicked */}
      {errorMessage && <p>{errorMessage}</p>} {/* Display the error message if any */}
    </div>
  );
}

export default AdminLogin;
