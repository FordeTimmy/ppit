// BikeLocksDetails.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BikeLocksData from './BikeLocksData'; // Ensure this points to your actual data file
import './BikeDetails.css'; // Ensure the CSS is suitable for this component too

const BikeLocksDetails = () => {
  let { id } = useParams();
  const [lock, setLock] = useState(null);
  const [selectedImage, setSelectedImage] = useState('');

  // Fetch the specific lock on component mount or when the id changes
  useEffect(() => {
    const fetchedLock = BikeLocksData.find(lock => lock.id === parseInt(id));
    setLock(fetchedLock);
    setSelectedImage(fetchedLock?.image);
  }, [id]);

  return (
    <div className="lock-details-container">
      {lock ? (
        <>
          <div className="lock-image-container">
            <img src={selectedImage} alt={lock.name} className="lock-image" />
            <div className="lock-thumbnails">
              {lock.images && lock.images.map((image, index) => (
                <img 
                  key={index} 
                  src={image} 
                  alt={`Thumbnail ${index}`} 
                  className={`lock-thumbnail ${selectedImage === image ? 'active' : ''}`} 
                  onClick={() => setSelectedImage(image)}
                />
              ))}
            </div>
            <div className="lock-name-price">
              <h2>{lock.name}</h2>
              <p>{lock.price}</p>
            </div>
          </div>
          <div className="lock-description">
            <p>{lock.description}</p>
            {/* Add more detailed fields as necessary */}
            <p>Type: {lock.type}</p>
            <p>Material: {lock.material}</p>
            {/* Remove or adjust any fields not applicable to bike locks */}
          </div>
        </>
      ) : (
        <p>Lock not found</p>
      )}
    </div>
  );
}

export default BikeLocksDetails;
