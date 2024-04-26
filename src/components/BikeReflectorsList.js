import React, { useState, useEffect } from 'react';
import { db } from '../firebase'; // Importing firebase module
import { collection, getDocs } from "firebase/firestore"; // Importing firestore functions
import { Link } from 'react-router-dom';
import './ElectricBikeList.css'; // Importing ElectricBikeList CSS for styling

const BikeReflectorsList = () => {
  const [bikeReflectors, setBikeReflectors] = useState([]); // State for bike reflectors

  // Fetching bike reflectors data from Firestore on component mount
  useEffect(() => {
    const fetchReflectors = async () => {
      const reflectorsQuery = collection(db, "products"); // Reference to 'products' collection
      const querySnapshot = await getDocs(reflectorsQuery); // Get all documents in the collection
      const reflectorsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) // Map documents to array of objects
                            .filter(product => product.category === 'Reflectors'); // Filter products by category
      setBikeReflectors(reflectorsData); // Set bike reflectors state
    };

    fetchReflectors(); // Call fetchReflectors function
  }, []); // Empty dependency array ensures the effect runs only once on component mount

  return (
    <div className='home-page-container'>
      <div className='product-list'>
        <h1>Bike Reflectors</h1>
        <div className="bike-list">
          {bikeReflectors.map(reflector => (
            <div key={reflector.id} className="product-item">
              <Link to={`/bikereflectors/${reflector.id}`}> {/* Link to individual reflector */}
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
