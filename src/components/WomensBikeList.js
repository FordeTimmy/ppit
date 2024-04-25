// WomensBikeList.js
import React, { useState, useEffect } from 'react';
import { db } from '../firebase'; // Ensure this points to your firebase config file
import { collection, query, where, getDocs } from "firebase/firestore";
import QuickView from './QuickView';
import { useCart } from './CartContext';
import './ElectricBikeList.css'; // Use ElectricBikeList CSS for consistency

const WomensBikeList = () => {
    const [womensBikes, setWomensBikes] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const { addToCart } = useCart();

    useEffect(() => {
        const fetchBikes = async () => {
            // Update the query to match your "Women's Bikes" category in your Firestore
            const bikesQuery = query(collection(db, "products"), where("category", "==", "Women's Bike"));
            const querySnapshot = await getDocs(bikesQuery);
            setWomensBikes(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
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
                    {womensBikes.map(bike => (
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
