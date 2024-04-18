import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AdminLogin from './components/AdminLogin'; // Import AdminLogin component
import AdminDashboard from './components/AdminDashboard'; // Import AdminDashboard component
import Home from './components/home';
import Navbar from './components/Navbar';
import Accessories from './components/Accessories';
import ElectricBikeList from './components/ElectricBikeList';
import BikeDetails from './components/BikeDetails';
import KidsBikeList from './components/KidsBikeList';
import KidsBikeDetails from './components/KidsBikeDetails';
import MountainBikeList from './components/MountainBikeList';
import MountainBikeDetails from './components/MountainBikeDetails';
import WomensBikeList from './components/WomensBikeList';
import WomensBikeDetails from './components/WomensBikeDetails';
import Footer from './components/Footer';
import BikeLocksList from './components/BikeLocksList';
import BikeLocksDetails from './components/BikeLocksDetails';
import BikeLightsDetails from './components/BikeLightsDetails';
import BikeLightsList from './components/BikeLightsList';
import BikeReflectorsList from './components/BikeReflectorsList';
import CheckoutPage from './components/CheckoutPage';
const App = () => {
  const [isAdmin, setIsAdmin] = useState(false); // State to track admin status

  // Function to set admin status after successful admin login
  const handleAdminLogin = () => {
    // Set isAdmin to true after successful admin login
    setIsAdmin(true);
  };

  return (
    <Router>
      <Routes>
        {/* Redirect root path to home */}
        <Route path="/" element={<Navigate to="/home" />} />
        {/* Route to components */}
        <Route path="/home" element={<Home />} />
        {/* Pass handleAdminLogin function as a prop to the AdminLogin component */}
        <Route path="/admin" element={<AdminLogin handleAdminLogin={handleAdminLogin} />} />
        <Route path="/admindashboard" element={<AdminDashboard />} />
        <Route path="/electricbikes" element={<ElectricBikeList />} />
        <Route path="/electricbikes/:id" element={<BikeDetails />} />
        <Route path="/kidsbikes" element={<KidsBikeList />} />
        <Route path="/kidsbikes/:id" element={<KidsBikeDetails />} />
        <Route path="/accessories" element={<Accessories />} /> 
        <Route path="/mountainbikes" element={<MountainBikeList />} />
        <Route path="/mountainbikes/:id" element={<MountainBikeDetails />} />
        <Route path="/womensbikes" element={<WomensBikeList />} />
        <Route path="/womensbikes/:id" element={<WomensBikeDetails />} />
        <Route path="/bikelights" element={<BikeLightsList />} />
        <Route path="/bikelights/:id" element={<BikeLightsDetails />} />
        <Route path="/bikelocks" element={<BikeLocksList />} />
        <Route path="/bikelocks/:id" element={<BikeLocksDetails />} />
        <Route path="/bikereflectors" element={<BikeReflectorsList />} />
        <Route path="/checkout" element={<CheckoutPage />} />

      </Routes>
      {/* Navbar is always displayed */}
      {/* Pass isAdmin prop to the Navbar component */}
      <Navbar isAdmin={isAdmin} />
      <Footer />
    </Router>
  );
}

export default App;
