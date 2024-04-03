import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Login from './components/login';
import Home from './components/home';
import ElectricBikeList from './components/ElectricBikeList';
import BikeDetails from './components/BikeDetails';
import KidsBikeList from './components/KidsBikeList';
import KidsBikeDetails from './components/KidsBikeDetails';
import Navbar from './components/Navbar';
import Accessories from './components/Accessories';
import MountainBikeList from './components/MountainBikeList';
import WomensBikeList from './components/WomensBikeList';
import Footer from './components/Footer'; // Adjusted path if Footer is inside the components folder


const AppWrapper = () => {
  const location = useLocation();

  return (
    <>
      {location.pathname !== '/' && <Navbar />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/electricbikes" element={<ElectricBikeList />} />
        <Route path="/electricbikes/:id" element={<BikeDetails />} />
        <Route path="/kidsbikes" element={<KidsBikeList />} />
        <Route path="/kidsbikes/:id" element={<KidsBikeDetails />} />
        <Route path="/accessories" element={<Accessories />} /> 
        <Route path="/mountainbikes" element={<MountainBikeList />} />
        <Route path="/womensbikes" element={<WomensBikeList />} />
        {/* Remove the Footer route, it's not needed */}
      </Routes>
      <Footer /> {/* This will render the Footer component on every page */}
    </>
  );
};

function App() {
  return (
    <Router>
      <AppWrapper />
      {/* The Footer component will already be included in AppWrapper, no need to add it here again */}
    </Router>
  );
}

export default App;
