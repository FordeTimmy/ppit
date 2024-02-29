import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase';

function Login() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Login successful
        console.log("Login successful", userCredential);
        navigate('/'); // Redirect to home after successful login
      })
      .catch((error) => {
        // Handle login error
        setErrorMessage('Invalid email or password.');
      });
  };

  const handleRegistration = () => {
    if (!email || !password) {
      setErrorMessage('Email and password are required.');
      return;
    }
    if (password.length < 6) {
      setErrorMessage('Password should be at least 6 characters.');
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Registration successful
        console.log("Registration successful", userCredential);
        setIsRegistering(false);
        setErrorMessage('Registration successful. You can now log in.');
      })
      .catch((error) => {
        // Handle registration error
        setErrorMessage(error.message);
      });
  };

  return (
    <div>
      <h2>{isRegistering ? 'Register' : 'Login'}</h2>
      {isRegistering && (
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)} // Update the username state based on user input
          />
        </div>
      )}
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
      {isRegistering ? (
        <button onClick={handleRegistration}>Register</button> // Call handleRegistration when the "Register" button is clicked
      ) : (
        <button onClick={handleLogin}>Login</button> // Call handleLogin when the "Login" button is clicked
      )}
      <button onClick={() => setIsRegistering(!isRegistering)}>
        {isRegistering ? 'Switch to login' : 'Switch to Register'} {/* Toggle between "Switch to Login" and "Switch to Register" based on the current form */}
      </button>
      {errorMessage && <p>{errorMessage}</p>} {/* Display the error or success message */}
    </div>
  );
}

export default Login;
