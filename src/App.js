import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Login from './components/login';
import Home from './components/home';
import ElectricBikeList from './components/ElectricBikeList';
import BikeDetails from './components/BikeDetails';
import KidsBikeList from './components/KidsBikeList';
import KidsBikeDetails from './components/KidsBikeDetails';
import Navbar from './components/Navbar'; // Import the Navbar
import Accessories from './components/Accessories';
import MountainBikeList from './components/MountainBikeList'; // Adjust the path if MountainBikeList is in a different folder
import WomensBikeList from './components/WomensBikeList'; // Import WomensBikeList

const AppWrapper = () => {
  const location = useLocation(); // Get the current location

  return (
    <>
      {location.pathname !== '/' && <Navbar />} {/* Conditionally render the Navbar */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/Electricbikes" element={<ElectricBikeList />} />
        <Route path="/Electricbikes/:id" element={<BikeDetails />} />
        <Route path="/Kidsbikes" element={<KidsBikeList />} />
        <Route path="/Kidsbikes/:id" element={<KidsBikeDetails />} />
        <Route path="/accessories" element={<Accessories />} /> 
        <Route path="/mountainbikes" element={<MountainBikeList />} />
        <Route path="/womensbikes" element={<WomensBikeList />} />

      </Routes>
    </>
  );
};

function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

export default App;
