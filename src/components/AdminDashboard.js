// AdminDashboard.js
import React from 'react';
import bikesData from './bikesData.json';
import BikeLightsData from './BikeLightsData.json';
import BikeLocksData from './BikeLocksData.json';
import BikeReflectorsData from './BikeReflectorsData.json';
import kidsBikesData from './kidsBikesData.json';
import MountainBikeData from './MountainBikeData.json'; 
import WomensBikeData from './WomensBikeData.json';
import './AdminDashboard.css';
const AdminDashboard = () => {
  // Combine all product data into a single array
  const allProducts = [
    ...bikesData,
    ...BikeLightsData,
    ...BikeLocksData,
    ...BikeReflectorsData,
    ...kidsBikesData,
    ...MountainBikeData,
    ...WomensBikeData
  ];

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <ul className="product-list">
        {allProducts.map(product => (
          <li key={product.id} className="product-item">
            {/* Removed img tag and product-thumbnail class */}
            <div className="product-details">
              <h3>{product.name}</h3>
              {/* Other product details can be listed as needed */}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
