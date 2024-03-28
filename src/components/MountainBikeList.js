import React from 'react';
import { Link } from 'react-router-dom';
import bikesData from './bikesData'; // Ensure this is the correct path to your data
import './BikeList.css'; // Update the CSS import if needed

const MountainBikeList = () => {
  // This assumes that your bikesData includes mountain bikes
  // and that each bike object includes an 'id', 'name', 'price', and 'images' or 'image' key
  const mountainBikes = bikesData.filter(bike => bike.type === 'Mountain Bike'); // Add a type check if needed

  return (
    <div>
      <h1>Mountain Bikes</h1>
      <div className="bikes-container">
        <div className="row">
          {mountainBikes.slice(0, 3).map(bike => ( // Adjust the slice if you want more or fewer bikes
            <div key={bike.id} className="bike-item">
              <Link to={`/mountainbikes/${bike.id}`}>
                <img 
                  src={Array.isArray(bike.images) && bike.images.length > 0 ? bike.images[0] : bike.image} 
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
