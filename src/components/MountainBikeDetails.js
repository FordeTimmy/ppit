import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import bikesData from './bikesData.json';
import './BikeDetails.css'; // Import CSS file

const MountainBikeDetails = () => {
  let { id } = useParams();
  const bike = bikesData.find(bike => bike.id === parseInt(id));
  const [selectedImage, setSelectedImage] = useState(bike?.images[0]); // Start with the first image

  return (
    <div className="bike-details-container">
      {bike ? (
        <>
          <div className="bike-image-container">
            <img src={selectedImage} alt={bike.name} className="bike-image" />
            <div className="bike-thumbnails">
              {bike.images.map((image, index) => (
                <img 
                  key={index} 
                  src={image} 
                  alt={`Thumbnail ${index}`} 
                  className={`bike-thumbnail ${selectedImage === image ? 'active' : ''}`} 
                  onClick={() => setSelectedImage(image)}
                />
              ))}
            </div>
            <div className="bike-name-price">
              <h2>{bike.name}</h2>
              <p>{bike.price}</p>
            </div>
          </div>
          <div className="bike-description">
            <p>{bike.description}</p>
            <p>Frame: {bike.frame}</p>
            <p>Gears: {bike.gears}</p>
            <p>Brakes: {bike.brakes}</p>
            <p>Wheels: {bike.wheels}</p>
            <p>Motor Type: {bike.motorType}</p>
            <p>Battery: {bike.battery}</p>
            <p>Average Range: {bike.averageRange}</p>
            <p>Maximum Speed: {bike.maximumSpeed}</p>
            <p>Suspension: {bike.suspension}</p>
            <p>Weight: {bike.weight}</p>
            <p>Warranty: {bike.warranty}</p>
          </div>
        </>
      ) : (
        <p>Bike not found</p>
      )}
    </div>
  );
}

export default MountainBikeDetails;
