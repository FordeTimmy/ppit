import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CartProvider } from './components/CartContext';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import Home from './components/home';
import Navbar from './components/Navbar';
import CartPage from './components/CartPage';
import Accessories from './components/Accessories';
import ElectricBikeList from './components/ElectricBikeList';
import BikeDetails from './components/BikeDetails';
import KidsBikeList from './components/KidsBikeList';
import KidsBikeDetails from './components/KidsBikeDetails';
import MountainBikeList from './components/MountainBikeList';
import WomensBikeList from './components/WomensBikeList';
import WomensBikeDetails from './components/WomensBikeDetails';
import Footer from './components/Footer';
import BikeLocksList from './components/BikeLocksList';
import BikeLightsList from './components/BikeLightsList';
import BikeLightsDetails from './components/BikeLightsDetails';
import BikeReflectorsList from './components/BikeReflectorsList';
import CheckoutPage from './components/CheckoutPage';
import Bikes from './components/Bikes';
import SignUp from './components/SignUp';
import AboutUs from './components/AboutUs';
import ContactUs from './components/ContactUs';
import PrivacyPolicy from './components/PrivacyPolicy';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51P9WuOIPIpdNPWtjmGWmZdHLFbRn0cZl1b5IoIy6nja9uh0Uz7MoIamMY33QxrAS5GBnYaEcusVm3p0c8pfmFzLl00KIxAH6hw');

const App = () => {
  const [isAdmin, setIsAdmin] = useState(false);

  const handleAdminLogin = (adminStatus) => {
    setIsAdmin(adminStatus);
  };

  const handleLogout = () => {
    setIsAdmin(false);
  };

  return (
    <Elements stripe={stripePromise}>
      <CartProvider>
        <Router>
          <Navbar isAdmin={isAdmin} handleLogout={handleLogout} />
          <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<Home />} />
            <Route path="/admin" element={<AdminLogin handleAdminLogin={handleAdminLogin} />} />
            <Route path="/admin-dashboard" element={isAdmin ? <AdminDashboard isAdmin={isAdmin} /> : <Navigate to="/home" />} />
            <Route path="/electricbikes" element={<ElectricBikeList />} />
            <Route path="/electricbikes/:id" element={<BikeDetails />} />
            <Route path="/kidsbikes" element={<KidsBikeList />} />
            <Route path="/kidsbikes/:id" element={<KidsBikeDetails />} />
            <Route path="/accessories" element={<Accessories />} />
            <Route path="/mountainbikes" element={<MountainBikeList />} />
            <Route path="/womensbikes" element={<WomensBikeList />} />
            <Route path="/womensbikes/:id" element={<WomensBikeDetails />} />
            <Route path="/bikelights" element={<BikeLightsList />} />
            <Route path="/bikelights/:id" element={<BikeLightsDetails />} />
            <Route path="/bikelocks" element={<BikeLocksList />} />
            <Route path="/bikereflectors" element={<BikeReflectorsList />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/bikes" element={<Bikes />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
          </Routes>
          <Footer />
        </Router>
      </CartProvider>
    </Elements>
  );
};

export default App;
