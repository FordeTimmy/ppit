import React, { useState, useEffect } from 'react';
import { db } from '../firebase'; // Make sure this points to your firebase config file
import { collection, getDocs, query, where } from "firebase/firestore";
import QuickView from './QuickView';
import { useCart } from './CartContext';
import './ElectricBikeList.css'; // Reusing ElectricBikeList CSS for styling

const BikeReflectorsList = () => {
  const [bikeReflectors, setBikeReflectors] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { addToCart } = useCart(); // Use the addToCart from the context

  useEffect(() => {
    const fetchReflectors = async () => {
      const reflectorsQuery = query(collection(db, "products"), where("category", "==", "Reflectors"));
      const querySnapshot = await getDocs(reflectorsQuery);
      setBikeReflectors(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };

    fetchReflectors();
  }, []);

  const openQuickView = (product) => {
    setSelectedProduct(product);
  };

  const closeQuickView = () => {
    setSelectedProduct(null);
  };

  return (
    <div className='home-page-container'>
      
 
    <div className='product-list'>
    <h1>Bike Reflectors</h1>
      <div className="bike-list">
        {bikeReflectors.map(reflector => (
          <div key={reflector.id} className="bike-item">
            <div className="bike-image-container" onClick={() => openQuickView(reflector)}>
              <img 
                src={reflector.productImageUrl ? reflector.productImageUrl : '/path-to-default-image.jpg'} 
                alt={reflector.title} 
                className="bike-image" 
              />
            </div>
            <div className="bike-info">
              <h3>{reflector.title}</h3>
              <p>€{reflector.price}</p>
              <button className="quick-view-btn" onClick={() => openQuickView(reflector)}>Quick View</button>
            </div>
          </div>
        ))}
      </div>
      {selectedProduct && (
        <QuickView product={selectedProduct} onClose={closeQuickView} addToCart={addToCart} />
      )}
    </div>
    </div>
  );
}

export default BikeReflectorsList;
