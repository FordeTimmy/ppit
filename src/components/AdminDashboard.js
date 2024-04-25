import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc, Timestamp } from 'firebase/firestore';
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
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Initial product form state
  const [productForm, setProductForm] = useState({
    title: '',
    price: '',
    productImageUrl: '',
    category: categoryList[0]?.name,
    description: '',
    quantity: 1,
    time: Timestamp.now(),
    date: new Date().toLocaleString("en-US", { month: "short", day: "2-digit", year: "numeric" })
  });

  useEffect(() => {
    if (!isAdmin) {
      navigate('/');
    } else {
      fetchProducts();
    }
  }, [isAdmin, navigate]);

  // Fetch all products
  const fetchProducts = async () => {
    const querySnapshot = await getDocs(collection(db, 'products'));
    setProducts(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  const addProductFunction = async () => {
    if (!productForm.title || !productForm.price || !productForm.productImageUrl || !productForm.category || !productForm.description) {
        alert("All fields are required.");
        return;
    }

    try {
        const productRef = collection(db, 'products');
        await addDoc(productRef, productForm);
        alert("Product added successfully");
        console.log("Navigating to /admin-dashboard");
        navigate('/admin-dashboard');
    } catch (error) {
        console.error(error);
        alert("Adding product failed.");
    }
  };

  // Set product to be edited
  const editProduct = (product) => {
    setSelectedProduct(product);
    setProductForm({ ...product });
  };

  // Update a product
  const updateProductFunction = async () => {
    if (!productForm.title || !productForm.price || !productForm.productImageUrl || !productForm.category || !productForm.description) {
      alert("All fields are required.");
      return;
    }

    try {
      const productRef = doc(db, 'products', selectedProduct.id);
      await updateDoc(productRef, productForm);
      alert("Product updated successfully");
      fetchProducts();
      setSelectedProduct(null); // Clear the selected product
    } catch (error) {
      console.error(error);
      alert("Updating product failed.");
    }
  };

  // Delete a product
  const deleteProductFunction = async (productId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (confirmDelete) {
      try {
        const productRef = doc(db, 'products', productId);
        await deleteDoc(productRef);
        alert("Product deleted successfully");
        fetchProducts();
      } catch (error) {
        console.error(error);
        alert("Failed to delete product.");
      }
    }
  };

  return (
    <div className='flex justify-center items-center h-screen'>
        <div className="login_Form bg-pink-50 px-8 py-6 border border-pink-100 rounded-xl shadow-md">
            <div className="mb-5">
                <h2 className='text-center text-2xl font-bold text-pink-500'>Add Product</h2>
            </div>
            <input type="text" name="title" value={productForm.title} onChange={e => setProductForm({ ...productForm, title: e.target.value })} placeholder='Product Title' className='input-field' />
            <input type="number" name="price" value={productForm.price} onChange={e => setProductForm({ ...productForm, price: e.target.value })} placeholder='Product Price' className='input-field' />
            <input type="text" name="productImageUrl" value={productForm.productImageUrl} onChange={e => setProductForm({ ...productForm, productImageUrl: e.target.value })} placeholder='Product Image Url' className='input-field' />
            <select value={productForm.category} onChange={e => setProductForm({ ...productForm, category: e.target.value })} className="input-field">
                <option disabled>Select Product Category</option>
                {categoryList.map((value, index) => <option key={index} value={value.name}>{value.name}</option>)}
            </select>
            <textarea value={productForm.description} onChange={e => setProductForm({ ...productForm, description: e.target.value })} name="description" placeholder="Product Description" rows="5" className="input-field"></textarea>
            <button onClick={addProductFunction} type='button' className='submit-button'>Add Product</button>
        </div>

        {/* Edit Product Form */}
        {selectedProduct && (
          <div className="login_Form bg-pink-50 px-8 py-6 border border-pink-100 rounded-xl shadow-md">
            <div className="mb-5">
              <h2 className="text-center text-2xl font-bold text-pink-500">Edit Product</h2>
            </div>
            <input
              type="text"
              name="title"
              value={productForm.title}
              onChange={(e) => setProductForm({ ...productForm, title: e.target.value })}
              placeholder="Product Title"
              className="input-field"
            />
            <input
              type="number"
              name="price"
              value={productForm.price}
              onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
              placeholder="Product Price"
              className="input-field"
            />
            <input
              type="text"
              name="productImageUrl"
              value={productForm.productImageUrl}
              onChange={(e) => setProductForm({ ...productForm, productImageUrl: e.target.value })}
              placeholder="Product Image Url"
              className="input-field"
            />
            <select
              value={productForm.category}
              onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
              className="input-field"
            >
              <option disabled>Select Product Category</option>
              {categoryList.map((value, index) => (
                <option key={index} value={value.name}>
                  {value.name}
                </option>
              ))}
            </select>
            <textarea
              value={productForm.description}
              onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
              name="description"
              placeholder="Product Description"
              rows="5"
              className="input-field"
            ></textarea>
            <button onClick={updateProductFunction} type="button" className="submit-button">
              Save
            </button>
          </div>
        )}

        {/* Display products with edit and delete buttons */}
        <div>
          <h2 className="text-center text-2xl font-bold text-pink-500">Products</h2>
          <ul>
            {products.map(product => (
              <li key={product.id}>
                <p>{product.title}</p>
                <button onClick={() => editProduct(product)}>Edit</button>
                <button onClick={() => deleteProductFunction(product.id)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
    </div>
  );
};

export default AdminDashboard;