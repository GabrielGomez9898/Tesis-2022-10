import { createSlice } from "@reduxjs/toolkit";

export const functionaryListSlice = createSlice({
    name: "functionaryList",
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
            const index = state.value.findIndex((functionary) => functionary.id === action.payload.id);
            state.value[index].isMaster = action.payload.isMaster;
        },
        deleteItem: (state, action) => {
            state.value = state.value.filter((functionary) => functionary.id !== action.payload.id);
        }
    }
});

export const { refreshData,
                addItem,
                editItem,
                deleteItem } = functionaryListSlice.actions;

export default functionaryListSlice.reducer;