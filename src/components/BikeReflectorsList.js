// BikeReflectorsList.js
import React, { useState, useEffect } from 'react';
import { db } from '../firebase'; // Make sure this points to your firebase config file
import { collection, getDocs } from "firebase/firestore";
import { Link } from 'react-router-dom';
import './ElectricBikeList.css'; // Reusing ElectricBikeList CSS for styling

const BikeReflectorsList = () => {
  const [bikeReflectors, setBikeReflectors] = useState([]);

  useEffect(() => {
    const fetchReflectors = async () => {
      const reflectorsQuery = collection(db, "bikereflectors");
      const querySnapshot = await getDocs(reflectorsQuery);
      setBikeReflectors(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };

    fetchReflectors();
  }, []);

  return (
    <div className='home-page-container'>
      <h1>Bike Reflectors</h1>
      <div className="reflectors-container">
        <div className="row">
          {bikeReflectors.slice(0, 3).map(reflector => (
            <div key={reflector.id} className="reflector-item">
              <Link to={`/bikereflectors/${reflector.id}`}>
                <img 
                  src={reflector.productImageUrl ? reflector.productImageUrl : '/path-to-default-image.jpg'} 
                  alt={reflector.title} 
                  className="reflector-image" 
                />
                <div className="reflector-info">
                  <h2>{reflector.title}</h2>
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
