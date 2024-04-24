import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { collection, addDoc, Timestamp } from "firebase/firestore";
import './AdminDashboard.css';

const categoryList = [
    { name: 'Electric Bike' },
    { name: 'Kids Bike' },
    { name: 'Mountain Bike' },
    { name: 'Womens Bike' },
    { name: 'Bike Lights' },
    { name: 'Bike Locks' },
    { name: 'Reflectors' }
];

const AdminDashboard = ({ isAdmin }) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAdmin) {
            console.log("Redirecting to /");
            navigate('/');
        }
    }, [isAdmin, navigate]);

    const [product, setProduct] = useState({
        title: "",
        price: "",
        productImageUrl: "",
        category: "",
        description: "",
        quantity: 1,
        time: Timestamp.now(),
        date: new Date().toLocaleString("en-US", { month: "short", day: "2-digit", year: "numeric" })
    });

    const addProductFunction = async () => {
        if (!product.title || !product.price || !product.productImageUrl || !product.category || !product.description) {
            alert("All fields are required.");
            return;
        }

        try {
            const productRef = collection(db, 'products');
            await addDoc(productRef, product);
            alert("Product added successfully");
            console.log("Navigating to /admin-dashboard");
            navigate('/admin-dashboard');
        } catch (error) {
            console.error(error);
            alert("Adding product failed.");
        }
    };

    return (
        <div className='flex justify-center items-center h-screen'>
            <div className="login_Form bg-pink-50 px-8 py-6 border border-pink-100 rounded-xl shadow-md">
                <div className="mb-5">
                    <h2 className='text-center text-2xl font-bold text-pink-500'>Add Product</h2>
                </div>
                <input type="text" name="title" value={product.title} onChange={e => setProduct({ ...product, title: e.target.value })} placeholder='Product Title' className='input-field' />
                <input type="number" name="price" value={product.price} onChange={e => setProduct({ ...product, price: e.target.value })} placeholder='Product Price' className='input-field' />
                <input type="text" name="productImageUrl" value={product.productImageUrl} onChange={e => setProduct({ ...product, productImageUrl: e.target.value })} placeholder='Product Image Url' className='input-field' />
                <select value={product.category} onChange={e => setProduct({ ...product, category: e.target.value })} className="input-field">
                    <option disabled>Select Product Category</option>
                    {categoryList.map((value, index) => <option key={index} value={value.name}>{value.name}</option>)}
                </select>
                <textarea value={product.description} onChange={e => setProduct({ ...product, description: e.target.value })} name="description" placeholder="Product Description" rows="5" className="input-field"></textarea>
                <button onClick={addProductFunction} type='button' className='submit-button'>Add Product</button>
            </div>
        </div>
    );
}

export default AdminDashboard;
