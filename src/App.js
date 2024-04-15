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
import MountainBikeDetails from './components/MountainBikeDetails';
import WomensBikeList from './components/WomensBikeList';
import WomensBikeDetails from './components/WomensBikeDetails';
import Footer from './components/Footer';
import BikeLocksList from './components/BikeLocksList';
import BikeLocksDetails from './components/BikeLocksDetails';
import BikeLightsDetails from './components/BikeLightsDetails';
import BikeLightsList from './components/BikeLightsList';
import BikeReflectorsList from './components/BikeReflectorsList'; // Import the BikeReflectorsList component

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
        <Route path="/bikelights" element={<BikeLightsList />} />
        <Route path="/bikelights/:id" element={<BikeLightsDetails />} />
        <Route path="/bikelocks" element={<BikeLocksList />} />
        <Route path="/bikelocks/:id" element={<BikeLocksDetails />} />
        {/* Add route for bike reflectors list */}
        <Route path="/bikereflectors" element={<BikeReflectorsList />} />
      </Routes>
      <Footer />
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
