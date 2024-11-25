import React from 'react';
import { useDispatch } from "react-redux";
import './Product.css';

const Product = ({ product, onAddtoCart }) => {
    const dispatch = useDispatch();

    return (
        <div className="product-card">
            <img src={product.image} alt={product.title} className="product-image" />
            <h3 className="product-title">{product.title}</h3>
            <p className="product-category">Category: {product.category}</p>
            <p className="product-price">Price: ${product.price}</p>
            <p className="product-rating">
                Rating: {product.rating.rate} ★ ({product.rating.count} reviews)
            </p>
            <button className="add-to-cart-btn" onClick={() => onAddtoCart (product)}>
                Add to Cart
            </button>
        </div>
    );
};

export default Product;