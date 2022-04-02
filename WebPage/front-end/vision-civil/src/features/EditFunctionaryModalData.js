import { createSlice } from "@reduxjs/toolkit";

export const editFunctionaryModalDataSlice = createSlice({
    name: "editFunctionaryModalData",
    initialState: {
        value: {
            isOpen: false,
            functionary: {
                isMaster: false
            }
        }
    },
    reducers: {
        refreshData: (state, action) => {
            state.value = action.payload;
        }
    }
});

export const { refreshData } = editFunctionaryModalDataSlice.actions;

export default editFunctionaryModalDataSlice.reducer;