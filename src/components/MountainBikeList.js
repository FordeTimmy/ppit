import React from 'react';
import { Link } from 'react-router-dom';
import MountainBikeData from './MountainBikeData'; // Ensure this points to your actual data file
import './ElectricBikeList.css';

const MountainBikeList = () => {
  return (
    <div>
      <h1>Mountain Bikes</h1>
      <div className="bikes-container">
        <div className="row">
          {MountainBikeData.slice(0, 3).map(bike => (
            <div key={bike.id} className="bike-item">
              <Link to={`/mountainbikes/${bike.id}`}>
                <img 
                  src={bike.images && bike.images.length > 0 ? bike.images[0] : '/path-to-default-image.jpg'} 
                  alt={bike.name} 
                  className="bike-image" 
                />
                <div className="bike-info">
                  <h2>{bike.name}</h2>
                  <p>{bike.price}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MountainBikeList;
