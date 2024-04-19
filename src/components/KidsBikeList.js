import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, query, where, getDocs } from "firebase/firestore";
import QuickView from './QuickView';
import './ElectricBikeList.css';

const KidsBikeList = () => {
    const [kidsBikes, setKidsBikes] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const fetchBikes = async () => {
            const bikesQuery = query(collection(db, "products"), where("category", "==", "Kids Bike"));
            const querySnapshot = await getDocs(bikesQuery);
            setKidsBikes(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        };

        fetchBikes();
    }, []);

    const openQuickView = (product) => {
        setSelectedProduct(product);
    };

    const closeQuickView = () => {
        setSelectedProduct(null);
    };

    const addToCart = (product) => {
      console.log('Adding to cart:', product.title); // Debug: log product being added
  
      const existingProduct = cart.find((item) => item.id === product.id);
      if (existingProduct) {
          // If the product exists, increase the quantity
          const updatedCart = cart.map((item) =>
              item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
          );
          setCart(updatedCart);
          console.log('Cart updated with increased quantity:', updatedCart); // Debug: log updated cart
      } else {
          // If the product doesn't exist, add it with a quantity of 1
          const updatedCart = [...cart, { ...product, quantity: 1 }];
          setCart(updatedCart);
          console.log('Cart updated with new product:', updatedCart); // Debug: log updated cart
      }
    };

    return (
        <div>
            <h2>Kids Bikes</h2>
            <div className="bike-list">
                {kidsBikes.map(bike => (
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

export default KidsBikeList;
