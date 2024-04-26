import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, query, where, getDocs } from "firebase/firestore";
import QuickView from './QuickView';
import { useCart } from './CartContext';
import './ElectricBikeList.css'; // Reusing ElectricBikeList CSS for styling

const BikeReflectorsList = () => {
    const [reflectors, setReflectors] = useState([]); // renamed to 'reflectors' for consistency
    const [selectedReflector, setSelectedReflector] = useState(null);
    const { addToCart } = useCart(); // Use the addToCart from the context, if applicable

    useEffect(() => {
        const fetchReflectors = async () => {
            const reflectorsQuery = query(collection(db, "products"), where("category", "==", "Reflectors"));
            const querySnapshot = await getDocs(reflectorsQuery);
            setReflectors(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))); // renamed to 'setReflectors'
        };

        fetchReflectors();
    }, []);

    const openQuickView = (reflector) => {
        setSelectedReflector(reflector);
    };

    const closeQuickView = () => {
        setSelectedReflector(null);
    };

    return (
        <div className='home-page-container'>
          
          <div>
          <h2>Reflectors</h2>
            <div className="bike-list">
            
                {reflectors.map(reflector => (
                    <div className="bike-item" key={reflector.id}>
                        <div className="bike-image-container" onClick={() => openQuickView(reflector)}>
                            <img 
                                src={reflector.productImageUrl ? reflector.productImageUrl : '/path-to-default-image.jpg'} 
                                alt={reflector.title} 
                                className="product-image" 
                            />
                        </div>
                        <h3>{reflector.title}</h3>
                        <p>€{reflector.price}</p>
                        <button className="quick-view-btn" onClick={() => openQuickView(reflector)}>Quick View</button>
                    </div>
                ))}
            </div>
            {selectedReflector && (
                <QuickView product={selectedReflector} onClose={closeQuickView} addToCart={addToCart} />
            )}
        </div>
        </div>
    );
};

export default BikeReflectorsList;
