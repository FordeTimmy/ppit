import React from 'react';
import { Link } from 'react-router-dom';
import bikesData from './bikesData';
import './ElectricBikeList.css'; // Correct import statement for CSS file

const ElectricBikeList = () => {
  return (
    <div>
      <h1>Electric Bikes</h1>
      <div className="bikes-container">
        <div className="row">
          {bikesData.slice(0, 3).map(bike => (
            <div key={bike.id} className="bike-item">
              <Link to={`/Electricbikes/${bike.id}`}>
                <img src={Array.isArray(bike.images) && bike.images.length > 0 ? bike.images[0] : bike.image} alt={bike.name} className="bike-image" />
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

export default ElectricBikeList;
