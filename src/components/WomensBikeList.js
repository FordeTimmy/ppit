// WomensBikeList.js
import React, { useState, useEffect } from 'react';
import { db } from '../firebase'; 
import { collection, query, where, getDocs } from "firebase/firestore";
import QuickView from './QuickView';
import { useCart } from './CartContext';
import './ElectricBikeList.css'; // Shared CSS for consistency

const WomensBikeList = () => {
    const [bikes, setBikes] = useState([]); // renamed to 'bikes' for consistency
    const [selectedProduct, setSelectedProduct] = useState(null);
    const { addToCart } = useCart();

    useEffect(() => {
        const fetchBikes = async () => {
            const bikesQuery = query(collection(db, "products"), where("category", "==", "Womens Bike"));
            const querySnapshot = await getDocs(bikesQuery);
            setBikes(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))); // renamed to 'setBikes'
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
        <div className='home-page-container'>
            <div>
                <h2>Women's Bikes</h2>
                <div className="bike-list">
                    {bikes.map(bike => ( // renamed to 'bikes' for consistency
                        <div className="bike-item" key={bike.id}>
                            <div className="bike-image-container">
                                <img src={bike.productImageUrl} alt={bike.title} />
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
        </div>
    );
};

export default WomensBikeList;
