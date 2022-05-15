import { createSlice } from "@reduxjs/toolkit";

export const mapDataSlice = createSlice({
    name: "mapData",
    initialState: {
        value: []
    },
    reducers: {
        refreshData: (state, action) => {
            state.value = action.payload;
        }
    }
});

export const { refreshData } = mapDataSlice.actions;

export default mapDataSlice.reducer;