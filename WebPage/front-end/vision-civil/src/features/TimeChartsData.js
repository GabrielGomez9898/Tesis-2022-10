import { createSlice } from "@reduxjs/toolkit";

export const timeChartsDataSlice = createSlice({
    name: "timeChartsData",
    initialState: {
        value: {
            reportsByPeriod: [],

            hurtoViviendaByPeriod: [],
            hurtoPersonaByPeriod: [],
            hurtoVehiculoByPeriod: [],
            vandalismoByPeriod: [],
            violacionByPeriod: [],
            homicidioByPeriod: [],
            agresionByPeriod: [],
            otroByPeriod: []
        }
    },
    reducers: {
        refreshData: (state, action) => {
            state.value = action.payload;
        }
    }
});

export const { refreshData } = timeChartsDataSlice.actions;

export default timeChartsDataSlice.reducer;