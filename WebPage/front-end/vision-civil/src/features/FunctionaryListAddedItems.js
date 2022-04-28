import { createSlice } from "@reduxjs/toolkit";

export const functionaryListAddedItemsSlice = createSlice({
    name: "functionaryListAddedItemsItems",
    initialState: {
        value: 0
    },
    reducers: {
        increment: (state, action) => {
            state.value++;
        }
    }
});

export const { increment } = functionaryListAddedItemsSlice.actions;

export default functionaryListAddedItemsSlice.reducer;