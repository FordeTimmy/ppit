import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/login';
import Home from './components/home'; // Corrected import path
import ElectricBikeList from './components/ElectricBikeList';
import BikeDetails from './components/BikeDetails';
import KidsBikeList from './components/KidsBikeList'; // Import KidsBikeList component
import KidsBikeDetails from './components/KidsBikeDetails'; // Import KidsBikeDetails component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} /> {/* Updated route for Home */}
        <Route path="/Electricbikes" element={<ElectricBikeList />} />
        <Route path="/Electricbikes/:id" element={<BikeDetails />} />
        <Route path="/Kidsbikes" element={<KidsBikeList />} /> {/* Route for KidsBikeList */}
        <Route path="/Kidsbikes/:id" element={<KidsBikeDetails />} /> {/* Route for KidsBikeDetails */}
      </Routes>
    </Router>
  );
}

export default App;
