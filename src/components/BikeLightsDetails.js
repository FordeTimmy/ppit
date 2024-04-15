// BikeLightsDetails.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BikeLightsData from './BikeLightsData'; // Ensure this points to your actual data file
import './BikeDetails.css'; // Ensure the CSS is suitable for this component too

const BikeLightsDetails = () => {
  let { id } = useParams();
  const [bike, setBike] = useState(null);
  const [selectedImage, setSelectedImage] = useState('');

  // Fetch the specific bike on component mount or when the id changes
  useEffect(() => {
    const fetchedBike = BikeLightsData.find(bike => bike.id === parseInt(id));
    setBike(fetchedBike);
    setSelectedImage(fetchedBike?.images[0]);
  }, [id]);

  return (
    <div className="bike-details-container">
      {bike ? (
        <>
          <div className="bike-image-container">
            <img src={selectedImage} alt={bike.name} className="bike-image" />
            <div className="bike-thumbnails">
              {bike.images && bike.images.map((image, index) => (
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
            {/* Add more detailed fields as necessary */}
            <p>Brand: {bike.brand}</p>
            <p>Weight: {bike.weight}</p>
            {/* Remove or adjust any fields not applicable to bike lights */}
          </div>
        </>
      ) : (
        <p>Bike not found</p>
      )}
    </div>
  );
}

export default BikeLightsDetails;
