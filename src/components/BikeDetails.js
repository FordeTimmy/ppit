import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import bikesData from './bikesData.json';
import './BikeDetails.css'; // Import CSS file

const BikeDetails = () => {
  let { id } = useParams();
  const bike = bikesData.find(bike => bike.id === parseInt(id));
  const [selectedImage, setSelectedImage] = useState(bike?.images[0]);

  const addToBasket = () => {
    alert(`Added ${bike.name} to basket!`);
  };

  return (
    <div className="bike-details-container">
      {bike ? (
        <div className="bike-content">
          <div className="bike-image-section">
            {/* Bike name and price */}
            <div className="bike-name-price">
              <h2>{bike.name}</h2>
              <p>{bike.price}</p>
            </div>
            
            {/* Bike image and thumbnails */}
            <img src={selectedImage} alt={bike.name} className="bike-image" />
            <div className="thumbnail-container">
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
            
            {/* Add to Basket Button */}
            <button onClick={addToBasket} className="add-to-basket-btn">Add to Basket</button>
          </div>

          {/* Bike details */}
          <div className="bike-details-right">
            <ul className="bike-details-text">
              <li><strong>Description:</strong> {bike.description}</li>
              <li><strong>Frame:</strong> {bike.frame}</li>
              <li><strong>Gears:</strong> {bike.gears}</li>
              <li><strong>Brakes:</strong> {bike.brakes}</li>
              <li><strong>Warranty:</strong> {bike.warranty}</li>
            </ul>
          </div>
        </div>
      ) : (
        <p>Bike not found</p>
      )}
    </div>
  );
}

export default BikeDetails;
