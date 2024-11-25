// cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Helper to save to local storage
const saveToLocalStorage = (cartItems) => {
    try {
        console.log('Saving to localStorage:', cartItems); // Debug log
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    } catch (e) {
        console.error('Error saving to localStorage:', e);
    }
};

// Helper to load from local storage
const loadFromLocalStorage = () => {
    try {
        const storedCart = localStorage.getItem('cartItems');
        console.log('Loading from localStorage:', storedCart); // Debug log
        return storedCart ? JSON.parse(storedCart) : [];
    } catch (e) {
        console.error('Error loading from localStorage:', e);
        return [];
    }
};

// Load cart items from local storage on initialization
const initialState = {
    cartItems: loadFromLocalStorage(), // Retrieve from local storage or initialize as empty
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        // Add or update item in cart
        addToCart: (state, action) => {
            const product = action.payload;
            const existingProductIndex = state.cartItems.findIndex(item => item.id === product.id);

            if (existingProductIndex >= 0) {
                // If item already exists, increase its quantity
                state.cartItems[existingProductIndex].quantity += 1;
            } else {
                // If it's a new item, set quantity to 1 and add it to the cart
                state.cartItems.push({ ...product, quantity: 1 });
            }
            console.log('Cart state after adding:', state.cartItems); // Debug log
            saveToLocalStorage(state.cartItems); // Save updated state to local storage
        },

        // Remove item from cart
        removeFromCart: (state, action) => {
            const productId = action.payload;
            state.cartItems = state.cartItems.filter((item) => item.id !== productId); // Remove item by ID
            console.log('Cart state after removal:', state.cartItems); // Debug log
            saveToLocalStorage(state.cartItems); // Save updated state to local storage
        },

        // Clear all items from cart
        clearCart: (state) => {
            state.cartItems = []; // Clear all items in the cart
            console.log('Cart state after clearing:', state.cartItems); // Debug log
            saveToLocalStorage(state.cartItems); // Save updated state to local storage
        },

        // Increment item quantity in cart
        incrementQuantity: (state, action) => {
            const productId = action.payload;
            const product = state.cartItems.find(item => item.id === productId);
            if (product) {
                product.quantity += 1;
            }
            console.log('Cart state after incrementing quantity:', state.cartItems); // Debug log
            saveToLocalStorage(state.cartItems); // Save updated state to local storage
        },

        // Decrement item quantity in cart, but not below 1
        decrementQuantity: (state, action) => {
            const productId = action.payload;
            const product = state.cartItems.find(item => item.id === productId);
            if (product && product.quantity > 1) {
                product.quantity -= 1;
            }
            console.log('Cart state after decrementing quantity:', state.cartItems); // Debug log
            saveToLocalStorage(state.cartItems); // Save updated state to local storage
        },
    },
});

export const {
    addToCart,
    removeFromCart,
    clearCart,
    incrementQuantity,
    decrementQuantity
} = cartSlice.actions;

export default cartSlice.reducer;
