// ElectricBikesList.js
import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, query, where, getDocs } from "firebase/firestore";
import QuickView from './QuickView';
import { useCart } from './CartContext';
import './ElectricBikeList.css'; // Assuming you have a CSS file for KidsBikeLis
import './styles.css'; // Assuming you have a CSS file for KidsBikeList


const ElectricBikesList = () => {
    const [electricBikes, setElectricBikes] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const { addToCart } = useCart();  // Use the addToCart from the context

    useEffect(() => {
        const fetchBikes = async () => {
            const bikesQuery = query(collection(db, "products"), where("category", "==", "Electric Bike"));
            const querySnapshot = await getDocs(bikesQuery);
            setElectricBikes(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
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
            <h2>Electric Bikes</h2>
            <div className="bike-list">
                {electricBikes.map(bike => (
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

export default ElectricBikesList;
