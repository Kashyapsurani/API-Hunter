import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import Swal from 'sweetalert2'; // Import SweetAlert2
import Product from '../components/Product';
import { addToCart } from '../features/cartSlice'; // Import Redux action
import './ProductsPage.css';

const ProductsPage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null);
    const dispatch = useDispatch(); // Access Redux dispatch

    useEffect(() => {
        // Fetch products and manage loading state
        setLoading(true);
        axios.get('https://fakestoreapi.com/products')
            .then((response) => {
                setProducts(response.data);
                setLoading(false); // Loading complete
            })
            .catch(() => {
                setError('Failed to load products');
                setLoading(false); // Loading complete even if there's an error
            });
    }, []);

    const handleAddToCart = (product) => {
        dispatch(addToCart(product)); // Dispatch Redux action
        // SweetAlert for success notification
        Swal.fire({
            icon: 'success',
            title: 'Added to Cart',
            text: `${product.title} has been added to your cart.`,
            timer: 2000,
            showConfirmButton: false,
        });
    };

    // Render loading spinner
    if (loading) {
        return (
            <div className="loading-container">
                <div className="spinner"></div> {/* Spinner for loading */}
                <p>Loading products...</p>
            </div>
        );
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="products-page">
            <h1>Products</h1>
            <div className="products-container">
                {products.map((product) => (
                    <Product
                        key={product.id}
                        product={product}
                        onAddtoCart={handleAddToCart} // Pass handler
                    />
                ))}
            </div>
        </div>
    );
};

export default ProductsPage;
