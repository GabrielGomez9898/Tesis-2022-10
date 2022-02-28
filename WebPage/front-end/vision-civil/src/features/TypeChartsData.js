import { createSlice } from "@reduxjs/toolkit";

export const typeChartsDataSlice = createSlice({
    name: "typeChartsData",
    initialState: {
        value: {
            hurtoViviendaNum: 0,
            hurtoPersonaNum: 0,
            hurtoVehiculoNum: 0,
            vandalismoNum: 0,
            violacionNum: 0,
            homicidioNum: 0,
            agresionNum: 0,
            otroNum: 0,

            hurtoViviendaPercentage: 0,
            hurtoPersonaPercentage: 0,
            hurtoVehiculoPercentage: 0,
            vandalismoPercentage: 0,
            violacionPercentage: 0,
            homicidioPercentage: 0,
            agresionPercentage: 0,
            otroPercentage: 0
        }
    },
    reducers: {
        refreshData: (state, action) => {
            state.value = action.payload;
        }
    }
});

export const { refreshData } = typeChartsDataSlice.actions;

export default typeChartsDataSlice.reducer;