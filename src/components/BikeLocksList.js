// BikeLocksList.js
import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, query, where, getDocs } from "firebase/firestore";
import QuickView from './QuickView';
import { useCart } from './CartContext';
import './ElectricBikeList.css'; // Assuming you have a CSS file for KidsBikeLis
import './styles.css'; // Assuming you have a CSS file for KidsBikeList



const BikeLocksList = () => {
    const [bikeLocks, setBikeLocks] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const { addToCart } = useCart();  // Use the addToCart from the context

    useEffect(() => {
        const fetchLocks = async () => {
            const locksQuery = query(collection(db, "products"), where("category", "==", "Bike Locks"));
            const querySnapshot = await getDocs(locksQuery);
            setBikeLocks(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        };

        fetchLocks();
    }, []);

    const openQuickView = (product) => {
        setSelectedProduct(product);
    };

    const closeQuickView = () => {
        setSelectedProduct(null);
    };

    return (
        <div>
            <h2>Bike Locks</h2>
            <div className="bike-list">
                {bikeLocks.map(lock => (
                    <div className="bike-item" key={lock.id}>
                        <div className="bike-image-container">
                            <img src={lock.productImageUrl} alt={lock.title} />
                        </div>
                        <h3>{lock.title}</h3>
                        <p>€{lock.price}</p>
                        <button className="quick-view-btn" onClick={() => openQuickView(lock)}>Quick View</button>
                    </div>
                ))}
            </div>
            {selectedProduct && (
                <QuickView product={selectedProduct} onClose={closeQuickView} addToCart={addToCart} />
            )}
        </div>
    );
};

export default BikeLocksList;
