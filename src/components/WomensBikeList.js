import React from 'react';
import { Link } from 'react-router-dom';
import WomensBikeData from './WomensBikeData'; // Ensure this points to your actual data file
import './ElectricBikeList.css';

const WomensBikeList = () => {
  return (
    <div>
      <h1>Women's Bikes</h1>
      <div className="bikes-container">
        <div className="row">
          {WomensBikeData.slice(0, 3).map(bike => (
            <div key={bike.id} className="bike-item">
              <Link to={`/womensbikes/${bike.id}`}>
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

export default WomensBikeList;
