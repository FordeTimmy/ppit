// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './componets/login'; // Import the Login component

function App() {
  return (
    <Router>
      <Routes>
        {/* Route for the login page */}
        <Route path="/" element={<Login />} /> {/* Set the Login component to render for the root path */}
      </Routes>
    </Router>
  );
}

export default App;
