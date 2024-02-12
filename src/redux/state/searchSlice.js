import { createSlice } from '@reduxjs/toolkit'

export const searchSlice = createSlice({
    name: 'search',
    initialState: {
        value: '',
    },
    reducers: {
        searchKey: (state, action) => {
            state.value = action.payload;
        },
    },
});

export const { searchKey } = searchSlice.actions;
export default searchSlice.reducer;
