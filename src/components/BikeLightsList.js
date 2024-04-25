// BikeLightsList.js
import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, query, where, getDocs } from "firebase/firestore";
import QuickView from './QuickView'; // Import QuickView component
import { useCart } from './CartContext';
import './ElectricBikeList'; // Assuming you have a CSS file for BikeLightsList

const BikeLightsList = () => {
    const [bikeLights, setBikeLights] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const { addToCart } = useCart();  // Use the addToCart from the context

    useEffect(() => {
        const fetchBikeLights = async () => {
            const lightsQuery = query(collection(db, "products"), where("category", "==", "Bike Lights"));
            const querySnapshot = await getDocs(lightsQuery);
            setBikeLights(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        };

        fetchBikeLights();
    }, []);

    const openQuickView = (product) => {
        setSelectedProduct(product);
    };

    const closeQuickView = () => {
        setSelectedProduct(null);
    };

    return (
        <div>
            <h2>Bike Lights</h2>
            <div className="bike-list">
                {bikeLights.map(bike => (
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
    );
};

export default BikeLightsList;
