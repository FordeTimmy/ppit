import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/login';
import Home from './components/home'; // Corrected import path
import ElectricBikeList from './components/ElectricBikeList';
import BikeDetails from './components/BikeDetails';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} /> {/* Updated route for Home */}
        <Route path="/Electricbikes" element={<ElectricBikeList />} />
        <Route path="/Electricbikes/:id" element={<BikeDetails />} />
        {/* Additional routes for Kidsbikes and other pages */}
      </Routes>
    </Router>
  );
}

export default App;
