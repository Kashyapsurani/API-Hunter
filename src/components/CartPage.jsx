import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2'; // Import SweetAlert2
import { incrementQuantity, decrementQuantity, removeFromCart } from '../features/cartSlice';
import './CartPage.css'; // Import styles for CartPage

const CartPage = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.cartItems);

    const handleIncrement = (productId) => {
        dispatch(incrementQuantity(productId)); 
    };

    const handleDecrement = (productId) => {
        dispatch(decrementQuantity(productId)); 
    };

    const handleRemoveFromCart = (productId) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'Do you want to remove this item from your cart?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, remove it!',
            cancelButtonText: 'Cancel',
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(removeFromCart(productId));
                Swal.fire({
                    icon: 'success',
                    title: 'Removed',
                    text: 'Item has been removed from your cart.',
                    timer: 2000,
                    showConfirmButton: false,
                });
            }
        });
    };

    if (cartItems.length === 0) {
        return <center style={{marginTop:20}}><div>Your cart is empty.</div></center>;
    }

    return (
        <div className="cart-page">
            <h1>Your Cart</h1>
            <div className="cart-items">
                {cartItems.map((item) => (
                    <div key={item.id} className="cart-item">
                        <img src={item.image} alt={item.name} className="cart-item-image" />
                        <div className="cart-item-details">
                            <h3>{item.name}</h3>
                            <p>${item.price}</p>
                            <div className="cart-item-quantity">
                                <button
                                    onClick={() => handleDecrement(item.id)}
                                    disabled={item.quantity <= 1}
                                >
                                    -
                                </button>
                                <span>{item.quantity}</span>
                                <button onClick={() => handleIncrement(item.id)}>+</button>
                            </div>
                        </div>
                        <button
                            onClick={() => handleRemoveFromCart(item.id)}
                            className="remove-item-btn"
                        >
                            Remove
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CartPage;
