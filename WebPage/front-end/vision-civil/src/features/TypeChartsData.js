import { createSlice } from "@reduxjs/toolkit";

export const typeChartsDataSlice = createSlice({
    name: "typeChartsData",
    initialState: {
        value: {}
    },
    reducers: {
        refreshData: (state, action) => {
            state.value = action.payload;
        }
    }
});

export const { refreshData } = typeChartsDataSlice.actions;

export default typeChartsDataSlice.reducer;