import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/login'; // Import the Login component
import Home from './components/home'; // Import the Home component
import ElectricBike from './components/Electricbike'; // Corrected import path
import KidsBike from './components/Kidsbike'; // Corrected import path

function App() {
  return (
    <Router>
      <Routes>
        {/* Route for the login page */}
        <Route path="/" element={<Login />} />
        {/* Route for the home page */}
        <Route path="/home" element={<Home />} />
        {/* <Route path="/bike/:id" element={<BikeDetails />} /> */}
        <Route path="/Electricbikes" element={<ElectricBike />} /> {/* Corrected element attribute */}
        <Route path="/Kidsbikes" element={<KidsBike />} /> {/* Corrected element attribute */}
      </Routes>
    </Router>
  );
}

export default App;
