// BikeLocksList.js
import React from 'react';
import { Link } from 'react-router-dom';
import BikeLocksData from './BikeLocksData'; // Ensure this points to your actual data file
import './ElectricBikeList.css';

const BikeLocksList = () => {
  return (
    <div>
      <h1>Bike Locks</h1>
      <div className="locks-container">
        <div className="row">
          {BikeLocksData.slice(0, 3).map(lock => (
            <div key={lock.id} className="lock-item">
              <Link to={`/bikelocks/${lock.id}`}>
                <img 
                  src={lock.image ? lock.image : '/path-to-default-image.jpg'} 
                  alt={lock.name} 
                  className="lock-image" 
                />
                <div className="lock-info">
                  <h2>{lock.name}</h2>
                  <p>{lock.price}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BikeLocksList;
