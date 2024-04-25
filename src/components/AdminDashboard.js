import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc, Timestamp } from 'firebase/firestore';
import './AdminDashboard.css'; // Assuming this contains your custom styles

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
  const [selectedCategory, setSelectedCategory] = useState(categoryList[0]?.name); // New state for selected category

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

  const fetchProducts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'products'));
      const fetchedProducts = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      console.log('Fetched products:', fetchedProducts); // Check the fetched data
      setProducts(fetchedProducts);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
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
        <div className="login_Form">
            <div className="mb-5">
                <h2 className='text-center text-2xl font-bold'>Add Product</h2>
            </div>
            <input type="text" name="title" value={productForm.title} onChange={e => setProductForm({ ...productForm, title: e.target.value })} placeholder='Product Title' className='input-field' />
            <input type="number" name="price" value={productForm.price} onChange={e => setProductForm({ ...productForm, price: e.target.value })} placeholder='Product Price' className='input-field' />
            <input type="text" name="productImageUrl" value={productForm.productImageUrl} onChange={e => setProductForm({ ...productForm, productImageUrl: e.target.value })} placeholder='Product Image Url' className='input-field' />
            {/* Added category dropdown */}
            <select value={productForm.category} onChange={e => setProductForm({ ...productForm, category: e.target.value })} className="input-field">
                <option disabled>Select Product Category</option>
                {categoryList.map((value, index) => <option key={index} value={value.name}>{value.name}</option>)}
            </select>
            {/* Rest of the form */}
            <textarea value={productForm.description} onChange={e => setProductForm({ ...productForm, description: e.target.value })} name="description" placeholder="Product Description" rows="5" className="input-field"></textarea>
            <button onClick={addProductFunction} type='button' className='submit-button'>Add Product</button>
        </div>

        {/* Product list section */}
        <div className="products-section">
          {/* Category Dropdown */}
          <div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="input-field"
            >
              {categoryList.map((category, index) => (
                <option key={index} value={category.name}>{category.name}</option>
              ))}
            </select>
          </div>
          {/* Filtered Product list */}
          <h2 className="text-center text-2xl font-bold">Products</h2>
          <ul className="product-list">
            {products.filter(product => product.category === selectedCategory).map(product => (
              <li key={product.id} className="product-item">
                <span>{product.title}</span>
                <div>
                  <button onClick={() => editProduct(product)}>Edit</button>
                  <button onClick={() => deleteProductFunction(product.id)}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Edit Product Form */}
        {selectedProduct && (
          <div className="login_Form">
            <div className="mb-5">
              <h2 className="text-center text-2xl font-bold">Edit Product</h2>
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
    </div>
  );
};

export default AdminDashboard;
