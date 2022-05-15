import { createSlice } from "@reduxjs/toolkit";

export const timeChartsDataSlice = createSlice({
    name: "timeChartsData",
    initialState: {
        value: {}
    },
    reducers: {
        refreshData: (state, action) => {
            state.value = action.payload;
        }
    }
});

export const { refreshData } = timeChartsDataSlice.actions;

export default timeChartsDataSlice.reducer;