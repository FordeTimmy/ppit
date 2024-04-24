import React, { useState } from 'react';
import './SignUp.css'; // Make sure to create a CSS file for styling

const SignUp = () => {
  const [userType, setUserType] = useState('user'); // 'user' or 'admin'

  const handleSubmit = (event) => {
    event.preventDefault();
    // Here you would typically send the form data to your server
    console.log('Form submitted', userType);
  };

  return (
    <div className="signup-container">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="fullName">Full Name</label>
          <input type="text" id="fullName" required />
        </div>
        
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" required />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" required />
        </div>
        
        <div className="form-group">
          <label>User Type</label>
          <div className="radio-group">
            <input 
              type="radio" 
              id="user" 
              name="userType" 
              value="user" 
              checked={userType === 'user'} 
              onChange={() => setUserType('user')} 
            />
            <label htmlFor="user">Normal User</label>
            
            <input 
              type="radio" 
              id="admin" 
              name="userType" 
              value="admin" 
              checked={userType === 'admin'} 
              onChange={() => setUserType('admin')} 
            />
            <label htmlFor="admin">Admin</label>
          </div>
        </div>
        
        <button type="submit" className="signup-button">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;