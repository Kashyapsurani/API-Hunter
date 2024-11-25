import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement, reset } from "./features/countSlice";
import './Counter.css'; // Import the CSS file

function Counter() {
    const count = useSelector((state) => state.counter.value); // Access the `value` from Redux state
    const dispatch = useDispatch();

    return (
        <div className="counter-container">
            <button onClick={() => dispatch(increment())}>+</button> <br />
            <p>Counter: {count}</p> {/* Display the counter value */}
            <button onClick={() => dispatch(decrement())}>-</button><br /><br />
            <button onClick={() => dispatch(reset())}>Reset</button><br /><br />
        </div>
    );
}

export default Counter;
