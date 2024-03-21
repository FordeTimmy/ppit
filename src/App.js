import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './componets/login'; // Import the Login component
import Home from './componets/home'; // Import the Home component
// import BikeDetails from './BikeDetails';


function App() {
  return (
    <Router>
      <Routes>
        {/* Route for the login page */}
        <Route path="/" element={<Login />} />
        {/* Route for the home page */}
        <Route path="/home" element={<Home />} />
        {/* <Route path="/bike/:id" element={<BikeDetails />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
