// BikeReflectorsDetails.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BikeReflectorsData from './BikeReflectorsData'; // Ensure this points to your actual data file
import './BikeDetails.css'; // Ensure the CSS is suitable for this component too

const BikeReflectorsDetails = () => {
  let { id } = useParams();
  const [reflector, setReflector] = useState(null);
  const [selectedImage, setSelectedImage] = useState('');

  // Fetch the specific reflector on component mount or when the id changes
  useEffect(() => {
    const fetchedReflector = BikeReflectorsData.find(reflector => reflector.id === parseInt(id));
    setReflector(fetchedReflector);
    setSelectedImage(fetchedReflector?.image);
  }, [id]);

  return (
    <div className="reflector-details-container">
      {reflector ? (
        <>
          <div className="reflector-image-container">
            <img src={selectedImage} alt={reflector.name} className="reflector-image" />
            <div className="reflector-thumbnails">
              {reflector.images && reflector.images.map((image, index) => (
                <img 
                  key={index} 
                  src={image} 
                  alt={`Thumbnail ${index}`} 
                  className={`reflector-thumbnail ${selectedImage === image ? 'active' : ''}`} 
                  onClick={() => setSelectedImage(image)}
                />
              ))}
            </div>
            <div className="reflector-name-price">
              <h2>{reflector.name}</h2>
              <p>{reflector.price}</p>
            </div>
          </div>
          <div className="reflector-description">
            <p>{reflector.description}</p>
            {/* Add more detailed fields as necessary */}
            <p>Brand: {reflector.brand}</p>
            <p>Material: {reflector.material}</p>
            {/* Remove or adjust any fields not applicable to bike reflectors */}
          </div>
        </>
      ) : (
        <p>Reflector not found</p>
      )}
    </div>
  );
}

export default BikeReflectorsDetails;
