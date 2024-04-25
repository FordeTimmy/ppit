// MountainBikeList.js
import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import QuickView from './QuickView';
import './ElectricBikeList.css'; // Ensure this is the CSS that styles your components consistently
import { useCart } from './CartContext';

const MountainBikeList = () => {
    const [mountainBikes, setMountainBikes] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const { addToCart } = useCart(); // Use the addToCart from the context

    useEffect(() => {
        const fetchBikes = async () => {
            const bikesQuery = query(collection(db, 'products'), where('category', '==', 'Mountain Bike'));
            const querySnapshot = await getDocs(bikesQuery);
            setMountainBikes(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        };

        fetchBikes();
    }, []);

    const openQuickView = (product) => {
        setSelectedProduct(product);
    };

    const closeQuickView = () => {
        setSelectedProduct(null);
    };

    return (
        <div>
            <h2>Mountain Bikes</h2>
            <div className="bike-list">
                {mountainBikes.map(bike => (
                    <div className="bike-item" key={bike.id}>
                        <div className="bike-image-container">
                            <img 
                                src={bike.productImageUrl ? bike.productImageUrl : '/path-to-default-image.jpg'} 
                                alt={bike.title} 
                                className="bike-image" 
                            />
                        </div>
                        <h3>{bike.title}</h3>
                        <p>€{bike.price}</p>
                        <button className="quick-view-btn" onClick={() => openQuickView(bike)}>Quick View</button>
                    </div>
                ))}
            </div>
            {selectedProduct && (
                <QuickView product={selectedProduct} onClose={closeQuickView} addToCart={addToCart} />
            )}
        </div>
    );
};

export default MountainBikeList;
