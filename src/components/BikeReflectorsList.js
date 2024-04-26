import React, { useState, useEffect } from 'react';
import { db } from '../firebase'; // Make sure this points to your firebase config file
import { collection, getDocs } from "firebase/firestore";
import { Link } from 'react-router-dom';
import './ElectricBikeList.css'; // Reusing ElectricBikeList CSS for styling

const BikeReflectorsList = () => {
  const [bikeReflectors, setBikeReflectors] = useState([]);

  useEffect(() => {
    const fetchReflectors = async () => {
      const reflectorsQuery = collection(db, "products");
      const querySnapshot = await getDocs(reflectorsQuery);
      const reflectorsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
                            .filter(product => product.category === 'Reflectors');
      setBikeReflectors(reflectorsData);
    };

    fetchReflectors();
  }, []);

  return (
    <div className='home-page-container'>
    <div className='product-list'>
      <h1>Bike Reflectors</h1>
      <div className="bike-list">
        {bikeReflectors.map(reflector => (
          <div key={reflector.id} className="product-item">
            <Link to={`/bikereflectors/${reflector.id}`}>
              <div className="product-image-container">
                <img 
                  src={reflector.productImageUrl ? reflector.productImageUrl : '/path-to-default-image.jpg'} 
                  alt={reflector.title} 
                  className="product-image" 
                />
              </div>
              <div className="product-info">
                <h3>{reflector.title}</h3>
                <p>€{reflector.price}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
}

export default BikeReflectorsList;
