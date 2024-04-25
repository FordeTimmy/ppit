// WomensBikeList.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import WomensBikeData from './WomensBikeData'; // Ensure this points to your actual data file
import './ElectricBikeList.css';
import QuickView from './QuickView'; // Import QuickView component
import { useCart } from './CartContext'; // Import useCart hook from CartContext

const WomensBikeList = () => {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const { addToCart } = useCart(); // Use the addToCart from the context

    const openQuickView = (product) => {
        setSelectedProduct(product);
    };

    const closeQuickView = () => {
        setSelectedProduct(null);
    };

    return (
        <div className='home-page-container'>
        <div>
            <h1>Women's Bikes</h1>
            <div className="bikes-container">
                {WomensBikeData.map(bike => (
                    <div key={bike.id} className="bike-item">
                        <div onClick={() => openQuickView(bike)}>
                            <img 
                                src={bike.images && bike.images.length > 0 ? bike.images[0] : '/path-to-default-image.jpg'} 
                                alt={bike.name} 
                                className="bike-image" 
                            />
                            <div className="bike-info">
                                <h2>{bike.name}</h2>
                                <p>€{bike.price}</p>
                            </div>
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

export default WomensBikeList;
