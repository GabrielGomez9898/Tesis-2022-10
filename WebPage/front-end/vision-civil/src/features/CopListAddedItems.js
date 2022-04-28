import { createSlice } from "@reduxjs/toolkit";

export const copListAddedItemsSlice = createSlice({
    name: "copListAddedItems",
    initialState: {
        value: 0
    },
    reducers: {
        increment: (state, action) => {
            state.value++;
        }
    }
});

export const { increment } = copListAddedItemsSlice.actions;

export default copListAddedItemsSlice.reducer;