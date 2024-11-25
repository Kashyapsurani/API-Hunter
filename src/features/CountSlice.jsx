import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
    name: 'counter',
    initialState: {
        value: 0, // Initial state key is `value`
    },
    reducers: {
        increment(state) {
            state.value += 1; // Update `value`, not `counter`
        },
        decrement(state) {
            state.value -= 1; // Update `value`, not `counter`
        },
        reset(state) {
            state.value = 0; // Reset `value` to 0
        },
    },
});

export const { increment, decrement, reset } = counterSlice.actions;
export default counterSlice.reducer;
