import React from 'react';
import { useParams } from 'react-router-dom';
import kidsBikesData from './kidsBikesData'; // Import Kids bikes data
import './BikeDetails.css'; // Import CSS file

const KidsBikeDetails = () => {
  let { id } = useParams();
  const bike = kidsBikesData.find(bike => bike.id === parseInt(id));

  return (
    <div className="bike-details-container">
      {bike ? (
        <>
          <div className="bike-image-container">
            <img src={Array.isArray(bike.images) && bike.images.length > 0 ? bike.images[0] : bike.image} alt={bike.name} className="bike-image" />
            {/* Include thumbnails or additional images if available */}
            <div className="bike-name-price">
              <h2>{bike.name}</h2>
              <p>{bike.price}</p>
            </div>
          </div>
          <div className="bike-description">
            <p>{bike.description}</p>
            {/* Include other details like frame, gears, brakes, etc. */}
          </div>
        </>
      ) : (
        <p>Bike not found</p>
      )}
    </div>
  );
}

export default KidsBikeDetails;
