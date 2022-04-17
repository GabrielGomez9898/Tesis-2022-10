import { createSlice } from "@reduxjs/toolkit";

export const functionaryFiltersDataSlice = createSlice({
    name: "functionaryFiltersData",
    initialState: {
        value: {
            functionaryType: "TODOS"
        }
    },
    reducers: {
        refreshData: (state, action) => {
            state.value = action.payload;
        }
    }
});

export const { refreshData } = functionaryFiltersDataSlice.actions;

export default functionaryFiltersDataSlice.reducer;