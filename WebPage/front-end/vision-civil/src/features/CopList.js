import { createSlice } from "@reduxjs/toolkit";

export const copListSlice = createSlice({
    name: "copList",
    initialState: {
        value: []
    },
    reducers: {
        refreshData: (state, action) => {
            state.value = action.payload;
        },
        addItem: (state, action) => {
            state.value.push(action.payload);
        },
        editItem: (state, action) => {
            const index = state.value.findIndex((cop) => cop.id === action.payload.id);
            state.value[index].birth_date = action.payload.birth_date;
            state.value[index].gender = action.payload.gender;
            state.value[index].id_policia = action.payload.id_policia;
            state.value[index].name = action.payload.name;
            state.value[index].phone = action.payload.phone;
        },
        deleteItem: (state, action) => {
            state.value = state.value.filter((cop) => cop.id !== action.payload.id);
        }
    }
});

export const { refreshData,
                addItem,
                editItem,
                deleteItem } = copListSlice.actions;

export default copListSlice.reducer;