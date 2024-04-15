// BikeReflectorsList.js
import React from 'react';
import { Link } from 'react-router-dom';
import BikeReflectorsData from './BikeReflectorsData'; // Ensure this points to your actual data file
import './ElectricBikeList.css';

const BikeReflectorsList = () => {
  return (
    <div>
      <h1>Bike Reflectors</h1>
      <div className="reflectors-container">
        <div className="row">
          {BikeReflectorsData.slice(0, 3).map(reflector => (
            <div key={reflector.id} className="reflector-item">
              <Link to={`/bikereflectors/${reflector.id}`}>
                <img 
                  src={reflector.image ? reflector.image : '/path-to-default-image.jpg'} 
                  alt={reflector.name} 
                  className="reflector-image" 
                />
                <div className="reflector-info">
                  <h2>{reflector.name}</h2>
                  <p>{reflector.price}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BikeReflectorsList;
