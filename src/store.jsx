import { configureStore } from "@reduxjs/toolkit";
import countReducers from "./features/countSlice";
import cartReducer from './features/cartSlice';

const store = configureStore ({
    reducer : {
        counter: countReducers,
        cart: cartReducer,
    }
})

export default store
