import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    query: "",
    focused: false,
    messageResults: null,
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
        },
        setMessageResults: (state, action) => {
            console.log("setting message results")
            state.messageResults = action.payload;
        },
        resetMessageResults: state => {
            state.messageResults = null;
        },
    }
})

export const {
    setSearchQuery,
    resetSearchQuery,
    focusInSearch,
    focusOutSearch,
    setMessageResults,
    resetMessageResults
} = searchSlice.actions
export const selectSearchQuery = state => state.search.query;
export const selectSearchIsFocused = state => state.search.focused;
export const selectMessageResults = state => state.search.messageResults;
export default searchSlice.reducer