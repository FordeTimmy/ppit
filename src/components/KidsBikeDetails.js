import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import kidsBikesData from './kidsBikesData'; // Import Kids bikes data
import './BikeDetails.css'; // Import CSS file

const KidsBikeDetails = () => {
  let { id } = useParams();
  const bike = kidsBikesData.find(bike => bike.id === parseInt(id));
  const [selectedImage, setSelectedImage] = useState(
    Array.isArray(bike?.images) && bike.images.length > 0 ? bike.images[0] : bike.image
  );

  const addToBasket = () => {
    alert(`Added ${bike.name} to the kids basket!`);
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
  {Array.isArray(bike.images) && bike.images.map((image, index) => (
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

          {/* Bike details on the right */}
          <div className="bike-details-right">
            <p>{bike.description}</p>
            {/* Include other details like frame, gears, brakes, etc. */}
          </div>
        </div>
      ) : (
        <p>Bike not found</p>
      )}
    </div>
  );
}

export default KidsBikeDetails;
