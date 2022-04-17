import { createSlice } from "@reduxjs/toolkit";

export const copFiltersDataSlice = createSlice({
    name: "copFiltersData",
    initialState: {
        value: {
            genero: "TODOS",
            disponibilidad: "TODOS",
            estado: "TODOS"
        }
    },
    reducers: {
        refreshData: (state, action) => {
            state.value = action.payload;
        }
    }
});

export const { refreshData } = copFiltersDataSlice.actions;

export default copFiltersDataSlice.reducer;