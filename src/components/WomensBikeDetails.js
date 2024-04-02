import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import bikesData from './bikesData.json';
import './BikeDetails.css'; // Ensure the CSS is suitable for this component too

const WomensBikeDetails = () => {
  let { id } = useParams();
  const [bike, setBike] = useState(null);
  const [selectedImage, setSelectedImage] = useState('');

  // Fetch the specific bike on component mount or when the id changes
  useEffect(() => {
    const fetchedBike = bikesData.find(bike => bike.id === parseInt(id) && bike.type === 'Womens Mountain Bike');
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
              <p>{bike.salePrice ? `${bike.salePrice} (Sale)` : bike.price}</p>
            </div>
          </div>
          <div className="bike-description">
            <p>{bike.description}</p>
            {/* Add more detailed fields as necessary */}
            <p>Frame: {bike.frame}</p>
            <p>Gears: {bike.gears}</p>
            <p>Brakes: {bike.brakes}</p>
            <p>Wheels: {bike.wheels}</p>
            {/* Remove or adjust any fields not applicable to women's bikes */}
          </div>
        </>
      ) : (
        <p>Bike not found</p>
      )}
    </div>
  );
}

export default WomensBikeDetails;
