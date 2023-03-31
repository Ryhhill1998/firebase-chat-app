import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    query: "",
    focused: false,
};

export const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setSearchQuery: (state, action) => {
            state.query = action.payload;
        },
        resetSearchQuery: state => {
            state.query = "";
        },
        focusInSearch: state => {
            state.focused = true;
        },
        focusOutSearch: state => {
            state.focused = false;
        }
    }
})

export const {setSearchQuery, resetSearchQuery, focusInSearch, focusOutSearch} = searchSlice.actions
export const selectSearchQuery = state => state.search.query;
export const selectSearchIsFocused = state => state.search.focused;
export default searchSlice.reducer